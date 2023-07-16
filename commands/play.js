const {GuildMember, ApplicationCommandOptionType } = require('discord.js');
const {QueryType, useMainPlayer} = require('discord-player');

module.exports = {
  name: 'play',
  description: 'Play a song in your channel!',
  options: [
    {
      name: 'query',
      type: ApplicationCommandOptionType.String,
      description: 'The song you want to play',
      required: true,
    },
  ],
  async execute(interaction, player1) {
    try {
      const channel = interaction.member.voice.channel;

      const player = useMainPlayer()

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

      const query = interaction.options.getString('query');
      const searchResult = await player.search(query)
      if (!searchResult || !searchResult.tracks.length)
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
					defaultFFmpegFilters: ['lofi', 'bassboost', 'normalizer']
				}
			});

			return interaction.editReply({
				content: `${this.container.client.dev.success} | Successfully enqueued${
					res.track.playlist ? ` **track(s)** from: **${res.track.playlist.title}**` : `: **${res.track.title}**`
				}`
			});
		} catch (error) {
			//await interaction.editReply({ content: `${this.container.client.dev.error} | An **error** has occurred` });
			return console.log(error);
		}

      /*const queue = player?.queues.create(interaction.guild.id, {
        metadata: {
          channel: interaction.channel,
          client: interaction.guild?.members.me
        },
        leaveOnEmptyCooldown: 300000,
        leaveOnEmpty: true,
        leaveOnEnd: false,
        bufferingTimeout: 0,
        volume: 10,
        defaultFFmpegFilters: ['lofi', 'bassboost', 'normalizer'],
        ytdlOptions: {
          quality: "highest",
          filter: "audioonly",
          highWaterMark: 1 << 30,
          dlChunkSize: 0,
        },
      });*/


      /*try {
        if (!queue.connection) await queue.connect(interaction.member.voice.channel);
      } catch {
        queue.delete();
        return void interaction.followUp({
          content: 'Could not join your voice channel!',
        });
      }

      await interaction.followUp({
        content: `⏱ | Loading your ${searchResult.playlist ? 'playlist' : 'track'}...`,
      });
      searchResult.playlist ? queue.addTrack(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);
      if (!queue.playing) await queue.node.play();*/
    } catch (error) {
      console.log(error);
      await interaction.followUp({
        content: 'There was an error trying to execute that command: ' + error.message,
      });
    }
  },
};
