module.exports = {
  Ok: { status: 200, message: "" },
  Unauthorized: { status: 403, message: "Unauthorized" },
  NotFound: { status: 404, message: "Not Found" },
  EmailOccupied: { status: 403, message: "User with such E-mail already exists." },
  TooManyConnections: { status: 429, message: "Too Many Requests. Your IP has been blocked." },
  TooManyIncorrectLoginAttempts: (time) => ({ status: 429, message: "Too Many Incorrect Login Attempts. Try again in " + time + " minutes" })
}