const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const secret = process.env.JWT_SECRET;

const verifytoken = (request, response, next) => {
  //checking token is valid or not
  const authtoken = request.header("token");
  const newtoken = authtoken.split(" ");
  const token = newtoken[1];
  if (!token) {
    response.status(401).send({ error: "Please authenticate using valid token" });
  }

  try {
    const data = jwt.verify(token, secret);
    request.id = data.user.id;
    next();
  } catch (error) {
    response.status(401).send({ error: "Please authenticate using valid token" });
  }
};

module.exports = verifytoken;