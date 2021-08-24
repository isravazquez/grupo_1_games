function guestMiddleware(req, res, next) {

    if(req.session.logged){

        return res.render('profileUser');
      
    }
    next();

}

module.exports =  guestMiddleware; 