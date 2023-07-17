const {GuildMember} = require('discord.js');
const {useQueue} = require("discord-player");

module.exports = {
  name: 'shuffle',
  description: 'shuffle the queue!',
  async execute(interaction, player) {
    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
      return void interaction.reply({
        content: 'You are not in a voice channel!',
        ephemeral: true,
      });
    }

    if (
      interaction.guild.members.me.voice.channelId &&
      interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId
    ) {
      return void interaction.reply({
        content: 'You are not in my voice channel!',
        ephemeral: true,
      });
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
