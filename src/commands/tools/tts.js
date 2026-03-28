import { getAudioBuffer } from "simple-tts-mp3";

export default {
  name: "tts",
  aliases: ["text2speech"],
  category: "utilidades",
  description: "Convierte texto a voz en español.",
  usage: "/tts <texto a convertir>",
  example: "/tts hello world",

  async execute(m, { sock, args }) {
    try {
        await m.react('⏳');
      const content = args.join(" ");

      if (!content) {
        await m.react('❌');
        return m.reply("Ingresa un texto para convertir a voz.");
      }

      const tts = await getAudioBuffer(content, "es");

      await m.reply({
        audio: tts,
        mimetype: "audio/mp4",
        ptt: true
      });

      await m.react('✅');
    } catch (error) {
      console.error(error);
      await m.react('❌');
      return m.reply("Error inesperado al convertir texto a voz.");
    }
  }
};
