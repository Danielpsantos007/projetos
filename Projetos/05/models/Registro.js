const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

// Data atual
var now = new Date();
// Formata a data conforme dd/mm/aaaa hh:ii:ss
var datanova = (now.getDate()) + '/' + ((now.getMonth() + 1)) + '/' + now.getFullYear() + ' ' + (now.getHours()) + ':' + (now.getMinutes()) + ':' +(now.getSeconds());

//Definindo Model
const RegistrosSchema = new mongoose.Schema({
    titulo:{
        type: String,
        required:true
    },
    prioridade: {
        type: String,
        required:true
    },
    tipo: {
      type: String,
      required:true
    },
    chamado: {
        type: String        
    },
    registro:{
        type: String,
        required:true
    },
    createdAt:{
        type:String,
        default:datanova
    },
    updatedAt:{
        type:String
        //default:Date.now
    }
    
});

RegistrosSchema.plugin(mongoosePaginate)

//Nome da Collection(Tabela)
mongoose.model("registros", RegistrosSchema)