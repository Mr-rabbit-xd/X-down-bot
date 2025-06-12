const { Telegraf } = require("telegraf");
const axios = require("axios");

const bot = new Telegraf("8019207243:AAGzrJIPzPcIc3S_YBvRK1W_JjtcVHjTDE4"); // <-- এখানে তোমার BotFather-এর token বসাও

bot.start((ctx) => {
  ctx.reply("👋 Welcome to Insta Downloader Bot by MR-RABBIT.\nJust send an Instagram video link.");
});

bot.on("text", async (ctx) => {
  const url = ctx.message.text;
  if (!url.includes("instagram.com")) return ctx.reply("❌ Send a valid Instagram link.");

  ctx.reply("⏳ Downloading...");

  try {
    const res = await axios.get(`https://rabbit-api-test.vercel.app/api/xvideo?url=${encodeURIComponent(url)}`);
    const data = res.data;

    if (!data.status) return ctx.reply("🚫 Failed to download the video.");

    const { title, views, image, dl_link } = data.result;

    await ctx.replyWithPhoto(image, {
      caption: `🎬 ${title}\n👁️ ${views}\n⬇️ Download: ${dl_link}`
    });
  } catch (e) {
    console.error(e.message);
    ctx.reply("⚠️ Error fetching video.");
  }
});

bot.launch();
