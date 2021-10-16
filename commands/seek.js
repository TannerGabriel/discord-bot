const {GuildMember} = require('discord.js');

module.exports = {
  name: 'seek',
  description: 'Seek the song to the given time!',
  options: [
    {
      name: 'time',
      type: 4, // 'NUMBER' Type
      description: 'The time in ms you want to seek to.',
      required: true,
    },
  ],
  async execute(interaction, player) {
    try {
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

      const time = interaction.options.get('time').value;

      const success = await queue.seek(time * 1000);

      return void interaction.followUp({
        content: success ? `⏱ | Successfully seeked the song to ${time}` : '❌ | Something went wrong!',
      });
    } catch (error) {
      console.log(error);
      interaction.followUp({
        content: 'There was an error trying to execute that command: ' + error.message,
      });
    }
  },
};
