const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const knex = require('./db/connection');

const options = {};

passport.serializeUser((user, done) => { done(null, user); });

passport.deserializeUser((user, done) => { done(null, user); });

// passport.deserializeUser((user, done) => {
//   return knex('users').where({user}).first()
//   .then((user) => { done(null, user); })
//   .catch((err) => { done(err,null); });
// });


// passport.deserializeUser((user, done) => {
//     console.log("tu pakra gya lagta hy " , id);
//     return knex('users')
//     .where({}).first()
//     .then((user) => { done(null, user); })
//     .catch((err) => { done(err, null); });
// });

passport.use(new LocalStrategy(options, (username, password, done) => {
    knex('users').where( {username} ).first()
    .then((users) => {
        if (!user) return done(null, false);
        if(password === user.password) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    })
    .catch((err) => {
        return done(err);
    });
}));

function comparePass(userPassword, databasePassword) {
    return bcrypt.compareSync(userPassword, databasePassword);
}

passport.use(new LocalStrategy(options, (username, password, done) => {
    knex('users').where({ username }).first()
    .then((user) => {
      if (!user) return done(null, false);
      if (!comparePass(password, user.password)) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    })
    .catch((err) => { return done(err); });
  }));