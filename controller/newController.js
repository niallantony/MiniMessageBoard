const { addMessage } = require('./indexController');

const get = (req, res) => {
    res.render('newForm',{cancelClick: cancel});
}

const post = (req, res) => {
    addMessage(req.body.username, req.body.messagetext);
    console.log(`Message posted by: ${req.body.username} at ${new Date().toString()}`)
    res.redirect('/')
    console.log("Posted...")
}

const cancel = (req, res) => {
    console.log("cancelled")
}

module.exports = {
    get, 
    post, 
}