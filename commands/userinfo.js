module.exports = {
  name: 'userinfo',
  description: 'Get information about a user.',
  options: [
    {
      name: 'user',
      type: 6, //USER TYPE
      description: 'The user you want to get info about',
      required: true,
    },
  ],
  execute(interaction, client) {
    const member = interaction.options.get('user').value;
    const user = client.users.cache.get(member);

    interaction.reply({
      content: `Name: ${user.username}, ID: ${user.id}, Avatar: ${user.displayAvatarURL({dynamic: true})}`,
      ephemeral: true,
    });
  },
};
