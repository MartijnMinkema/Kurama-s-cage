const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const fs = require("fs");

const client = new discord.Client();
client.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if(jsFiles.length <= 0) {
        console.log("Geen files gevonden");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`Het bestand ${f} is geladen`);

        client.commands.set(fileGet.help.name, fileGet);

    });


});


client.login(process.env.token);

client.on("ready", async () => {

    console.log(`${client.user.username} is online.`);
    client.user.setActivity("Kijkt Naruto",{type: "WATCHING"});

});

client.on("message", async message =>{

    if (message.author.bot) return;

    if (message.channel.type == "dm") return;

    var prefix = botConfig.prefix;
    
    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var arguments = messageArray.slice(1);

    var commands = client.commands.get(command.slice(prefix.length));

    if(commands) commands.run(client,message, arguments);

 //   if (command === `${prefix}hallo`) {
   //     return message.channel.send("Hallo");
   // }

   // if (command === `${prefix}botinfo`) {

     //   var botEmbed = new discord.MessageEmbed()
       //     .setTitle("Bot info")   
         //   .setColor("#0099ff")
           // .addFields(
            //    {name: "author", value:"Martijn Minkema"},
             //   {name: "Description", value:"Kurama is cool"}
           // )
           // .addField("Bot naam", client.user.username)
          //  .setTimestamp();
            
      //  return message.channel.send(botEmbed);
  //  }

});
