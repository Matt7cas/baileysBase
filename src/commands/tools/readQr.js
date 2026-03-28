import axios from 'axios';
import FormData from 'form-data';

export default {
    name: "readqr",
    aliases: ["qrread", "decodeqr"],
    category: "utility",
    description: "Decodifica el contenido de un código QR desde una imagen.",
    usage: "/readqr (Responde a una imagen o envía imagen con caption)",
    example: "/readqr",

    async execute(m, { sock, args }) {
        const QR_API_URL = 'https://api.qrserver.com/v1/read-qr-code/'; 
        
        try {
            await m.react('⏳');
            
            let imageMessage = null;

            if (m.quoted && m.quoted.isMedia) {
                imageMessage = m.quoted;
            } else if (m.isMedia && m.type === 'imageMessage') {
                imageMessage = m;
            }

            if (!imageMessage) {
                await m.react('❌');
                return m.reply("Responde a una imagen que contenga un código QR o envía una imagen con el comando.");
            }

            const buffer = await imageMessage.download();

            const form = new FormData();
            
            form.append('file', buffer, {
                filename: 'qr_code.jpg',
                contentType: imageMessage.mimetype || 'image/jpeg' 
            });

            // 4. Enviar a la API de decodificación
            const response = await axios.post(QR_API_URL, form, {
                headers: {
                    ...form.getHeaders()
                },
                timeout: 30000
            });

            if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
                await m.react('❌');
                return m.reply("No se pudo obtener una respuesta válida del servicio de decodificación QR.");
            }

            const symbol = response.data[0].symbol;
            
            if (!symbol || symbol.length === 0 || !symbol[0].data || symbol[0].data === 'null') {
                await m.react('❌');
                return m.reply("No se detectó ningún código QR válido en la imagen, o el contenido no pudo ser decodificado.");
            }
            
            const decodedContent = symbol[0].data;
            const error = symbol[0].error;
            
            if (error) {
                await m.react('❌');
                console.log(error);
                return m.reply(`Ha ocurrido un error`);
            }

            let replyText = `Código QR Decodificado\n`;
            replyText += `Contenido: \n${decodedContent}`;

            await m.reply(replyText);
            await m.react('✅');

        } catch (err) {
            console.error(err);
            m.react('❌');
            return m.reply("Ocurrió un error al procesar la imagen");
        }
    }
};