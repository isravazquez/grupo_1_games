function usuarioLogueadoMiddleware(req, res, next) {

    //res.locals son variables que se peuden compartir en todas las vistas , indistintamente del controlador 
    //creamos una variable local para usarla en cual quier destino 
    //osea toda la aplicaicon va a conocer la variable 
    //por estar en un middleware de aplicacion 
    res.locals.estaLoguado = false;

    if(req.session && req.session.logged){
        //si alguien ya esta logueago mando a su profile  del usuario
        res.locals.estaLoguado = true;
        res.locals.usuarioLogeado = req.session.logged;

    }
    next();
    
}

module.exports =  usuarioLogueadoMiddleware;