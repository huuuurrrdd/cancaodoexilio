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


    
    

    // form.addEventListener("submit", (e) => {
    //     e.preventDefault() // impde envio do formulario e controla o redirecionamento

    //     const palavra = input_search.value.trim() //remove espaços desnecessários ou outros

    //     if(palavra.length > 0) { // redirecionamento n esta a funcionar
    //         //redirecionando url
    //         window.location.href = `./lista_palavras.html?palavra=${encodeURIComponent(palavra)}`// Encodes characters such as ?,=,/,&,:
    //     }
    // })
  
}

    caixaResultados()

    //obter resultado(palavras); resultado (titulos); resultados (autores)

   function caixaResultados(){
        let caixa_resultados = document.createElement('div')
        caixa_resultados.className = "caixa-resultados"
        document.querySelector(".form-nav").appendChild(caixa_resultados)

        caixa_resultados.innerHTML += "Resultados"

    /*:::::::::::  __Pesquisa livre__  :::::::::::*/
    /***************** Pesquisa palavras ********************/
        let resulPalavras = document.createElement('div')
        resulPalavras.className = "resul-palavras"
        caixa_resultados.appendChild(resulPalavras)

        input_search.addEventListener('input', (e) => {
            let value = e.target.value


        })        

        return caixa_resultados
        
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
