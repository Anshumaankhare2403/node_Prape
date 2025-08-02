import ytdl from "@distube/ytdl-core";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import os from "os";
import path from "path";
import progress from "progress-stream";

// Set FFmpeg path
ffmpeg.setFfmpegPath("C:/Users/anshu/Downloads/ffmpeg-2025-07-23-git-829680f96a-full_build/ffmpeg-2025-07-23-git-829680f96a-full_build/bin/ffmpeg.exe");

const videoURL = "";

async function downloadAndMerge() {
    try {
        console.log("🔍 Fetching video info...");
        const basicInfo = await ytdl.getBasicInfo(videoURL);
        const title = basicInfo.videoDetails.title.replace(/[<>:"/\\|?*]+/g, "");
        const downloadsDir = path.join(os.homedir(), "Downloads");
        const outputPath = path.join(downloadsDir, `${title}.mp4`);
        const videoPath = "./temp_video.mp4";
        const audioPath = "./temp_audio.m4a";

        const info = await ytdl.getInfo(videoURL);

        const bestVideo = info.formats
            .filter(f => f.hasVideo && !f.hasAudio)
            .sort((a, b) => (b.height || 0) - (a.height || 0))[0];

        const bestAudio = info.formats
            .filter(f => f.hasAudio && !f.hasVideo)
            .sort((a, b) => (b.audioBitrate || 0) - (a.audioBitrate || 0))[0];

        // Case 1: Only video available
        if (bestVideo && !bestAudio) {
            console.log("📽 Only video found. Downloading...");

            const totalSize = bestVideo.contentLength || 0;
            const str = progress({
                length: parseInt(totalSize),
                time: 100
            });

            str.on('progress', p => {
                process.stdout.write(`\r📥 Video Download: ${p.percentage.toFixed(1)}%`);
            });

            ytdl.downloadFromInfo(info, { format: bestVideo })
                .pipe(str)
                .pipe(fs.createWriteStream(outputPath))
                .on("finish", () => {
                    console.log(`\n✅ Video saved to: ${outputPath}`);
                })
                .on("error", err => {
                    console.error("\n❌ Error downloading video:", err.message);
                });

            return;
        }

        // Case 2: Video + Audio => download and merge
        if (bestVideo && bestAudio) {
            console.log("⬇️ Downloading video and audio separately...");

            const videoSize = parseInt(bestVideo.contentLength || "0");
            const audioSize = parseInt(bestAudio.contentLength || "0");

            const videoProgress = progress({ length: videoSize, time: 100 });
            videoProgress.on("progress", p => {
                process.stdout.write(`\r📹 Video: ${p.percentage.toFixed(1)}%`);
            });

            const audioProgress = progress({ length: audioSize, time: 100 });
            audioProgress.on("progress", p => {
                process.stdout.write(`\r🔊 Audio: ${p.percentage.toFixed(1)}%`);
            });

            await Promise.all([
                new Promise((resolve, reject) =>
                    ytdl.downloadFromInfo(info, { format: bestVideo })
                        .pipe(videoProgress)
                        .pipe(fs.createWriteStream(videoPath))
                        .on("finish", () => {
                            console.log("\n✅ Video downloaded.");
                            resolve();
                        })
                        .on("error", reject)
                ),
                new Promise((resolve, reject) =>
                    ytdl.downloadFromInfo(info, { format: bestAudio })
                        .pipe(audioProgress)
                        .pipe(fs.createWriteStream(audioPath))
                        .on("finish", () => {
                            console.log("\n✅ Audio downloaded.");
                            resolve();
                        })
                        .on("error", reject)
                ),
            ]);

            console.log("🎞 Merging with FFmpeg...");

            ffmpeg()
                .input(videoPath)
                .input(audioPath)
                .videoCodec("copy")
                .audioCodec("copy")
                .outputOptions("-movflags +faststart")
                .on("end", () => {
                    console.log(`✅ Final video saved to: ${outputPath}`);
                    fs.unlinkSync(videoPath);
                    fs.unlinkSync(audioPath);
                })
                .on("error", err => {
                    console.error("❌ FFmpeg Error:", err.message);
                })
                .save(outputPath);
        } else {
            console.error("❌ Could not find suitable video/audio formats.");
        }
    } catch (err) {
        console.error("❌ Error:", err.message);
    }
}

downloadAndMerge();
