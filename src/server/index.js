const Koa = require("koa");
const bodyParser = require('koa-bodyparser');
const session = require("koa-session");
const passport = require("koa-passport");

const indexRoutes = require("./routes/index");
const movieRoutes = require("./routes/movies");
const authRoutes = require("./routes/auth");

const app = new Koa();
const PORT = process.env.PORT || 1337;

// sessions
app.keys = ['\xe6^\x96\xe0*\x97\x1fg\x1d\xfc\xf6\xcb$Hf\x93\xa6\xbe\x93_\x07P\x1c\x05'];
app.use(session(app));

// Body parser
app.use(bodyParser());

// Auth
require('./auth');
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use(indexRoutes.routes());
app.use(movieRoutes.routes());
app.use(authRoutes.routes());

const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
})

module.exports = server;
