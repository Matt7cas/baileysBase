export default {
  name: "owner",
  aliases: ["creador", "contacto"],
  category: "general",
  description: "Envía un mensaje al propietario del bot.",
  usage: "/owner <tu mensaje>",
  example: "/owner Hola, ¿cómo estás?",
  
  async execute(m, { args, sock }) {
    try {
      m.react('⏳');
      const ownerJid = process.env.OWNER_NUMBER + "@s.whatsapp.net";

      if (args.length === 0) {
        return m.reply(`Hola *${m.pushName}*, para contactar a mi creador, usa el comando de la siguiente manera:\n\n*!owner <tu mensaje>*`);
      }

      const userMessage = args.join(" ");
      const senderName = m.pushName;
      const senderJid = m.sender.split('@')[0];

      // Mensaje que se enviará al propietario
      const messageToOwner = `*-- Mensaje para el Owner --*\n\n*De:* ${senderName} (wa.me/${senderJid})\n*Mensaje:* ${userMessage}`;

      // Enviar el mensaje al propietario
      await sock.sendMessage(ownerJid, { text: messageToOwner });

      // Mensaje de confirmación para el usuario
      const confirmationText = `Hola *${senderName}*, tu mensaje ha sido enviado a mi creador. ¡Gracias por contactarlo!`;
      await m.reply(confirmationText);
      m.react('✅');

    } catch (error) {
      console.error("Error en el comando owner:", error);
      m.react('❌');
      return m.reply("Ocurrió un error al intentar enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.");
    }
    m.react('✅');
  }
};
