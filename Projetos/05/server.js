//Carregando módulos
const express = require('express')
const session = require('express-session')
const handlebars= require('express-handlebars')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const flash = require('connect-flash')

const admin = require('./routes/admin')
const usuarios = require('./routes/usuario')
const path = require('path')

require('./models/Registro')
const Registro = mongoose.model('registros')

const passport = require('passport')
require('./config/auth')(passport)

const db = require('./config/db')




//const cors = require('cors')
//const requireDir = require('require-dir')


//Configurações
//Sessão
    app.use(session({
        secret: "qualquercoisa",
        resave: true,
        saveUninitialized:true
    }))

//Passport
    app.use(passport.initialize())
    app.use(passport.session())

//Flash
    app.use(flash())
//Middleware
    app.use((req, res, next) => {
        //Variaveis Globais
        res.locals.ok_msg = req.flash("ok_msg")
        res.locals.fail_msg = req.flash("fail_msg")
        res.locals.error = req.flash("error")
        res.locals.user = req.user || null;
        next()
    })

//Body Parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Handlebars
app.engine('handlebars',handlebars({defaultLayout:'main'}))
app.set('view engine', 'handlebars')

//Configurando os arquivos estaticos no Public
app.use(express.static(path.join(__dirname,'public')))

app.use((req,res,next)=>{
    console.log("Oi eu sou o GOKU!")
    next()
})

//Cors
//Liberando acesso publico ( vindo de outros dominios )
//app.use(cors());

//Mongoose
//Iniciando o DB
mongoose.connect(db.mongoURI,
 { useUnifiedTopology: true,
 useNewUrlParser: true 
}).
then(function () {console.log('MongoDB conectado...')}).
catch(erro => {
    console.log("Erro de Conexão" + (erro));
});

//requireDir('./src/models');

//Rotas
app.get('/', (req,res)=>{
     Registro.find().sort({ updatedAt:'desc', createdAt:'desc' }).lean().then((registros)=>{
        res.render('index', {registros: registros})    
        }).catch((erro) => {
            req.flash("fail_msg", "Ops, houve um erro na listagem!")
            res.redirect('/404')
        })    
})

app.get('/404', (req,res)=>{
    res.send('Erro 404!')
})

app.get('/registros', (req,res)=>{
    res.send('Lista de Registros')
})

app.use('/admin', admin)
app.use('/usuarios', usuarios)

//Definindo a Porta ( Heroku )
const PORT = process.env.PORT || 3005
app.listen(PORT, function(){    
});