const extend = require('extend');

const {MessageEmbed} = require('discord.js');

const cooldownDefaults = {
	name: '',
	cooldown: 1000,
	roles: {
		"Server Booster": 0.5,
		"Omega Follower": 0.5
	}
}

module.exports = class Cooldown {
	constructor(options = {}) {
		this.options = extend({}, cooldownDefaults, options);
		this.users = new Map();
	}
	add(userid) {
		this.users.set(userid, Date.now());
	}
	has(userid) {
		const timestamp = this.users.get(userid);
		if (timestamp == undefined) return false;
		else {
			if (timestamp + this.options.cooldown < Date.now()) {
				this.users.delete(userid);
				return false;
			} else {
				return true;
			}
		}
	}
	embed(userid) {
		const timestamp = this.users.get(userid);
		const leftMs = timestamp - Date.now();
		const left = ms(leftMs);
		return new MessageEmbed({
			title: 'Please wait for cooldown',
			description: `You have to wait \`${left}\``
		}).setColor('RED');
	}
}