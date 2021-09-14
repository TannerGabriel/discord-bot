module.exports = {
  name: 'vincelfo',
  description: 'Comando segreto.',
  async execute(interaction, client) {
    return void interaction.followUp({
      content: `https://www.youtube.com/channel/UCJR4YnCNG9rwdG686IL5d7A`,
    });
  },
};
