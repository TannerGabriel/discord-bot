const {GuildMember} = require('discord.js');

module.exports = {

    name: 'queue',
    description: 'View the queue of current songs!',

    async execute (interaction, player) {

        if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
            return void interaction.reply({
              content: 'You are not in a voice channel!',
              ephemeral: true,
            });
          }
    
          if (
            interaction.guild.members.me.voice.channelId &&
            interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId
          ) {
            return void interaction.reply({
              content: 'You are not in my voice channel!',
              ephemeral: true,
            });
          }
          var queue = player.getQueue(interaction.guildId);
          if (typeof(queue) != 'undefined') {
            trimString = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);
              return void interaction.reply({
                embeds: [
                  {
                    title: 'Now Playing',
                    description: trimString(`The Current song playing is 🎶 | **${queue.current.title}**! \n 🎶 | ${queue}! `, 4095),
                  }
                ]
              })
          } else {
            return void interaction.reply({
              content: 'There is no song in the queue!'
            })
          }
    }
}
