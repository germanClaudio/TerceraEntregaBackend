module.exports = class ContenedorMongoDB {
    
    constructor(collection) {
        this.coleccion = collection
    }

    async listar(id) {
        try {
            const doc = await this.coleccion.findOne({ id }, { _id: 0, __v: 0 })
            if (!doc) {
                throw new Error('Error al listar por id: no encontrado')
            } else {
                return doc
            }
        } catch (error) {
            throw new Error(`Error al listar por id: ${error}`)
        }
    }

    async listarAll(query = {}) {
        try {
            let docs = await this.coleccion.find(query, { _id: 0, __v: 0 }).toArray()
            return docs
        } catch (error) {
            throw new Error(`Error al listar todo: ${error}`)
        }
    }

    async guardar(nuevoElem) {
        try {
            let doc = await this.coleccion.insertOne(nuevoElem);
            return doc
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    async actualizar(query, nuevoElem) {
        try {
            const { n, nModified } = await this.coleccion.replaceOne(query, nuevoElem)
            if (n == 0 || nModified == 0) {
                throw new Error('Error al actualizar: no encontrado')
            } else {
                return nuevoElem
            }
        } catch (error) {
            throw new Error(`Error al actualizar: ${error}`)
        }
    }

    async borrar(id) {
        try {
            const { n, nDeleted } = await this.coleccion.deleteOne({ id })
            if (n == 0 || nDeleted == 0) {
                throw new Error('Error al borrar: no encontrado')
            }
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async borrarAll() {
        try {
            await this.coleccion.deleteMany({})
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }
}

// module.exports =  ContenedorMongoDB


// const mongoose = require('mongoose');  //import mongoose from 'mongoose'
// const Productos = require('../models/productos.models.js')

// const { options } = require('../options/config.js')
// const logger = require('../utils/winston.js')

// module.exports = class ContainerMongoDB {
//     constructor() {
//         this.connect()
//     }
    
//     connect() {
//          try {
//              //const URL = 'mongodb+srv://germanClaudio:germanclaudio@cluster0.oqkw9q9.mongodb.net/ecommerce?retryWrites=true&w=majority'   //mongodb://localhost:27017/ecommerce  127.0.0.1   mongodb+srv://germanClaudio:<password>@cluster0.oqkw9q9.mongodb.net/?retryWrites=true&w=majority
//              const URL = options.mongoDB.connection.URL
//              mongoose.connect(URL, {
//                  useNewUrlParser: true,
//                  useUnifiedTopology: true
//              })
//              logger.info('Connected to MongoDB Server <-123-> ContainerMongoDB-Productos')
            
//          } catch (error) {
//             logger.error('Error connection to DB: '+error)
//          }
//      }


//     async createProduct(product){
//         try {
//             const newProduct = new Productos(product)
//             await newProduct.save()
//             logger.info('Product created: ', newProduct)
//         } catch (error) {
//             logger.error("Error MongoDB createProduct: ",error)
//         }
//     }

//     async getAllItems(){
//         try {
//             const products = await Productos.find()
//             logger.info('Productos encontrados: ', products)
//             return products
//         } catch (error) {
//             logger.error("Error MongoDB getProducts: ",error)
//         }
//     }

//     async getById(id) {
//         try {
//             const product = await Productos.findById(`${id}`)
//             logger.info('Producto encontrado: ',product)
//             return product
//         } catch (error) {
//             logger.error("Error MongoDB getOneProducts: ",error)
//         }
//     }

//     async updateProduct(id, dataBody, timestamp){
//         try {
//             const newValues = {
//                  $set: dataBody,
//                  timestamp: timestamp
//             }
//             const product = await Productos.updateOne({ _id: id}, newValues)
//             logger.info('Producto actualizado ', product)
//             return product
//         } catch (error) {
//             logger.error("Error MongoDB updateProduct: ",error)
//         }
//     }

//     async deleteProduct(id){
//         try {
//             const productDeleted = await Productos.deleteOne({ "_id": `${id}` })  //{name: 'Peter'}
//             logger.info('Producto eliminado: ' + JSON.stringify(productDeleted, null, 2))
//             return productDeleted
//         } catch (error) {
//             logger.error("Error MongoDB deleteProduct: ",error)
//         }
//     }
// }