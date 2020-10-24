const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const passport = require('passport')

//Model de usuario
require ('../models/Usuario')
const Usuario = mongoose.model('usuarios')

//Validando usuário
module.exports= function(passport){
    passport.use(new localStrategy({usernameField: 'login', passwordField:'senha'}, (login, senha, done) => {
        Usuario.findOne({login: login}).then((usuario) =>{
            if(!usuario){
                return done(null, false, {message: 'Usuario não encontrado!'})
            }
            bcrypt.compare(senha, usuario.senha, (erro, batem) => {
                if(batem){
                    return done(null, usuario)
                }else{
                    return done(null, false, {message: 'Senha incorreta!'})
                }
            })
        })
    }))

    //Salvando dados do usuário na sessão
    passport.serializeUser((usuario, done) => {
        done(null, usuario)
    })

    passport.deserializeUser((id, done) =>{
        Usuario.findById(id, (err, usuario) =>{
            done(err, usuario)
        })
    })
}