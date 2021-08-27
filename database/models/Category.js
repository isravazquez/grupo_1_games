module.exports = (sequelize, dataTypes) => {
    
    let alias = 'Category';
    
    let cols = {

    }
    
    let config = {
        tableName: 'categories',
        timestamps: false
    };

    const Category = sequelize.define(alias, cols, config);

    Category.associate = function (models) {

    }

    return Category
}