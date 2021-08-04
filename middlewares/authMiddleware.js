function authMiddleware(req, res, next) {

    if(!req.session.logged){
        //si alguien no esta logueado
        return res.redirect('/login');
    }
    next();
}

module.exports =  authMiddleware;