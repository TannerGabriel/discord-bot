module.exports = {
  name: 'vincelfo',
  description: 'Comando segreto.',
  execute(interaction, client) {
    const member = interaction.options.get('user').value;
    const user = client.users.cache.get(member);

    interaction.reply({
      content: `https://www.youtube.com/channel/UCJR4YnCNG9rwdG686IL5d7A`,
      ephemeral: true,
    });
  },
};
