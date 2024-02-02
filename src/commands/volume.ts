import { ApplicationCommandOptionType } from 'discord.js';
import { useQueue } from 'discord-player';
import { isInVoiceChannel } from '../utils/voicechannel';

export const name = 'volume';
export const description = 'Change the volume!';
export const options = [
  {
    name: 'volume',
    type: ApplicationCommandOptionType.Integer,
    description: 'Number between 0-200',
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

  let volume = interaction.options.getInteger('volume');
  volume = Math.max(0, volume);
  volume = Math.min(200, volume);
  const success = queue.node.setVolume(volume);

  return void interaction.followUp({
    content: success
      ? `🔊 | Volume set to ${volume}!`
      : '❌ | Something went wrong!'
  });
}
