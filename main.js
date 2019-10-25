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
var genMeme = require('themememaker');
const fs = require('fs');
var htmlparser2 = require("htmlparser2");
var request = require('request');
const {google} = require('googleapis');

client.music = require("discord.js-musicbot-addon");
require('dotenv').config()

const pool = mysql.createPool({
  host: process.env.SERVER,
  user: process.env.DATABASE_NAME,
  port: '3306',
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
});

var versionNumber = "1.3.2"
var changes = "- Added Profanity Check \n- Added test answer pdf"

var functions = require('./functions.js');


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
  /*
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
 */
  client.channels.get(process.env.PATCHES_CHANNEL).send("> I restarted, sorry about that...");
})

client.on("guildMemberAdd", (member) => {
  client.channels.get(process.env.GENERAL_CHANNEL).send("Hey " + member.toString() + ", welcome... we just do random stuff ap world idk");
  let role = member.guild.roles.find(r => r.name === "Mongol");
  member.addRole(role).catch(console.error);
});

client.on("guildMemberRemove", (member) => {
  client.channels.get(process.env.GENERAL_CHANNEL).send("oh " + member.toString() + " left... well its better off without them....");
});

client.on('message', (message) => {
  if (message.author == client.user || message.author.bot) {
      return
  }
  checkProfanity(message);
  specialChar(message, client);
})

specialChar = function(message, client) {

  if (message.content.includes("www.discord.gg/")) {
    message.channel.send("no links my dudes")
    message.delete();
  }
  else if (message.member.roles.some(role => role.name == 'Curse of Vanishing')) {
    message.delete(1000)
  }
  else if (message.content.startsWith(".")) {
    processCommand(message, client);
  }
  else if (!(message.content.includes("@")) && (message.content.includes("100") || message.content.includes("105"))) {
    message.channel.send({
      file: "https://res.cloudinary.com/drferrel/image/upload/v1568690101/misc/winner.png"
    });
  }
  else if (message.content.includes("offended") || message.content.includes("offensive")  ) {
    message.reply("get over it you liberal")
  }
  else if (message.content.includes("reddit")) {
    message.channel.send("I believe that reddit is the future.")
  }
  else if (message.content.includes("sarwesh")) {
    message.channel.send('> "But the Mongols were barbarianisming them" \n > -Sarwesh, 2019')
  }
}

checkProfanity = function(message) {
  for (var i = 0; i < JSON.parse(process.env.PROFANITY).length; i++) {
    if (message.content.indexOf(JSON.parse(process.env.PROFANITY)[i]+"") != -1) {
      message.channel.send("Hey, watch your language.");
      message.delete(100);
    }
  }

}

