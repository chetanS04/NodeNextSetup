const prisma = require("../services/prismaClient");

const products = async (req, res) => {
  try {
    const { title, description, price, location,status } = req.body;

    const newProduct = await prisma.products.create({
      data: {
        title: title,
        description: description,
        price: String(price),
        location: location,
        status:status,
        createdAt: new Date(),
      },
    });
    return res
      .status(201)
      .json({ message: "Product created Successfully !", newProduct });
  } catch (error) {
    console.error("Registration Failed", error);
    return res.status(500).json({message:"Internal server error"});
  }
};

const getProducts = async (req, res) => {
  try {
    const getAll = await prisma.products.findMany({
      select: {
        id:true,
        title: true,
        description: true,
        price: true,
        status:true,
        location: true,
      },
    });

    return res.status(200).json({
      message: "Fetched all products successfully",
      data: getAll,
    });
  } catch (error) {
    console.error('Something went wrong:', error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const updateProducts = async (req, res) => {
  try {
    const { id } = req.params; 
    const { title, description, price, location, status } = req.body;

    const existingProduct = await prisma.products.findUnique({ where: { id: Number(id) } });

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await prisma.products.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        price: String(price),
        location,
        status,
        updateAt: new Date(), 
      },
    });

    return res.status(200).json({
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (error) {
    console.error('Something went wrong:', error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};



const deleteProduct = async (req, res) => {
  const id = parseInt(req.params.id); 

  try {
    const deletedProduct = await prisma.products.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "Product deleted", product: deletedProduct });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
};



module.exports = {
    products,
    getProducts,
    deleteProduct,
    updateProducts
}