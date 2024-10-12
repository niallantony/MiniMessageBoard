const messages = [
    {
        text: "Hi, there!",
        user: "Amedo",
        added: new Date(),
        id: 0
    },
    {
        text: "Hello, world!",
        user: "Charles",
        added: new Date(),
        id: 1
    },
]

const addMessage = (userName, messageText) => {
    messages.push({
        text: messageText,
        user: userName,
        added: new Date(),
        id: messages.length,
    })
}

const indexController = (req, res) => {
    res.render("index", {title: "Mini Messageboard", messages: messages})
}

const showMessage = (req, res) => {
    const message = messages[req.params.messageID];
    res.render("openMessage", {message: message})
}

module.exports = {
    indexController,
    addMessage,
    showMessage
}