const categoryModel = require("../models/categories.model");

class CategoryService {
  getAll = async (uid) => {
    const data = await categoryModel.find({ uid: uid });
    return data;
  };

  create = async ({ category_name, category_icon, uid }) => {
    const holderCategory = await categoryModel.findOne({ category_name });
    if (holderCategory) return "Created failed";
    const data = await categoryModel.create({
      category_name,
      category_icon,
      uid: uid,
    });

    if (!data) return "Created failed";
    return data;
  };

  edit = async (category_id, payload) => {
    const edit = await categoryModel.findOneAndUpdate(
      { _id: category_id },
      payload,
      { new: true }
    );
    return edit;
  };

  delete = async (category_id) => {
    const del = await categoryModel.findByIdAndDelete(
      { _id: category_id },
      { new: true }
    );
    return del;
  };
}

module.exports = new CategoryService();
