const {GuildMember} = require('discord.js');

module.exports = {
  name: 'move',
  description: 'move song position in the queue!',
  options: [
    {
      name: 'track',
      type: 4, // 'INTEGER' Type
      description: 'The track number you want to move',
      required: true,
    },
    {
      name: 'position',
      type: 4, // 'INTEGER' Type
      description: 'The position to move it to',
      required: true,
    },
  ],
  async execute(interaction, player) {
    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
      return void interaction.reply({
        content: 'You are not in a voice channel!',
        ephemeral: true,
      });
    }

    if (
      interaction.guild.me.voice.channelId &&
      interaction.member.voice.channelId !== interaction.guild.me.voice.channelId
    ) {
      return void interaction.reply({
        content: 'You are not in my voice channel!',
        ephemeral: true,
      });
    }

    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return void interaction.followUp({content: '❌ | No music is being played!'});
    const queueNumbers = [interaction.options.get('track').value - 1, interaction.options.get('position').value - 1];
    if (queueNumbers[0] > queue.tracks.length || queueNumbers[1] > queue.tracks.length)
      return void interaction.followUp({content: '❌ | Track number greater than queue depth!'});

    try {
      const track = queue.remove(queueNumbers[0]);
      queue.insert(track, queueNumbers[1]);
      return void interaction.followUp({
        content: `✅ | Moved **${track}**!`,
      });
    } catch (error) {
      console.log(error);
      return void interaction.followUp({
        content: '❌ | Something went wrong!',
      });
    }
  },
};
