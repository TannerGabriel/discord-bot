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
            interaction.guild.me.voice.channelId &&
            interaction.member.voice.channelId !== interaction.guild.me.voice.channelId
          ) {
            return void interaction.reply({
              content: 'You are not in my voice channel!',
              ephemeral: true,
            });
          }
        else {
            var queue = player.getQueue(interaction.guildId);
            if (typeof(queue) != 'undefined') {
              return void interaction.reply({
                embeds: [
                    {
                        title: 'Now Playing',
                        description: `The Current song playing is 🎶 | **${queue.current.title}**! \n 🎶 | **${queue}**! `,
                    }
                ] 
            })
            } else {
              return void interaction.reply({
                content: 'There are no song in the queue! use /play to add some songs and get listening!'
              })
            }
            
        }
    }
}
