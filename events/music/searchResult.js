module.exports = async (client, message, result) => {
	let i = 0;
		message.channel.send(
			`**Choose an option from below**\n${result
				.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``)
				.join('\n')}\n*Enter anything else or wait 60 seconds to cancel*`
		);
}