const { Client } = require("discord.js")
const Discord = require("discord.js")
const token = ""
const client = new Discord.Client({
    intents: [
        "Guilds",
        "GuildVoiceStates"
    ]
});
const { Player } = require("discord-player");
const player = new Player(client);
client.player = player;
client.once("ready", () => {
    console.log("Bot "+client.user.username+" ismiyle aktif!");
});
client.on('ready', async () => {
const command = [{
    name: 'sorgu',
    description: 'Bir video hakkında bilgi alırsın!',
    type: 1,
    options: [
   {
       name:"isim",
       description:"Hangi video hakkında bilgi almak istiyorsun?",
       type:3,
       required:true
   }]

}]
 await client.application.commands.set(command)
})

client.on('interactionCreate', async (interaction) => {
if (!interaction.isCommand()) return;
if (interaction.commandName !== "sorgu") return;
const query = interaction.options.getString('isim')
await interaction.deferReply();
const track = await player.search(query, {
    requestedBy: interaction.user
}).then(x => x.tracks[0]);
if (!track) return await interaction.followUp({ content: `❌ | **${query}** Adında bir arama sonucu bulunamadı.` });

const embed = new Discord.EmbedBuilder()
.addFields({name: "Başlık", value: `${track.title}`, inline: true})
.addFields({name: "Yükleyen", value: `${track.author}`, inline: true})
.addFields({name: "Süre", value: `${track.duration}`, inline: true})
.addFields({name: "Görüntülenme", value: `${track.views}`, inline: true})
.addFields({name: "Küçük Resim", value: "[Click]("+track.thumbnail+")", inline: true})
.addFields({name: "Video", value: "[Click]("+track.url+")", inline: true})
.setColor("Aqua")
.setImage(`${track.thumbnail}`)
return interaction.followUp({ embeds: [embed]}).catch(err => {})
})
client.login(token)
