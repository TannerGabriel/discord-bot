const {GuildMember, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  name: 'swap',
  description: 'swap song positions in the queue!',
  options: [
    {
      name: 'track1',
      type: ApplicationCommandOptionType.Integer,
      description: 'The track number you want to swap',
      required: true,
    },
    {
      name: 'track2',
      type: ApplicationCommandOptionType.Integer,
      description: 'The track number you want to swap',
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
      interaction.guild.members.me.voice.channelId &&
      interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId
    ) {
      return void interaction.reply({
        content: 'You are not in my voice channel!',
        ephemeral: true,
      });
    }

    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return void interaction.followUp({content: '❌ | No music is being played!'});
    const queueNumbers = [interaction.options.getInteger('track1') - 1, interaction.options.getInteger('track2') - 1];
    // Sort so the lowest number is first for swap logic to work
    queueNumbers.sort(function (a, b) {
      return a - b;
    });
    if (queueNumbers[1] > queue.tracks.length)
      return void interaction.followUp({content: '❌ | Track number greater than queue depth!'});

    try {
      const track2 = queue.remove(queueNumbers[1]); // Remove higher track first to avoid list order issues
      const track1 = queue.remove(queueNumbers[0]);
      queue.insert(track2, queueNumbers[0]); // Add track in lowest position first to avoid list order issues
      queue.insert(track1, queueNumbers[1]);
      return void interaction.followUp({
        content: `✅ | Swapped **${track1}** & **${track2}**!`,
      });
    } catch (error) {
      console.log(error);
      return void interaction.followUp({
        content: '❌ | Something went wrong!',
      });
    }
  },
};
