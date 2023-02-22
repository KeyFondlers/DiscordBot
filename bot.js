const { REST, Routes } = require('discord.js');

const config = require('./config.json');

const commands = [
	{
		name: 'ping',
		description: 'Replies with Pong!',
	},
];

const rest = new REST({ version: '10' }).setToken(config.TOKEN);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(Routes.applicationCommands(config.CLIENT_ID), { body: commands });

		console.log('Successfully reloaded application (/) commands.');
	}
	catch (error) {
		console.error(error);
	}
})();

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const cron = require('node-cron');

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	const botchannel = client.channels.cache.get('1078010183818690622');
	const physicschannel = client.channels.cache.get('1068340559443415220');
	const kfgeneral = client.channels.cache.get('1068332069572313182');
	botchannel.send('I\'m online!');

	cron.schedule('0 12 * * *', () => {
		kfgeneral.send('Its High Noon!');
	});

	cron.schedule('0 12 * * 0', () => {
		physicschannel.send(':alarm_clock:  PRELECTURE READING WARNING :alarm_clock: \n @everyone https://tenor.com/view/dont-you-need-to-be-getting-to-work-sharon-marsh-stan-marsh-south-park-s16e10-gif-23122684');
	});

});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!');
	}
});

client.login(config.TOKEN);