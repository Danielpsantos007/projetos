const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Usuario')
const Usuario = mongoose.model('usuarios')
const bcrypt = require ('bcryptjs')
const passport = require('passport')
const {eAdmin2} = require('../helpers/eAdmin2')
const {eAdmin} = require('../helpers/eAdmin')

router.get('/registro', eAdmin2,(req,res) =>{
    res.render('usuarios/registro')
})

router.post('/registro', eAdmin2,(req,res) => {

    //Validação de formularios
    var erros = []

    if(req.body.senha.length < 6){
        erros.push({texto: "ERRO - A Senha deve conter no minimo 6 caracteres!"})
    }

    if(req.body.senha != req.body.senha2){
        erros.push({texto: "ERRO - A confirmação de senha esta diferente!"})
    }
    
    if(erros.length > 0){
        res.render("usuarios/registro", {erros: erros})
    }else{
        
        Usuario.findOne({usuario: req.body.usuario}).then((usuario) => {
            if(usuario){
                req.flash("fail_msg", "ERRO - Usuario já Existente!")
                res.redirect("/usuarios/registro")
            }else{
                    const novoUsuario = new Usuario ({
                    nome: req.body.nome,
                    login: req.body.login,
                    senha: req.body.senha,
                })

                //Criptografando a senha do Usuário
                bcrypt.genSalt(10, (erro, salt) =>{
                    bcrypt.hash(novoUsuario.senha, salt, (erro, hash) =>{
                        if(erro){
                            req.flash('fail_msg', 'ERRO - Não foi possível cadastrar o usuario!')
                            res.redirect('/')
                        }

                        novoUsuario.senha = hash

                        novoUsuario.save().then(() =>{
                            req.flash('ok_msg', 'Usuario Cadastrado com Sucesso!')
                            res.redirect('/')
                        }).catch((erro) => {
                            req.flash('fail_msg', 'Usuario Cadastrado com Sucesso!')
                            res.redirect('/usuarios/registro')
                        })
                    })
                })
            }
        }).catch((error) =>{
            req.flash("fail_msg", "ERRO - Favor informar ao ADM!")
            res.redirect("/")
        })            
    }    
})

router.get('/login', (req, res) => {
    res.render('usuarios/login')
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect:'/usuarios/login',
        failureFlash:true        
    })(req, res, next)
})

router.get('/logout', (req, res) =>{
    req.logout()
    req.flash('ok_msg', 'Deslogado com Sucesso!')
    res.redirect('/')
})

module.exports = router