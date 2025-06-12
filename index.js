const { Telegraf } = require("telegraf");
const axios = require("axios");

const bot = new Telegraf(process.env.BOT_TOKEN); // TOKEN koyeb env এ দিবা

bot.start((ctx) => {
  ctx.reply("👋 Welcome to X Video Downloader Bot by MR-RABBIT.\n\n📥 Just send an X video link.");
});

bot.on("text", async (ctx) => {
  const url = ctx.message.text;
  if (!url.includes("instagram.com")) return ctx.reply("❌ Please send a valid Instagram link.");

  ctx.reply("⏳ Fetching video...");

  try {
    const res = await axios.get(`https://rabbit-api-test.vercel.app/api/xvideo?url=${encodeURIComponent(url)}`);
    const data = res.data;

    if (!data.status) return ctx.reply("🚫 Failed to download the video.");

    const { title, views, dl_link } = data.result;

    await ctx.replyWithVideo(dl_link, {
      caption: `🎬 ${title}\n👁️ ${views}\n\nBy: MR-RABBIT`
    });
  } catch (err) {
    console.error(err.message);
    ctx.reply("⚠️ Something went wrong.");
  }
});

bot.launch();
