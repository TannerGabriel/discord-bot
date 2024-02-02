import { useQueue } from 'discord-player';
import { isInVoiceChannel } from '../utils/voicechannel';

export const name = 'resume';
export const description = 'Resume current song!';
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
  const success = queue.node.resume();
  return void interaction.followUp({
    content: success ? '▶ | Resumed!' : '❌ | Something went wrong!'
  });
}
