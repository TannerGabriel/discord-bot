module.exports = {
	name: 'kick',
	description: 'Kick a player',
	execute(message) {
		const permissions = message.member.voiceChannel.permissionsFor(message.client.user);

		if (!permissions.has('KICK_MEMBERS') || !message.member.hasPermission('KICK_MEMBERS')) {
			return message.channel.send('You can\'t kick someone without the needed permissions');
		}

		if (!member) return message.reply('Please mention a valid member of this server');
		if (!member.kickable) return message.reply('This user isn not kickable');

		const member = message.mentions.members.first();
		member.kick().then(() => {
			message.channel.send(':wave: ' + member.displayName + ' has been successfully kicked :point_right: ');
		}).catch(() => {
			message.channel.send('Access Denied');
		});
	},
};