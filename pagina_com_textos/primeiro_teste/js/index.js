
/*
    Esta página deve incluir:
    1. Pesquisa de palavras (a ser implementado)
    2. Texto original
    3. Texto eplicativo sobre o funcionamento da plataforma

*/


/*
    Coisas a resolver (que sem testar sei que está mal):
    -> Aceder à palavra a partir das suas letras!! (porque a palavra no geral é acedida pelo id!!)
        - Talvez uma função que converta o id para as palavras??(ver como fiz isso!!)
    -> Posso testar primeiro com o nome dos textooosss!!
    -> Falta funcao showResults()!!!

*/


function getQueryParam(param){
    let urlParams = new URLSearchParams (window.location.search)
    return urlParams.get(param) // devolve a palavra? 
}

/***************** Contentores gerais *******************/
console.clear()

//div para título
    let titulo_container = document.createElement("div") // div para titulo
    document.querySelector("body").appendChild(titulo_container)
    titulo_container.className += "titulo-container"

//div para formulário e botões
    let btform_ct = document.createElement("div")
    document.querySelector("body").appendChild(btform_ct)
    btform_ct.className += "btform-ct"

//div para palavra pesquisada (n sei se fica antes do form do input)
    let results_pal = document.createElement("div")
    document.querySelector("body").appendChild(results_pal)
    results_pal.className += "results-pal"

//div para conteúdo (apenas em forma de teste)
    let filtro_pal_ct = document.createElement("div")
    document.querySelector("body").appendChild(filtro_pal_ct)
    filtro_pal_ct.className += "filtro-pal-ct"

//div para texto explicativo
    let explic_ct = document.createElement("div")
    document.querySelector("body").appendChild(explic_ct)
    explic_ct.className += "explic-ct"



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


//Não sei o que estou a fazer...
//https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/value (este n ajuda!!)
// Este pode ajudar: https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_input_type_search (mais ou menos!!)
// o melhor é ir ver ao site das galinhas

function displayData(wordData, textData){

/***************** Display dos elementos ***************************************/

    // /*********** Display titulo **************/
    let titulo = document.createElement("h1") //titulo
    document.querySelector(".titulo-container").appendChild(titulo)
    titulo.className += "titulo"
    titulo.innerHTML = "Canção do Exílio"

    // /*********** Formulario de pesquisa **************/

    //form container
    let form_ct = document.createElement("div")
    document.querySelector(".btform-ct").appendChild(form_ct)
    form_ct.className += "form-ct"

    //form
    let form = document.createElement("form")
    document.querySelector(".form-ct").appendChild(form)
    form.className += "form"

    //label para inut box (pesquisa)
    let label_pesquisa_pal = document.createElement("label")
    document.querySelector(".form-ct").appendChild(label_pesquisa_pal)
    label_pesquisa_pal.for = "word-search"
    label_pesquisa_pal.innerHTML= "Pesquisa por palavras:<br><br>"
    label_pesquisa_pal.className += "label-pesquisa-pal s-item"

    //input para pal
    let input_pal = document.createElement("input")
    document.querySelector(".form-ct").appendChild(input_pal)
    input_pal.type = "search"
    input_pal.id = "word-search"
    input_pal.name = "q"
    input_pal.placeholder = "Palavras"

    //bt-pesquisa
    let bt_pesquisa_pal = document.createElement("button")
    document.querySelector(".form-ct").appendChild(bt_pesquisa_pal)
    bt_pesquisa_pal.className += "bt-pesquisa-pal s-item"
    bt_pesquisa_pal.type = "submit"
    bt_pesquisa_pal.innerText = "Search"
    
    //bt-clear
    let bt_clear = document.createElement("button")
    document.querySelector(".form-ct").appendChild(bt_clear)
    bt_clear.innerText = "Clear"


    //filtros e apresentar dados
    input_pal.addEventListener("input", (e) => {

        let value  = e.target.value

        if(value && value.trim().length > 0){

            value = value.trim().toLowerCase()
            
            const filteredData = data.filter(wordData => wordData.palavra.toLowerCase().includes(value))
            StyleSheetList(filteredData)
            
        }else{
            clearList(results_pal)
            clearList(filtro_pal_ct)
        }

    })


    //funcao para limpar a lista
    function clearList(item){
        while(item.firstChild){
            item.removeChild(item.firstChild)
        }
    }

    //limpa resultados??
    bt_pesquisa_pal.addEventListener("click", () => {
        clearList(results_pal)
        input_pal.value = ""
    })


    //regressa ao estado inicial
    bt_clear.addEventListener("click", () =>{
        clearList(results_pal)
        clearList(filtro_pal_ct)
    })




    function setList(results){
        clearList(results_pal)
        clearList(filtro_pal_ct)

        if(results.length === 0){
            noResults()
        } else{
            for(const palavra of results) {
                const resultItem = document.createElement("li")
                //ver como está organizado o json dos gatos!!!
                resultItem.className += "result-item" + palavra.palavra // certamente que esta mal!! eu preciso associar palavra a id!!

                const text = document.createElement(palavra.palavra)
                resultItem.appendChild(text);
                results_pal.appendChild(resultItem)
            }
            showResults(results) // falta a funcaooo

        }

    }



    function noResults(){
        filtro_pal_ct.innerHTML = "<h1> No results!<h1>"
    }


    showResults(data)


    /***************** Ordenação dos dados ***************************************/

    //let filter_ct = document.createElement("div")










    // let val
    
    // bt_pesquisa_pal.addEventListener(".input-container", (event) => {
    //     val = input_pal.value

    // })

    // oninput = (event) => {feedback.innerHTML += "la "}
    //     word_input_form.action = `lista_palavras.html?palavras=${val}`

    // input_pal.addEventListener("keyup", () => {
    //     pre_pal.innerText = `Palavra: ${pre_pal.value}`
    // })



}