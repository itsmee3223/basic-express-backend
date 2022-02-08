const login = async (req, res) => {
  res.send("Login horee");
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: "Heloo simican",
    secret: `Her isi you lucky number ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
