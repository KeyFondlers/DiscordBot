const { Command } = require('@sapphire/framework');

class ReminderCommand extends Command {
	constructor(context, options) {
		super(context, {
			...options,
			name: 'reminder',
			description: 'Set a reminder',
		});
	}

	registerApplicationCommands(registry) {
		registry.registerChatInputCommand((builder) =>
			builder
				.setName(this.name)
				.setDescription(this.description)
				.addRoleOption((option) =>
					option
						.setName('role')
						.setDescription('The role to remind'),
				)
				.addStringOption((option) =>
					option
						.setName('time')
						.setDescription('The time for the riminder | Time format: `YYYY-MM-DDTHH:MM:SS`'),
				)
				.addStringOption((option) =>
					option
						.setName('message')
						.setDescription('The message for the reminder'),
				),
		);
	}

	async chatInputRun(interaction) {
		const role = interaction.options.getRole('role', true);
		const time = interaction.options.getString('time', true);
		let message = interaction.options.getString('message', false);

		if (message == null) {
			message = 'Reminder!';
		}

		const delay = parseTime(time);
		if (delay === null) {
			await interaction.reply('Invalid time format Please use a valid time format like `2023-02-22T13:17:00`');
			return;
		}

		interaction.reply('Reminder set!');

		setTimeout(() => {
			return interaction.channel.send(`${role} ${message}`);
		}, delay);
	}
}

function parseTime(time) {
	const targetDate = Date.parse(time);

	console.log(targetDate);

	if (isNaN(targetDate)) {
		return null;
	}

	const milliseconds = targetDate - Date.now();

	return milliseconds;
}

module.exports = {
	ReminderCommand,
};