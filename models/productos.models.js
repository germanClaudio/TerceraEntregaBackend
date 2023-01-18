const { Schema, model } = require('mongoose')

const ProductoSchema = new Schema({
    timestamp:{
        type: String
    },
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        maxlength: 100
    },
    description: {
        type: String,
        maxlength: 100
    },
    price: {
        type: Number,
        required: true,
        default: 0,
        maxlength: 100
    },
    picture: { 
        type: String,
        required: true,
        maxlength: 500,
        unique: true,
    },
    code:{
        type: String,
        // required: true,
        maxlength: 5,
        unique: true,
    },
    stock:{
        type: Number,
        maxlength: 100
    }
});

module.exports = model('Productos', ProductoSchema)