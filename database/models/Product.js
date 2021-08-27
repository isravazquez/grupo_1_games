module.exports = (sequelize, dataTypes) => {
    
    let alias = 'Product';
    
    let cols = {

    }
    
    let config = {
        tableName: 'products',
        timestamps: false
    };

    const Product = sequelize.define(alias, cols, config);

    Product.associate = function (models) {

    }

    return Product
}