module.exports = {
  name: 'vincenzo',
  description: 'Comando segreto.',
  execute(interaction, client) {
    interaction.reply({
      content: `Quando cago ti penzo`,
      ephemeral: true,
    });
  },
};
