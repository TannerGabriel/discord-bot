module.exports = {
  name: 'vincelfo',
  description: 'Comando segreto.',
  async execute(interaction, player) {
   const client = require('./client/Client');
   const channel = client.channels.cache.find(channel => channel.name === channelName);
   return void channel.send('https://www.youtube.com/channel/UCJR4YnCNG9rwdG686IL5d7A');
  },
};
