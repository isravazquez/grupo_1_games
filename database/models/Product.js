module.exports = (sequelize, dataTypes) => {
    
    let alias = 'Product';
    
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        categoryId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: dataTypes.DOUBLE,
            allowNull: false
        },
        discountRate:{
            type: dataTypes.DOUBLE,
            allowNull: false
        },
        discount:{
            type: dataTypes.DOUBLE,
            allowNull: false
        },
        stock:{
            type: dataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        features: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        registrationDatetime: {
            type: dataTypes.DATE,
            allowNull: false
            // defaultValue: sequelize.NOW
        },
        userWhoRegistered:{
            type: dataTypes.STRING(45),
            allowNull: false
        }

    }
    
    let config = {
        tableName: 'products',
        timestamps: false
    };

    const Product = sequelize.define(alias, cols, config);

    Product.associate = function (models) {

        Product.belongsTo(models.Category,{
            foreignKey: 'categoryId',
            as:'Category'
          });
    
        Product.hasMany(models.Image,{
            foreignKey: 'productId',
            as:'Image'
        });
    }

    return Product
}

//cambiar category por category_id
//eliminar campo de image en product
//registrationDatetime que si sea date 