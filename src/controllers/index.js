const express = require("express");
const bodyParser = require("body-parser");

const app = express();//objeto express

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const{getFilmes, insertFilmes,editarFilme,deleteFilme} = require("../models/DAO/filmeDao");//importa uma função da DAO, na primeira parte eu coloco qual funcções eu quero(dentro dos bigodes) e depois eu coloco o caminho da pagian onde se encontra


app.get("/", (req, res)=>{

    res.send("Bem vindo ao sistema");
});

//lista os filmes(READ);
app.get("/filmes", (req,res)=>{
    const filmes = getFilmes(); //guarda todos os filmes cadastrados//
    res.render("listaFilmes", {filmesDocontoller : filmes}); //chamo o render para renderizar a pagina(primeiro parametro) já o segundo parametro eu passo a variavel que recebe o a função lá da DAO 

});

//tela de insert//
app.get("/novoFilme", (req, res)=>{
    res.render("formFilme", {filme: {}});
});
//insert de filmes
app.post("/filme", (req,res)=>{
    const{id,titulo,genero,avaliacao, assistido}=req.body;
    let verificaAssistido;
    //transforma o que vier da form em boolean
    if(assistido ==="sim"){
        verificaAssistido = true;
    }else{
        verificaAssistido = false;
    }
    
    const resultado = insertFilmes(id,titulo,genero,avaliacao, verificaAssistido);
    if(resultado){
        return res.send("filme inserido com sucesso: " +   "Titulo: " + titulo +" Genero: " + genero + " Avaliação:  " + avaliacao + " Assistido: "+ verificaAssistido);

    }
    return res.send("filme não inserido");
});

//PUT
app.get("/editarfilme/:idfilme", (req,res)=>{
    const id = req.params.idfilme;

    const filmes = getFilmes();
    const filme = filmes[id - 1];
    res.render("formFilme", {filme});

});
app.put("/filme" , (req,res)=>{
    const{id,titulo,genero,avaliacao,assistido} = req.body;
    let verificaAssistido;
    //transforma o que vier da form em boolean
    if(assistido ==="sim"){
        verificaAssistido = true;
    }else{
        verificaAssistido = false;
    }
    const resultado = editarFilme(id,titulo,genero,avaliacao, verificaAssistido);
    if(resultado){
        return res.send("Filme editado com sucesso");
    }
    return res.send("não foi posivel editar o filme");

});

//DELETE
app.delete("/filme", (req,res)=>{
    const {id} = req.body;
    const resultado = deleteFilme(id);
    if(resultado){
        return res.send("filme deletado com sucesso");
    }
    return res.send("Não foi posivel deletar filme");
});
//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

//ROTAS REST(JSON)
app.get("/api/filmes", (req,res)=>{
    const filmes = getFilmes(); //guarda todos os filmes cadastrados//
    res.json(filmes);
});

//tela de insert//
app.get("/novoFilme", (req, res)=>{
    res.render("formFilme", {filme: {}});
});
//insert de filmes
app.post("/api/filme", (req,res)=>{
    const{id,titulo,genero,avaliacao, assistido}=req.body;
    let verificaAssistido;
    //transforma o que vier da form em boolean
    if(assistido ==="sim"){
        verificaAssistido = true;
    }else{
        verificaAssistido = false;
    }
    
    const resultado = insertFilmes(id,titulo,genero,avaliacao, verificaAssistido);
    if(resultado){
        return res.json({message: "Filme inserido com sucesso"});

    }
    return res.json({message: "Filme não inserido"});
});

//PUT
app.get("/api/editarfilme/:id", (req,res)=>{
    const id = req.params.id;

    const filmes = getFilmes();
    const filme = filmes[id - 1];
    res.json(filme);

});
app.put("/api/filme/:id" , (req,res)=>{
    
    const{id,titulo,genero,avaliacao,assistido} = req.body;
    let verificaAssistido;
    //transforma o que vier da form em boolean
    if(assistido ==="sim"){
        verificaAssistido = true;
    }else{
        verificaAssistido = false;
    }
    const resultado = editarFilme(id,titulo,genero,avaliacao, verificaAssistido);
    if(resultado){
        return res.json({message: "Filme editado com sucesso"});
    }
    return res.json({message:"não foi posivel editar o filme"});

});

//DELETE
app.delete("/api/filme/:id", (req,res)=>{
    const id = parseInt(req.params.id); 
    const resultado = deleteFilme(id);
    if(resultado){
        return res.json({message: "filme deletado com sucesso"});
    }
    return res.json({message: "Não foi posivel deletar filme"});
});












app.listen(3000, 'localhost', ()=>{
    console.log("servidor rodando na porta 3000");
});