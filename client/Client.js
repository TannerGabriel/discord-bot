import {Client, Collection, GatewayIntentBits, Partials} from 'discord.js';

export default class extends Client {
  constructor(config) {
    super({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]
    });

    this.commands = new Collection();

    this.config = config;
  }
};
