module.exports = (sequelize, dataTypes) => {
    let alias = 'Actor';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: dataTypes.STRING
        },
        last_name: {
            type: dataTypes.STRING
        },
        rating: {
            type: dataTypes.INTEGER
        },
        favorite_movie_id: {
             type: dataTypes.INTEGER
        }
        
    };
    let config = {
        tableName: 'actors',
        timestamps: false
    };
    const Actor = sequelize.define(alias, cols, config);


    Actor.associate = function (models) {
        Actor.belongsToMany(models.Movie,{
            as:"peliculas", //alias para hacer consultas 
            through: "actor_movie",//la tabla pivot en la base da datos 
            foreignKey: "actor_id",//id de la tabla donde estamos haciendo la relacion en este caso id de la tabla pelicula
            otherKey:"movie_id",//el otro id de de la tabla foranea 
            timestamps: false
        });
    }
    

    return Actor
}