processCommand = function(message, client) {
  let fullCommand = message.content.substr(1)
  let splitCommand = fullCommand.split(" ")
  let primaryCommand = splitCommand[0]
  let arguments = splitCommand.slice(1)

  if (primaryCommand == "poll") {
    functions.poll(message, fullCommand)
  }
  if (primaryCommand == "website") {
    message.channel.send("Here's a link to Ferrel's Forum: https://sites.google.com/pleasantonusd.net/ferrelsforum/")
  }
  if (primaryCommand == "calendar" || primaryCommand == "calander" || primaryCommand == "calandar") {
    message.channel.send("Here's a link to the WHAP calendar: https://docs.google.com/document/d/1DUGNoK0HQUvELc99Zf7SrFUFkq32ke8SevXHkOSCl1o")
  }
  if (primaryCommand == "contact" || primaryCommand == "gmail" || primaryCommand == "email") {
    message.channel.send("Mr. Ferrel's email: sferrel@pleasantonusd.net")
  }
  if (primaryCommand == "studyguide") {
    message.channel.send("> https://drive.google.com/drive/folders/1GGgnOK_Diu8UMqtyrLCpmPea9BNey6sP?usp=sharing\n > Link courtesy of <@182625290692984832>")
  }
  if (primaryCommand == "help") {
    functions.getHelp(message, fullCommand)
  }
  if (primaryCommand == "curse" && message.member.roles.some(role => role.name == 'Khan')) {
    functions.giveCurse(message,fullCommand)
  }
  if (primaryCommand == "uncurse" && message.member.roles.some(role => role.name == 'Khan')) {
    functions.takeCurse(message,fullCommand)
  }
  if (primaryCommand == "forecast") {
    functions.getScore(message,fullCommand, request, htmlparser2)
  }
  if (primaryCommand == "about") {
    message.channel.send("I am the robotic manifestation of the superior Mr. Ferrel, created in image of his living personality.")
  }
  if (primaryCommand == "quote") {
    functions.giveQuote(message, fullCommand, mysql, pool)
  }
  if (primaryCommand == "weather") {
    message.channel.send("It's hot right now... I'm going to blast the AC to full power.")
  }
  if (primaryCommand == "thanks") {
    message.reply("You're welcome :)")
  }
  if (primaryCommand == "testanswers") {
    message.reply("<http://bit.ly/HistoryOfTheEarthAndItsPeoplesTeachersCopy>")
  }
  if (primaryCommand == "admin") {
    message.channel.send(" > Become admin: \n > https://docs.google.com/forms/d/e/1FAIpQLSc-aPedL4XaunQeqhQiSnej1FKmwvOKhC6tdyNaiUp5CfZ_qQ/viewform?usp=sf_link")
  }
  if (primaryCommand == "meme") {
    functions.sendMeme(message,fullCommand)
  }
  if (primaryCommand == "animeme") {
    functions.sendAnimeme(message,fullCommand)
  }
  if (primaryCommand == "version") {
    functions.getVersion(message,fullCommand,client, versionNumber, changes)
  }
  if (primaryCommand == "surprise") {
    functions.giveSurprise(message,fullCommand)
  }
  if (primaryCommand == "8Z9YWEh") {
    message.channel.send("www.discord.gg/");
  }
  if (primaryCommand == "role") {
    functions.giveRole(message,splitCommand)
  }
  if (primaryCommand == "delete" && message.member.roles.some(role => role.name == 'Khan')) {
    functions.clearMessages(message);
  }
  else if (primaryCommand == "delete" && !(message.member.roles.some(role => role.name == 'Khan'))) {
    message.channel.send("know your place you piece of trash");
  }
  if (primaryCommand == "mock") {
    functions.mockingSpongebob(message, genMeme);
  }
  if (primaryCommand == "textbook") {
    message.channel.send("https://www.longbranch.k12.nj.us/cms/lib/NJ01001766/Centricity/Domain/635/AP%20World%20History/The%20Earth%20and%20its%20Peoples%203rd%20Edition%20Online%20Textbook.pdf");
  }
  if (primaryCommand == "github") {
    message.channel.send("https://www.github.com/sodiumkid/Dr-Ferrel");
  }
  if (primaryCommand == "classroom") {
    getClassroom(message, fullCommand)

    //seeCon(message,addLevel);
    /*
    var sql = "CREATE TABLE currency (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), dollars SMALLINT(255))";
    con.query(sql, function (err, result) {
      if (err) throw err;
      client.channels.get("626186938080034844").send("Table created");
    });
    */


  }
}

function getClassroom(message, fullCommand) {

    authorize(JSON.parse(process.env.CREDS), getNew, message);

}

function authorize(credentials, callback, message) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.

  oAuth2Client.setCredentials(JSON.parse(process.env.TOKEN_CLASS));
  callback(oAuth2Client, message);

}

function getNew(auth, message) {
  const classroom = google.classroom({version: 'v1', auth});
  classroom.courses.announcements.list({
    courseId: 40588415250
  }, (err, res) => {
    if (err) return console.error('The API returned an error: ' + err);
    message.channel.send('> "' + res.data.announcements[0].text + '"\n > Posted by Mr. Ferrel at ' + res.data.announcements[0].updateTime + ' \n' + res.data.announcements[0].alternateLink)
  });
}
