module.exports = {
  name: 'setstatus',
  description: 'Cambia stato del bot',
  options: [
    {
      name: 'descrizione',
      type: 3, // 'STRING' Type
      description: 'La descrizione dello stato del bot',
      required: true,
    },
    {
      name: 'stato',
      type: 3, // 'STRING' Type
      description: '1: "Sta giocando", 2: "Sta ascoltando", 3: "Sta guardando", 4: "In competizione su"',
      required: true,
    },
  ],
  async execute(interaction, player, client) {
   const descr = interaction.options.get('descrizione').value;
   const stato = interaction.options.get('stato').value;
   var type;
   var long_stato;

   switch(stato) {
    case '1':
     type = 'PLAYING';
     long_stato = 'Sta giocando a ';
     break;
    case '2':
     type = 'LISTENING';
     long_stato = 'Sta ascoltando ';
     break;
    case '3':
     type = 'WATCHING';
     long_stato = 'Sta guardando ';
     break;
    case '4':
     type = 'COMPETING';
     long_stato = 'In competizione su ';
     break;
    default:
     return void interaction.reply('**Stato non modificato!**');
   }

   try {
    client.user.setActivity(descr, { type: type });
    var response = 'Stato del bot modificato in: ' + long_stato + '**' +  descr + '**!';
    return void interaction.reply(response);
   }
   catch {
    return void interaction.reply('**Stato non modificato!**');
   }
  },
};
