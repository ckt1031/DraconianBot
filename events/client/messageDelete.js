module.exports = function (client, message, channel) {
	if(!message.author) return
  client.snipes.set(message.channel.id, {
    content: message.content,
    author: message.author.username+'#'+message.author.discriminator,
    image: message.attachments.first()
      ? message.attachments.first().proxyURL
      : null,
  });
};
