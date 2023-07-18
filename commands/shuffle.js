const {GuildMember} = require('discord.js');
const {useQueue} = require("discord-player");
const {isInVoiceChannel} = require("../utils/voicechannel");

module.exports = {
    name: 'shuffle',
    description: 'shuffle the queue!',
    async execute(interaction) {
        const inVoiceChannel = isInVoiceChannel(interaction)
        if (!inVoiceChannel) {
            return
        }

        await interaction.deferReply();
        const queue = useQueue(interaction.guild.id)
        if (!queue || !queue.currentTrack) return void interaction.followUp({content: '❌ | No music is being played!'});
        try {
            queue.tracks.shuffle();
            const trimString = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);
            return void interaction.followUp({
                embeds: [
                    {
                        title: 'Now Playing',
                        description: trimString(
                            `The Current song playing is 🎶 | **${queue.currentTrack.title}**! \n 🎶 | ${queue}! `,
                            4095,
                        ),
                    },
                ],
            });
        } catch (error) {
            console.log(error);
            return void interaction.followUp({
                content: '❌ | Something went wrong!',
            });
        }
    },
};
