const filmes = [        
        {id: 1, titulo: "O Senhor dos Anéis: A Sociedade do Anel", genero: "Fantasia", avaliacao: 9.0, assistido: true},
        {id: 2, titulo: "Interestelar", genero: "Ficção Científica", avaliacao: 8.6, assistido: true},
        {id: 3, titulo: "A Origem", genero: "Suspense", avaliacao: 8.8, assistido: false},
        {id: 4, titulo: "Vingadores: Ultimato", genero: "Ação", avaliacao: 8.4, assistido: true}
 ];
function getFilmes(){
 
 return filmes;
}

function insertFilmes(id, titulo, genero, avaliacao, assistido){
    if(id, titulo, genero, avaliacao, assistido){
        const novoFilme = {id, titulo, genero, avaliacao, assistido};
        filmes.push(novoFilme);
        console.log("Filme inserido com sucesso!"+"Titulo: " + titulo +" Genero: " + genero + " Avaliação:  " + avaliacao + " Assistido: "+ assistido );
        return true;
    }
    console.error("Erro ao inserir filme");
    return false;
}

function editarFilme(id, titulo, genero, avaliacao, assistido){
    if(id, titulo, genero, avaliacao, assistido){
        console.log("editando Filme: "+ "id: "+id+ " titulo: "+ titulo + " genero: "+genero + " avaliação: "+ avaliacao + " assistido: "+ assistido );
        return true;
    }
    console.error("falha ao editar filme");
    return false;
}

function deleteFilme(id){
    if(id){
        console.log("Removendo o filme:" + id);
        return true;
    }
    console.error("falha ao remover o filme");
    return false;
}

module.exports = {getFilmes, insertFilmes,editarFilme,deleteFilme};//deixa exportavel todas as funcções que estiverem entre chave