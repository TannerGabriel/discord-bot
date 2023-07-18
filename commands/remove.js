const {GuildMember, ApplicationCommandOptionType } = require('discord.js');
const {useQueue} = require("discord-player");
const {isInVoiceChannel} = require("../utils/voicechannel");

module.exports = {
  name: 'remove',
  description: 'remove a song from the queue!',
  options: [
    {
      name: 'number',
      type: ApplicationCommandOptionType.Integer,
      description: 'The queue number you want to remove',
      required: true,
    },
  ],
  async execute(interaction) {
    const inVoiceChannel = isInVoiceChannel(interaction)
    if (!inVoiceChannel) {
        return
    }

    await interaction.deferReply();
    const queue = useQueue(interaction.guild.id);
    if (!queue || !queue.currentTrack) return void interaction.followUp({content: '❌ | No music is being played!'});
    const number = interaction.options.getInteger('number') - 1;
    if (number > queue.tracks.size)
      return void interaction.followUp({content: '❌ | Track number greater than queue depth!'});
    const removedTrack = queue.node.remove(number);
    return void interaction.followUp({
      content: removedTrack ? `✅ | Removed **${removedTrack}**!` : '❌ | Something went wrong!',
    });
  },
};
