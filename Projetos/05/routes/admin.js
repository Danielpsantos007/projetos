const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Registro')
const Registro = mongoose.model('registros')
const {eAdmin} = require('../helpers/eAdmin')
const {eAdmin2} = require('../helpers/eAdmin2')

const now = new Date();
const datanova = (now.getDate()) + '/' + ((now.getMonth() + 1)) + '/' + now.getFullYear() + ' ' + (now.getHours()) + ':' + (now.getMinutes()) + ':' +(now.getSeconds());

//Rotas

router.get('/registros', eAdmin, (req,res)=>{
    Registro.find().sort({ updatedAt:'desc', createdAt:'desc' }).lean().then((registros)=>{
    res.render('admin/registros', {registros: registros})    
    }).catch((erro) => {
        req.flash("fail_msg", "Ops, houve um erro na listagem!")
        res.redirect('/admin')
    })    
})

router.get('/registros/add', eAdmin, (req,res)=>{
    res.render('admin/addregistros')
})

router.post('/registros/novo', eAdmin, (req,res) => {

//Validação de formularios - Sera feito pelo Bootstrap
    
const novoRegistro = {
    titulo: req.body.titulo,
    prioridade: req.body.prioridade,
    tipo: req.body.tipo,
    chamado:req.body.chamado,
    registro:req.body.registro,                        
    }
    
    new Registro(novoRegistro).save().then(() => {
        req.flash("ok_msg", "Registro salvo com sucesso!")
        res.redirect("/admin/registros")
    }).catch((error) =>{
        req.flash("fail_msg", "ERRO - Tente novamente!"+ error)
        res.redirect("/admin")
    })
})

router.get('/registros/update/:id', eAdmin, (req,res) =>{

    Registro.findOne({_id:req.params.id}).lean().then((registros)=> {
         res.render('admin/updateregistros', {registros: registros})         
    }).catch((err) =>{
        res.flash('fail_msg' , 'Registro não encontrada')
        res.redirect('/admin/registros')
    })
})

router.post('/registros/update', eAdmin,(req,res) =>{
    
    Registro.findOne({_id: req.body.id}).then((registros) =>{        
        registros.titulo = req.body.titulo
        registros.prioridade = req.body.prioridade
        registros.tipo = req.body.tipo
        registros.chamado = req.body.chamado
        registros.registro = req.body.registro
        registros.updatedAt = datanova
        
        registros.save().then(() => {
            req.flash('ok_msg', "Registro Atualizado!")            
            res.redirect('/admin/registros')            
        }).catch((err) => {
            req.flash('fail_msg', "Erro - Atualização não realizada!" +err)
            res.redirect('/admin/registros')            
        })
    
    }).catch((err) =>{
        req.flash('fail_msg', 'ERRO - Houve um erro na edição do registro!'+err)
        res.redirect('/admin/registros')
    })
})

router.post('/registros/delet', eAdmin2, (req,res) => {
    Registro.remove({_id: req.body.id}).then (() => {
        req.flash('ok_msg', 'Registro Deletado com Sucesso!')
        res.redirect('/admin/registros')
    }).catch((err) => {
        req.flash('fail_msg', 'ERRO - Não foi possível deletar o registro!'+err)
        req.redirect('/admin/registros')
    })
})

module.exports = router