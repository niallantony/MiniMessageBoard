const { body, validationResult } = require("express-validator");
const UsersStorage = require("../model/UsersStorage");

const alphaErr = "must only contain letters";
const lengthErr = "must be between 1 and 10 characters.";

const usersGet = (req, res) => {
    res.render("users", {
        title: "User List",
        users: UsersStorage.getUsers(),
    })
}

const newUserGet = (req, res) => {
    res.render("newUser", {
        title: "New User",
        values: {}
    })
}

const userUpdateGet = (req, res) => {
    const userId = req.params.id;
    const user = UsersStorage.getUser(userId);
    res.render("newUser", { 
        title: `Update ${user.firstName}`,
        values: user,
    })
}

const validateUser = [
    body("firstName").trim()
        .isAlpha().withMessage(`First name ${alphaErr}`)
        .isLength({ min: 1, max: 10 }).withMessage(`First name ${lengthErr}`),
    body("lastName").trim()
        .isAlpha().withMessage(`Last name ${alphaErr}`)
        .isLength({ min: 1, max: 10 }).withMessage(`Last name ${lengthErr}`),
    body("email").trim()
        .isEmail().withMessage("Please enter a valid e-mail."),
    body("birthday").trim()
        .isDate({ format:'YYYY-MM-DD'}).withMessage("Please enter a valid date (YYYY-MM-DD)")
];


const userUpdatePost = [
    validateUser,
    (req, res) => {
        const user = UsersStorage.getUser(req.params.id);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("newUser", {
                title: `Update ${user.storage.firstName}`,
                values: user,
                errors: errors.array(),
            });
        }
        const { firstName, lastName, email, birthday } = req.body;
        UsersStorage.updateUser(req.params.id, { firstName, lastName, email, birthday });
        res.redirect('/');
    }
]

const newUserPost = [
    validateUser,
    (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("newUser", {
                title: "New User",
                errors: errors.array(),
                values: req.body
            });
        }
        const { firstName, lastName, email, birthday } = req.body;
        UsersStorage.addUser({ firstName, lastName, email, birthday });
        console.log(`New user: ${firstName} ${lastName}`);
        res.redirect('/')
    }
]

module.exports = {
    usersGet,
    newUserGet,
    newUserPost,
    userUpdateGet,
    userUpdatePost
}