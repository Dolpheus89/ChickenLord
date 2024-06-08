import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('help')
    .setDescription('Liste toutes les commandes disponibles.');

export const infos = true

export const execute = async (interaction) =>  {
    const commandList = interaction.client.commands.filter(command => !command.admin)

    const getInfos = commandList.filter(command => command.infos)
    .map(command => `\`/${command.data.name}\` - ${command.data.description}`).join('\n');

    const getUtile = commandList.filter(command => command.utile)
    .map(command => `\`/${command.data.name}\` - ${command.data.description}`).join('\n');

    const getAutre = commandList.filter(command => command.autre)
    .map(command => `\`/${command.data.name}\` - ${command.data.description}`).join('\n');



    
    await interaction.reply({
        content: `Voici une liste de toutes les commandes disponibles :\n
        ***Utile***\n${getUtile}\n
        ***Infos***\n${getInfos}\n
        ***Autre***\n${getAutre}\n
        `,
        ephemeral: true 
    });
}