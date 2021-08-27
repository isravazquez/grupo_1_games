module.exports = (sequelize, dataTypes) => {
    
    let alias = 'Image';
    
    let cols = {

        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        imgName: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
    }
    
    let config = {
        tableName: 'images',
        timestamps: false
    };

    const Image = sequelize.define(alias, cols, config);

    Image.associate = function (models) {

        Image.belongsTo(models.Product,{
            foreignKey: 'productId',
            as:'Product'
        });
    }

    return Image
}

//SOLO NOMBRAR CAMOCO IMGNAME COMO NAME 
