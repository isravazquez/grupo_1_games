function guestMiddleware(req, res, next) {

    if(req.session.userLogged){

        return res.render('profileUser');
      
    }
    next();

}

module.exports =  guestMiddleware; 