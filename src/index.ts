import {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  Message
} from 'discord.js';
import { Player } from 'discord-player';
import { dirname, join } from 'path';
import { readdirSync } from 'fs';

import customPreview from './utils/embedPreview';
import config from '../config.json';
import dotenv from 'dotenv';

dotenv.config();

// Interface for Client commands
interface CustomClient extends Client {
  commands?: Collection<string, any>;
}

// Initialize Discord client
const client: CustomClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Load commands
client.commands = new Collection();

const __dirname = dirname(import.meta.url).replace('file://', '');

const commandsDir = join(__dirname, 'commands');

try {
  const commandFiles: string[] = readdirSync(commandsDir).filter((file) =>
    file.endsWith('.ts')
  );

  for (const file of commandFiles) {
    const filePath = join(commandsDir, file);
    import(`${filePath}`)
      .then((module) => {
        const command = module;
        console.log(command);
        if (client.commands) {
          client.commands.set(command.name, command);
          console.log(`Loaded ${client.commands.size} commands`, '0 commands');
        } else {
          console.error('client.commands is undefined');
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
} catch (error) {
  console.error('Error loading commands:', error);
}

// Load client
client.on(Events.ClientReady, (readyClient: Client<true>) => {
  console.log(`${readyClient.user.tag} is ready!`);

  try {
    //Set presence
    client.user?.presence.set({
      activities: [
        { name: config.activity, type: Number(config.activityType) }
      ],
      status: 'online'
    });
  } catch (error) {
    console.error('Something went wrong:', error);
  }
});

// Initialize Discord player
const player = new Player(client);
player.extractors.loadDefault();
console.log('Extractors loaded successfully');

// Event listeners for player events
let queueMessage: Message | null = null;

player.events.on('audioTrackAdd', (queue: any, song: any) => {
  const channel = queue.metadata.channel;

  if (channel) {
    if (!queueMessage) {
      channel
        .send({
          embeds: [customPreview('NEW SONG ADDED TO THE QUEUE', song.title)]
        })
        .then((message: Message) => (queueMessage = message))
        .catch((error: string) =>
          console.error(
            'Something went wrong trying to add a new song to the queue:',
            error
          )
        );
      console.log(queueMessage);
    } else {
      queueMessage
        .edit({
          embeds: [customPreview('NEW SONG ADDED TO THE QUEUE', song.title)]
        })
        .catch((error: string) =>
          console.error(
            'Something went wrong trying to edit the queue message:',
            error
          )
        );
      console.log(queueMessage);
    }
  } else {
    console.error('Queue metadata does not contain channel information');
  }
});

player.events.on('playerStart', (queue: any, track: any) => {
  queue.metadata.channel.send(`▶ | Started playing: **${track.title}**!`);
});

player.events.on('audioTracksAdd', (queue: any, track: any) => {
  queue.metadata.channel.send(`🎶 | Tracks have been queued!`);
});

player.events.on('disconnect', (queue) =>
  queue.metadata.channel.send(
    '❌ | I was manually disconnected from the voice channel, clearing queue!'
  )
);

player.events.on('emptyChannel', (queue: any) => {
  const channel = queue.metadata.channel;
  if (channel) {
    channel
      .send('Nobody is in the voice channel, leaving...')
      .then((message: Message) => {
        setTimeout(() => {
          message.delete();
        }, 30000);
      });
  } else {
    console.error('Queue metadata does not contain channel information');
  }
});

player.events.on('emptyQueue', (queue) =>
  queue.metadata.channel.send('✅ | Queue finished!')
);

player.events.on('error', (queue, error) =>
  console.log(
    `[${queue.guild.name}] Error emitted from the connection: ${error.message}`
  )
);

// Event listeners for client reconnection and disconnection
client.once('reconnecting', () => console.log('Reconnecting!'));
client.once('disconnect', () => console.log('Disconnect!'));

// Event listener for message interactions
client.on('messageCreate', async (message: Message) => {
  if (message.author.bot || !message.guild) return;
  if (!client.application?.owner) await client.application?.fetch();

  if (
    message.content === '!deploy' &&
    message.author.id === client.application?.owner?.id
  ) {
    try {
      // TODO - change this ts-ignore
      //@ts-ignore
      await message.guild.commands.set(client.commands);
      message.reply('Deployed!');
    } catch (error: any) {
      console.error('Something went wrong:', error.message);
      message.reply(
        'Clould not deploy commands! Make sure the bot has the application.commands permission!'
      );
    }
  }
});

// Event listener for interaction - Interactions
client.on('interactionCreate', async (interaction: any) => {
  if (!interaction.isCommand()) return;

  if (!client.commands) return;

  const command = client.commands.get(interaction.commandName.toLowerCase());
  if (!command) return;

  try {
    if (['ban', 'userinfo'].includes(interaction.commandName)) {
      command.execute(interaction, client);
    } else {
      command.execute(interaction);
    }
  } catch (error: any) {
    console.error(error.message);
    await interaction.followUp({
      content: 'There was an error trying to execute that command!'
    });
  }
});

client.login(process.env.DISCORD_TOKEN);

// ### Be humble ###
