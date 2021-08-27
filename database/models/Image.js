module.exports = (sequelize, dataTypes) => {
    
    let alias = 'Image';
    
    let cols = {

    }
    
    let config = {
        tableName: 'images',
        timestamps: false
    };

    const Image = sequelize.define(alias, cols, config);

    Image.associate = function (models) {

    }

    return Image
}