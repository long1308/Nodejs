import axios from "axios";
import dotenv from "dotenv";
import Products from "../models/product";
dotenv.config();
//validate
import { productSchema } from "../Schemas/product.js";
import Category from "../models/category";

export const getAll = async (req, res) => {
  //asc từ bé đến lớn dessc
  const { _sort = "createdAt", _limit = 10, _order = "asc" } = req.query;
  const option = {
    limit: _limit,
    sort: {
      [_sort]: _order === "asc" ? 1 : -1,
    },
  };
  try {
    // const { data } = await axios.get(`${process.env.API_URL}/products`);
    const data = await Products.paginate({}, option);

    if (data.length == 0) {
      return res.status(404).json({ message: "Lấy sản phẩm thất bại" });
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
export const get = async (req, res) => {
  try {
    // const { data } = await axios.get(
    //   `${process.env.API_URL}/products/${req.params.id}`
    // );
    // const data = await Products.find({_id : req.params.id});
    const data = await Products.findById(req.params.id).populate("categoryId");
    if (data.length == 0) {
      return res.status(400).json({ message: "Lấy sản phẩm 1 thất bại" });
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ message: error.messages });
  }
};
export const add = async (req, res) => {
  try {
    //validate
    const { error } = productSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    // const { data } = await axios.post(
    //   `${process.env.API_URL}/products`,
    //   req.body
    // );
    const data = await Products.create(req.body);
    await Category.findByIdAndUpdate(data.categoryId, {
      $addToSet: { products: data._id },
    });
    if (data.length == 0) {
      return res.status(400).json({ message: "Thêm  sản phẩm thất bại" });
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const update = async (req, res) => {
  try {
    //validate
    const { error } = productSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    // const { data } = await axios.put(
    //   `${process.env.API_URL}/products/${req.params.id}`,
    //   req.body
    // );
    const data = await Products.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (data.length == 0) {
      return res.status(400).json({ message: "Cập nhật sản phẩm thất bại" });
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
export const deleteProduct = async (req, res) => {
  // await axios.delete(`${process.env.API_URL}/products/${req.params.id}`);
  await Products.findByIdAndDelete(req.params.id);
  return res.status(200).json({ message: "Xóa sản phẩm thành công" });
};
export const getProduct = async (req, res) => {
  try {
    const { data } = await axios.get(`${process.env.API_URL}/products`);
    if (data.length == 0) {
      return res.status(404).json({ message: "Lấy sản phẩm thất bại" });
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
