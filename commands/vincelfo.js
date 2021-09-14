module.exports = {
  name: 'vincelfo',
  description: 'Comando segreto.',
  async execute(interaction, player) {
   return void interaction.followUp({content: 'No results were found!'});
  },
};
