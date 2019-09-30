/*
* Dr. Ferrel
* Version 1.2.3
* Created by sodiumkid
* Bot for AP World
* Why you lookin at code lol its messy
*/

const Discord = require('discord.js');
const client = new Discord.Client();
var mysql = require('mysql');

client.music = require("discord.js-musicbot-addon");
require('dotenv').config()

var versionNumber = "1.2.9"
var changes = "- Added quotes to mySQL server \n- Cleaned the code up to multiple files \n- Added .mock (significant lag)"

var functions = require('./functions.js');
var processing = require('./commandProcessing.js');


client.login(process.env.BOT_TOKEN)



client.music.start(client, {
  youtubeKey: process.env.YOUTUBE_KEY,
  botPrefix: '.',
  'help': {
    enabled: false
  },
  ownerID: '431625294550532097',
  botAdmins: ['431625294550532097','390010548567277571','491388903325040651','182625290692984832']
});

client.on('ready', () => {
  client.user.setActivity("students fail | .help", {type: "WATCHING"})
  client.channels.get(process.env.PATCHES_CHANNEL).send({embed: {
    color: 58967,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "Update " + versionNumber,
    url: "https://github.com/sodiumkid/Dr-Ferrel",
    fields: [{
        name: "Changes:",
        value: changes
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "© Creative Commons License"
    }
  }
 });
})

client.on("guildMemberAdd", (member) => {
  processing.memberJoined(client, member);
});

client.on("guildMemberRemove", (member) => {
  processing.memberLeft(client, member);
});

client.on('message', (message) => {
  processing.specialChar(message, functions, client,versionNumber, changes);
})
