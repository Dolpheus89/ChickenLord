import { SlashCommandBuilder } from 'discord.js';
import "dotenv/config"

export const data = new SlashCommandBuilder()
    .setName('solo')
    .setDescription('Déplace les utilisateurs seuls dans un canal vocal');

export const admin = true;  
export const moderation = true

export const execute = async (interaction) => {
    await interaction.deferReply({ ephemeral: true });
    const guild = interaction.guild;
    await guild.channels.fetch();

    const admin = process.env.ADMIN_ROLE

    let voiceChannels = guild.channels.cache.filter(channel => channel.type === 2);
    let movedMembers = 0;
    let isAdmin = interaction.member.roles.cache.find(r => r.name === admin)

    if (!isAdmin) {
        await interaction.reply({ content: `Oops! Il te faut le rôle ${admin} pour utiliser cette commande. Retourne dans le poulailler! 🐔`, ephemeral: true });
        return;
    }

    for (const [, voiceChannel] of voiceChannels) {
   
        if (voiceChannel.members.size === 1) {
            const member = voiceChannel.members.first();
            const targetChannel = voiceChannels.find(ch => ch.members.size > 1);
            if (targetChannel) {
                await member.voice.setChannel(targetChannel);
                movedMembers++;     
            }
        }
    }
    
    return interaction.editReply({ content: `${movedMembers} utilisateur(s) seul(s) ont été déplacé(s).`, ephemeral: true });
};
