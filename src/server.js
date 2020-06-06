const express = require("express") /* 'express' recebe o pacote express e se torna uma função */ 
const server = express() /*'server' recebe a função 'express' e se torna um objeto  */

//pegar o banco de dados no data base
const db = require("./database/db.js") 

//configurar pasta publica
server.use(express.static("public")) //Faz com que a pasta public fique 'invisivel'

//habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true}))


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
    //Está recebendo os dados do formulario req.query: Query Strings da nossa URL
    console.log(req.query)

    return res.render("create-point.html") //envia algo pra pagina
})

server.post("/savepoint", (req, res) =>{ //Para esconder a URl

    //req.body: O Corpo do nosso formulario
    // console.log(req.body)
    const query =`
        INSERT INTO places(
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]


    function afterInsertData(err){
        if(err){
            console.log(err)
            return res.send("Erro no cadastro") //envia uma mensagem de erro de cadastro
        }
        console.log("Cadastrado com sucesso")
        console.log(this)
        return res.render("create-point.html", { saved: true})
    }
    db.run(query, values, afterInsertData)
})

server.get("/search", (req, res) =>{
    //pegar os dados do banco de dados
    const search = req.query.search
    if(search==""){
        //pesquisa vazia
        return res.render("search-results.html", {total:0})
    }

        db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
            if(err){
                return console.log(err)
            }
            const total = rows.length


            //mostrar a pagina html com os dados do banco de dados
            //envia algo pra pagina
            return res.render("search-results.html", { places: rows, total:total})
        })
        
})

//ligar o servidor
server.listen(3000) 
/*Para ligar o servidor, executar o comando 'node src/server.js* ou npm start*/
