module.exports = (sequelize, dataTypes) => {
    let alias = 'Movie';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: dataTypes.STRING
        },
        rating: {
            type: dataTypes.INTEGER
        },
        length: {
            type: dataTypes.INTEGER
        },
        awards: {
            type: dataTypes.INTEGER
        },
        release_date: {
            type: dataTypes.DATE
        }
    };
    let config = {
        tableName: 'movies',
        timestamps: false
    };
    const Movie = sequelize.define(alias, cols, config);

    //para hacer la relacion podemos hacerla despues del define 
    //usamos associate para indicar que usaremos relaciones por que en 
    //sequelise se le llaman asociaciones 

    Movie.associate = function (models) {
        //estas relaciones recirdar que se pueden hacer ya que las tablas 
        //exiten en la base da datos 

        //si no exitieran no se podian hacer 
        //recordar que aun hay temas por ver y eso son los de 
        //migraciones y seeders 
        //migraciones para crear tablas y relaciones 
        //y seeders pra cargar datos 

        //relacion uno a muchos 
        //en este caso es una relacion de uno a muchos 
        //donde una pelicula pertene a un genero
        //esto especifica con que tabla esta relacionada 
        Movie.belongsTo(models.Genre,{
            as: "generos",
            foreignKey: "genre_id" //este es id de laa otra tabla en este caso genero
            //recordar que los nombre de columna en las tablas deben de respetarse si no hace 
            //una consulta adecuada
        });

        // relacion de muchos a muchos 
        // el primer parametro es el modelo con el se quiere relacionar 
        // el segundo parametro es el objeto literal de configuracion 
        Movie.belongsToMany(models.Actor,{
            as:"actores", //alias para hacer consultas 
            through: "actor_movie",//la tabla pivot en la base da datos 
            foreignKey: "movie_id",//id de la tabla donde estamos haciendo la relacion en este caso id de la tabla pelicula
            otherKey:"actor_id",//el otro id de de la tabla foranea 
            timestamps: false
        });

    }

    return Movie
}