const categoryService = require("../services/categories.service");
const { Types } = require("mongoose");
class CategoryController {
  getAll = async (req, res, next) => {
    const uid = req.uid;
    const category_type = req.query.category_type;
    if (!uid) res.status(404).json("Missing uid");

    const data = await categoryService.getAll(uid, category_type);
    return res.json(data);
  };

  create = async (req, res, next) => {
    const uid = req.uid;
    if (!uid) res.status(501).json("Missing uid");
    const data = await categoryService.create(req.body, uid);
    return res.json(data);
  };

  edit = async (req, res, next) => {
    const id = req.query.category_id;
    const data = await categoryService.edit(id, req.body);
    return res.json(data);
  };

  delete = async (req, res, next) => {
    const id = req.query.category_id;
    const data = await categoryService.delete(id);
    return res.json(data);
  };
}

module.exports = new CategoryController();
