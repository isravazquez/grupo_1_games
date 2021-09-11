function authMiddleware(req, res, next) {

    if(!req.session.userLogged){
        //si alguien no esta logueado
        return res.redirect('/login');
    }
    next();
}

module.exports =  authMiddleware;