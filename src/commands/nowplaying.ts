import { useQueue } from 'discord-player';
import { isInVoiceChannel } from '../utils/voicechannel';

export const name = 'nowplaying';
export const description = 'Get the song that is currently playing.';
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
  const progress = queue.node.createProgressBar();
  const perc = queue.node.getTimestamp();

  return void interaction.followUp({
    embeds: [
      {
        title: 'Now Playing',
        description: `🎶 | **${queue.currentTrack.title}**! (\`${
          perc?.progress ?? '0'
        }%\`)`,
        fields: [
          {
            name: '\u200b',
            value: progress
          }
        ],
        color: 0xffffff
      }
    ]
  });
}
