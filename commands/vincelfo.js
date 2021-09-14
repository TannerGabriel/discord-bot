module.exports = {
  name: 'vincelfo',
  description: 'Comando segreto.',
  execute(interaction, client) {
    interaction.followUp({
      content: `https://www.youtube.com/channel/UCJR4YnCNG9rwdG686IL5d7A`,
    });
  },
};
