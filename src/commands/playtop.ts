import { ApplicationCommandOptionType } from 'discord.js';
import { QueryType, useQueue, useMainPlayer } from 'discord-player';
import { isInVoiceChannel } from '../utils/voicechannel';

export const name = 'playtop';
export const description = 'Play a song before the next in your channel!';
export const options = [
  {
    name: 'query',
    type: ApplicationCommandOptionType.String,
    description: 'The song you want to play',
    required: true
  }
];
export async function execute(interaction: any) {
  try {
    const inVoiceChannel = isInVoiceChannel(interaction);
    if (!inVoiceChannel) {
      return;
    }

    await interaction.deferReply();

    const player = useMainPlayer();
    const query = interaction.options.getString('query');
    const searchResult = await player
      ?.search(query, {
        requestedBy: interaction.user,
        searchEngine: QueryType.AUTO
      })
      .catch(() => {});
    if (!searchResult || !searchResult.tracks.length)
      return void interaction.followUp({ content: 'No results were found!' });

    const queue = useQueue(interaction.guild.id);

    try {
      if (!queue?.connection)
        await queue?.connect(interaction.member.voice.channel);
    } catch {
      return void interaction.followUp({
        content: 'Could not join your voice channel!'
      });
    }

    await interaction.followUp({
      content: `⏱ | Loading your ${
        searchResult.playlist ? 'playlist' : 'track'
      }...`
    });
    searchResult.playlist
      ? queue?.node.insert(searchResult.tracks[0], 0) // TODO: handle playlists
      : queue?.node.insert(searchResult.tracks[0], 0);
    if (!queue?.currentTrack) await player?.play(); // TODO: check this out
  } catch (error: any) {
    console.log(error);
    await interaction.followUp({
      content:
        'There was an error trying to execute that command: ' + error.message
    });
  }
}
