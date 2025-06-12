require('dotenv').config();
const { Telegraf } = require('telegraf');
const axios = require('axios');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(ctx => {
  ctx.reply("👋 Welcome to X video Downloader by MR-RABBIT.\n📥 Send any X video link.");
});

bot.on('text', async (ctx) => {
  const url = ctx.message.text;
  if (!url.includes("instagram.com")) {
    return ctx.reply("❌ Please send a valid Instagram video link.");
  }

  await ctx.reply("⏳ Downloading video...");

  try {
    const res = await axios.get(`https://rabbit-api-test.vercel.app/api/xvideo?url=${encodeURIComponent(url)}`);
    const data = res.data;

    if (!data.status) {
      return ctx.reply("🚫 Couldn't fetch video.");
    }

    const { title, views, image, dl_link } = data.result;

    await ctx.replyWithVideo(dl_link, {
      caption: `🎬 ${title}\n👁️ ${views}`
    });
  } catch (err) {
    console.error(err.message);
    ctx.reply("⚠️ Error while fetching video.");
  }
});

bot.launch();
