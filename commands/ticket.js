const discord = require("discord.js");

module.exports.run = async (bot, message, args) =>{

    const categoryID = "835509282900279306"

    var userName = message.author.userName;
    var userDiscriminator = message.author.discriminator;

    var ticketBestaat = false;

    message.guild.channels.cache.forEach(channel => {

        if (channel.name == username.toLowerCase() + "-" + userDiscriminator) {
            ticketBestaat = true;

            message.reply("U heeft al een ticket");

            return;
        }

    });

    if(ticketBestaat) return;

    var embed = new discord.MessageEmbed()
        .setTitle("Hallo" + message.author.username)
        .setFooter("Support kanaal wordt gemaakt");

    message.channel.send(embed);

    message.guild.channels.create(userName.toLowerCase() + "-" + userDiscriminator, {type: 'text'}).then(
        (createdChannel) => {
            createdChannel.setParent(categoryID).then(
                (settedParent) => {

                    settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === `@everyone`),{
                        SEND_MESSAGES: false,
                        VIEW_CHANNEL: false

                    });

                    settedParent.updateOverwrite(message.author.id, {
                        CREATE_INSTANT_INVITE: false,
                        READ_MESSAGES: true,
                        SEND_MESSAGES: true,
                        ATTACH_FILES: true,
                        CONNECT: true,
                        ADD_REACTIONS: true
                    });

                    var embedParent = new discord.MessageEmbed()
                    .setTitle(`Hallo ${message.author.username}`)
                    .setDescription("Zet Hier u bericht/vraag")
                    .setTimestamp();

                settedParent.send(embedParent);

                }
            ).catch(err => {
                message.channel.send("Er is iets fout gegaan");
            })
             
        }
    ).catch(err => {
        message.channel.send("Er is iets fout gegaan");
    });

}

module.exports.help = {
    name: "ticket"
}