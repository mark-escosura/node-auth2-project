const router = require("express").Router();
const bcrypt = require("bcryptjs")
const { checkUsernameExists, validateRoleName, checkUsernameFree, checkPasswordLength } = require('./auth-middleware');
const { JWT_SECRET, BCRYPT_ROUNDS } = require("../secrets"); // use this secret!
const jwt = require("jsonwebtoken")
const User = require("../users/users-model.js");

router.post("/register", checkUsernameFree, validateRoleName, checkPasswordLength, (req, res, next) => {
  // 1- pull username and password from the req.body
  const {username, password} = req.body
  // 2- pull role_name from req (can be found in 'validateRoleName' middleware)
  const {role_name} = req
  // 3- we need to make a hash
  const hash = bcrypt.hashSync(password, BCRYPT_ROUNDS)
  // 4- use the add model function to insert username, password, and role_name into the database
  User.add({username, password: hash, role_name})
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
  // 1- Check credentials and then issue a token if the credentials are good

  const { username, password } = req.body

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
