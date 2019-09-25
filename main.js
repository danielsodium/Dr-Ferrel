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
const htmlparser2 = require("htmlparser2");
client.music = require("discord.js-musicbot-addon");

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

var versionNumber = "1.2.5"
var extraStuff = " mySQL"
var changes = "- Added music to the bot (gets music from Youtube) \n- Updated help with music page \n- Added more quotes"

var quotes = ['You miss 100% of the shots you don\’t take” -Wayne Gretzky -Michael Scott', 'anyone who gets a b is dumb (it\s a joke btw)', 'whats going on', 'Doesn’t everyone have over 100 wives?', 'Is this Mongol documentary from the Mongols?', 'Can I please use my lucky charm Mr. Ferrel? I promise it\'s not a cheating device', 'Set ur point out really early and use sufficient working evidence. Then lead up with events or recordings to back up', 'Give me more quotes to put in this bot ppls', 'yo I thought I clicked circle', '"These are the things we learned" *marks one question* "good luck"', 'How does having a 100 wives show mistreatment of women', '*not okay screams during the Mongol video*', 'Audrey, you know memes have to be funny right', 'I like categorize people based on what their shoes are', 'But I have Jordans and I\'m not a cool kid']
var author = ['Daniel Lee', 'Brian Lin', 'Daniel Lee', 'Richard Liu', 'Some kid in 4th period', 'Sarwesh', 'Tim Kim', 'me', 'literally everyone in kahoot', 'Mr. Ferrel', 'Ridge Huang', 'Annie Shin', 'Daniel Na', 'Sean Tang', 'Sarwesh']
/*

  */
