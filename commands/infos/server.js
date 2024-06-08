import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('server')
    .setDescription('Fournit des informations sur le serveur.');


export const infos = true

export const execute = async (interaction) => {
    try {
        const server = interaction.guild;


        const createdAt = server.createdAt.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        const bannerURL = server.bannerURL({ format: 'png', dynamic: true, size: 1024 });
        let bannerStatus;
        if (bannerURL) {
            bannerStatus = `🖼️ Oui, admirez cette belle bannière de poulet !`;
        } else {
            bannerStatus = `🖼️ Non, aucune bannière ici.`;
        }

        const embed = new EmbedBuilder()
            .setColor('#a306b6')
            .setTitle(`Rapport d'enquête sur le poulailler ${server.name}  🔍`)
            .setThumbnail(server.iconURL({ dynamic: true }))
            .addFields(
                { name: `Nom du poulailler`, value: server.name, inline: false },
                { name: `Nombre de poulets`, value: `${server.memberCount}`, inline: true },
                { name: `Date de création`, value: createdAt, inline: false },
                { name: `Poulet suprême`, value: `<@${server.ownerId}>`, inline: false },
                { name: `Bannière`, value: bannerStatus, inline: false }
            )
            .setFooter({
                text: `Affaire classée par ${interaction.user.globalName} 🕵️‍♂️🐔`,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            });

        await interaction.reply({ embeds: [embed] });
    } catch (error) {
        console.error('Erreur lors de l\'exécution de la commande:', error);
        await interaction.reply({ content: `🕒 Délai dépassé pour cette commande, réessaie dans quelques minutes. En attendant, retourne picorer des graines ! 🌾🐔`, ephemeral: true });
    }
}
