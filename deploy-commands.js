import { REST, Routes } from "discord.js";
import fs from "node:fs"
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import 'dotenv/config'

const commands = [];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const foldersPath = path.join(__dirname, 'commands')
const commandFolder = fs.readdirSync(foldersPath)

const loadCommands = async () => {
    for (const folder of commandFolder) {
        const commandPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(commandPath, file);
            try {
                const command = await import(pathToFileURL(filePath).href);
                console.log(`Commande ${command.data.name} chargée avec succès.`);

                if ('data' in command && 'execute' in command) {
                    commands.push(command.data.toJSON());
                } else {
                    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
                }
            } catch (error) {
                console.error(`Erreur lors du chargement de la commande ${file}:`, error);
            }
        }
    }
};

const rest = new REST().setToken(process.env.BOT_TOKEN);

(async () => {

    await loadCommands();
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationCommands(process.env.BOT_ID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();