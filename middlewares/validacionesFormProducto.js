
//modulo express validator 
const {body} = require('express-validator');


//express validator
const validacionesFormProducto = [

    //mas a detalle la validacion de una imagen 
    body('id').isInt({min:1}).isNumeric().notEmpty().withMessage('El campo id no debe estar vacio y debe ser un numero entero positivo'),
    body('name').isString().notEmpty().withMessage('el campo nombre es una cadena de texto y no debe estar vacio'),
    body('category').isString().notEmpty().withMessage('El campo categoria  es una cadena de texto y no debe estar vacio'),
    body('price').isFloat({min:0.001}).isNumeric().notEmpty().withMessage('El campo precio es flotante pero posivito y no debe estar vacio'),
    body('discountRate').isFloat({min:0.000}).isNumeric().notEmpty().withMessage('El campo % de descuento es flotante pero posivito y no debe estar vacio'),
    body('stock').isInt({min:1}).isNumeric().notEmpty().withMessage('El campo stock no debe estar vacio y debe ser un numero entero positivo'),
    body('description').isString().notEmpty().isLength({max:500}).withMessage('El campo descripción es una cadena de texto y no debe estar vacio'),
    body('image').notEmpty().withMessage('El campo de imagen pero no debe estar vacia'),
    body('features').isString().notEmpty().withMessage('el campo caracteristicas es una cadena de texto y no debe estar vacio'),
];

module.exports = validacionesFormProducto;