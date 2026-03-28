function isValidUrl(url) {
  const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
  return urlPattern.test(url);
}

export default {
  name: "qr",
  description: "Brinda un código QR basado en cualquier URL",
  alias: ["qrcode"],
  category: "utilidades",
  usage: "qr <enlace>",
  example: "qr https://google.com",

  async execute(m, { args }) {
    try {
      await m.react("⏳");

      const web = args.join(" ");

      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(web)}`;

      await m.reply({
        image: { url: qrCodeUrl },
        caption: "Aquí tienes tu código QR",
      });

      await m.react("✅");
    } catch (error) {
      console.error(error);
      await m.react("❌");
      await m.reply("¡Ups! Sucedió un error.");
    }
  },
};