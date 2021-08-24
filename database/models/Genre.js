module.exports = (sequelize, dataTypes) => {
    let alias = 'Genre';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        ranking: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'genres',
        timestamps: false
    };
    const Genre = sequelize.define(alias, cols, config);


    // para este eejmoplo no hace falta hacer esta relacion pero podemos hacerla solo para ejemplo 
    Genre.associate = function (models) {
        //relacion muchos a uno 
        //la reclacion un genero tiene muchas peliculas 
        Genre.hasMany(models.Movie,{
            as: "peliculas",
            foreignKey: "id" //este es id de laa otra tabla en este caso pelicula
        });
    }

    return Genre
}