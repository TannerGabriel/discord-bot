module.exports = {
  name: 'setstatus',
  description: 'Cambia stato online del bot',
    {
      name: 'stato',
      type: 3, // 'STRING' Type
      description: '1: "Online", 2: "Assente", 3: "Invisibile", 4: "Non disturbare"',
      required: true,
    },
  ],
  async execute(interaction, player, client) {
   const stato = interaction.options.get('stato').value;
   var type;
   var long_stato;

   switch(stato) {
    case '1':
     type = 'online';
     long_stato = 'Online ';
     break;
    case '2':
     type = 'idle';
     long_stato = 'Assente ';
     break;
    case '3':
     type = 'invisible';
     long_stato = 'Invisibile ';
     break;
    case '4':
     type = 'dnd';
     long_stato = 'Non Disturbare ';
     break;
    default:
     return void interaction.reply('**Stato online non modificato!**');
   }

   try {
    client.user.setStatus(type);
    var response = 'Stato online del bot modificato in: **' + long_stato + '**!';
    return void interaction.reply(response);
   }
   catch {
    return void interaction.reply('**Stato online non modificato!**');
   }
  },
};
