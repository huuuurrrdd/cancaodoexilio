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
                    </div
                `



// pesquisa_livre()





// criar uma caixa para colocar palavras (display absolute)
function pesquisa_livre(){

    //desenhar o html
    // /******** Caixa para o texto ********/
    // let pl_ct = document.createElement("div")
    // document.querySelector("nav").appendChild(pl_ct)
    // pl_ct.className += "pl-ct"
    
    /******** Form para pesquisa ********/ 
    let form = document.createElement("form")
    document.querySelector("nav").appendChild(form)
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
    bt_search.src = "./imagens/lupa.svg"
    bt_search.name = "submit"
    bt_search.alt = "submit"

    form.addEventListener("image", (e) => {
        e.preventDefault() // impde envio do formulario e controla o redirecionamento

        const palavra = input_search.value.trim() //remove espaços desnecessários ou outros

        if(palavra.length > 0) { // redirecionamento n esta a funcionar
            //redirecionando url
            window.location.href = `./lista_palavras.html?palavra=${encodeURIComponent(palavra)}`// Encodes characters such as ?,=,/,&,:
        }
    })
  
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
