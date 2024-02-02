import { useQueue } from 'discord-player';
import { isInVoiceChannel } from '../utils/voicechannel';

export const name = 'pause';
export const description = 'Pause current song!';
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
  const success = queue.node.pause();
  return void interaction.followUp({
    content: success ? '⏸ | Paused!' : '❌ | Something went wrong!'
  });
}
