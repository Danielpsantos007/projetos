module.exports = {
    eAdmin: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
           req.flash('fail_msg', "Ops! Você ainda não esta logado!")
           res.redirect('/usuarios/login')
        }                
}