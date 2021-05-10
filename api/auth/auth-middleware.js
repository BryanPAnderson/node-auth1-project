const dbConfig = require("../../data/db-config")
const db = require("../../data/db-config")

/*
  If the user does not have a session saved in the server

  status 401
  {
    "message": "You shall not pass!"
  }
*/
function restricted() {
  return async (req, res, next) => {
    try {
      if (!req.session || req.session.user) {
        res.status(401).json({
          message: "you shall not pass!"
        })
      }
    }
    catch (err) {
      next(err)
    }
  }
}

/*
  If the username in req.body already exists in the database

  status 422
  {
    "message": "Username taken"
  }
*/
function checkUsernameFree() {
  return async (req, res, next) => {
    try {
      if (req.body.username === db.username) {
        res.status(422).res.json({
          message: "Username taken"
        })
      }
    }
    catch(err) {
      next(err)
    }
  }
}

/*
  If the username in req.body does NOT exist in the database

  status 401
  {
    "message": "Invalid credentials"
  }
*/
function checkUsernameExists() {
  return async (req, res, next) => {
    try {
      if (req.body.username !== db.username) {
        res.status(401).json({
          message: "Invalid credentials"
        })
      }
    } catch (err) {
      next(err)
    }
  }
}

/*
  If password is missing from req.body, or if it's 3 chars or shorter

  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
*/
function checkPasswordLength() {
  return async (req, res, next) => {
    try {
      if (!req.body.password || req.body.password.length < 3) {
        res.status(422).json({
          message: "Password length mus be longer than 3 characters"
        })
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = {
  restricted,
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength
}
