import { useQueue } from 'discord-player';
import { isInVoiceChannel } from '../utils/voicechannel';

export const name = 'queue';
export const description = 'View the queue of current songs!';
export async function execute(interaction: any) {
  const inVoiceChannel = isInVoiceChannel(interaction);
  if (!inVoiceChannel) {
    return;
  }

  const queue = useQueue(interaction.guild.id);
  if (typeof queue != 'undefined') {
    const trimString = (str: string, max: number) =>
      str.length > max ? `${str.slice(0, max - 3)}...` : str;
    return void interaction.reply({
      embeds: [
        {
          title: 'Now Playing',
          description: trimString(
            `The Current song playing is 🎶 | **${queue?.currentTrack?.title}**! \n 🎶 | ${queue}! `,
            4095
          )
        }
      ]
    });
  } else {
    return void interaction.reply({
      content: 'There is no song in the queue!'
    });
  }
}
