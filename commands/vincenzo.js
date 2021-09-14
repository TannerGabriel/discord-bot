module.exports = {
  name: 'vincenzo',
  description: 'Comando segreto.',
  execute(interaction, client) {
    const member = interaction.options.get('user').value;
    const user = client.users.cache.get(member);

    interaction.reply({
      content: `Quando cago ti penzo`,
      ephemeral: true,
    });
  },
};
