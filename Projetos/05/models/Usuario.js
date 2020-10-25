const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

//Definindo Model
const UsuariosSchema = new mongoose.Schema({
    nome:{
        type: String,
        required:true    
    },
    
    login:{
        type: String,
        required:true    
    },

    eAdmin:{
        type: Number,
        default: 0
    },

    senha:{
        type: String,
        required:true
    }    
})

UsuariosSchema.plugin(mongoosePaginate)

//Nome da Collection(Tabela)
mongoose.model("usuarios", UsuariosSchema)