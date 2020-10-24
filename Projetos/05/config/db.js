if(process.env.NODE_ENV == 'production'){
    module.exports = {mongoURI: 'mongodb+srv://diprmz28:Mateus0818@diariodb.kxxdu.mongodb.net/diariodb?retryWrites=true&w=majority'}
    console.log("Servidor rodando na Nuvem");
}else{
    module.exports = {mongoURI: 'mongodb://localhost:27015/diariodb'}
    console.log("Servidor rodando na porta 3005!");
}