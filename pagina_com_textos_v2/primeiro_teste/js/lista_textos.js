
/*
    Esta página deve incluir:
    1. Título
    2. 3 botões (amostra, tabela, mapa)
        a) amostra (3º)
        b) tabela (1º)
        c) mapa (2º)

    3. 1 div onde se exibe o a), b) e c)


*/


function fetchData(){
    let wordData, textData

    //dicionario json
    fetch("./dict3.json")
        .then(response => {
            if(!response.ok){ // menssagem de erro
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.json()
        })
        .then(data => {
            wordData = data;
            return fetch("./textos_todos_v2.json") // fetch json dos textos
        })
        .then(response => { // mwensagem de erro
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.json()
        })
        .then(data => {
            textData = data
            displayData(wordData, textData) //funcao com os 2 jsons
        })
        .catch(error => console.error('Failed to fetch data', error))

}

fetchData()


function displayData(wordData, textData){

    page_title = document.createElement("h1")
    body = document.querySelector("body")
    body.appendChild(page_title)
    page_title.innertext = "Pesquisa de textos"

    conteudo_teste = document.createElement("div")
    body.appendChild(conteudo_teste)
    conteudo_teste = 






    // for(let i=0; i<textData.length; i++){
    //     if(textData[i].date_of_publication <= )
    // }

    //sort_text = textData.date_of_publication.sort((a, b) => a - b)


}



