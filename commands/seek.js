const {GuildMember} = require('discord.js');

module.exports = {
  name: 'seek',
  description: 'Seek to a position on the current song!',
  options: [
    {
      name: 'time',
      type: 3, // 'STRING' Type
      description: 'Position you want to seek to in mm:ss format',
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
    if (!queue || !queue.playing)
      return void interaction.followUp({
        content: '❌ | No music is being played!',
      });

    const time = interaction.options.get('time').value;

    // convert hour:minute:second format into ms
    const hms = time.split(':');
    if (hms.length < 2) hms.unshift(0); // no minute; set to 0
    if (hms.length < 3) hms.unshift(0); // no hour; set to 0
    const ms = (parseInt(hms[0]) * 3600000) + (parseInt(hms[1]) * 60000) + (parseInt(hms[2]) * 1000);

    const success = queue.seek(ms);

    // if (!queue.playing) await queue.play();
    // sometimes the queue will not play for several moments...
    // presumubly this is until the song is done loading until that point, so this is more noticable on lengthier songs.

    return void interaction.followUp({
      content: success ? `⏩ | Seeking to ${time}!` : '❌ | Something went wrong!',
    });
  },
};
