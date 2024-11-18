const { Products } = require('../models')


const getAllProducts = async (_req, res) => {
    try{
        const products = await Products.findAll();
        res.json(products);
    } catch(error) {
        console.log(error);
        res.status(500).json({error: "erro no sistema"})
    }
}

const createProducts = async (req, res) => {
    const {discountPercentual, category, productName, discountPrice, price, isDiscount } = req.body;

    if (!discountPercentual || !category || !productName || !discountPrice || !price || !isDiscount) {
        return res.status(400).json({ error: "Campos obrigatórios" });
    }

     try {
        const newProduct = await Products.create({ discountPercentual, category, productName, discountPrice, price, isDiscount });
        return res.status(201).json(newProduct);
     } catch (error) {
        console.log(error);
        
        res.status(500).json({error: 'erro no servidor'})
     }
}

module.exports ={
    getAllProducts,
    createProducts
}