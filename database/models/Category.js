module.exports = (sequelize, dataTypes) => {
    
    let alias = 'Category';
    
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false
        }
    }
    
    let config = {
        tableName: 'categories',
        timestamps: false
    };

    const Category = sequelize.define(alias, cols, config);

    Category.associate = function (models) {
        Category.hasMany(models.Product,{
            foreignKey: 'category_id',
            as:'Product'
        });
    }

    return Category
}