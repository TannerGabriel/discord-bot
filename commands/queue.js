const {GuildMember} = require('discord.js');
const {useQueue} = require("discord-player");
const {isInVoiceChannel} = require("../utils/voicechannel");

module.exports = {
    name: 'queue',
    description: 'View the queue of current songs!',
    async execute(interaction) {
        const inVoiceChannel = isInVoiceChannel(interaction)
        if (!inVoiceChannel) {
            return
        }

        const queue = useQueue(interaction.guild.id)
        if (queue != null) {
            const trimString = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);
            
            let queueStr = `🎶 |  **Upcoming Songs:**\n`

            // Build queue list
            queue.tracks.data.forEach((track, index) => {
            queueStr += `${index + 1}. ${track.title} - ${track.author}\n`;
            });

            return void interaction.reply({
                embeds: [
                    {
                        title: `Now Playing 🎶 |  **${queue.currentTrack.title}**`,
                        description: trimString(queueStr, 4095),
                    }
                ]
            })
        } else {
            return void interaction.reply({
                content: 'There are no songs in the queue!'
            })
        }
    }
}
