/*
* Dr. Ferrel
* Version 1.2.3
* Created by sodiumkid
* Bot for AP World
* Why you lookin at code lol its messy
*/

const Discord = require('discord.js');
const client = new Discord.Client();
var request = require('request');
var mysql = require('mysql');
var processing = require('./commandProcessing.js');
var functions = require('./functions.js');
const htmlparser2 = require("htmlparser2");
client.music = require("discord.js-musicbot-addon");
require('dotenv').config()

var versionNumber = "1.2.5"
var extraStuff = " mySQL"
var changes = "- Trying to do \n- Updated help with music page \n- Added more quotes"

client.login(process.env.BOT_TOKEN)

const pool = mysql.createPool({
  host: process.env.SERVER,
  user: process.env.DATABASE_NAME,
  port: '3306',
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
});

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
})

client.on("guildMemberAdd", (member) => {
  processing.memberJoined(client, member);
});

client.on("guildMemberRemove", (member) => {
  processing.memberLeft(client, member);
});

client.on('message', (message) => {
  processing.specialChar(message,functions, client);
})
