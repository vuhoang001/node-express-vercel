const categoryModel = require("../models/categories.model");

const {
  BadRequestError,
  NotFoundError,
  ConflictError,
} = require("../core/error.response");

class CategoryService {
  getAll = async (uid, category_type) => {
    if (!uid) throw new BadRequestError("Error: Missing uid");

    const query = { uid };
    if (category_type) query.category_type = category_type;
    const data = await categoryModel.find(query);

    return data;
  };

  create = async (
    { category_name, category_icon, category_type, category_color },
    uid
  ) => {
    if (!uid) throw new BadRequestError("Error: Missing uid");

    const holderCategory = await categoryModel.findOne({ category_name });

    if (holderCategory) throw new ConflictError("Error: Category is existed!");

    const data = await categoryModel.create({
      category_name,
      category_icon,
      category_type,
      category_color,
      uid: uid,
    });

    if (!data) throw new BadRequestError("Created failed!");
    return data;
  };

  edit = async (category_id, payload) => {
    const holderCategory = await categoryModel.findOne({ _id: category_id });
    if (!holderCategory) throw new NotFoundError("Error: Cant find category");

    const edit = await categoryModel.findOneAndUpdate(
      { _id: category_id },
      payload,
      { new: true }
    );

    if (!edit)
      throw new BadRequestError(
        "Error: Something went wrong! Can not edit category"
      );
    return edit;
  };

  delete = async (category_id) => {
    const holderCategory = await categoryModel.findOne({ _id: category_id });

    if (!holderCategory) throw new NotFoundError("Cant found category");

    const del = await categoryModel.findByIdAndDelete(
      { _id: category_id },
      { new: true }
    );

    if (!del)
      throw new BadRequestError(
        "Something went wrong! Can not delete category"
      );
    return del;
  };
}

module.exports = new CategoryService();
