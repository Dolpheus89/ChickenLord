import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName(`user`)
    .setDescription(`Provides information about the user.`)
    .addUserOption(option => 
        option.setName("target")
        .setDescription("user infos")
        .setRequired(true)
    )

    export const execute = async (interaction) => {
        const targetUser = interaction.options.getUser(`target`);
        const targetMember = interaction.guild.members.cache.get(targetUser.id);

        let humanCheck;
        if (targetUser.username === `ChickenLord` || targetUser.username === `miyadil`) {
            humanCheck = `🐔 C'est un poulet!`;
        } else {
            humanCheck = targetUser.bot ? `🤖 Non, c'est un bot!` : `🧑 Absolument un humain!`;
        }
    
        const embed = new EmbedBuilder()
            .setColor(`#a306b6`)
            .setTitle(`Rapport d'enquête sur ${targetUser.globalName || targetUser.username}  🔍`)
            .setThumbnail(targetUser.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: `Nom d'utilisateur`, value: targetUser.username, inline: false },
                { name: `A rejoint le serveur le :`, value: targetMember.joinedAt.toLocaleString(), inline: false },
                { name: `Tag Discord`, value: targetUser.tag, inline: true },
                { name: `\u200B`, value: `\u200B`, inline: true },
                { name: `Humain ?`, value: humanCheck, inline: true }
            )
            .setFooter({
                text: `Affaire classée par ${interaction.user.globalName} 🕵️‍♂️`,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            });
            
    
        await interaction.reply({ embeds: [embed] });

    }