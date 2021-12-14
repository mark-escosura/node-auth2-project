const router = require("express").Router();
const bcrypt = require("bcryptjs")
const { checkUsernameExists, validateRoleName } = require('./auth-middleware');
const { JWT_SECRET, BCRYPT_ROUNDS } = require("../secrets"); // use this secret!
const User = require("../users/users-model.js");

router.post("/register", validateRoleName, (req, res, next) => {
  const {username, password} = req.body // pulling username and password from req.body
  const {role_name} = req

  const hash = bcrypt.hashSync(password, BCRYPT_ROUNDS) // password hashed
  
  User.add({ username, password: hash, role_name }) // inserts user object inside the add function
    .then(user => {
      res.status(201).json(user)
    })
    .catch(next)

    /**
    [POST] /api/auth/register { "username": "anna", "password": "1234", "role_name": "angel" }

    response:
    status 201
    {
      "user"_id: 3,
      "username": "anna",
      "role_name": "angel"
    }
   */

});
  



router.post("/login", checkUsernameExists, (req, res, next) => {


  /**
    [POST] /api/auth/login { "username": "sue", "password": "1234" }

    response:
    status 200
    {
      "message": "sue is back!",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ETC.ETC"
    }

    The token must expire in one day, and must provide the following information
    in its payload:

    {
      "subject"  : 1       // the user_id of the authenticated user
      "username" : "bob"   // the username of the authenticated user
      "role_name": "admin" // the role of the authenticated user
    }
   */
});

module.exports = router;
