import { QueueRepeatMode, useQueue } from 'discord-player';
import { isInVoiceChannel } from '../utils/voicechannel.js';
import { ApplicationCommandOptionType } from 'discord.js';

export const name = 'loop';
export const description = 'Sets loop mode';
export const options = [
  {
    name: 'mode',
    type: ApplicationCommandOptionType.Integer,
    description: 'Loop type',
    required: true,
    choices: [
      {
        name: 'Off',
        value: QueueRepeatMode.OFF
      },
      {
        name: 'Track',
        value: QueueRepeatMode.TRACK
      },
      {
        name: 'Queue',
        value: QueueRepeatMode.QUEUE
      },
      {
        name: 'Autoplay',
        value: QueueRepeatMode.AUTOPLAY
      }
    ]
  }
];
export async function execute(interaction: any) {
  try {
    const inVoiceChannel = isInVoiceChannel(interaction);
    if (!inVoiceChannel) {
      return;
    }

    await interaction.deferReply();

    const queue = useQueue(interaction.guild.id);
    if (!queue || !queue.currentTrack) {
      return void interaction.followUp({
        content: '❌ | No music is being played!'
      });
    }

    const loopMode = interaction.options.getInteger('mode');
    queue.setRepeatMode(loopMode);
    const mode =
      loopMode === QueueRepeatMode.TRACK
        ? '🔂'
        : loopMode === QueueRepeatMode.QUEUE
        ? '🔁'
        : '▶';

    return void interaction.followUp({
      content: `${mode} | Updated loop mode!`
    });
  } catch (error: any) {
    console.log(error);
    return void interaction.followUp({
      content:
        'There was an error trying to execute that command: ' + error.message
    });
  }
}
