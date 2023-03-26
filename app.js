// const http = require("http");

// const server = http.createServer((req, res) => {
//   const url = req.url;
//   console.log(url);
//   if (url === "/product") {
//     res.setHeader("Content-Type", "application/json");
//     // res.setHeader("Content-Type", "text/html");
//     const data = [
//       { id: 1, name: "Product A" },
//       { id: 2, name: "Product B" },
//     ];
//     res.end(JSON.stringify(data));
//   } else if (url === "/posts") {
//     res.setHeader("Content-Type", "application/json");
//     const data = [
//       { id: 1, name: "Post A" },
//       { id: 2, name: "Post B" },
//     ];
//     res.end(JSON.stringify(data));
//   } else {
//     res.setHeader("Content-Type", "text/html");
//     res.write("<html>");
//     res.write("<body>");
//     res.write("<h1>Homedd Page</h1>");
//     res.write("</body>");
//     res.write("</html>");
//     res.end();
//   }
// });

// const PORT = 8080;

// server.listen(PORT, () => {
//   console.log(`Server running port localhost:${PORT}`);
// });

// import express from "express";
// import axios from "axios";

// const app = express();
// //chuyển đổi
// app.use(express.json());
// const PORT = 8080;
// app.listen(PORT, () => {
//   console.log(`Server running port localhost:${PORT}`);
// });
// app.get("/api/products", async (req, res) => {
//   try {
//     const { data: products } = await axios.get(
//       "https://63f5d86059c944921f67a58c.mockapi.io/products"
//     );
//     if (products.length === 0) {
//       return res.status(404).json({
//         message: "Không có sản phẩm nào",
//       });
//     }
//     res.json({
//       message: "Lấy danh sách sản phẩm thành công",
//       products,
//     });
//   } catch (error) {
//     res.status(400).json({
//       message: "Lấy danh sách sản phẩm thất bại",
//     });
//   }
// });
// app.get("/api/products/:id", async (req, res) => {
//   const id = req.params.id;
//   const { data: product } = await axios.get(
//     `https://63f5d86059c944921f67a58c.mockapi.io/products/${id}`
//   );
//   res.json({
//     message: "Lấy 1 sản phẩm thành công",
//     product,
//   });
// });
// app.post("/api/products", async (req, res) => {
//   const { data: product } = await axios.post(
//     `https://63f5d86059c944921f67a58c.mockapi.io/products`,
//     req.body
//   );
//   console.log(product);
//   res.json({
//     message: "Thêm sản phẩm thành công",
//     product,
//   });
// });

// app.put("/api/products/:id", async (req, res) => {
//   const { data: product } = await axios.put(
//     `https://63f5d86059c944921f67a58c.mockapi.io/products/${req.params.id}`,
//     req.body
//   );
//   res.json({
//     message: "Cập nhật sản phẩm thành công",
//     product,
//   });
// });
// app.delete("/api/products/:id", async (req, res) => {
//   const { data: product } = await axios.delete(
//     `https://63f5d86059c944921f67a58c.mockapi.io/products/${req.params.id}`
//   );
//   res.json({
//     message: "Xóa sản phẩm thành công",
//     product,
//   });
// });

import express from "express";
import dotenv from "dotenv";
import productRouter from "./router/product";
import autherRouter from "./router/auth";
dotenv.config();
const app = express();
app.use(express.json());
app.use("/api", productRouter);
app.use("/api", autherRouter);
// connect tới mongoDB
import mongoose from "mongoose";
mongoose.connect('mongodb://127.0.0.1:27017/web17302')
export const viteNodeApp = app;

