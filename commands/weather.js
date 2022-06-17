const Weather = require("weather-js");
const Discord = require("discord.js");

module.exports = {
    name: 'weather',
    description: 'Weather info of entered location',
    options: [
        {
            name: 'city',
            type: 3,
            description: '[City/Abbreviation] or [City, State]',
            required: true,
        },
        {
            name: 'unit',
            type: 3,
            description: 'temperature units in F or C',
            required: true,
        },
    ],
    execute(interaction){
        const id = interaction.options.get('city').value;
        const degree = interaction.options.get('unit').value;

        Weather.find({search: id, degreeType: degree},
        function(error, result){

            if(error) return interaction.channel.send(error)
            if(result === undefined || result.length === 0 || !id) 
                return interaction.send("Location is not valid or does not exist")

            if(degree == "F" && degree != "C");
            else if(degree != "F" && degree == "C");
            else return interaction.reply("Temperature is not in F or C")

            let current = result[0].current
            let location = result[0].location

            const embed = new Discord.MessageEmbed()
                .setTitle(`Showing Weather Info in ${current.observationpoint}`)
                .setDescription(current.skytext)
                .setThumbnail(current.imageUrl)
                .setColor("#00ff00")
                .setTimestamp()
                .addField("Temperature: ", `${current.temperature}*${degree}`, true)
                .addField("Wind Speed: ", current.winddisplay, true)
                .addField("Humidity: ", `${current.humidity}%`, true)
                .addField("Timezone: ", `UTC${location.timezone}`, true)

            interaction.send({
                embeds: [embed],
            });
        })
    },
};