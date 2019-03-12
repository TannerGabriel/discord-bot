module.exports = {
	name: 'ban',
	description: 'Ban a player',
	execute(message) {
		const permissions = message.member.voiceChannel.permissionsFor(message.client.user);

		if (!permissions.has('BAN_MEMBERS') || !message.member.hasPermission('BAN_MEMBERS')) {
			return message.channel.send('You can\'t ban someone without the needed permissions');
		}

		if (!member) return message.reply('Please mention a valid member of this server');
		if (!member.bannable) return message.reply('This user isn not bannable');

		const member = message.mentions.members.first();
		member.ban().then(() => {
			message.channel.send(':wave: ' + member.displayName + ' has been successfully banned :point_right: ');
		}).catch(() => {
			message.channel.send('Access Denied');
		});
	},
};