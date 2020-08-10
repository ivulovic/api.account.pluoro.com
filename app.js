const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { dbDev } = require("./server/config");
const limiterMiddleware = require("./server/middlewares/limiter.middleware").middleware;

const app = express();
const mongoose = require("mongoose");

const port = process.env.PORT || 5001;


mongoose.Promise = global.Promise;
mongoose
  .connect(app.get("env") === "development" ? dbDev : process.env.DB_STRING, { useNewUrlParser: true })
  .then(function (res) {
    console.log("Auth app, connected successfully.");
  })
  .catch(function () {
    console.log("Auth app, connecting failed.");
  });

// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


// 1 point = 1 IP address
// This limits user to make 10 request per second. 


app.use(limiterMiddleware.rateLimiterMiddleware);
// app.use(limiters.loginAttemptLimiterMiddleware);


// Account
const accountRoutes = require("./server/routes/account.routes");

// ROUTES
app.use("/auth/account", accountRoutes);

// app.get('/api/t0', (req, res) => {
//   res.cookie('TestAuthorizationNormal', 'TestAuthorizationNormalVALUE', { maxAge: 900000, expires: new Date(Date.now() + 9999999), path: "/", httpOnly: false, secure: false, });
//   res.cookie('TestAuthorizationSecure', 'TestAuthorizationSecureVALUE', { maxAge: 900000, expires: new Date(Date.now() + 9999999), path: "/", httpOnly: true, secure: true });
//   res.status(200).json({ user: 'Ivan', token: 'token' });
// })

// app.get('/api/t1', (req, res) => {
//   res.cookie('TestAuthorizationNormal2', 'TestAuthorizationNormalVALUE2', { maxAge: 900000, expires: new Date(Date.now() + 9999999), path: "/", httpOnly: false, secure: false, });
//   res.cookie('TestAuthorizationSecure2', 'TestAuthorizationSecureVALUE2', { maxAge: 900000, expires: new Date(Date.now() + 9999999), path: "/", httpOnly: true, secure: true });
//   res.status(200).json({
//     id: 1,
//     name: "Asia",
//     population: "4,624,520,000",
//     no_of_countries: 50,
//     area: "44,579,000"
//   });
// })

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})  