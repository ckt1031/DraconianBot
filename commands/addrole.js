const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

  //!addrole <@user> <Role>
  if(args[0] == "help"){
    let helpembxd = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .addField("Addrole Command", "Usage: !addrole <@user> <role>")

    message.channel.send(helpembxd);
    return;
  } 
  let embed6 = new Discord.MessageEmbed()
    .setDescription(
      `:no_entry_sign: ${message.author.username}, you have no permission to run this command`
    )
    .setColor("RED");

  let xdemb = new Discord.MessageEmbed()
  .setColor("#00ff00")
  .setTitle(`Addrole command`)
  .addField("Description:", "Add role to member", true)
  .addField("Usage", "!addrole [user] [role]", true)
  .addField("Example", "!addrole @koolisw Member")

  if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(embed6);
  let rMember = message.mentions.users.first();
  if(!rMember) return message.channel.send(xdemb);

  let role = args.join(" ").slice(22);
  if(!role) return message.channel.send("Specify a role!");
  let gRole = client.guilds.cache.get(message.guild.id).roles.cache.find(val => val.name === role);
  if(!gRole) return message.channel.send("Couldn't find that role.");

  if(rMember.roles.has(gRole.id)) return message.channel.send("This user already have that role.");
  await(rMember.addRole(gRole.id));

    await message.channel.send(`<:tick:702386031361523723>***I just gave ${rMember.user.username} the ${gRole.name} role!***`)

    message.delete();
  
}

module.exports.help = {
  name: "addrole",
  description: 'Add role to someone',
  usage: 'addrole <@user> <Role>'
}