/*

    Script para menu de navegação e outras coisas comuns em todas as páginas
    Destacar a página aberta

*/



let nav = document.createElement("nav")
nav.className = "navegacao nav-mobile"
nav.role = "navigation"

let body = document.querySelector("body")
body.appendChild(nav)

nav.innerHTML = `
                    <div id="menuToggle"> 
                        <input type="checkbox" id="menuCheckbox" />

                        <span></span>
                        <span></span>
                        <span></span>

                        <ul id="menu">
                            <li><a href="lista_textos.html">Textos</a></li>
                            <li><a href="lista_todas_palavras.html">Palavras</a></li>
                            <li><a href="p_categorias_palavras.html">Categorias</a></li>
                        
                            <li><a href="sobre.html">Sobre</a></li>
                            <li><a href="index.html?id=1">Home</a></li>
                        </ul>
                    </div>
                `



 



 /******** Imagem pesquisa ********/ 
    let div_pesquisa = document.createElement('div')
    div_pesquisa.id = "div-pesquisa"
    nav.appendChild(div_pesquisa)


    let lupa = document.createElement('img')
    lupa.src = "./imagens/mlupa1.svg"
    lupa.className = "lupa-icon"
    div_pesquisa.appendChild(lupa)

    pesquisa_livre()

    // if(lupa.style.display == "none"){

    // }
    
    lupa.addEventListener("click", (e) => {
        lupa.style.display = "none"
        document.querySelector(".form-nav").style.display = "flex"

    })

    let gWordData, gTextData, gStopList, gLemasData
    // variáveis de categorias
    let gLocais, gFauna, gFlora

// criar uma caixa para colocar palavras (display absolute)
function pesquisa_livre(){

    
    /******** Form para pesquisa ********/ 
    let form = document.createElement("form")
    div_pesquisa.appendChild(form)
    form.className = "form-nav"

   


    /********** Input search ***********///está funcionall
    let input_search = document.createElement("input")
    form.appendChild(input_search)
    input_search.className = "input-nav"

    input_search.type = "text"
    input_search.placeholder = "pesquisa por palavra"
    input_search.name = "palavra" //importante!!


     /********* Button submit **************/ 
    let bt_search = document.createElement("input")
    form.appendChild(bt_search)
    bt_search.className = "submit-nav"
    bt_search.type = "image"
    bt_search.src = "./imagens/mlupa1.svg"
    bt_search.name = "submit"
    bt_search.alt = "submit"

    // /********* Cruz **************/ 
    let close = document.createElement("div")
    close.className = "close-search"
    form.appendChild(close)

    close.innerHTML = "<span></span> <span></span>"

    close.addEventListener("click", () => {
        lupa.style.display = "block"
        document.querySelector(".form-nav").style.display = "none"
    })

        
    fetchData()



    caixaResultados(input_search)
    
    

    // form.addEventListener("submit", (e) => {
    //     e.preventDefault() // impde envio do formulario e controla o redirecionamento

    //     const palavra = input_search.value.trim() //remove espaços desnecessários ou outros

    //     if(palavra.length > 0) { // redirecionamento n esta a funcionar
    //         //redirecionando url
    //         window.location.href = `./lista_palavras.html?palavra=${encodeURIComponent(palavra)}`// Encodes characters such as ?,=,/,&,:
    //     }
    // })
  
}

    

    //obter resultado(palavras); resultado (titulos); resultados (autores)


    /*:::::::::::  __Pesquisa livre__  :::::::::::*/
   function caixaResultados(input){

        let sliceValue = 4

        let caixa_resultados = document.createElement('div')
        caixa_resultados.className = "caixa-resultados"
        document.querySelector(".form-nav").appendChild(caixa_resultados)

        caixa_resultados.innerHTML += "Resultados"

    // colocar uma caixa dentro de caixa_resultados
    /***************** caixa_com_resultados ********************/
    let caixa_com_resultados = document.createElement('div')
    caixa_com_resultados.className = 'caixa-com-resultados'
    caixa_resultados.appendChild(caixa_com_resultados)


    /***************** caixa_tudo_ao_mesmo_tempo ********************/
        let resulTodos = document.createElement('ul')
        resulTodos.className = "resul-todos"
        resulTodos.innerHTML = '<h4>Todos<h4>'
        caixa_com_resultados.appendChild(resulTodos)
   
    /***************** Pesquisa palavras ********************/
        let resulPalavras = document.createElement('ul') // definir para apenas criar caso existam resultados
        resulPalavras.className = "resul-palavras"
        resulPalavras.innerHTML = '<h4>Palavras<h4>'
        caixa_com_resultados.appendChild(resulPalavras)

    /***************** Pesquisa poemas ********************/
        let resulTitulos = document.createElement('ul')
        resulTitulos.className = "resul-titulos"
        resulTitulos.innerHTML = '<h4>Poemas<h4>'
        caixa_com_resultados.appendChild(resulTitulos)
    
    /***************** Pesquisa autores ********************/
        let resulAutores = document.createElement('ul')
        resulAutores.className = "resul-autores"
        resulAutores.innerHTML = '<h4>Autores<h4>'
        caixa_com_resultados.appendChild(resulAutores)

    /*::::::::::: Pesquisa categorias :::::::::::*/
    /***************** Pesquisa locais ********************/
        let resulLocais = document.createElement('ul')
        resulLocais.className = "resul-locais"
        resulLocais.innerHTML = '<h4>Locais<h4>'
        caixa_com_resultados.appendChild(resulLocais)

    /***************** Pesquisa fauna ********************/
        let resulFauna = document.createElement('ul')
        resulFauna.className = "resul-fauna"
        resulFauna.innerHTML = '<h4>Fauna<h4>'
        caixa_com_resultados.appendChild(resulFauna)

    /***************** Pesquisa flora ********************/
        let resulFlora = document.createElement('ul')
        resulFlora.className = "resul-flora"
        resulFlora.innerHTML = '<h4>Flora<h4>'
        caixa_com_resultados.appendChild(resulFlora)

    /***************** Pesquisa anos ********************/
        let resulAnos = document.createElement('ul')
        resulAnos.className = "resul-anos"
        resulAnos.innerHTML = '<h4>Anos<h4>'
        caixa_com_resultados.appendChild(resulAnos)



        input.addEventListener('input', (e) => {
            let value = e.target.value
            let sliceValue = 4

            //valores: filteredWord, string com propriedade do icone, vslor do slice, html a ser preenchido, value
            //1- palavras, 2-poemas, 3- autores, 4- anos
            filtraResultados(value, gWordData.palavras, "palavra", resulPalavras, sliceValue, false, false)
            filtraResultados(value, gTextData, "title", resulTitulos, sliceValue, false, false)
            filtraResultados(value, gTextData, "author", resulAutores, sliceValue, false, false)
            filtraResultados(value, gTextData, "date_of_publication", resulAnos, sliceValue, false, true)

            //categorias (array) 1-Locais, 2-Fauna, 3-Flora
            filtraResultados(value, gTextData, "categorias.locais.locais_limpos", resulLocais, sliceValue, true, false)
            filtraResultados(value, gTextData, "categorias.fauna", resulFauna, sliceValue, true, false)
            filtraResultados(value, gTextData, "categorias.flora", resulFlora, sliceValue, true, false)

        })



        return caixa_com_resultados
        
    }
    

