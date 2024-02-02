import { Client, Collection, GatewayIntentBits } from 'discord.js';

export default class extends Client {
  commands: Collection<string, any>;
  config: any;
  constructor(config: any) {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
      ]
    });

    this.commands = new Collection();

    this.config = config;
  }
}
