const jwt = require("jsonwebtoken");

const generateAuthToken = user => {
  return (token = jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  ));
};

const generateRegistrationToken = user => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY, {
    expiresIn: "24h"
  });
};

module.exports = {
  generateAuthToken,
  generateRegistrationToken
};
