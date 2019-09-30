/*
* For processing events that happen
* Goes to functions.js for actual reactions
*/

exports.memberJoined = function(client, member) {
  client.channels.get(process.env.GENERAL_CHANNEL).send("Hey " + member.toString() + ", welcome... we just do random stuff ap world idk");
}

exports.memberLeft = function(client, member) {
  client.channels.get(process.env.GENERAL_CHANNEL).send("oh " + member.toString() + " left... well its better off without them....");
}

exports.specialChar = function(message,functions, client, versionNumber, changes) {
  if (message.author == client.user || message.author.bot) {
      return
  }
  else if (message.content.includes("www.discord.gg/")) {
    message.channel.send("")
  }
  else if (message.member.roles.some(role => role.name == 'Curse of Vanishing')) {
    message.delete(1000)
  }
  else if (message.content.startsWith(".")) {
    processCommand(message, functions,client, versionNumber, changes);
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

processCommand = function(message, functions,client, versionNumber, changes) {
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
    functions.getScore(message,fullCommand)
  }
  if (primaryCommand == "about") {
    message.channel.send("I am the robotic manifestation of the superior Mr. Ferrel, created in image of his living personality.")
  }
  if (primaryCommand == "quote") {
    functions.giveQuote(message, fullCommand)
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
    functions.sendMeme(message,fullCommand)
  }
  if (primaryCommand == "animeme") {
    functions.sendAnimeme(message,fullCommand)
  }
  /*
  if (primaryCommand == "aww") {
    sendCute(message,fullCommand)
  }
  */
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
    functions.mockingSpongebob(message);
  }
  if (primaryCommand == "connect") {


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
