const AntiSpam = require('discord-anti-spam');
const antiSpam = new AntiSpam({
	warnThreshold: 3,
	kickThreshold: 5,
	banThreshold: 7,
	maxInterval: 2000,
	warnMessage: '{@user}, You have been warned for spamming',
	kickMessage: '**{user_tag}** has been kicked for spamming.',
	banMessage: '**{user_tag}** has been banned for spamming.',
	maxDuplicatesWarning: 3,
	maxDuplicatesKick: 5,
	maxDuplicatesBan: 10,
	maxDuplicatesInterval: 5000,
	exemptPermissions: [],
	ignoreBots: true,
	ignoredUsers: [],
});

module.exports = {
	name: 'antiSpam',
	construct(client) {
		const warnUtil = client.utils.warn;
		antiSpam.on('warnAdd', member => {
			warnUtil.addWarn({
				user: member.id,
				guild: member.guild.id,
				warn: {
					moderator: member.client.user.id,
					reason: 'Auto mod',
				},
			});
		});
		return antiSpam;
	}
};
