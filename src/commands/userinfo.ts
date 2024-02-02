import { ApplicationCommandOptionType } from 'discord.js';

export const name = 'userinfo';
export const description = 'Get information about a user.';
export const options = [
  {
    name: 'user',
    type: ApplicationCommandOptionType.User,
    description: 'The user you want to get info about',
    required: true
  }
];
export function execute(interaction: any, _client: any) {
  const user = interaction.options.getUser('user');

  interaction.reply({
    content: `Name: ${user.username}, ID: ${
      user.id
    }, Avatar: ${user.displayAvatarURL({ dynamic: true })}`,
    ephemeral: true
  });
}
