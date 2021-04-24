const discord = require("discord.js");

module.exports.run = async (bot, message, args) =>{

    var botEmbed = new discord.MessageEmbed()
            .setTitle("Bot info")   
            .setColor("#0099ff")
            .addFields(
                {name: "author", value:"Martijn Minkema"},
                {name: "Description", value:"Kurama is cool"}
            )
            .setTimestamp();
            
        return message.channel.send(botEmbed);

}

module.exports.help = {
    name: "botinfo"
}