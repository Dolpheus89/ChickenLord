import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('secret')
    .setDescription('secret love');

export const execute = async (interaction) => {
    await interaction.reply('Faut le dire à personne mais je préfère les canards aux poules');
};