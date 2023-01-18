const { ProductosService } = require("../services/productos/productos.service.js")

class ProductosController {  
    constructor(){
        this.products = new ProductosService()
    }

    getAllProducts = async (req, res) => {
        const productos = await this.products.getAllProductos()
        if(productos.error) return res.status(400).json({msg: 'No hay productos cargados'}) 
        res.status(200).json(productos)
    }


    getProductById = async (req, res) => {
        const { id } = req.params
        const producto = await this.products.getProductoById(id)
        if(!producto) return res.status(404).json({msg: 'Producto no encontrado'})
        res.status(200).json( producto )
    }

    postProduct = async (req, res) => {
        const producto = await this.products.createProducto(req.body)
        res.status(201).json(producto)
    }

    putProduct = async (req, res) => {
        const producto = await this.products.updateProduct(req.params.id, req.body)
        res.status(200).json(producto)
    }

    deleteProductById = async (req, res) => {
        const producto = await this.products.deleteProduct(req.params.id)
        res.status(200).json(producto)
    }

    deletAll = async () => {
        await this.products.deleteAllProducts
    }
}

module.exports = { ProductosController }