const categoryModel = require("../models/categories.model");

class CategoryService {
  getAll = async (uid, category_type) => {
    const query = { uid };
    if (category_type) query.category_type = category_type;
    try {
      const data = await categoryModel.find(query);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  create = async (
    { category_name, category_icon, category_type, category_color },
    uid
  ) => {
    const holderCategory = await categoryModel.findOne({ category_name });
    if (holderCategory) return "Created failed";
    const data = await categoryModel.create({
      category_name,
      category_icon,
      category_type,
      category_color,
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

