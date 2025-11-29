/*

    Script para menu de navegação e outras coisas comuns em todas as páginas


*/
nav = document.createElement("nav")
nav.className = "navegacao nav-mobile"

body = document.querySelector("body")
body.appendChild(nav)

pesquisa_livre()


/********* Criação dos elementos *********/
a_home = document.createElement("a")
a_sobre = document.createElement("a")
//subnav
d_subnav = document.createElement("div")
    bt_subnav = document.createElement("div")
        i_bt_subnav = document.createElement("i")
    d_subnav_content = document.createElement("div")
        a_todos_textos = document.createElement("a")
        a_todas_palavras = document.createElement("a")
        a_categorias = document.createElement("a")



/********* Atribuicao de classes *********/ 
a_home.className = "a-nav nav-home"
a_sobre.className = "a-nav nav-sobre"
//subnav
d_subnav.className = "subnav"
    bt_subnav.className = "btsubnav"
        i_bt_subnav.className = "fa fa-down"
    d_subnav_content.className = "subnav-content"
        a_todos_textos.className = "a-subnav nav-todos-textos"
        a_todas_palavras.className = "a-subnav nav-todas-palavras"
        a_categorias.className = "a-subnav nav-categorias"



/********* Atribuicao de links *********/ 
a_home.href = "index.html?id=1"
a_sobre.href = "sobre.html"
a_todos_textos.href = "lista_textos.html"
a_todas_palavras.href = "lista_todas_palavras.html"
a_categorias.href = "p_categorias_palavras.html"


/********* Texto para display *********/ 
a_home.innerHTML = "Home"
a_sobre.innerHTML = "Sobre"
d_subnav.innerHTML = "Textos"
a_todos_textos.innerHTML = "Textos"
a_todas_palavras.innerHTML = "Palavras"
a_categorias.innerHTML = "Categorias"


/********* Colocação de elementos *********/ 
nav.appendChild(a_home)
nav.appendChild(a_sobre)
//subnav
nav.appendChild(d_subnav)
    d_subnav.appendChild(bt_subnav)
        bt_subnav.appendChild(i_bt_subnav)
    d_subnav.appendChild(d_subnav_content)
        d_subnav_content.appendChild(a_todos_textos)
        d_subnav_content.appendChild(a_todas_palavras)
        d_subnav_content.appendChild(a_categorias)



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
    let splitStr = str.toLowerCase().split(' ')
    if(!stopwords.includes(splitStr)){}
    for(let i = 0; i < splitStr.length; i++){ // não considerar as stopwords
        if(!stopwords.includes(splitStr[i])){
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        } else {
            splitStr[i] = splitStr[i]
        }
    }
    return splitStr.join(' '); 
  }   
