import "dotenv/config"

const conferenceIds = process.env.CONFERENCE_ID.split('||').map(id => id.trim());

export default function autoSpeak(bot) {
    bot.on('voiceStateUpdate', (oldState, newState) => {
        try {
            if (oldState.channelId !== newState.channelId || oldState.requestToSpeakTimestamp !== newState.requestToSpeakTimestamp) {
                const channel = newState.channel;

                if (channel && conferenceIds.includes(channel.id)) {
                    const member = newState.member;

                    if (member && newState.requestToSpeakTimestamp) {
                        channel.permissionOverwrites.create(member, {
                            SPEAK: true
                        })
                        .then(() => {
                            console.log(`Granted speak permission to ${member.user.tag} in ${channel.name}`);
                        })
                        .catch(console.error);
                    }
                }
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'état vocal:', error);
        }
    });
}