const {products} = require('../models/products')


const getAllProduct = async (_req, res) => {
    try{
        const products = await products.findAll();
        res.json(products);
    } catch(error) {
        console.log(error);
        res.status(500).json({error: "erro no sistema"})
    }
}

const createProducts = async (req, res) => {
    const {nome, categoria, precoAntigo, precoNovo, desconto, imagem  } = req.body

    if (!nome || !categoria || !precoAntigo || !precoNovo || !imagem) {
        return res.status(400).json({ error: "Campos obrigatórios" });
    }

     try {
        const newProduct = await products.create({ discountPercentual, category, productName, discountPrice, isDiscount, url });
        res.status(201).json(newProduct);
     } catch (error) {
        console.log(error);
        
        res.status(500).json({error: 'erro no servidor'})
     }
}

module.exports ={
    getAllProduct,
    createProducts
}