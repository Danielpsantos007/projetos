module.exports = {
    eAdmin2: function(req, res, next){
        if(req.isAuthenticated() && req.user.eAdmin == 1){
            return next();
        }
            req.flash('fail_msg', "Ops! Você não tem permissão para essa ação!")
            res.redirect('/')
    }                
}
