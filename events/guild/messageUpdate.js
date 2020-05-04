module.exports = (client, oldMessage, newMessage, message, member) => {

    const { MessageEmbed } = require('discord.js')
    const Colour = require('../../colours.json')

    if (newMessage.author.bot || oldMessage.content == newMessage.content) return;
    if (oldMessage.channel.name == "👥management") return;
    if (oldMessage.channel.name == "🔧project-untitled") return;
    if (oldMessage.channel.name == "🔒classified") return;

    const oldMessageShorten = oldMessage.content.length > 900 ? oldMessage.content.substring(0, 850) + '...' : oldMessage.content;
    const newMessageShorten = newMessage.content.length > 900 ? newMessage.content.substring(0, 850) + '...' : newMessage.content;


    let messageEdit = new MessageEmbed()
        .setTitle(':warning: Warning!')
        .setColor(Colour.yellow)
        .setDescription(`**Message sent by <@${oldMessage.author.id}> edited in ${oldMessage.channel}** [Jump to message](${newMessage.url})`)
        .addField('Before', oldMessageShorten)
        .addField('After', newMessageShorten)
        .setFooter(`User ID: ${oldMessage.author.id}`)
        .setTimestamp();

    client.channels.cache.get('409832539360854019').send(messageEdit);

}