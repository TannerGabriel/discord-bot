module.exports = {
	name: 'resume',
	description: 'Resume current song!',
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!message.member.voice.channel) return message.channel.send('You have to be in a voice channel to resume the music!');
		if (!serverQueue) return message.channel.send('There is no song that I could resume!');
		if (!serverQueue.connection.dispatcher.paused) return message.channel.send('Song already resume!');
		serverQueue.connection.dispatcher.resume();
	},
};
