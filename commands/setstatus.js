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
      description: '1: "Sta giocando", 2: "Sta ascoltando"',
      required: true,
    },
  ],
  async execute(interaction, player, client) {
   const descr = interaction.options.get('descrizione').value;
   const stato = interaction.options.get('stato').value;
   var type;

   switch(stato) {
    case '1':
     type = 'PLAYING';
     break;
    case '2':
     type = 'LISTENING';
     break;
   }

   try {
    client.user.setActivity(descr, { type: type });
    var response = 'Stato del bot modificato in: ' + descr + '!';
    return void interaction.reply(response);
   }
   catch {
    return void interaction.reply('Stato non cambiato!');
   }
  },
};
