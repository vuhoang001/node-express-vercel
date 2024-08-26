const HEADER = {
  CLIENT_ID: "client_id",
};

const checkUid = async (req, res, next) => {
  const uid = req.headers[HEADER.CLIENT_ID];
  if (!uid) {
    return res.status(400).json({ message: "Client ID is required" });
  }
  req.uid = uid;
  next();
};

module.exports = { checkUid };
