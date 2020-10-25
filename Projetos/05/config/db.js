if(process.env.NODE_ENV == 'production'){
    module.exports = {mongoURI: 'mongo "mongodb+srv://diariodb.zi8tn.mongodb.net/diariodb" --username diprmz28'}
    console.log("Servidor rodando na Nuvem");
}else{
    module.exports = {mongoURI: 'mongodb://localhost:27015/diariodb'}
    console.log("Servidor rodando na porta 3005!");
}