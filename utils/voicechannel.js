const {GuildMember} = require("discord.js");

const isInVoiceChannel = (interaction) => {
    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
       interaction.reply({
            content: 'You are not in a voice channel!',
            ephemeral: true,
       });
       return false;
    }

    if (
        interaction.guild.members.me.voice.channelId &&
        interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId
    ) {
        interaction.reply({
            content: 'You are not in my voice channel!',
            ephemeral: true,
        });
        return false;
    }

    return true;
}

exports.isInVoiceChannel = isInVoiceChannel;