//funcao para ordenar resultados
//tentando passar para uma funcao:
//valores: filteredWord, string com propriedade do icone, vslor do slice, html a ser preenchido, value

//função para obter propriedades interiores
function getNestedProperty(obj, path){
    const keys = path.split('.')
    let result = obj

    for(let key of keys){
        result = result?.[key]
        if(result === undefined) return undefined
    }

    return result
}


function filtraResultados(value, dados, propriedade, ulHTML, sliceValue, isArray = false, isNumeric = false){

    //Clear previous results (mantém header)
    const header = ulHTML.querySelector('h4')
    ulHTML.innerHTML = ''
    if(header) ulHTML.appendChild(header)

    
    if(value && value.trim().length > 0){
        const trimmmedValue = value.trim()
        const val = isNumeric ? trimmmedValue : normalize(trimmmedValue.toLowerCase())

        let filteredResults = []


        //processa cada item nos dados
        dados.forEach(item => {
            //lidar se item é simples string/value vs object

            let propValue

            if(typeof item === 'string' || typeof item === 'number'){
                propValue = item
            } else {
                propValue = getNestedProperty(item, propriedade)
            }


            if(isArray && Array.isArray(propValue)){
                //para arrays (como locais_limpos, fauna, flora)
                //cria reultados separados para cada elemento correspondente
                propValue.forEach(element => {
                    if(element === null || element === undefined) return

                    const normalizedElement = normalize(String(element))
                    if(normalizedElement.includes(val)){
                        filteredResults.push({
                            originalItem: item,
                            displayValue: element,
                            normalizedValue: normalizedElement,
                            sortValue: normalizedElement
                        })
                    }
                })

            } else {
                if(propValue === null || propValue === undefined) return

                if(isNumeric){
                    // lida com valores numericos (como anos)
                    const stringValue = String(propValue)
                    if(stringValue.startsWith(trimmmedValue)){
                        filteredResults.push({
                            originalItem: item, 
                            displayValue: propValue,
                            normalizedValue: stringValue,
                            sortValue: propValue, // mantém como numero para ordenação
                            isNumber: true
                        })
                    }
                } else {
                    // para propriedades simples (como titulo e autor) (valores "normais")
                    const normalizedValue = normalize(String(propValue))
                    if(normalizedValue.includes(val)){
                        filteredResults.push({
                            originalItem: item,
                            displayValue: propValue,
                            normalizedValue: normalizedValue,
                            sortValue: normalizedValue
                        })
                    }
                }

                
                //console.log(propValue)
            }
        })

        // sort resultados
            filteredResults.sort((a,b) => {
                
                if(isNumeric && a.isNumber && b.isNumber){
                    const na = Number(a.sortValue)
                    const nb = Number(b.sortValue)
                    return (Number.isNaN(na) ? Infinity : na) - (Number.isNaN(nb) ? Infinity : nb)
                } else {
                    const aValue = a.sortValue
                    const bValue = b.sortValue

                    // verifica se valores começam com termo de pesquisa
                    let aStarts, bStarts

                    if(aValue.startsWith("[")){
                        aStarts = aValue.startsWith(val, 1)
                    } else {
                        aStarts = aValue.startsWith(val)
                    }

                    if(bValue.startsWith("[")){
                        bStarts = bValue.startsWith(val, 1)
                    } else {
                        bStarts = bValue.startsWith(val)
                    }

                    //prioriza items que começam com search value
                    if(aStarts && !bStarts) return -1
                    if(!aStarts && bStarts) return 1

                 
                    return aValue.localeCompare(bValue, 'pt', { sensitivity: 'base' })

                }
                
            })
            
            //limitar resultados
            filteredResults = filteredResults.slice(0, sliceValue)

            //Display results
            if(filteredResults.length === 0){
                //resulAutores.innerHTML = `<li class="no-results">Não foram encontrados resultados para: "${value}"</li>`
                ulHTML.innerHTML = ''
            } else {   
                
                filteredResults.forEach(result => {
                    const li = document.createElement('li')
                    li.className = "li-item"
                    li.textContent = result.displayValue

                    

                    li.addEventListener('click', () => {
                        console.log(`Selected item: ${result.originalItem}`)
                    })

                    ulHTML.appendChild(li)
                    //console.log(item[propriedade])
                })
            }
            
    }
}
    


