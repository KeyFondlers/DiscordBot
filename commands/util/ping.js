const commando = require('discord.js-commando');

class PingCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'ping',
			group: 'util',
			memberName: 'ping',
			description: 'Ping the bot',
		});
	}

	async run(message) {
		message.reply('Pong!');
	}

}

module.exports = PingCommand;