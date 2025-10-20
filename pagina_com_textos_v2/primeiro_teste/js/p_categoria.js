/*

    Script para pág de categoria

*/

//*************  Buscar parametro de categoria  ****************/
function getQueryParam(param){
    let urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(param)
}

//obter nome de categoria
let categoria = getQueryParam("categoria")

console.log(categoria) // funciona!!


//*************  Acesso a dados  ****************/
function fetchData(){
    let wordData, textData, lemmasData

    //dicionario json
    fetch("./Dict_palavras_lemas_v0004.json")
        .then(response => {
            if(!response.ok){ // menssagem de erro
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.json()
        })
        .then(data =>{
            wordData = data;
            return fetch("./Dict_lemas_palavras_v0002.json")
        })
        .then(response => {
            if(!response.ok){ // menssagem de erro
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.json()
        })
        .then(data => {
            lemmasData = data;
            return fetch("./t3_textos_loc_fauna_flora.json") // fetch json dos textos
        })
        .then(response => { // mwensagem de erro
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.json()
        })
        .then(data => {
            textData = data
            displayData(wordData, textData, lemmasData) //funcao com os 2 jsons
        })
        .catch(error => console.error('Failed to fetch data', error))

}

fetchData()



function displayData(wordData, textData){

    /* Passos para o gráfico:
        -> Informações a obter: 
            Gráfico:
            - (feito!) array com anos (já tenho pág palavras??)
            - (feito!) array com frequencia em cada ano (da categoria no geral)

            - Falta outras categorias: locais, anos e autores!!
            - Se tiver tempo, colocar em dácadas (fazer um pequeno teste)

            Palavras:
            - Colocar lista de palavras pertencentes à categoria (já feito na página anterior)
            - Colocar a frequencia na div de barra de frequencia (primeiro em número, depois descobro como colocar a barra)
            - Link de acesso à página da palavra (já feito anteriormente)

            (Depois avançar para a página específica e fazer o mesmo para a palavra específica selecionada)
            (-> No fim, ver como posso, nas palavras populares, colocar os resultados em logaritmo 
                - (pesquisar isso!!)
                - Fazer!! e ver se resultou bem!)

            - Depois!! Fazer CSS de algumas páginas (para ficar mais arrumadinho)
    
    */

    //Acedendo a dados de número de "categoria" por ano
    // para a categoria: array para idTexto, freq, ano
    id_textos = [] // para cada texto, o n de vezes
    frequencia = []
    anos_cat = []
        

    let nomeCat = categoria.toLowerCase()

    let anos_grafico = []
    let freq_grafico = []
    // podia criar um array multidimencional para os ids!!
    let ids_final = []



    if(nomeCat == "fauna" || nomeCat == "flora"){ // funcionaa!!
        //console.log("é categoria") funciona!!

        // Tentando fazer de outra forma: (para cada texto, associa uma frequencia)
        for(let i = 0; i < textData.length; i++){
            if(textData[i].categorias[nomeCat].length > 0){
                id_textos.push(textData[i].id)
                frequencia.push(textData[i].categorias[nomeCat].length)
                anos_cat.push(textData[i].date_of_publication)
            }
            
        }


        // CRIAÇÃO DE ARRAY MULTIDIMENCIONAL COM OS ANOS, IDs E FREQUENCIAS
        const ag_anos = []; // array de (array de anos)
        let gAtual_anos = []; // array atual de anos

        const ag_freq = [];
        let gAtual_freq = [];

        const ag_id = [];
        let gAtual_id = [];

        //junta os anos iguais (ao mesmo tempo que junta a frequencia e os ids)
        for(let i = 0; i < anos_cat.length; i++){
            if(i === 0 || anos_cat[i] == anos_cat[i-1]){
                gAtual_anos.push(anos_cat[i]) //igual ao anterior, adiciona

                gAtual_freq.push(frequencia[i])
                gAtual_id.push(id_textos[i])

            } else {

                    ag_anos.push(gAtual_anos) // push grupo finalizado
                    gAtual_anos = [anos_cat[i]] // começa novo grupo

                        //o mesmo para ids e frequencias
                    ag_freq.push(gAtual_freq);
                    gAtual_freq = [frequencia[i]];

                    ag_id.push(gAtual_id);
                    gAtual_id = [id_textos[i]];
                }
        }
        

        // push ultimo grupo
        // array de anos que n contém os anos sem elementos na categoria
        if (gAtual_anos.length) ag_anos.push(gAtual_anos); 
        //console.log(ag_anos); 

        if (gAtual_freq.length) ag_freq.push(gAtual_freq); // frequencia por cada texto
        //console.log(ag_freq);

        if (gAtual_id.length) ag_id.push(gAtual_id); // id de cada texto
        //console.log(ag_id);

        //Testes de funcionamento de variáveis
        console.log(`Variável ag_freq[30][2]: ${ag_freq[30][0]}`) // funciona!!


        //TRANSFORMAR ARRAYS MULTIDIMENSIONAIS DOS ANOS E FREQ EM ARRAYS UNIDIMENSIONAIS
        const ag_anos_unidimensional = [] // transformar cada conjunto de anos ex(1847, 1847) em 1847
        const ag_freq_p_ano = [] // juntar todas as frequencias em uma só ex(2, 1) em 3
        // falta o id dos textos (acrescentar algo vazio quando n há)

        for(let i = 0; i < ag_anos.length; i++){
            let soma_freq = 0
            for(let j = 0; j < ag_anos[i].length; j++){
                soma_freq += ag_freq[i][j] // percorre em cada ano cada frequencia de cada texto e soma
            }
            ag_freq_p_ano.push(soma_freq)
            ag_anos_unidimensional.push(ag_anos[i][0]) // escolhe o primeiro, pq são todos iguais

        }

        //   console.log("Freq e anos respetivamente:")
        //   console.log(ag_anos_unidimensional) //sem valores repetidos
        //   console.log(ag_freq_p_ano) // funcionou!!



        //TENTATIVA DE CONTAR TODOS OS ANOS E IGUALAR A 0 OS ANOS SEM REPRESENTAÇÃO
        const val_anos = ag_anos_unidimensional
        const val_freq = ag_freq_p_ano // apenas os anos em que freq > 0
        // ainda multidimensional
        const val_id = ag_id

        const start = 1846
        const end = 2025 // podia colocar o ano atual



        for(let y = start; y <= end; y++){
            anos_grafico.push(y) // adiciona anos normalmente

            const idx = val_anos.indexOf(y) // obtém o indice do valor y (o ano selecionado) -> se n existir indice para esse valor, idx = -1
            if(idx !== -1){ // caso exista um índice com esse valor
                freq_grafico.push(val_freq[idx]) // adiciona o valor
                ids_final.push(val_id[idx]) // espero que adicione todos os valores
            } else {
                freq_grafico.push(0) // se n tiver, adiciona 0
                ids_final.push(0)
            }
        }

        console.log("Valores para anos e frq no gráfico:")
        // console.log(anos_grafico)
        // console.log(freq_grafico)
        // console.log(ids_final)
        //console.log(`anos ${anos_grafico.length}, freq: ${freq_grafico.length}, ids ${ids_final.length}`) // tudo 180, tudo funciona!!!

    }
    
    

    
        // Ainda n criei objeto que contenha todas as palavras e valores de frequencias
        let cate = [
        {
            categoria: "Locais",
            labels_cat: ["Pernambuco", "Bahia", "Maranhão", "Sertão", "Minas Gerais", "Corrientes"],
            labels_cat_value: [12, 19, 3, 5, 2, 3],
            mais_frequente: "Bahia",
            info_mais_frequente: "Bahia é Bahia"
        },

        {
            categoria: "Fauna",
            labels_cat: ["Sabiá", "Roxinol", "Bem-te-vi", "Pomba", "Andorinha", "Canário"],
            labels_cat_value: [20, 19, 3, 5, 2, 3],
            mais_frequente: "Sabiá",
            info_mais_frequente: "Sabiá é Sabiá"
        },

        {
            categoria: "Flora",
            labels_cat: ["Palmeira", "Loureiros", "Mangabeiras", "Coco", "Bananeira", "Violeta"],
            labels_cat_value: [21, 19, 3, 5, 2, 3],
            mais_frequente: "Palmeira",
            info_mais_frequente: "Palmeira é Palmeira"
        },

        {
            categoria: "Autores",
            labels_cat: ["Jose Maia Ferreira", "Leandro de Castilho", "Casimiro de Abreu", "M A Pinto de Sampaio", "Pedro José Teixeira", "Miguel Marques"],
            labels_cat_value: [12, 19, 3, 5, 2, 3],
            mais_frequente: "Jose Maia Ferreira",
            info_mais_frequente: "Jose Maia Ferreira é Jose Maia Ferreira"
        },

        {
            categoria: "Anos",
            labels_cat: ["2009", "2012", "2020", "2015", "2008", "2006"],
            labels_cat_value: [20, 19, 3, 5, 2, 3],
            mais_frequente: "2009",
            info_mais_frequente: "2009 é 2009"
        },

    ]

    let categoria_container = document.createElement("div")
    document.querySelector("body").appendChild(categoria_container)
    categoria_container.className += "categoria-container"

    let subtitulo = document.createElement("p")
    document.querySelector(".categoria-container").appendChild(subtitulo)
    subtitulo.className += "subtitulo"
    subtitulo.innerText = "Categoria de palavras:"

    //titulo (Nome de categoria)
    let categoria_palavras_h = document.createElement("h1")
    document.querySelector(".categoria-container").appendChild(categoria_palavras_h)
    categoria_palavras_h.className += "categoria-palavras-h page-title"
    categoria_palavras_h.innerText = categoria

    //grafico 
    let grafico_ct = document.createElement("div")
    document.querySelector(".categoria-container").appendChild(grafico_ct)
    grafico_ct.className += "grafico-ct"
    
    let canvas = document.createElement("canvas")
    document.querySelector(".grafico-ct").appendChild(canvas)
    canvas.className += "grafico-categoria"
    
    const GP = document.querySelector(".grafico-categoria")

    //*********** Gráfico inicial **********/
    // neste gráfico é importante poder comparar o nº de textos total com o nº que mencionam
    new Chart(GP, {
        type: "bar",
        data: {
            labels: anos_grafico,
            datasets:[{
                label: `${categoria} ao longo do tempo`,
                data: freq_grafico,
                borderWidth: 1
            }]
        },
        options:{
            scales:{
                y:{
                    beginAtZero: true
                }
            }
        }
    })

    // Lista de todos os nomes de categorias existentes 
    // (vai ser necessário colocá-los por ordem de frequencia)
    let list_all_container = document.createElement("div")
    document.querySelector(".categoria-container").appendChild(list_all_container)
    list_all_container.className += "list-all-container"

    let ct_head_list = document.createElement("div")
    document.querySelector(".list-all-container").appendChild(ct_head_list)
    ct_head_list.className += "ct-head-list"

    ct_head_list.innerHTML = `  <div class = "palavras header">Palavra</div>
                                <div class = "texto header">Textos</div>
                                <div class = "frequencia header">Freq</div>`
    
    ct_head_list.style.backgroundColor = "yellow"


    let container = document.createElement("div")
    document.querySelector(".list-all-container").appendChild(container)
    container.className += "container"


    // descobrir index categoria
    let index_cate 

    for(let j = 0; j < cate.length; j++){
        if(cate[j].categoria == categoria){
            index_cate = j
        }
    }

    console.log("Index categoria =" + index_cate) //funciona!!

    //iteracao para display
    for(let i = 0; i < cate[index_cate].labels_cat.length; i++){
        
        let ct_item = document.createElement("div")
        document.querySelector(".container").appendChild(ct_item)
        ct_item.className += "ct-item ct-item" + i

        // colocar o link para a proxima página na palavra
        // funcionaaa!!!!
        let link_palavra_cat = document.createElement("a")
        document.querySelector(".ct-item" + i).appendChild(link_palavra_cat)
        link_palavra_cat.className += "link-palavra-cat link-palavra-cat" + i
        link_palavra_cat.href = "./p_categoria_especifica.html?categoria=" + categoria + "&especifica=" + cate[index_cate].labels_cat[i]

        let palavra = document.createElement("div")
        document.querySelector(".link-palavra-cat" + i).appendChild(palavra)
        palavra.className += "palavra"
        palavra.innerHTML = cate[index_cate].labels_cat[i]


        let barra_frequencia = document.createElement("div")
        document.querySelector(".ct-item" + i).appendChild(barra_frequencia)
        barra_frequencia.className += "barra-frequencia"
        barra_frequencia.innerHTML = cate[index_cate].labels_cat_value[i]

    }


}