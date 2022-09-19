const {GuildMember, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  name: 'volume',
  description: 'Change the volume!',
  options: [
    {
      name: 'volume',
      type: ApplicationCommandOptionType.Integer,
      description: 'Number between 0-200',
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
    if (!queue || !queue.playing)
      return void interaction.followUp({
        content: '❌ | No music is being played!',
      });

    var volume = interaction.options.getInteger('volume');
    volume = Math.max(0, volume);
    volume = Math.min(200, volume);
    const success = queue.setVolume(volume);

    return void interaction.followUp({
      content: success ? `🔊 | Volume set to ${volume}!` : '❌ | Something went wrong!',
    });
  },
};
