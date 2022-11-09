import Product from "../models/product";

export const list = (req, res) => {
    res.json(products);
};
export const read = (req, res) => {
    try {
        const id = req.params.id;
        const product = products.find((item) => {
            return item.id == id;
        });
        res.json(product);
    } catch (error) {
        res.status(400).json({
            message: "Product not found",
        });
    }
};
export const add = async (req, res) => {
    // Promise trong javascript
    try {
        // Nhan gia tri tu client gui len
        const body = req.body;
        // khoi tao 1 doi tuong Product va luu vao database
        const product = await new Product(body).save();

        // Neu thanh cong thi tra ve client ket qua - san pham vua them vào db
        return res.status(200).json({
            product,
        });
    } catch (error) {
        res.status(400).json({
            messsage: "Không thêm được sản phẩm",
        });
    }
};
export const update = (req, res) => {
    console.log("update controller");
    const id = req.params.id;
    const product = req.body;

    // Tìm sản phẩm trong mảng, và cập nhật ( nếu cùng ID ngược lại thì bỏ qua)
    const newProducts = products.map((item) => (item.id == id ? product : item));

    // Tìm sản phẩm trong mảng mới, và trả về
    const currentProduct = newProducts.find((item) => item.id == id);
    res.json(currentProduct);
};
export const remove = (req, res) => {
    const id = req.params.id;
    // trả về 1 mảng mới, không bao gồm sản phẩm có id gửi lên
    res.json(products.filter((item) => item.id != id));
};
// feat: create product API
// fix: API create product
// style: button global
// refactor: product controller
