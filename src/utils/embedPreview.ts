import { EmbedBuilder } from 'discord.js';

export default function customPreview(title: string, songTitle: any) {
  return new EmbedBuilder()
    .setColor(0xb791cf)
    .setTitle(title)
    .setDescription(`🎶 | Song **${songTitle}** added to the queue!`)
    .setTimestamp();
}
