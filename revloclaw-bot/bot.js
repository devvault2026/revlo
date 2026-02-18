require("dotenv").config();
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const axios = require("axios");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
    ],
    partials: [Partials.Channel, Partials.Message],
});

client.once("ready", () => {
    console.log(`RevloClaw online as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    // Check if the bot is mentioned or if it's a DM
    const isMentioned = message.mentions.has(client.user.id);
    const isDM = message.channel.type === 1; // 1 is DM

    if (!isMentioned && !isDM) return;

    const prompt = message.content.replace(/<@!?\d+>/, "").trim();

    if (!prompt) return message.reply("Ask me something.");

    try {
        // ⚠️ THIS WILL BE YOUR OPENCLAW API
        // Ensure OPENCLAW_API_URL is set in .env
        // Defaulting to http://localhost:8000/v1/chat/completions which is standard for local LLM servers
        // But respecting user's original intent if they set it.
        const apiUrl = process.env.OPENCLAW_API_URL || "http://localhost:8000/v1/chat/completions";

        // Adjust payload structure based on API
        // If it's OpenAI compatible:
        const payload = {
            model: "gpt-3.5-turbo", // or whatever model OpenClaw uses
            messages: [{ role: "user", content: prompt }],
        };

        // If it's the custom endpoint from snippet:
        // const payload = { message: prompt };

        // We'll stick to the snippet's likely intention but make it configurable
        // If the user's snippet was strictly { message: prompt }, we should support that.
        // Let's assume the user knows the payload structure or we should stick to the snippet's { message: prompt } for now
        // but allow URL configuration.

        const response = await axios.post(apiUrl, {
            message: prompt,
        });

        // Handle response structure
        // If the API returns { reply: "..." }
        if (response.data && response.data.reply) {
            message.reply(response.data.reply);
        } else if (response.data && response.data.choices && response.data.choices[0] && response.data.choices[0].message) {
            // Handle OpenAI format
            message.reply(response.data.choices[0].message.content);
        } else {
            console.log("Unexpected response format:", response.data);
            message.reply("I got a response, but it didn't look like what I expected.");
        }
    } catch (err) {
        console.error("Error communicating with OpenClaw:", err.message);
        if (err.response) {
            console.error("Response data:", err.response.data);
            console.error("Response status:", err.response.status);
        }
        message.reply("OpenClaw connection failed: " + (err.response?.data?.message || err.message));
    }
});

client.login(process.env.DISCORD_TOKEN);
