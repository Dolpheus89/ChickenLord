import { Client, Events, Collection, GatewayIntentBits } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';
import express from "express"
import { fileURLToPath, pathToFileURL } from 'node:url';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Bot is running!'));
app.listen(PORT, () => {
    console.log(`Web server is running on port ${PORT}`);
});

const bot = new Client({ intents: [GatewayIntentBits.Guilds] });

bot.commands = new Collection();
const serverInfoCache = new Map();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandPath, file);
        import(pathToFileURL(filePath).href)
            .then(command => {
                console.log(`Commande ${command.data.name} chargée avec succès.`);

                if ('data' in command && 'execute' in command) {
                    bot.commands.set(command.data.name, command);
                } else {
                    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
                }
            })
            .catch(error => {
                console.error(`Erreur lors du chargement de la commande ${file}:`, error);
            });
    }
}

bot.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    console.log(`${new Date().toLocaleString()} User "${interaction.user.globalName}" used command "/${interaction.commandName}"`);

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction, serverInfoCache);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
});

bot.once(Events.ClientReady, readyBot => {
    console.log(`Ready! Logged in as ${readyBot.user.tag}`);
});

bot.login(process.env.BOT_TOKEN);

