import { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } from 'discord.js';
import quotesData from "../../datas/quotesData.js"
import path from 'path'


export const data = new SlashCommandBuilder()
.setName('quotes')
.setDescription("Des citations motivante pour te donner de l'inspiration")

export const autre = true

export const execute = async (interaction) => {
    const randomQuote = quotesData[Math.floor(Math.random() * quotesData.length)];
    const imagePath = path.resolve('public', 'remember.jpg');
    const attachment = new AttachmentBuilder(imagePath);
    
    const embed = new EmbedBuilder()
    .setColor(`#a306b6`)
    .setTitle(`Chicken Quote   🐔`)
    .setDescription(randomQuote)
    .setThumbnail('attachment://remember.jpg')


    await interaction.reply({
        embeds: [embed],
        files: [attachment]});
};
