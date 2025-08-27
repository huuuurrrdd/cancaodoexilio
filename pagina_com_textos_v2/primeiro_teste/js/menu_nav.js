/*

    Script para menu de navegação e outras coisas comuns em todas as páginas


*/




nav = document.createElement("nav")
nav.className = "navegacao"

body = document.querySelector("body")
body.appendChild(nav)

ul = document.createElement("ul")
nav.appendChild(ul)

pesquisa_livre()

li_home = document.createElement("li")
li_sobre = document.createElement("li")
li_todos_textos = document.createElement("li")
li_todas_palavras = document.createElement("li")
li_categorias = document.createElement("li")

li_home.className = "li-nav"
li_sobre.className = "li-nav"
li_todos_textos.className = "li-nav"
li_todas_palavras.className = "li-nav"
li_categorias.className = "li-nav"

ul.appendChild(li_home)
ul.appendChild(li_sobre)
ul.appendChild(li_todos_textos)
ul.appendChild(li_todas_palavras)
ul.appendChild(li_categorias)

li_home.innerHTML = "<a href = 'index.html?id=1'>Home</a>"
li_sobre.innerHTML = "<a href = 'sobre.html'>Sobre</a>"
li_todos_textos.innerHTML = "<a href = 'lista_textos.html'>Textos</a>"
li_todas_palavras.innerHTML = "<a href = 'lista_todas_palavras.html'>Palavras</a>"
li_categorias.innerHTML = "<a href = 'p_categorias_palavras.html'>Categorias</a>"



function pesquisa_livre(){

    //desenhar o html
    /******** Caixa para o texto ********/
    let pl_ct = document.createElement("div")
    document.querySelector("ul").appendChild(pl_ct)
    pl_ct.className += "pl-ct"
    
    /******** Form para pesquisa ********/ 
    let form = document.createElement("form")
    pl_ct.appendChild(form)
   

    /********** Input search ***********///está funcionall
    let input_search = document.createElement("input")
    form.appendChild(input_search)
    input_search.type = "text"
    input_search.placeholder = "pesquisa por palavra"
    input_search.name = "palavra" //importante!!

    /********* Button submit **************/ 
    let bt_search = document.createElement("input")
    form.appendChild(bt_search)
    bt_search.type = "submit"
    //bt_search.innerHTML = "🔎"
    bt_search.value = "🔎"

    form.addEventListener("submit", (e) => {
        e.preventDefault() // impde envio do formulario e controla o redirecionamento

        const palavra = input_search.value.trim() //remove espaços desnecessários ou outros
        

        if(palavra.length > 0) {
            //redirecionando url
            window.location.href = `./lista_palavras.html?palavra=${encodeURIComponent(palavra)}`// Encodes characters such as ?,=,/,&,:
        }
    })

    
}