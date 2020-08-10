module.exports = {
  dbDev: "mongodb://localhost:27017/pluoro",
  distributionRoot: "build",
  routes: "./server/routes/",
  secret: process.env.NODE_ENV === "production" ? process.env.TOKEN_SECRET : "53jkdj9843953fsfwertyuibvhdjkdfdfd"
};