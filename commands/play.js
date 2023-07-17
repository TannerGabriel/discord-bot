const {GuildMember, ApplicationCommandOptionType } = require('discord.js');
const {QueryType, useMainPlayer} = require('discord-player');

module.exports = {
  name: 'play',
  description: 'Play a song in your channel!',
  options: [
    {
      name: 'query',
      type: ApplicationCommandOptionType.STRING_TYPE,
      description: 'The song you want to play',
      required: true,
    },
  ],
  async execute(interaction) {
    try {
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

      const player = useMainPlayer()
      const query = interaction.options.getString('query');
      const searchResult = await player.search(query)
      if (!searchResult.hasTracks())
        return void interaction.followUp({content: 'No results were found!'});

      try {
			const res = await player.play(interaction.member.voice.channel.id, searchResult, {
				nodeOptions: {
					metadata: {
						channel: interaction.channel,
						client: interaction.guild?.members.me,
						requestedBy: interaction.user.username
					},
					leaveOnEmptyCooldown: 300000,
					leaveOnEmpty: true,
					leaveOnEnd: false,
					bufferingTimeout: 0,
					volume: 10,
					//defaultFFmpegFilters: ['lofi', 'bassboost', 'normalizer']
				}
			});

			await interaction.followUp({
                content: `⏱ | Loading your ${searchResult.playlist ? 'playlist' : 'track'}...`,
            });
		} catch (error) {
            await interaction.editReply({
                content: 'An error has occurred!'
            })
			return console.log(error);
		}
    } catch (error) {
      await interaction.reply({
        content: 'There was an error trying to execute that command: ' + error.message,
      });
    }
  },
};
