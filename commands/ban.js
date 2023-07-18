const {ApplicationCommandOptionType} = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Ban a player',
    options: [
        {
            name: 'user',
            type: ApplicationCommandOptionType.User,
            description: 'The user you want to ban',
            required: true,
        },
    ],
    execute(interaction, client) {
        const member = interaction.options.getUser('user');

        if (!member) {
            return interaction.reply('You need to mention the member you want to ban him');
        }

        if (!interaction.member.permissions.has('BAN_MEMBERS')) {
            return interaction.reply("I can't ban this user.");
        }

        const userinfo = client.users.cache.getMember(member);

        return interaction.guild.members
            .ban(member)
            .then(() => {
                interaction.reply({
                    content: `${userinfo.username} was banned.`,
                    ephemeral: true,
                });
            })
            .catch(error =>
                interaction.reply({
                    content: `Sorry, an error occured.`,
                    ephemeral: true,
                }),
            );
    },
};
