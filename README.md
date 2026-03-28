# WhatsApp Bot Base - Baileys

Plantilla modular y lista para usar para crear tu propio bot de WhatsApp con la librería Baileys.

---

## ✨ Características

- **Carga dinámica de comandos** - Añade comandos sin reiniciar el bot
- **Sistema de eventos** - Manejo completo de mensajes y conexiones
- **Comandos por categorías** - Organizado en general, grupo, info, tools
- **Validación automática** - Verifica admin, grupo/DM antes de ejecutar
- **Serialización de mensajes** - Facilita el manejo de mensajes entrantes
- **Multi-dispositivo** - Funciona en cualquier dispositivo con Node.js

---

## 📋 Requisitos

- Node.js 18+
- Cuenta de WhatsApp
- Conocimientos básicos de JavaScript

---

## 🚀 Instalación

```bash
npm install
```

---

## ⚙️ Configuración

Edita `src/config.js` para configurar el prefijo:

```js
const prefix = "/";

export default {
    prefix
}
```

Crea un archivo `.env` basado en `.env_example` y añade tus API keys.

---

## 📁 Estructura

```
src/
├── commands/          # Comandos del bot
│   ├── general/       # Comandos generales
│   ├── group/         # Comandos de grupo
│   ├── info/         # Comandos de información
│   └── tools/        # Herramientas
├── events/           # Manejo de eventos
├── lib/              # Funciones utilities
│   └── core/         # Nucleo del bot
└── index.js          # Entry point
```

---

## 💻 Uso

Inicia el bot:

```bash
node .
```

Escanea el código QR con tu WhatsApp y ¡listo!

---

## 📝 Comandos Incluidos

| Comando | Descripción |
|---------|-------------|
| `/menu` | Ver todos los comandos disponibles |
| `/ping` | Verificar si el bot responde |
| `/ayuda` | Ayuda general |
| `/owner` | Ver información del owner |
| `@everyone` | Mencionar a todos en el grupo |
| `/kick` | Expulsar usuario del grupo |
| `/qr` | Generar código QR |
| `/tts` | Texto a voz |

---

## 🔧 Añadir Comandos

Crea un archivo en `src/commands/<categoria>/`:

```js
export default {
    name: "comando",
    aliases: ["alias"],
    category: "general",
    description: "Descripción",
    usage: "[args]",
    example: "comando arg1",

    async execute(m, { sock, args }) {
        await m.reply("¡Hola!");
    }
};
```

---

## 📞 Soporte

- Discord: Únete a nuestro servidor
- Issues: Reporta problemas en GitHub

---

## 📜 Licencia

MIT License

---

⭐️ Dale estrella al proyecto si te fue útil!
