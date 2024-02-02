import { ApplicationCommandOptionType } from 'discord.js';
import { Track, useQueue } from 'discord-player';
import { isInVoiceChannel } from '../utils/voicechannel';

export const name = 'swap';
export const description = 'swap song positions in the queue!';
export const options = [
  {
    name: 'track1',
    type: ApplicationCommandOptionType.Integer,
    description: 'The track number you want to swap',
    required: true
  },
  {
    name: 'track2',
    type: ApplicationCommandOptionType.Integer,
    description: 'The track number you want to swap',
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
    interaction.options.getInteger('track1') - 1,
    interaction.options.getInteger('track2') - 1
  ];
  // Sort so the lowest number is first for swap logic to work
  queueNumbers.sort(function (a, b) {
    return a - b;
  });
  if (queueNumbers[1] > queue.getSize())
    return void interaction.followUp({
      content: '❌ | Track number greater than queue depth!'
    });

  try {
    const track2 = queue.node.remove(queueNumbers[1]); // Remove higher track first to avoid list order issues
    if (track2) {
      queue.node.insert(track2, queueNumbers[0]);
    }
    const track1 = queue.node.remove(queueNumbers[0]);
    if (track1) {
      queue.node.insert(track1, queueNumbers[1]);
    }
    return void interaction.followUp({
      content: `✅ | Swapped **${track1}** & **${track2}**!`
    });
  } catch (error) {
    console.log(error);
    return void interaction.followUp({
      content: '❌ | Something went wrong!'
    });
  }
}
