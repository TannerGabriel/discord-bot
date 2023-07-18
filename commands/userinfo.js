const {ApplicationCommandOptionType} = require('discord.js');

module.exports = {
    name: 'userinfo',
    description: 'Get information about a user.',
    options: [
        {
            name: 'user',
            type: ApplicationCommandOptionType.User,
            description: 'The user you want to get info about',
            required: true,
        },
    ],
    execute(interaction, client) {
        const user = interaction.options.getUser('user');

        interaction.reply({
            content: `Name: ${user.username}, ID: ${user.id}, Avatar: ${user.displayAvatarURL({dynamic: true})}`,
            ephemeral: true,
        });
    },
};
