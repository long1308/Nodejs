import express from "express";
import {
  add,
  deleteProduct,
  get,
  getAll,
  update,
} from "../controllers/product";
import { checkPermission } from "../middlewares/checkPermission";
const router = express.Router();
router.get("/products", getAll);
router.get("/products/:id", get);
router.post("/products", add);
router.put("/products/:id", update);
router.delete("/products/:id", deleteProduct);

export default router;
