const { addMessage } = require('./indexController');

const get = (req, res) => {
    res.render('newForm',{cancelClick: cancel});
}

const post = (req, res) => {
    addMessage(req.body.username, req.body.messagetext);
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