import joi from "joi";
import Category from "../models/category";
import Movies from '../models/movies'
const categorySchema = joi.object({
  name: joi
    .string()
    .required()
    .messages({ "any.required": "Vui lòng nhập danh mục" }),
});

const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      res.status(400).json({
        message: "Không có danh mục nào",
      });
    }
    return res.json({
      message: "Get thành công Category",
      categories,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

const getOneCategory = async (req, res) => {
  const { id } = req.params
  try {
      const category  = await Category.findById(id)
      res.send(category)
  } catch (err) {
      res.status(500).send({
          message: "Có lỗi xảy ra"
      })
  }
  res.end()
};

 
const addCategory = async (req, res) => {
  try {
    const { error } = categorySchema.validate(req.body);
    if (error) {
      return res.json({
        message: error.details.map((err) => err.message),
      });
    }
    const newCategory = await Category.create(req.body);
    if (!newCategory) {
      return res.json({
        message: "Không thêm được danh mục",
      });
    }
    return res.json({
      message: "Thêm thành công danh mục",
      newCategory,
    });
  } catch (error) {
    return res.json({
      message: error,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const updateCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updateCategory) {
      return res.json({
        message: "Không cập nhật được sản phẩm",
      });
    }
    return res.json({
      message: "Cập nhật thành công category",
      updateCategory,
    });
  } catch (error) {}
};

const deleteCategory = async (req, res) => {
  try {
    if (req.params.id) {
      const category = await Category.findOneAndDelete(req.params.id);
      return res.json({ message: "Xoa thanh cong", category });
    } else {
      return res.json({ message: "Không tồn tại id" });
    }
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export {
  getAllCategory,
  getOneCategory,
  addCategory,
  updateCategory,
  deleteCategory,
};
