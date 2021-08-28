exports.sendFlightData = async(req, res, next) => {
  console.log(req.body)
  res.send({
    data : "mantap"
  })
};
