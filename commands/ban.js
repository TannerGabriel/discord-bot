const { getUserFromMention } = require('../util/getUser')

module.exports = {
	name: 'ban',
	description: 'Ban a player',
	execute(message, client) {
		const split = message.content.split(/ +/);
		const args = split.slice(1);

		const member = getUserFromMention(args[0], client);

		if (!member) {
			return message.reply('You need to mention the member you want to ban him');
		}

		if (!message.member.permissions.has("BAN_MEMBERS")) {
			return message.reply('I can\'t ban this user.');
		}

		return message.guild.members.ban(member)
			.then(() => message.reply(`${member.username} was banned.`))
			.catch(error => message.reply('Sorry, an error occured.'));
	},
};