const categoryService = require("../services/categories.service");

class CategoryController {
  getAll = async (req, res, next) => {
    const { uid } = req.body;
    if (!uid) res.status(404).json("Missing uid");
    const data = await categoryService.getAll(uid);
    // console.log(req.body);
    return res.json(data);
  };

  create = async (req, res, next) => {
    const data = await categoryService.create(req.body);
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
