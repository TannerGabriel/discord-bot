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
        if (typeof (queue) != 'undefined') {
            const trimString = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);
            return void interaction.reply({
                embeds: [
                    {
                        title: 'Now Playing',
                        description: trimString(`The Current song playing is 🎶 | **${queue.currentTrack.title}**! \n 🎶 | ${queue}! `, 4095),
                    }
                ]
            })
        } else {
            return void interaction.reply({
                content: 'There is no song in the queue!'
            })
        }
    }
}