/*::::::::::: Fetch data :::::::::::*/
function fetchData(){
    let wordData, textData, stoplist, lemmasData

    //dicionario json
    fetch("./Dict_palavras_lemas_v0004.json")
        .then(response => {
            if(!response.ok){ // menssagem de erro
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.json() // return data
        })
        .then(data => {
            wordData = data; //Guarda dict_pal em wordData
            return fetch("./t4_textos_loc_fauna_flora.json") // fetch json dos textos
        })
        .then(response => { // mensagem de erro
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.json() // return data
        })
        .then(data => {
            textData = data // info dos textos a conter as coordenadas geográficas
            return fetch("./Dict_lemas_palavras_v0002.json")
        })
        .then(response => {
                if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.json() // return data
        })
        .then(data => {
            lemmasData = data; // guarda json dos lemas
            return fetch("./stopwords/portuguese")
        })
        .then(response =>{
            if(!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.text() // return stopwords text
        })
        .then(data => {
            stoplist = data
            .split('\n')
            .map(s_word => s_word.trim())
            .filter(s_word => s_word.length > 0)

            //funcao com os 3 dados dos 3 ficheiros
            displayDataPesquisa(wordData, textData, stoplist, lemmasData)
        })
        .catch(error => console.error('Failed to fetch data', error))
}





function displayDataPesquisa(wordData, textData, stoplist, lemmasData){

   gWordData = wordData
   gTextData = textData
   gStopList = stoplist
   gLemasData = lemmasData



}

function normalize(str){
    //converter emstring se n for
    if(typeof str !== 'string'){
        str = String(str || '')
    }
  return str
    ?.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}


/*|||||||||||||||||||||||| Funções gerais ||||||||||||||||||||||||*/

/*::::::::::: Textos upperCase :::::::::::*/
  function titleCase(str, stopwords){
        
    //if (str === null || str === undefined) return '';
    str = String(str);
    let splitStr = str.toLowerCase().split(' ')
    if(!stopwords.includes(splitStr)){}
    for(let i = 0; i < splitStr.length; i++){ // não considerar as stopwords
        if(!stopwords.includes(splitStr[i]) || splitStr[i].includes("são")){
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        } else {
            splitStr[i] = splitStr[i]
        }
    }
    return splitStr.join(' '); 
  }   
