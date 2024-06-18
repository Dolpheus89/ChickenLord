import { SlashCommandBuilder } from 'discord.js';
import "dotenv/config"

export const data = new SlashCommandBuilder()
    .setName('admin')
    .setDescription('Liste toutes les commandes disponibles exclusif aux admins.');

export const infos = true
export const admin = true

export const execute = async (interaction) => {
    const commandList = interaction.client.commands.filter(command => command.admin)

    const getInfos = commandList.filter(command => command.infos)
    .map(command => `\`/${command.data.name}\` - ${command.data.description}`).join('\n');

    const getUtile = commandList.filter(command => command.utile)
    .map(command => `\`/${command.data.name}\` - ${command.data.description}`).join('\n');

    const getModeration = commandList.filter(command => command.moderation)
    .map(command => `\`/${command.data.name}\` - ${command.data.description}`).join('\n')


    const admin = process.env.ADMIN_ROLE
    
    let isAdmin = interaction.member.roles.cache.find(r => r.name === admin)

    if (!isAdmin) {
        await interaction.reply({ content: `Oops! Il te faut le rôle ${admin} pour utiliser cette commande. Retourne dans le poulailler! 🐔`, ephemeral: true });
        return;
    }
    
    await interaction.reply({
        content: `Voici une liste de toutes les commandes disponibles exclusif aux admins.:\n
        ***Utile***\n${getUtile}\n
        ***Moderation***\n${getModeration}\n
        ***Infos***\n${getInfos}\n
        `,
        ephemeral: true 
    });
}