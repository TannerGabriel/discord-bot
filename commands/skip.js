const {GuildMember} = require('discord.js')
const {useQueue} = require('discord-player')
const {isInVoiceChannel} = require("../utils/voicechannel");

module.exports = {
    name: 'skip',
    description: 'Skip a song!',
    async execute(interaction) {
        const inVoiceChannel = isInVoiceChannel(interaction)
        if (!inVoiceChannel) {
            return
        }

        await interaction.deferReply();

        const queue = useQueue(interaction.guild.id)
        if (!queue || !queue.currentTrack) return void interaction.followUp({content: '❌ | No music is being played!'});
        const currentTrack = queue.currentTrack;

        const success = queue.node.skip()
        return void interaction.followUp({
            content: success ? `✅ | Skipped **${currentTrack}**!` : '❌ | Something went wrong!',
        });
    },
};
