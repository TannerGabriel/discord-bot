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
    ],
    execute(interaction){
        const id = interaction.options.get('city').value;

        Weather.find({search: id, degreeType: "F"},
        function(error, result){

            if(error) return interaction.channel.send(error)
            if(result === undefined || result.length === 0) 
                return interaction.send("Location not valid or does not exist")

            let current = result[0].current
            let location = result[0].location

            const embed = new Discord.MessageEmbed()
                .setTitle(`Showing Weather Info in ${current.observationpoint}`)
                .setDescription(current.skytext)
                .setThumbnail(current.imageUrl)
                .setColor("#00ff00")
                .setTimestamp()
                .addField("Temperature: ", `${current.temperature}*F`, true)
                .addField("Wind Speed: ", current.winddisplay, true)
                .addField("Humidity: ", `${current.humidity}%`, true)
                .addField("Timezone: ", `UTC${location.timezone}`, true)

            interaction.send({
                embeds: [embed],
            });
        })
    },
};