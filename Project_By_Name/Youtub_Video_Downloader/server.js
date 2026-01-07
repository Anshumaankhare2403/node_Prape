import ytdl from "@distube/ytdl-core";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import os from "os";
import path from "path";
import progress from "progress-stream";

// FFmpeg path (Windows)
ffmpeg.setFfmpegPath(
  "C:/Users/anshu/Downloads/ffmpeg-2025-07-23-git-829680f96a-full_build/ffmpeg-2025-07-23-git-829680f96a-full_build/bin/ffmpeg.exe"
);

const videoURL = "https://www.youtube.com/watch?v=kQydatcOcX0";

async function downloadAndMerge() {
  try {
    console.log("🔍 Fetching video info...");
    const info = await ytdl.getInfo(videoURL);

    const title = info.videoDetails.title.replace(/[<>:"/\\|?*]+/g, "");
    const outputPath = path.join(os.homedir(), "Downloads", `${title}.mp4`);

    const tempDir = os.tmpdir();
    const videoPath = path.join(tempDir, "yt_video.mp4");
    const audioPath = path.join(tempDir, "yt_audio.m4a");

    /* =========================
       CASE 1: Combined stream
    ========================== */
    const combined = info.formats
      .filter(f => f.hasVideo && f.hasAudio)
      .sort((a, b) => (b.height || 0) - (a.height || 0))[0];

    if (combined) {
      console.log("🎥 Downloading combined stream...");

      const size = Number(combined.contentLength || 0);
      const bar = progress({ length: size || undefined, time: 100 });

      bar.on("progress", p => {
        process.stdout.write(`\r📥 ${p.percentage.toFixed(1)}%`);
      });

      ytdl.downloadFromInfo(info, { format: combined })
        .pipe(bar)
        .pipe(fs.createWriteStream(outputPath))
        .on("finish", () => {
          console.log(`\n✅ Saved to: ${outputPath}`);
        })
        .on("error", err => {
          console.error("\n❌ Download error:", err.message);
        });

      return;
    }

    /* =========================
       CASE 2: Separate streams
    ========================== */
    const bestVideo = info.formats
      .filter(f => f.hasVideo && !f.hasAudio)
      .sort((a, b) => (b.height || 0) - (a.height || 0))[0];

    const bestAudio = info.formats
      .filter(f => f.hasAudio && !f.hasVideo)
      .sort((a, b) => (b.audioBitrate || 0) - (a.audioBitrate || 0))[0];

    if (!bestVideo || !bestAudio) {
      throw new Error("No suitable streams found");
    }

    console.log("⬇️ Downloading video...");
    await new Promise((res, rej) =>
      ytdl.downloadFromInfo(info, { format: bestVideo })
        .pipe(fs.createWriteStream(videoPath))
        .on("finish", res)
        .on("error", rej)
    );

    console.log("⬇️ Downloading audio...");
    await new Promise((res, rej) =>
      ytdl.downloadFromInfo(info, { format: bestAudio })
        .pipe(fs.createWriteStream(audioPath))
        .on("finish", res)
        .on("error", rej)
    );

    console.log("🎞 Merging with FFmpeg...");
    ffmpeg()
      .input(videoPath)
      .input(audioPath)
      .outputOptions("-movflags +faststart")
      .videoCodec("copy")
      .audioCodec("copy")
      .on("end", () => {
        fs.unlinkSync(videoPath);
        fs.unlinkSync(audioPath);
        console.log(`✅ Final video saved: ${outputPath}`);
      })
      .on("error", err => {
        console.error("❌ FFmpeg error:", err.message);
      })
      .save(outputPath);

  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

downloadAndMerge();
