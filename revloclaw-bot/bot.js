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
        // OpenClaw Gateway API
        const apiUrl = process.env.OPENCLAW_API_URL || "http://localhost:18789/v1/chat/completions";
        const authToken = process.env.OPENCLAW_GATEWAY_TOKEN || "";

        const headers = {
            "Content-Type": "application/json",
        };
        if (authToken) {
            headers["Authorization"] = `Bearer ${authToken}`;
        }

        const response = await axios.post(apiUrl, {
            model: process.env.OPENCLAW_MODEL || "google/gemini-3-flash-preview",
            messages: [{ role: "user", content: prompt }],
        }, { headers });

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
