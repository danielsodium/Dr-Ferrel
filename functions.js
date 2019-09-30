/*
* For reacting to actions
* Comes from main.js -> commandProcessing.js -> functions.js
*/

exports.clearMessages = function(message) {
 const args = message.content.split(' ').slice(1);
 const amount = args.join(' ');

 if (!amount) {message.channel.send('Give me a number to delete you fool');}
 if (isNaN(amount)) {message.channel.send('Give me a number to delete you fool!');}

 if (amount > 100) {message.channel.send('You can`t delete more than 100 messages at once!');}
 if (amount < 1) {message.channel.send('You have to delete at least 1 message!');}

 message.channel.bulkDelete(amount).then(() => {
   message.channel.send("Deleted " + amount + " messages.").then(msg => msg.delete(3000));
 });
}

exports.poll = function(message, fullCommand) {
 message.channel.send("Poll: " + fullCommand.substr(5)).then(sent => {
   sent.react("\u274E")
   sent.react("\u2611")
 })
 message.delete()
}

exports.sendMeme = function(message,fullCommand) {
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

exports.sendAnimeme = function(message, fullCommand) {
 var random = (Math.floor(Math.random() * Math.floor(276))) + 1
 var imageName = "https://res.cloudinary.com/drferrel/image/upload/v1568690101/animemes/meme" + random + ".jpg"
 message.channel.send({
     file: imageName
 });
}

exports.giveRole = function(message, splitCommand) {
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

exports.giveCurse = function(message, fullCommand) {
  let role = message.guild.roles.find(r => r.name === "Curse of Vanishing");
  let member = message.mentions.members.first();
  message.channel.send(member + " has been cursed...")
  member.addRole(role).catch(console.error);
}

exports.takeCurse = function(message, fullCommand) {
  let role = message.guild.roles.find(r => r.name === "Curse of Vanishing");
  let member = message.mentions.members.first();
  message.channel.send("The curse on " + member + " has been lifted...  praise god!")
  member.removeRole(role).catch(console.error);
}

exports.giveQuote = function(message, fullCommand, mysql, pool) {
 var random = Math.floor(Math.random() * 14) + 1;

 pool.getConnection(function(err, connection) {
   connection.query("SELECT quote, author FROM quotes", function (err, result, fields) {
     if (err) throw err
     message.channel.send('> "' + result[random].author + '"\n' + '> ' + result[random].quote);
     //message.channel.send("> -"+result[random].person)
   });
   connection.release();
 });
}
exports.getVersion = function(message, fullCommand, client, versionNumber, changes) {

  message.channel.send({embed: {
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
}

exports.giveSurprise = function(message, fullCommand) {
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

exports.getHelp = function(message, fullCommand) {
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
        name: ".mock",
        value: "Mock the last message in the channel"
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

exports.mockingSpongebob = function(message, genMeme) {

  message.channel.fetchMessages({ limit: 2 }).then(messages => {
  let lastMessage = messages.last();
  let memeUrl = genMeme.make('spongebob', ' ', lastMessage.content)
  memeUrl = memeUrl.substring(0, memeUrl.indexOf('//',10)) + memeUrl.substring(memeUrl.indexOf('//',10)+1, memeUrl.length);
  memeUrl = memeUrl.substring(0, memeUrl.indexOf('..',10)) + memeUrl.substring(memeUrl.indexOf('..',10)+1, memeUrl.length);
  if (!lastMessage.author.bot) {
    message.channel.send('<@' + lastMessage.author.id + '>')
    message.channel.send({
      file: memeUrl
    });
  }
  else {
    message.channel.send('DONT MOCK ME')
  }

})

}

exports.getScore = function(message,fullCommand, request, htmlparser2) {
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
