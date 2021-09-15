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
      description: '1: "Sta giocando" 2: "sta Ascoltando"',
      required: true,
    },
  ],
  async execute(interaction, player, client) {
   const descr = interaction.options.get('descrizione').value;
   const stato = interaction.options.get('stato').value;
   var type;

   switch(stato) {
    case 1:
     type = 'PLAYING';
     break;
    case 2:
     type = 'LISTENING';
     break;
   }

   client.user.setActivity('${descrizione}', { type: '${type}' });
  },
};
