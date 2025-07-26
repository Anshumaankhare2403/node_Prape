import ytdl from "@distube/ytdl-core";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import os from "os";
import path from "path";

// Set correct FFmpeg path
ffmpeg.setFfmpegPath("C:/Users/anshu/Downloads/ffmpeg-2025-07-23-git-829680f96a-full_build/ffmpeg-2025-07-23-git-829680f96a-full_build/bin/ffmpeg.exe");

const videoURL = "https://www.youtube.com/watch?v=JgDNFQ2RaLQ&list=RDJgDNFQ2RaLQ&start_radio=1";

async function downloadAndMerge() {
    try {
        console.log("🔍 Fetching basic info...");
        const basicInfo = await ytdl.getBasicInfo(videoURL);
        const title = basicInfo.videoDetails.title.replace(/[<>:"/\\|?*]/g, ""); // remove illegal filename chars

        const downloadsDir = path.join(os.homedir(), "Downloads");
        const outputPath = path.join(downloadsDir, `${title}.mp4`);
        const videoPath = "./temp_video.mp4";
        const audioPath = "./temp_audio.m4a";

        console.log("🔍 Fetching full format info...");
        const info = await ytdl.getInfo(videoURL);

        const bestVideo = info.formats
            .filter(f => f.hasVideo && !f.hasAudio && f.container === "mp4")
            .sort((a, b) => (b.height || 0) - (a.height || 0))[0];

        const bestAudio = info.formats
            .filter(f => f.hasAudio && !f.hasVideo && f.container === "mp4")
            .sort((a, b) => (b.audioBitrate || 0) - (a.audioBitrate || 0))[0];

        if (!bestVideo || !bestAudio) {
            console.error("❌ No suitable video or audio format found.");
            return;
        }

        console.log("⬇️ Downloading video and audio...");

        await Promise.all([
            new Promise((resolve, reject) =>
                ytdl.downloadFromInfo(info, { format: bestVideo })
                    .pipe(fs.createWriteStream(videoPath))
                    .on("finish", resolve)
                    .on("error", reject)
            ),
            new Promise((resolve, reject) =>
                ytdl.downloadFromInfo(info, { format: bestAudio })
                    .pipe(fs.createWriteStream(audioPath))
                    .on("finish", resolve)
                    .on("error", reject)
            ),
        ]);

        console.log("✅ Download complete. Merging with FFmpeg...");

        ffmpeg()
            .input(videoPath)
            .input(audioPath)
            .videoCodec("copy")
            .audioCodec("copy")
            .outputOptions("-movflags +faststart")
            .on("end", () => {
                console.log("✅ Merged output saved to:", outputPath);
                fs.unlinkSync(videoPath);
                fs.unlinkSync(audioPath);
            })
            .on("error", (err) => {
                console.error("❌ FFmpeg Error:", err.message);
            })
            .save(outputPath);

    } catch (err) {
        console.error("❌ Error:", err.message);
    }
}

downloadAndMerge();
