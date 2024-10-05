//use uptimerobot for uptime

// Requirements and Variables
require('dotenv').config();
const keepAlive = require(`./server`);
const { Client, ActivityType } = require('discord.js');
const client = new Client({ intents: 32767 });

// Array of Command objects
const cmds = [
    {
        name: `thoughts`,
        description: `Unsa kahay gihuna huna aning npc?`,
        async execute(interaction) { // Execute function
            await interaction.reply({
                content: `PAGTUON MO, SIGE MAG DISCORD OY!`,
                files: [{
                    attachment: 'pictures/ehpaanokung.jpg',
                    name: 'npc.jpg',
                }],
            });
        },
    },
    {
        name: `schedule`,
        description: `Check schedule with rooms`,
        async execute(interaction) { // Execute function
            await interaction.reply({
                content: `Here are the updated schedule with rooms.`,
                files: [{
                    attachment: 'pictures/sched.png',
                    name: 'npc.png',
                }],
            });
        },
    },
]

// Prefix Commands - FAULTY
client.on('message', (message) => {
    if (message.author.bot) {
        return;
    }
    if (message.content === 'npc help') {
        message.reply('`npc check - kamustahon nimo si npc\nnpc thoughts - unsay ganahan isulti ni npc karon`');
    }
});

// Interaction Create Event
client.on('interactionCreate', async interaction => {
    if (interaction.isCommand()) {
        await cmds.forEach(async command => {
            if (interaction.commandName == command.name) {
                try {
                    await command.execute(interaction);
                } catch (error) {
                    console.error(error);
                }
            }
        });
    }
});

// Ready Event
client.on('ready', async () => {
    console.log(`Testing bot is now online successfully!`);
    await client.guilds.cache
        .get(process.env['serverId'])
        .commands.set(cmds);
    client.user.setActivity(status[0]);
    client.user.setPresence({
        status: 'idle'
    });
});

// Bot Status
let status = [
    {
        name: 'VALORANT',
        type: ActivityType.Playing,
    },
];

// Bot Login
client.login(process.env['token']);
keepAlive();