client.on('ready', () => {
  client.user.setActivity("students fail | .help", {type: "WATCHING"})
  client.channels.get("626186938080034844").send("Started");

  /*
  client.channels.get("622506890936713249").send({embed: {
    color: 58967,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "Update " + versionNumber + " " + extraStuff,
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
})

client.on("guildMemberAdd", (member) => {
  client.channels.get("619388377577422848").send("Hey " + member.toString() + ", welcome... we just do random stuff ap world idk");
});

client.on("guildMemberRemove", (member) => {
  client.channels.get("619388377577422848").send("oh " + member.toString() + " left... well its better off without them....");
});

client.on('message', (message) => {
  if (message.author == client.user || message.author.bot) {
      return
  }

  else if (message.member.roles.some(role => role.name == 'Curse of Vanishing')) {
    message.delete(1000)
  }
  else if (message.content.startsWith(".")) {
    processCommand(message);
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

})

function processCommand(message) {
  let fullCommand = message.content.substr(1)
  let splitCommand = fullCommand.split(" ")
  let primaryCommand = splitCommand[0]
  let arguments = splitCommand.slice(1)

  if (primaryCommand == "poll") {
    poll(message, fullCommand)
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
    getHelp(message, fullCommand)
  }
  if (primaryCommand == "curse" && message.member.roles.some(role => role.name == 'Khan')) {
    giveCurse(message,fullCommand)
  }
  if (primaryCommand == "uncurse" && message.member.roles.some(role => role.name == 'Khan')) {
    takeCurse(message,fullCommand)
  }
  if (primaryCommand == "forecast") {
    getScore(message,fullCommand)
  }
  if (primaryCommand == "about") {
    message.channel.send("I am the robotic manifestation of the superior Mr. Ferrel, created in image of his living personality.")
  }
  if (primaryCommand == "quote") {
    giveQuote(message, fullCommand)
  }
  if (primaryCommand == "weather") {
    message.channel.send("It's hot right now... I'm going to blast the AC to full power.")
  }
  if (primaryCommand == "thanks") {
    message.reply("You're welcome :)")
  }
  if (primaryCommand == "admin") {
    message.channel.send(" > Become admin: \n > https://docs.google.com/forms/d/e/1FAIpQLSc-aPedL4XaunQeqhQiSnej1FKmwvOKhC6tdyNaiUp5CfZ_qQ/viewform?usp=sf_link")
  }
  if (primaryCommand == "meme") {
    sendMeme(message,fullCommand)
  }
  if (primaryCommand == "animeme") {
    sendAnimeme(message,fullCommand)
  }
  /*
  if (primaryCommand == "aww") {
    sendCute(message,fullCommand)
  }
  */
  if (primaryCommand == "version") {
    getVersion(message,fullCommand)
  }
  if (primaryCommand == "surprise") {
    giveSurprise(message,fullCommand)
  }
  if (primaryCommand == "8Z9YWEh") {
    message.channel.send("www.discord.gg/");
  }
  if (primaryCommand == "role") {
    giveRole(message,splitCommand)
  }
  if (primaryCommand == "connect") {
    const con = mysql.createConnection({
      host: process.env.SERVER,
      user: process.env.DATABASE_NAME,
      port: '3306',
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME
    });

    con.connect();
    client.channels.get("626186938080034844").send("Connected!");
    con.end();
  }
}

function getVersion(message, fullCommand) {
  message.channel.send({embed: {
    color: 58967,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "Update " + versionNumber + extraStuff,
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
}

function poll(message, fullCommand) {
  message.channel.send("Poll: " + fullCommand.substr(5)).then(sent => {
    sent.react("\u274E")
    sent.react("\u2611")
  })
  message.delete()
}

function sendMeme(message,fullCommand) {
  var random = (Math.floor(Math.random() * Math.floor(527))) + 1
  var number = "";
  if (random < 10) {
    number = "00" + i;
  }
  else if (random > 9 && random < 100) {
    number = "0" + random;
  }
  else {
    number = random;
  }
  var imageName = "https://res.cloudinary.com/drferrel/image/upload/v1568689715/memes/meme" + random + ".jpg"
  message.channel.send({
      file: imageName 
  });
}

function sendAnimeme(message, fullCommand) {
  var random = (Math.floor(Math.random() * Math.floor(276))) + 1
  var imageName = "https://res.cloudinary.com/drferrel/image/upload/v1568690101/animemes/meme" + random + ".jpg"
  message.channel.send({
      file: imageName 
  });
}
/*
function sendCute(message, fullCommand) {
  var random = (Math.floor(Math.random() * Math.floor(80))) + 1
  var imageName = "https://raw.githubusercontent.com/sodiumkid/old/master/images/aww/aww" + random + ".mp4"
  message.channel.send({
      file: imageName 
  });
}
*/

function giveRole(message, splitCommand) {
  if (splitCommand[1] == "gamer" || splitCommand[1] == "Gamer" || splitCommand[1] == "gamers") {
    var role = message.guild.roles.find(r => r.name === "gamer");
  }

  let member = message.member;
  if (message.member.roles.has(role.id)) {
    message.channel.send("Took away the role " + role.name)
    member.removeRole(role).catch(console.error);
  } 
  else {
    message.channel.send("Gave you the role " + role.name)
    member.addRole(role).catch(console.error);
  }

}

function giveCurse(message, fullCommand) {
  let role = message.guild.roles.find(r => r.name === "Curse of Vanishing");
  let member = message.mentions.members.first();
  message.channel.send(member + " has been cursed...")
  member.addRole(role).catch(console.error);
}

function takeCurse(message, fullCommand) {
  let role = message.guild.roles.find(r => r.name === "Curse of Vanishing");
  let member = message.mentions.members.first();
  message.channel.send("The curse on " + member + " has been lifted...  praise god!")
  member.removeRole(role).catch(console.error);
}

function getHelp(message, fullCommand) {
  if (fullCommand.includes("1")) {
    message.channel.send({embed: {
    color: 1237308,
    author: {},
    title: 'Dr. Ferrel Commands | Useful',
    fields: [{
        name: ".website",
        value: "Link to Ferrel's forum"
      },
      {
        name: ".studyguide",
        value: "Link to study guide on all units"
      },
      {
        name: ".calendar",
        value: "Link to AP World Calendar"
      },
      {
        name: ".email",
        value: "Mr. Ferrel's email address"
      }
    ],
    }
    });
  }
  else if (fullCommand.includes("2")) {
    message.channel.send({embed: {
    color: 1237308,
    author: {},
    title: 'Dr. Ferrel Commands | Fun',
    fields: [{
        name: ".forecast",
        value: "Forecast on Mr. Ferrel's grading standard"
      },
      {
        name: ".quote",
        value: "Random quote from someone in WHAP"
      },
      {
        name: ".weather",
        value: "Weather opinion by Dr. Ferrel"
      },
      {
        name: ".meme",
        value: "Random history meme"
      },
      {
        name: "8Z9YWEh",
        value: "huh idk what that means"
      },
      {
        name: ".animeme",
        value: "Random history anime meme (not looked through by me)... ⚠️Viewer Discretion Advised⚠️"
      }
    ],
    }
    });
  }
  else if (fullCommand.includes("3")) {
    message.channel.send({embed: {
    color: 1237308,
    author: {},
    title: 'Dr. Ferrel Commands | Music',
    description: 'Gets music from Youtube API. Must be in a voice channel to use.',
    fields: [{
        name: ".play",
        value: "Queue a song/playlist by URL or name"
      },
      {
        name: ".remove",
        value: "Remove a song from the queue by position in the queue"
      },
      {
        name: ".skip",
        value: "Skip a song or songs with skip [number]"
      },
      {
        name: ".leave",
        value: "Leaves the voice channel"
      },
      {
        name: ".search",
        value: "Searchs for up to 10 videos from YouTube"
      },
      {
        name: ".pause",
        value: "Pauses playing music"
      },
      {
        name: ".volume",
        value: "Changes the volume output of the bot."
      },
      {
        name: ".queue",
        value: "View the current queue."
      },
      {
        name: ".np",
        value: "Shows the now playing text."
      },
      {
        name: ".clear",
        value: "Clears the entire queue."
      }
    ],
    }
    });
  }
  else if (fullCommand.includes("4")) {
    message.channel.send({embed: {
    color: 1237308,
    author: {},
    title: 'Dr. Ferrel Commands | Misc.',
    fields: [{
        name: ".about",
        value: "About Dr. Ferrel"
      },
      {
        name: ".admin",
        value: "Become Admin"
      },
      {
        name: ".role [role name]",
        value: "Gives/takes role (only one is gamer)"
      },
      {
        name: ".8Z9YWEh",
        value: "8Z9YWEh8Z9YWEh"
      },
      {
        name: ".version",
        value: "Bot version"
      }
    ],
    }
    });

  }
  else {
    message.channel.send({embed: {
    color: 1237308,
    author: {},
    title: 'Dr. Ferrel Commands',
    fields: [{
        name: ".help 1 | Useful",
        value: "Links, study guides, etc."
      },
      {
        name: ".help 2 | Fun",
        value: "Memes, Quotes, Forecast, etc."
      },
      {
        name: ".help 3 | Music",
        value: "Use Music Commands"
      },
      {
        name: ".help 4 | Other",
        value: "Misc. Commands"
      },
    ],
    }
  });
  }

}

function giveQuote(message, fullCommand) {
  var random = Math.floor(Math.random() * Math.floor(quotes.length))
  message.channel.send(' > "' + quotes[random] + '" \n > -' + author[random]) 
}

function giveSurprise(message, fullCommand) {
  var random = Math.floor(Math.random() * Math.floor(8))
  switch (random) {
    case 0:
      message.channel.send("no.");
      break;
      break;
    case 1:
      message.channel.send("Here's a meme");
      sendMeme(message, fullCommand);
      break;
    case 2:
      message.channel.send("Here's an Animeme");
      sendAnimeme(message, fullCommand);
      break;
    case 3:
      message.channel.send("Here's a forecast");
      getScore(message, fullCommand);
      break;
    case 4:
      message.channel.send("8Z9YWEh");
      break;
    case 5:
      message.channel.send("www.discord.gg/")
      break;
    case 6:
      message.channel.send("Here's an animeme");
      sendAnimeme(message, fullCommand);
      break;
    case 7:
      message.channel.send("Here's an animeme");
      sendAnimeme(message, fullCommand);
      break;
    default:
      break;
  }
}

function getScore(message,fullCommand) {
  var th = "ab"
  request('https://www.espn.com/nfl/team/schedule/_/name/sf', function (error, response, body) {
    const parser = new htmlparser2.Parser(
      {
          onopentag(name, attribs) {if (name === "script" && attribs.class === "text/javascript") {th += tagname;}},
          ontext(text) {th += text;},
          onclosetag(tagname) {}
      },
      { decodeEntities: true }
    );
    parser.write(String(body));
    parser.end();
    var find = "@"
    var a = th.indexOf("WK", 24980)
    var b = th.substring(a- 80, a)
    if (b.indexOf("@") == -1) {
      find = "vs";
    }
    var c = b.substring(b.indexOf(find)+2, b.indexOf(find)+26)
    if (c.indexOf("W") != -1) {
      message.channel.send("Mr. Ferrel will grade easy as the 49ers won " + c.substring(c.indexOf("W")+1, c.indexOf("W")+6) + " " + find + " " +b.substring(b.indexOf(find)+ 3, b.indexOf("W")-1) + " (" + b.substring(b.indexOf("W")+ 8, b.indexOf("W")+11) + ")");
    }
    else {
      message.channel.send("Mr. Ferrel will grade hard as the 49ers lost " + c.substring(c.indexOf("L", 3)+1, c.indexOf("L", 3)+6)+ " " + find + " " +b.substring(b.indexOf(find)+ 3, b.indexOf("L")-1) + " (" + b.substring(b.indexOf("L")+ 8, b.indexOf("L")+11) + ")");
    }
  });
}
