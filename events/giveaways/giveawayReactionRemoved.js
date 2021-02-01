module.exports = async (giveaway, member, reaction) => {
	console.log(
		`${member.user.tag} unreact to giveaway #${giveaway.messageID} (${
		reaction.emoji.name
		})`
	);
}