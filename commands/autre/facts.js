import { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } from 'discord.js';
import funFactsAboutChickens from "../../datas/funFacts.js"
import path from 'path'


export const data = new SlashCommandBuilder()
.setName('chickenfact')
.setDescription('Fournit un fait sur les poulets...')

export const autre = true

export const execute = async (interaction) => {
    const randomFact = funFactsAboutChickens[Math.floor(Math.random() * funFactsAboutChickens.length)];
    const imagePath = path.resolve('public', 'poulet.jpg');
    const attachment = new AttachmentBuilder(imagePath);
    
    const embed = new EmbedBuilder()
    .setColor(`#a306b6`)
    .setTitle(`Chicken Facts   🐔`)
    .setDescription(randomFact)
    .setThumbnail('attachment://poulet.jpg')


    await interaction.reply({
        embeds: [embed],
        files: [attachment]});
};
