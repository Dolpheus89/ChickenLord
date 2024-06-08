import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import "dotenv/config"

export const data = new SlashCommandBuilder()
    .setName('alert')
    .setDescription('envoie de message a tout les wilders')
    .addStringOption(option =>
        option.setName('message')
          .setDescription('Message à faire passer')
          .setRequired(true)
      );

export const admin = true;
export const utile = true

export const execute = async (interaction) => {
    const roleName = process.env.STUDENT_ROLE;
    const admin = process.env.ADMIN_ROLE
    const categoryName = '▬┃WILDCODESCHOOL┃▬';
    const channelName = '┏📝┓ᴛᴀʙʟᴇᴀᴜ';  

    const category = interaction.guild.channels.cache.find(channel => channel.type === 4 && channel.name === categoryName);
    if (!category) {
        return interaction.reply({ content: `La catégorie "${categoryName}" n'a pas été trouvée.`, ephemeral: true });
    }

    const tableauChannel = interaction.guild.channels.cache.find(channel => channel.parentId === category.id && channel.type === 0 && channel.name === channelName);
    if (!tableauChannel) {
        return interaction.reply({ content: `Le canal "${channelName}" n'a pas été trouvé dans la catégorie "${categoryName}".`, ephemeral: true });
    }

    let role = interaction.guild.roles.cache.find(r => r.name === roleName);
    let isAdmin = interaction.member.roles.cache.find(r => r.name === admin)

    if (!isAdmin) {
        await interaction.reply({ content: `Oops! Il te faut le rôle ${admin} pour utiliser cette commande. Retourne dans le poulailler! 🐔`, ephemeral: true });
        return;
    }
    
    const message = interaction.options.getString('message');
    const alertMessage = `${role.toString()} ${message}`


    if (!tableauChannel) {
        return interaction.reply({ content: 'Canal non trouvé.', ephemeral: true });
    }

    const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setTitle(`🚨 Alerte `)
        .setDescription(alertMessage)

    await interaction.deferReply({ ephemeral: true });

    await tableauChannel.send({embeds: [embed] });

    await interaction.editReply({ content: 'Alerte envoyée avec succès!' });
};
