const categoryService = require("../services/categories.service");

const { SuccessResponse } = require("../core/success.response");

class CategoryController {
  getAll = async (req, res, next) => {
    const uid = req.uid;
    const category_type = req.query.category_type;
    new SuccessResponse({
      message: "Get all success!",
      metadata: await categoryService.getAll(uid, category_type),
    }).send(res);
  };

  create = async (req, res, next) => {
    const uid = req.uid;
    new SuccessResponse({
      message: "Created success!",
      metadata: await categoryService.create(req.body, uid),
    }).send(res);
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
