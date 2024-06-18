import { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } from 'discord.js';
import fs from 'fs';

const pathToFamily = "./datas/family.json";
const familyData = JSON.parse(fs.readFileSync(pathToFamily, 'utf8'));

export const data = new SlashCommandBuilder()
    .setName(`family`)
    .setDescription(`Envoie une photo d'un membre de ma famille poulet !`);

export const infos = true;

export const execute = async (interaction) => {
    const randomIndex = Math.floor(Math.random() * familyData.family_members.length);
    const familyMember = familyData.family_members[randomIndex];

    const imagePath = fs.readFileSync(`./public/family/${familyMember.image_url}`);
    const attachment = new AttachmentBuilder(imagePath);

    const embed = new EmbedBuilder()
        .setColor(`#a306b6`)
        .setTitle(`Rencontrez ${familyMember.name} ! 🐔`)
        .setDescription(familyMember.description)
        .setFooter({
            text: `Photo de poulet envoyée par ${interaction.user.username}`,
            iconURL: interaction.user.displayAvatarURL({ dynamic: true })
        });

    await interaction.reply({ embeds: [embed], files: [attachment] });
};
