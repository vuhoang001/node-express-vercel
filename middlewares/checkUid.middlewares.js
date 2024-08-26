const HEADER = {
  CLIENT_ID: "x-client-id",
};

const checkUid = async (req, res, next) => {
  const uid = req.headers[HEADER.CLIENT_ID];
  if (!uid) return res.status(404).json("Failed to request to server!");
  req.uid = uid;
  next();
};

module.exports = { checkUid };
