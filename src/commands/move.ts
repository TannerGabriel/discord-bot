import { Track, useQueue } from 'discord-player';
import { isInVoiceChannel } from '../utils/voicechannel';
import { ApplicationCommandOptionType } from 'discord.js';

export const name = 'move';
export const description = 'move song position in the queue!';
export const options = [
  {
    name: 'track',
    type: ApplicationCommandOptionType.Integer,
    description: 'The track number you want to move',
    required: true
  },
  {
    name: 'position',
    type: ApplicationCommandOptionType.Integer,
    description: 'The position to move it to',
    required: true
  }
];
export async function execute(interaction: any) {
  const inVoiceChannel = isInVoiceChannel(interaction);
  if (!inVoiceChannel) {
    return;
  }

  await interaction.deferReply();
  const queue = useQueue(interaction.guild.id);

  if (!queue || !queue.currentTrack)
    return void interaction.followUp({
      content: '❌ | No music is being played!'
    });

  const queueNumbers = [
    interaction.options.getInteger('track') - 1,
    interaction.options.getInteger('position') - 1
  ];

  if (
    queueNumbers[0] > queue.tracks.size ||
    queueNumbers[1] > queue.tracks.size
  )
    return void interaction.followUp({
      content: '❌ | Track number greater than queue depth!'
    });

  try {
    const track: Track<unknown> | null = queue.node.remove(queueNumbers[0]);
    if (!track)
      return void interaction.followUp({ content: '❌ | Track not found!' });
    queue.node.insert(track, queueNumbers[1]);
    return void interaction.followUp({
      content: `✅ | Moved **${track}**!`
    });
  } catch (error) {
    console.log(error);
    return void interaction.followUp({
      content: '❌ | Something went wrong!'
    });
  }
}
