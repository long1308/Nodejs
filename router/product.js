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
router.get("/products", checkPermission, getAll);
router.get("/products/:id", checkPermission, get);
router.post("/products", checkPermission, add);
router.put("/products/:id", checkPermission, update);
router.delete("/products/:id", checkPermission, deleteProduct);

export default router;
