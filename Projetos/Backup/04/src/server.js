//Startando o servidor node: node src/server.js
//Instalando o nodemon: npm install nodemon -D
//Startando o servidor( desenv): npm run dev

//Servidor
const express = require('express')
const nunjucks = require('nunjucks')
const server = express()

const { 
    pageLanding, 
    pageStudy, 
    pageGiveClasses, 
    saveClasses,
    pageSucess
} = require('./pages')

//Config. nunjucks
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
    autoescape: false,
})

//Dados do servidor
server
//Configuração adicional para alterar o req.query para req.body
.use(express.urlencoded({ extended: true }))
//Config. arq. estaticos ( css, scripts, imgs)
.use(express.static("public"))
//Rotas da aplicação
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.get('/sucesso', pageSucess)
.post('/save-classes', saveClasses)
//Porta
.listen(5500)