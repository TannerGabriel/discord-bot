import { ApplicationCommandOptionType } from 'discord.js';

export const name = 'ban';
export const description = 'Ban a player';
export const options = [
  {
    name: 'user',
    type: ApplicationCommandOptionType.User,
    description: 'The user you want to ban',
    required: true
  }
];
export function execute(interaction: any, client: any) {
  const member = interaction.options.getUser('user');

  if (!member) {
    return interaction.reply(
      'You need to mention the member you want to ban him'
    );
  }

  if (!interaction.member.permissions.has('BAN_MEMBERS')) {
    return interaction.reply("I can't ban this user.");
  }

  const userinfo = client.users.cache.getMember(member);

  return interaction.guild.members
    .ban(member)
    .then(() => {
      interaction.reply({
        content: `${userinfo.username} was banned.`,
        ephemeral: true
      });
    })
    .catch((_error: any) =>
      interaction.reply({
        content: `Sorry, an error occured.`,
        ephemeral: true
      })
    );
}
