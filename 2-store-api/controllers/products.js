const getAllProducts = async (req, res) => {
  res.status(200).json({
    msg: "Haiii",
  });
};

module.exports = {
  getAllProducts,
};
