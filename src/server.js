const express = require("express") /* 'express' recebe o pacote express e se torna uma função */ 
const server = express() /*'server' recebe a função 'express' e se torna um objeto  */

//configurar pasta publica
server.use(express.static("public")) //Faz com que a pasta public fique 'invisivel'




//Utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


//configurar caminhos da pagina
//pagina inicial
//req: requisição
//res: resposta
server.get("/", (req, res) =>{
     return res.render("index.html", {title : "Um titulo"}) //envia algo pra pagina
})

server.get("/create-point", (req, res) =>{
    return res.render("create-point.html") //envia algo pra pagina
})

server.get("/search", (req, res) =>{
    return res.render("search-results.html") //envia algo pra pagina
})





//ligar o servidor
server.listen(3000) 
/*Para ligar o servidor, executar o comando 'node src/server.js* ou npm start*/
