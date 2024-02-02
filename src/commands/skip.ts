import { useQueue } from 'discord-player';
import { isInVoiceChannel } from '../utils/voicechannel';

export const name = 'skip';
export const description = 'Skip a song!';
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
  const currentTrack = queue.currentTrack;

  const success = queue.node.skip();
  return void interaction.followUp({
    content: success
      ? `✅ | Skipped **${currentTrack}**!`
      : '❌ | Something went wrong!'
  });
}
