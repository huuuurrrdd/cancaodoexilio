
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

/*******************************************************/


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


/////regressa ao estado inicial
    bt_clear.addEventListener("click", () =>{
        clearList(results_pal)
        clearList(filtro_pal_ct)
        input_pal.value = ""
        showResults(data) ///n sei esteee!!!
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

                const text = document.createElement(palavra.title) // um primeiro teste com títulos de textos!!
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

    let filter_ct = document.createElement("div")
    document.querySelector(".btform-ct").appendChild(filter_ct)
    filter_ct.className = "filter-ct"

    //BT PARA ORDEM ALFABETICA
    let bt_a_z = document.createElement("button")
    document.querySelector(".btform-ct").appendChild(bt_a_z)
    bt_a_z.className += "bt-AZ"
    bt_a_z.innerHTML = "Alphabetic order: AZ"
    bt_a_z.addEventListener("click", sortAZ) // acao após click

    let bt_z_a = document.createElement("button")
    document.querySelector(".btform-ct").appendChild(bt_z_a)
    bt_z_a.className += "bt-ZA"
    bt_z_a.innerHTML = "Alphabetic order: ZA"
    bt_z_a.addEventListener("click", sortZA) // acao após click


    //BT PARA ORDEM DE DATAS
    let bt_date = document.createElement("button")
    bt_date.innerHTML = "Order by age: Ascend"
    bt_date.className += "bt-num"
    document.querySelector(".filter-ct").appendChild(bt_date)
    bt_date.addEventListener("click", ordNumber) // acao após click

    let bt_date_rev = document.createElement("button")
    bt_date_rev.innerHTML = "Order by age Descend"
    bt_date_rev.className += "bt-num-rev"
    document.querySelector(".filter-ct").appendChild(bt_date_rev)
    bt_date_rev.addEventListener("click", ordNumberRev) // acao após click


    //ACAO ORDEM ALPHABETICA
    function sortAZ() {
        clearAll() // n sei se isto ja esta
        let word = []
        word.length = textData.length // acho que consigo testar logo com as palavras


        for(let i = 0; i < word.length; i++){
            word[i] = textData[i].title
        }


        word.sort()
        console.log(sortByReference(word, textData, "word"))
        showResults(sortByReference(word, textData, "word"))
    }


    //ACAO ORDEM ALPHABETICA (invertida)
    function sortZA() {
        clearAll() // n sei se isto ja esta
        let word = []
        word.length = textData.length // acho que consigo testar logo com as palavras

        for(let i = 0; i < word.length; i++){
            word[i] = textData[i].title
        }

        word.sort()
        


        //inverse word order
        let reverseWord = []
        for(let i = textData.length-1; i>= 0; i--) {
            reverseWord.push(word[i])
        }


        console.log(reverseWord)

        //convert to object and display
        console.log(sortByReference(reverseWord, textData, "word"))
        showResults(sortByReference(reverseWord, textData, "word"))
    }



    //ACAO ORDEM DATA
    function ordNumber(){
        clearAll()
        let object = textDatadata

        //sort by date
        object.sort((a, b) => a.date_of_publication - b.date_of_publication)

        console.log(object)
        showResults(object)
    }


    //ordenar pela idade descendente
    function ordNumberRev(){
        clearAll()
        let object = textData

        //sort by date
        object.sort((a, b) => a.date_of_publication - b.date_of_publication)


        let word = []
        word.length = textData.length

        //copy data from the object
        for(let i = 0; i < word.length; i++){
            word[i] = object[i].title
        }

        //reverse the word array
        let reverseWord = []
        for(let i = word.length - 1; i >= 0; i--){
            reverseWord.push(word[i])
        }
        console.log(reverseWord)


        //map the word array with an object
        console.log(sortByReference(reverseWord, textData, "word"))

        //show the results
        showResults(sortByReference(reverseWord, textData, "word"))
        console.log(object)

    }



    //*********** Atualiza o objeto com base num array *************/
    const sortByReference = (name, data, type) => {
            let words = []
            words.length = textData.length

        const sorted = name.map((element) => {
            for(let i = 0; i < data.length; i++){
                
                if(type == "word"){

                    if(data[i].title === element){
                        return data[i]
                    }

                } else if(type == "date"){
                    if(data[i].date_of_publication === element){
                        return data[i]
                    }
                }

            }
        })

        return sorted

    }


    //*********** Coloca objetos em elementos html *************/

function showResults(object){

    object.forEach((elem) => {

        let elem_container = document.createElement("div")
        document.querySelector(".filtro-pal-ct").appendChild(elem_container)
        elem_container.className += "elem-ct elem-ct-" + elem.title
        elem_container.className += elem.id

        let title_ct = document.createElement("div")
        document.querySelector(".elem-ct" + elem.title).appendChild(title_ct)
        title_ct.className += "title-ct-" + elem.title

        let title = document.createElement("h1")
        document.querySelector(".title-ct-" + elem.title).appendChild(title)
        title.className += "title"

        let date = document.createElement("div")
        document.querySelector(".elem-ct-" + elem.title).appendChild(date)
        //date.

    })
}

    












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