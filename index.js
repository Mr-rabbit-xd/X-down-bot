const { Telegraf } = require("telegraf");
const axios = require("axios");

const bot = new Telegraf("YOUR_BOT_TOKEN"); // <-- এখানে তোমার BotFather-এর token বসাও

bot.start((ctx) => {
  ctx.reply("👋 Welcome to Insta Downloader Bot by MR-RABBIT.\nJust send an Instagram video link.");
});

bot.on("text", async (ctx) => {
  const url = ctx.message.text;
  if (!url.includes("instagram.com")) return ctx.reply("❌ Send a valid Instagram link.");

  ctx.reply("⏳ Downloading...");

  try {
    const res = await axios.get(`https://your-vercel-app.vercel.app/api/in?url=${encodeURIComponent(url)}`);
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
