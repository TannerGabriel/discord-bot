const {GuildMember} = require('discord.js');
const {useQueue} = require("discord-player");

module.exports = {
  name: 'resume',
  description: 'Resume current song!',
  async execute(interaction) {
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
    if (!queue || !queue.currentTrack)
      return void interaction.followUp({
        content: '❌ | No music is being played!',
      });
    const success = queue.node.resume()
    return void interaction.followUp({
      content: success ? '▶ | Resumed!' : '❌ | Something went wrong!',
    });
  },
};
