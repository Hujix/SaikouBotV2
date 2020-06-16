const warnUtil = require('../../commands/utils/warn');

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

const inviteLink = /discord\.gg|discordapp.com\/invite|discord.com\/invite/m;

module.exports = (client, message) => {
	antiSpam.message(message);
	if (inviteLink.test(message.content)) {
		message.delete();
		message.reply('You have been warned for sending invite');
		warnUtil.addWarn({
			user: message.author.id,
			guild: message.guild.id,
			warn: {
				moderator: message.client.user.id,
				reason: 'Invite link'
			}
		});
	}
};

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
