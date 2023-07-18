const {GuildMember} = require('discord.js');
const {useQueue} = require("discord-player");
const {isInVoiceChannel} = require("../utils/voicechannel");

module.exports = {
    name: 'nowplaying',
    description: 'Get the song that is currently playing.',
    async execute(interaction) {
        const inVoiceChannel = isInVoiceChannel(interaction)
        if (!inVoiceChannel) {
            return
        }

        await interaction.deferReply();
        const queue = useQueue(interaction.guild.id)
        if (!queue || !queue.currentTrack)
            return void interaction.followUp({
                content: '❌ | No music is being played!',
            });
        const progress = queue.node.createProgressBar()
        const perc = queue.node.getTimestamp();

        return void interaction.followUp({
            embeds: [
                {
                    title: 'Now Playing',
                    description: `🎶 | **${queue.currentTrack.title}**! (\`${perc.progress}%\`)`,
                    fields: [
                        {
                            name: '\u200b',
                            value: progress,
                        },
                    ],
                    color: 0xffffff,
                },
            ],
        });
    },
};
