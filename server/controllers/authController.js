const firebase = require("firebase/app");
require("firebase/auth");

const {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_ID,
  MESSAGING_SENDER_ID
} = process.env;

const config = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_ID,
  messagingSenderId: MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

module.exports = {
  ownerLogin: (req, res) => {
    let { email, password } = req.body;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(resUser => {
        req.session.ownerId = resUser.user.uid;
        req.session.loggedIn = true;
        res.send("Login Successful");
      })
      .catch(err => res.send(err));
  },
  ownerRegistration: (req, res) => {
    let { email, password } = req.body;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(resUser => {
        let ownerId = resUser.user.uid;
        req.session.ownerId = ownerId;
        req.session.loggedIn = true;
        req.app
          .get("db")
          .register_owner([ownerId, email])
          .then(() => {
            res.send("Signup Successful");
          })
          .catch(err => res.send(err));
      })
      .catch(err => res.send(err));
  },
  getAuthStatus: (req, res) => {
    res.send(req.session.loggedIn ? req.session.loggedIn : false);
  },
  setAuthStatus: (req, res) => {
    req.session.loggedIn = false;
    res.sendStatus(200);
  }
};
