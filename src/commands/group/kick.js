export default {
  name: "kick",
  aliases: ["k", "expulsar"],
  category: "grupos",
  description: "Expulsa a un usuario del grupo.",
  usage: "/kick [mención]",
  example: "/kick @usuario",
  onlyGroup: true,
  onlyAdmin: true,
  botAdmin: true,

  async execute(m, { sock, args }) {
    try {
      if (!m.mentions.length) {
        m.react('❌');
        return m.reply("Menciona a un usuario.");
      }

      const mentioned = m.mentions[0];
      await sock.groupParticipantsUpdate(m.from, [mentioned], "remove");
      m.react('✅');
      return m.reply("Usuario expulsado.");
    } catch (err) {
      console.error(err);
        m.react('❌');
      return m.reply("No soy admin o error al expulsar.");
    }
  }
};
