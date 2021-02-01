module.exports = async (giveaway, member, reaction) => {
	console.log(
			`${member.user.tag} entered giveaway #${giveaway.messageID} (${
			reaction.emoji.name
			})`
		);
};