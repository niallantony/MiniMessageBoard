const { body, validationResult } = require("express-validator");
const {  
    insertUser, 
    getUser,
    updateUser,
    deleteUser,
    getUsers 
} = require('../model/query');


const alphaErr = "must only contain letters";
const lengthErr = "must be between 1 and 10 characters.";

const usersGet = async (req, res) => {
    const { user } = req.query;
    const users = await getUsers(user);
    res.render("users", {
        title: "User List",
        users: users,
    })
}

const newUserGet = (req, res) => {
    res.render("newUser", {
        title: "New User",
        values: {}
    })
}

const userUpdateGet = async (req, res) => {
    const userId = req.params.id;
    const user = await getUser(userId)
    res.render("newUser", { 
        title: `Update ${user[0].firstname}`,
        values: user[0],
    })
}

const userDelete = async (req, res) => {
    const userId = req.params.id;
    await deleteUser(userId);
    console.log("Deleted user, ID: " + userId);
    res.redirect("/user");
    
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
    async (req, res) => {
        const user = await getUser(req.params.id);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("newUser", {
                title: `Update ${user[0].firstname}`,
                values: user[0],
                errors: errors.array(),
            });
        }
        const { firstName, lastName, email, birthday } = req.body;
        updateUser(req.params.id, { firstName, lastName, email, birthday });
        res.redirect('/');
    }
]

const newUserPost = [
    validateUser,
    (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(req.body)
            return res.status(400).render("newUser", {
                title: "New User",
                errors: errors.array(),
                values: req.body
            });
        }
        const { firstName, lastName, email, birthday } = req.body;
        insertUser(firstName, lastName, email, birthday);
        console.log(`New user: ${firstName} ${lastName}`);
        res.redirect('/')
    }
]

module.exports = {
    usersGet,
    newUserGet,
    newUserPost,
    userUpdateGet,
    userUpdatePost,
    userDelete
}