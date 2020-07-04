function getUserMod(message, toFind = '') {
	toFind = toFind.toLowerCase();
	let target = message.guild.members.cache.get(toFind);

	if (!target && message.mentions.members) {
		target = message.mentions.members.first();
	}

	if (!target && toFind) {
		target = message.guild.members.cache.find(member => {
			return member.displayName.toLowerCase().includes(toFind) || member.user.tag.toLowerCase().includes(toFind);
		});
	}

	return target;
}

module.exports = {
	name: 'getUserMod',
	construct(client) {
		return getUserMod;
	}
};
