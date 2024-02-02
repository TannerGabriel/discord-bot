import { readdirSync } from 'fs';

export const name = 'help';
export const description = 'List all available commands.';
export function execute(interaction: any) {
  let str = '';
  const commandFiles = readdirSync('./commands').filter((file) =>
    file.endsWith('.js')
  );

  for (const file of commandFiles) {
    const command = require(`./${file}`);
    str += `Name: ${command.name}, Description: ${command.description} \n`;
  }

  return void interaction.reply({
    content: str,
    ephemeral: true
  });
}
