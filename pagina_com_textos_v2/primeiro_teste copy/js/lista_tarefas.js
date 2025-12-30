/*  Coisas a avançar nesta página [PÁGINA CATEGORIA ESPECÍFICA]:
        Palavra:
            - (feito!!) Verificar o problema do espaço nos autores na página especifica 
            - (feito!) Verificar se existem eventualemte outros problemas com palavras
            - (feito!) Ajustar a info da wikipédia para não ficar tão extensa

        Gráfico:
            - (feito!) Array com anos (exemplo de pág palavras e pág categorias)
            - (feito!) Array com frequencia em cada ano (da palavra) - apenas existe uma por texto em que ocorre
            - (feito!!)Colocar funcional para locais, anos e autores -> neste momento n está funcional!!!
            - Pode ser necessário colocar em opacidade baixa, as ocorrencias totais da categoria (para comparação)
            - (ESTE!!)Possibilidade de selecionar um elemento do gráfico e aceder a ele

        Textos que mencionam (manter a lista dos ids dos textos)
            - (Feito!!) Manter a lista dos ids dos textos que mencionam para colocar na tabela
            - (Feito!!) Alterar o título da tabela conforme o nome da categoria (se autor, escrito por, se ano...)
            - (ESTE!) Perceber pq brasil tem freq de 249 numa página e aqui tem 200
            - (ESTE!) Colocar links para os textos na lista de textos (o msmo na pág das palavras)

        Depois:
            - (feito!!) Página das palavras: colocar os resultados das palavras populares em logaritmos
            - (feito!!) Colocar links nas páginas de texto para as categorias e palavras específicas
    
        CSS:(vou avançar aqui!!)
            - Assim que tiver avançado, posso colocar css em todas as páginas das categorias [indica que estão mais prontas]
                -> Inspirar nas páginas de palavras (colocar margens, definir tabelas e colocar graficos a preto)

        Ainda na PÁGINA DAS PALAVRAS:
            - (feito!!)Ordenar os resultados das palavras (ordem alfabética, frequencia, e titulo de textos) (https://www.youtube.com/watch?v=hkCOsr4xyIc)
            - (feito!!)Apresentar resultados do array de resultados (tem lá todos os valores)
            - (feito!!)Chamar eventlistner click para reordenar resultados (está a ser complicado!!)
                -> (feito!)Eliminar as funções a mais e tornar mais eficientes as que estão
                -> (feito!)Colocar o filtro da frequencia a funcionar
                -> (feito!)Colocar o filtro dos titulos alfabeticamente a funcionar vs cronologicamente
            - (feito!)Colocar todos os resultados (limitando o nº de resultados que aparecem por página (umas 50 por página))
                -> Falta colocar indices em 'inline'
                -> colocar '...' agrupando os que estão a ocupar muito espaço ->talvez um array de 3?  (n sei como se faz!!)
            - (EM PROCESSO...) Acrescentar pesquisa livre de PALAVRAS:
                -> (feito!)Colocar input html
                -> (feito!)Pesquisa pelo valor do input
                -> (feito!)Aparecer os resultados na tabela da plataforma
                    -> (feito!)Colocar resultados ordenados conforme as primeiras letras do input.value
                    -> (feito!)Permitir pesquisa ignorando pontuação
                    -> (feito!)Atualizar numero de páginas conforme a numeração dos resultados
                    -> Atualizar eventListner dos indices das páginas (provavlmente n estão compatíveis, mas uma questão de analizar os arrays)
            - Acrescentar pesquisar palavras por titulo
                -> Criar uma inputbox em html
                -> Testar como ordenar os resultados usando o filter()
                -> Display dos resultados na tabela da plataforma
                    -> Todos os passos da tarefa anterior

            - (feito!) Colocar links nas PALAVRAS para poder aceder à sua página e TEXTOS
            - Acrescentar possibilidade de ocultar/ mostrar os textos quando são muitos (ou) mostrar mais/menos (quando maior que 3)
            - REPETIR OS FILTROS PARA AS OUTRAS PÁGINAS (depois da pesquisa livre!!)
        
            Gráfico:
            - Criar versão de gráfico sem stopwords (testar com apenas frequencia, ou com TFIDF, ou com palavras/n de palavras total)

        Em PESQUISA DE TEXTOS:
            - (feito!)Colocar como default o modo amostra
            - (feito!)Acrescentar mapa no modo mapa
            - (feito!)Colocar resultados em forma de grid (está em forma de flex)
            - Melhorar a parte da pontuação do modo amostra (verificar como foi feito na página inicial de textos)
            - Colocar os resultados todos em modo tabela (os da amostra e da tabela) - com CSS
            - (feito!)Acrescentar o mapa com os locais e os textos (associá-los)
            - Colocar filtros de pesquisa em "amostra" e "tabela"
                -> (feito!)Ordenar por ano (crescente e decrescente) -> inspirar nas funções das palavras
                -> (feito!)Ordenar por título alfabeticamente (e reverse())
                -> (feito!) Ordenar por autor alfabeticamente (e reverse())
                -> Verificar erros e apontar para futura melhoria!!

        Em PÁGINA DE TEXTO:
            - (feito) Colocar link de palavra nas categorias e ainda link de categorias nos nomes (n importa o estilo)

        Em MENU DE NAVEGAÇÃO:
            - Refazer menu com base em algum template
            - Enquadrar a ferramenta de pesquisa
            - Caixa de opções à medida que vai escrevendo (ou não...)
            - Perceber qual o problema de acesso ao link

        Ainda:
        - Ver discussões e apontamentos da reunião e formular tarefas de correção e outras baseado na reunião
            -> Criar página sobre (mesmo que mal)
            -> Variedade de gráficos: 3 gráficos diferentes lado a lado, o que representam e significado do que representam
            -> Avançar a estética do website o mais rápido possível!! (especialmente a página de textos e de palavras)
            -> Corrigir as categorias de palavras (ver como isso será integrado no código e na base de dados)
                -> Criar um script em que se remova tudo o que não é aqueles nomes que de facto representam aquelas categorias


******************************************************************
    Coisas a fazer para ter o site funcional
        Geral:
        - Substituir "Categorias de palavras" por pesquisa de textos por temas
        - Ver se é possível colocar o gráfico a adaptar-se ao tamanho da pág
        
        HOME:
        - (feito [+/-]) Colocar corretamente a formatação de CSS
        - (feito!!) Adicionar links para autor e ano [na página de ano e autor]
        - Texto de contextualização:
            -> Acrescentar algum contexto ao lado do poema (o da página sobre)
            -> Um resumo de como interagir (um parágrafo pequeno + instruções básicas)
            -> Links do autor ou do poema (ex: wikipedia)

        Correção de texto:
        -> Colocar os quadrados como texto corretamente (verificar quais são os simbolos que estão em quadrados):
            - travessões
        -> Quando a pontuação se trata de parêntesis, colocar "(" antes e ")" depois da palavra(ver pq isso está mal)
        -> remover espaço antes de ";"
        ->Título:
            - Criar função para criar o título: caso tenha a frase separada por 2* /n, considerar, caso contrário, ir buscar o título
            - Caso tenha título, remover o título do texto (posso criar variável para isso)



        PÁGINA DE PALAVRA:
        - (feito - primeira página!) Criar um container para a parte de cima e diminuir a margem do contentor geral (o mesmo para todas as páginas)
        - Em cada palavra, colocar um texto descritivo sobre a palavra.
            -> Ex(Palavra "canção" aparece em x textos de x autores diferentes. 
            O texto/ ano que aparece mais vezes...)
        - Colocar a formatação em cima igual ao das categorias: "Palavra:"
        -> Colocar filtros de ordenação
        -> Colocar filtros de pesquisa 
        -> Colocar link em anos e autores
        -> Refazer a tabela
        -> Pensar num mecanismo para reduzir a carga(colocar os números por baixo)

        (Extra: Possibilidade de adicionar uma palavra ou um tema de categoria para filtrar os dois em conjunto)
            - Para isso era preciso ver quais as palavras que tbm contêm canção 
                -> comparando os textos que contêm canção e os textos que contêm palavra x, os que forem em comum, apresentar!
                -> Poderia ser a quantidade de textos
                    -> Quanto a frequencia, teria de colocar um e outro em simultêneo [podia ser uma dropbox com as possibilidades]


        SOBRE:
        - seria uma descrição mais detalhada
        - Acesso a link do livro
        - O sobre atual, estaria na página "home"
        - As "categorias" seriam o conceito mais importante do site [subcategorias dos textos]

        PÁGINA LISTA DE TEXTOS:
        - Ter filtros funcionais;
        - Filtros de pesquisa [input] funcional
        - Os botões de amostra e tabela estarem ao nivel do cabeçalho da tabela
        - Os números em baixo funcionais (usar inline block ou flex como em cima!!)
        - Mapa:
            - Ser possível expandir; 
            - Ser possível clicar para aceder aos textos
            - Ser possível filtrar por fauna e flora e outros temas (pode ficar na página dos temas)
            - Uma descrição de para que serve a página (talvez num I ou ?)
        - (feito!)Links:
            - Em amostra 
                -> div do conteúdo: texto
                -> Autor e ano para as respetivas páginas
            - Tabela
                -> Links para texto, ano e autor
        - Pensar em fazer apenas a versão tabela (a acrescentar/ocultar o texto)



        PÁGINA LISTA DE PALAVRAS:
        - Colocar ordem default (de maior frequencia para menor)
        - Links
            - Colocar link para palavra
            - Links para textos

        PÁGINA DE CATEGORIAS:
        - (feito) Colocar gráficos com flex ou numa grelha!! (optei pela grelha - inspirado em cats)
        - (feito) Colocar todos os gráficos com cor preta (ou verde, ver e decidir as cores principais e tipografia)
        - Colocar info da wikipédia (como na página específica)

        PÁGINA DE CATEGORIA ESPECÍFICA:
        - Colocar as barras em representação da frequencia

        PÁGINA DE ELEMENTO DE CATEGORIA:
        - (feito) Colocar o resumo da wikipédia menor
        - (ESTE) Garantir que ao clicar, consigo aceder à wikipédia
        - (se necessário) colocar filtro de pesquisa [consoante a quantidade de resultados]- ex: em sabiá é necessário
        - Colocar botão "voltar"
        - Colocar representação da evolução dos textos ao longo do tempo (para se poder comparar) -> pode ser necessário ver se há uma forma melhor


        Para os filtros no geral:
        - (feito!!)Ignorar [] e passar à proxima letra
        - (feito!!)Anos funcionammm!!!!
        - Colocar filtros na páginas em falta!
        - Números em baixo:
            -> (feito!) Alinhados
            -> Funcionais
            -> Com destaque no número atualmente selecionado
            -> Ver como acrescentar (...)
        - Nas palavras, ordenar por ordem de frequencia
        - Ocultar textos até certo número
        - Na pág de palavra e página de palavras falta colocar como default a frequencia maior primeiro

        Listagem de nomes de categorias: 
            -> Criar nova versão (manualmente) para cada categoria -> colocar nomes iguais [podia colocar uma espécie de tradução geral ()]

        No geral:
        - (feito!)Colocar sticky na navegação e nos topos de tabela!!!
        - Pág palavras: 
            -> só colocar alguns numeros a aparecerem! (de forma a só se ver uma linha) - ou colocar com barra de deslizar
                - (até podia estar stiky)
            ->(isto!) ocultar/mostrar poemas:
                - Poemas, 
                - headers de uma célula (mostrar/ocultar o input de pesquisa - preciso de manter um icone [uma setinha!!] para isso)
            -> Falta o filtro input dos títulos + filtro de frequencias
        - Falta colocar a pesquisa geral de palavras funcional!!
            -> colocar algo por baixo do mapa
        página de palavra:
            - Falta os inputs de pesquisa funcionais;
            - Colocar: palavra selecionada em cima (como nas categorias)
        - Na ordenação de ano considerar os '?' como os mais recentes



        //::::::::::::::::::::::::: Nova lista ::::::::::::::::::::::::://

        P_categoias_palavras:
        - Acrescentar 
            textos + 
            palavras

        - Remover info wiki
            - Substituir com info geral sobre o pequeno gráfico
        
        - Mudar a vista de tabela: 
        item: título | info sobre tabela (ex: palavras mais usadas são...) | gráfico
            textos: textos com mais palavras? | textos com mais palavras diferentes? (por ano?) -> deve ter um gráfico na pág texto!!
        - palavras: palavras diferentes por ano

        - Cat-sections:
            
        .cat-section{
            grid-column: span 3; /* Each item spans 3 columns }
        .cat-section:nth-child(3n+1){ /* 1st, 4th, 7th items 
            grid-column: 3 / 6;}
        .cat-section:nth-child(3n+2){ /* 2nd, 5th, 8th items 
            grid-column: 6 / 9;}
        .cat-section:nth-child(3n) { /* 3rd, 6th, 9th items 
            grid-column: 9 / 12;}


        
        ================================================================
        lista_todas_palavras:

        - Gráfico
            - Construir um gráfico com as "palavras diferentes" em cada ano 
            (ter um set[.length] para cada ano com as palavras)

        - Criar destaque para as barras que contêm a palavra selecionada
        - (em mouseOver criar texto explicativo sobre o "conceito de palavra")

        - Possibilidade de alternar gráfico com mapa


    */



// código da página de palavras (incompleto) - vou em "Event listners"

  function displayTodasPalavras(){

  //*********  Funções para display [ todas palavras]  *******************/
    // Testar com os arrays de palavras
    // let indexPal = todosOBJpalavrasSStopwords[i].indice; -> Determina os indices dos resultados
    // devia ser mais especifico para cada botao (total de resultados é o indexPal) 
    // Total seria: todosOBJpalavrasSStopwords.length
    div_display.innerHTML = "";

    // valores default para ordenação de resultados
    let ordAlf = "AZ" // o atual
    let ordAlf_ = "ZA" // o q muda
    let ordFre = "asc" // o atual
    let ordFre_ = "des"// o que muda
    let ordTit = "cro"
    let ordTit_ = "alf"
    //console.log(todosOBJpalavrasSStopwords.length)
    //console.log(wordData.palavras.length) // tem mais palavras


    /*:::::::::::  Resultados p/pagina  :::::::::::*/
    // obtendo a divisão por 50, descobrir o resto
    let rPP = 50 // resultados por página
    let arrayResultados = [] // com indice de inicio e de fim (com ele incluido)
    // valor de indice da página
    let iP = 0 //funciona!!

    const total = todosOBJpalavrasSStopwords.length // colocar isto dinamico!!


    function resPPage(total, rPP){
      arrayResultados = []
      const divInteira = Math.floor(total / rPP) 
      const resto = total % rPP

      if(total <= rPP){ // se há menos de 50 resultados, só uma página
        arrayResultados.push({ st:0, en: total})
      } else {
        // paginas completas
        for(let i = 0; i < divInteira; i++){
          const s = i > 0 ? i* rPP : 0
          const e = s + rPP

          arrayResultados.push({
            st: s,
            en: e
          })
        }
        // ultima pagina incompleta
        if(resto != 0) arrayResultados.push({
          st : divInteira * rPP,
          en: divInteira * rPP + resto
        })
      }

      // resultado a devolver: arrayResultados

    }

    resPPage(total, rPP)



    


    /*:::::::::::  Array de obj com RESULTADOS  :::::::::::*/
      let resultado = []

      for( let i = 0; i < todosOBJpalavrasSStopwords.length; i++){
        let indexPal = todosOBJpalavrasSStopwords[i].indice
        let palavraObj = wordData.palavras[indexPal] // busca todas as palavras

        // junta junta os textos associados
        let titulos = palavraObj.textos.map(t =>
          textData[t.id_text -1].title
        )
          resultado.push({
            palavra: palavraObj.palavra,
            indice: indexPal,
            textos: palavraObj.textos, // id dos textos (pode dar para ordenar az nos titulos)
            titulo: titulos, // está funcional
            freq: palavraObj.frequencia // pode ser util ter um array com titulos dos textos
          })
      }
      //console.log(textData[12-1].title) // funciona

      // calcula a frequencia maxima
      const maxFreq = Math.max(...resultado.map(r => r.freq))
      console.log(`Frequência máxima: ${maxFreq}`)

      // Initial sort by frequency (descending)
      resultado.sort((a, b) => b.freq - a.freq)

      // Initialize pagination
      resPPage(resultado.length, rPP)

      /*:::::::::::  Ordem alfabética de PALAVRAS  :::::::::::*/
      function ordPal(ord) {
        //console.log("Ord Function")
        if(ord == "AZ"){
          resultado.sort((a,b) => a.palavra.localeCompare(b.palavra, 'pt')) // funciona!!
          ordAlf_ = "ZA" // pronto para mudar
          ordAlf = "AZ" // o atual
        } else if(ord == "ZA"){
          resultado.sort((a,b) => a.palavra.localeCompare(b.palavra, 'pt')).reverse()
          ordAlf_ = "AZ" // pronto para mudar
          ordAlf = "ZA" // o atual
        }
      }
      //console.log(ordPal("ZA"))//funciona!!
      //ordPal("ZA")

      /*::::::::::: Ordem PALAVRAS por frequencia :::::::::::*/
      function ordFreq(ord){
        if(ord == "des"){
          resultado.sort((a,b) => a.freq < b.freq ? -1 : 1).reverse()
          ordFre_= "asc" // pronto para mudar
          ordFre = "des" // atual
        } else if (ord == "asc") {
          resultado.sort((a,b) => a.freq < b.freq ? -1 : 1)
          ordFre_= "des"
          ordFre = "asc"
        }
      }
      //console.log(ordFreq("des")) //funciona!!
      //ordFreq("asc")


      /*::::::::::: Ordem alfabética ou cronologica do título de textos :::::::::::*/
      function ordTitle(ord){ // percorre cada palavra??
        if(ord === "alf"){
          // em cada palavra, ordenar o array de textos e de títulos
          ordTit_ = "cro"
          ordTit = "alf"

          resultado = resultado.map(item => {
            if(Array.isArray(item.textos)){ // verifica se .titulo é array
              //combina-os temporariamente
              const combinados = item.textos.map((texto, i) => {
                const titleFromData = (textData?.[texto.id_text - 1]?.title) ?? "" // vai buscar titulo ao original
                const titleFromItem = (Array.isArray(item.titulo) ? item.titulo[i] : undefined)
                const titulo = titleFromData || titleFromItem || ""
                return { texto, titulo }              
            })

              //sort by title
              combinados.sort((a,b) => 
                (a.titulo ?? "").toString().localeCompare((b.titulo ?? "").toString(), 'pt', { sensitivity: 'base' })
              )  // case insensitive

              //separa-os novamente
              item.titulo = combinados.map(el => el.titulo)
              item.textos = combinados.map(el => el.texto)
            }
            return item
          })
          return resultado
          
        } else if (ord === "cro") { // cronológica - ordem original de id
          // em cada palavra, ordenar o array de textos e de títulos
          ordTit_ = "alf"
          ordTit = "cro"

          resultado = resultado.map(item => {
            if(Array.isArray(item.textos)){ // verifica se .titulo é array
              //combina-os temporariamente
              const combinados = item.textos.map((texto, i) => {
                const titleFromData = (textData?.[texto.id_text - 1]?.title) ?? ""
                const titleFromItem = (Array.isArray(item.titulo) ? item.titulo[i] : undefined)
                const titulo = titleFromData || titleFromItem || ""
                return { texto, titulo }
              })

              //sort by id_text
              combinados.sort((a,b) => (a.texto?.id_text ?? 0) - (b.texto?.id_text ?? 0))

              //separa-os novamente
              item.textos = combinados.map(el => el.texto)
              item.titulo = combinados.map(el => el.titulo)
            }
            return item
          })
          
          return resultado
        }
      }
      //console.log(ordTitle("alf")) // funciona!!
      //console.log(ordTitle('cro')) // funciona!! 

    // pesquisa por palavra e pesquisa pelo título (pesquisa do objeto [resultado] pelo título)
    /*Precisaria de uma input box*/

    //**************** [todas palavras]  *******************/

      //** baseada na tabela de display em palavra selecionada **
      let list_all_container = document.createElement("div");
      document.querySelector(".div-display").appendChild(list_all_container);
      list_all_container.className += "list-all-container";

      //Header!!
      let ct_head_list = document.createElement("div");
      document.querySelector(".list-all-container").appendChild(ct_head_list);
      ct_head_list.className += "list ct-head-list";

      // conteudo do header!! (adicionar funções para ordenação de elementos)
      ct_head_list.innerHTML = `  <div class = "palavras header palavras-header">
                                              <h2 class = "pal-o-h">Palavra</h2>
                                              <p id="Ord-Alfa">Ord: ${ordAlf}</p>
                                              <div id="pal-search-bar">
                                                <input id="pal-input" class="input-h" aria-label="palavra?" type="text" class="pal-search-bar__input" placeholder="Palavra?" autofocus required>
                                                <input id="pal-submit" type="image" class="pal-search-bar_button bt-h" src='./imagens/lupa.svg' aria-label="search">
                                              </div>
                                      </div>
                                      <div class = "texto header texto-header">
                                              <h2 class = "texto-o-h"><a href = './lista_textos.html'>Textos</a></h2>
                                              <p id="Ord-Tit">Ord: ${ordTit}</p>
                                              <div id="tit-search-bar">
                                                <input id="tit-input" class="input-h" aria-label="titulo?" type="text" class="tit-search-bar__input" placeholder="titulo?" autofocus required>
                                                <input id="tit-submit" type="image" class="tit-search-bar_button bt-h" src='./imagens/lupa.svg' aria-label="search">
                                              </div>
                                      </div>
                                            <div class = "freq header freq-header">
                                            <h2 class = "fre-o-h">Freq.</h2>
                                            <p id="Ord-Freq">Ord: ${ordFre}</p>
                                            <div id="freq-search-slider" class = "freq-input-container"> 
                                              <div class = "slider">
                                                <div class = "freq-slider"></div>
                                              </div>
                                              <div class="range-input">
                                                  <span class="value-tooltip min-tooltip"></span>
                                                  <span class="value-tooltip max-tooltip"></span>
                                                  <input type="range" class="min-range" min="1" max="${maxFreq}" value="1" step="1">
                                                  <input type="range" class="max-range" min="1" max="${maxFreq}" value="${maxFreq}" step="1">
                                              </div>
                                            </div>
                                      </div>`;

      //ct_head_list.style.backgroundColor = "yellow";

      // conteudo após header //////////////////////
      //container para rsultados
      let container = document.createElement("div");
      document.querySelector(".list-all-container").appendChild(container);
      container.className = "container";

      /*:::::  Botoes  :::::*/
      const palSubmitButton = document.querySelector("#pal-submit")
      const palInput = document.querySelector('#pal-input')

      const titSubmitButton = document.querySelector("#tit-submit") // falta colocar funcional
      const titInput = document.querySelector("#tit-input")

      //Nova versão frequencia
      const freqRangeValue = document.querySelector(".slider .freq-slider")
      const freqRangeInputValue = document.querySelectorAll(".range-input input") // input dentro de range input
      const freqMinToolTip = document.querySelector(".min-tooltip")
      const freqMaxToolTip = document.querySelector(".max-tooltip")


      //estabelece freq gap
      let freqGap = 10
      let freqMinTimeOut, freqMaxTimeOut


      /*::::::::::::::::::  Helper Functions  ::::::::::::::::::*/
      /*********************** freq  **********************/
      function updateFreqSlider(){
        let minVal = parseInt(freqRangeInputValue[0].value)
        let maxVal = parseInt(freqRangeInputValue[1].value)
        let maxRange = parseInt(freqRangeInputValue[0].max)

        //calcula percentagens
        let leftPercent = (minVal / maxRange) * 100
        let rightPercent = 100 - (maxVal / maxRange) * 100

        freqRangeValue.style.left = `${leftPercent}%`
        freqRangeValue.style.right = `${rightPercent}%`

        //atualizar posicao e valor de tooltips
        updateFreqTooltipPosition(freqMinToolTip, minVal, maxRange)
        updateFreqTooltipPosition(freqMaxToolTip, maxVal, maxRange)

        freqMinToolTip.textContent = minVal
        freqMaxToolTip.textContent = maxVal
      }
    

      function updateFreqTooltipPosition(tooltip, value, max){
        const percentage = (value / max) * 100
        tooltip.style.left = `${percentage}%`
      }

      //mostrar tooltip freq
      function showFreqTooltip(tooltip){
        clearTimeout(tooltip === freqMinToolTip ? freqMinTimeOut : freqMaxTimeOut)
        tooltip.classList.add('show')
      }

      //Esconder tooltip freq após delay
      function hideFreqTooltip(tooltip){
        if(tooltip === freqMinToolTip){
          freqMinTimeOut = setTimeout(() => tooltip.classList.remove('show'), 1000)
        } else {
          freqMaxTimeOut = setTimeout(() => tooltip.classList.remove('show'), 1000)
        }
      }

      //coloca aqui a funcao sepPage
      /***************** Separadores page ********************/
      function sepPage(){
          for(let i = 0; i < arrayResultados.length; i++){ //funiona!! // deve ser por arrayResultados ter de se atualizar!!
          document.querySelector('#n-page' + i).addEventListener('click', (e) => {
            //aqui posso definir a posição delta
            console.log(`Click, page ${document.querySelector('#n-page' + i).innerText}`)
            iP = i
            displayResultado(resultado)
          })
          //document.querySelector('#n-page' + i).style.backgroundColor = "yellow" // após atualização dos filtros isto deixa de funcionar
          document.querySelector('#n-page' + i).innerHTML += `<style> #n-page${i}:hover{background-color:#223F29; cursor:pointer; color:#FFFEF2}</style>`
        }
      }
      //sepPage() // ainda preciso de perceber!!

    
    /*:::::::::::  DISPLAY FUNCTION  :::::::::::*/
     function displayResultado(resultadoToShow, valor){
      
        /*:::::  Atualiza os headers  :::::*/
        document.querySelector('#Ord-Alfa').textContent = `Ord: ${ordAlf}` // funciona!!
        document.querySelector('#Ord-Freq').textContent = `Ord: ${ordFre}`
        document.querySelector('#Ord-Tit').textContent = `Ord: ${ordTit}`

        container.innerHTML = ""
        //iteração para display

        if(resultadoToShow == undefined || resultadoToShow == [] || resultadoToShow == ""){
          container.innerHTML = `<p>Não foram encontrados resultados para: "${valor}" </p><br><br>`
        } else {
          for (let i = arrayResultados[iP].st; i < arrayResultados[iP].en; i++) { // fazer display de x resultados por pagina

            //cria a div principal
            let ct_item = document.createElement("div");
            ct_item.className += "ct-item ct-item" + (i + 1);
            container.appendChild(ct_item);

            //let indexPal = todosOBJpalavrasSStopwords[i].indice; // busca apenas os indices das palavras sem stopwords

            //divs dentro da div principal
            let item_palavra = document.createElement("a");
            document.querySelector(`.ct-item${i + 1}`).appendChild(item_palavra);
            item_palavra.className += "item-palavra palavras";
            item_palavra.innerHTML = `${resultadoToShow[i].palavra} `//${resultado[i].indice}`;//`${wordData.palavras[indexPal].palavra}`;
            item_palavra.href = `lista_palavras.html?palavra=${resultadoToShow[i].palavra}`

            let item_textos = document.createElement("div");
            document.querySelector(`.ct-item${i + 1}`).appendChild(item_textos);
            item_textos.className += "item-textos texto";

            // começar com 3, se houver mais, colocar ver mais
            if(resultadoToShow[i].textos.length <= 3){
                for (let j = 0; j < resultadoToShow[i].textos.length; j++) {
                // item a colocar dentro de "item_textos"
                let texto_de_palavra = document.createElement("a");
                //document.querySelector(".item-textos").appendChild(texto_de_palavra)
                texto_de_palavra.className = "item-texto";
                texto_de_palavra.innerHTML = `${resultadoToShow[i].titulo[j]} <br><br>`; // em vez do id, colocar o número
                item_textos.appendChild(texto_de_palavra);
                texto_de_palavra.href = `index.html?id=${resultadoToShow[i].textos[j].id_text}`
              }
            } else {

              const renderInitialState = () =>{
                item_textos.innerHTML = ''
              
                // Show first 3 items
                for (let j = 0; j < 3; j++) {
                  // item a colocar dentro de "item_textos"
                  let texto_de_palavra = document.createElement("a");
                  //document.querySelector(".item-textos").appendChild(texto_de_palavra)
                  texto_de_palavra.className = "item-texto";
                  texto_de_palavra.innerHTML = `${resultadoToShow[i].titulo[j]} <br><br>`; // em vez do id, colocar o número
                  item_textos.appendChild(texto_de_palavra);
                  texto_de_palavra.href = `index.html?id=${resultadoToShow[i].textos[j].id_text}`
                }

                if(resultadoToShow[i].textos.length > 3){
                  let item_textosv1 = document.createElement("div")
                  item_textos.appendChild(item_textosv1)
                  item_textosv1.className += "item-texto mais"
                  item_textosv1.innerHTML = "<span>Mais...</span>"

                  item_textosv1.addEventListener("click", (e) =>{
                    item_textos.innerHTML = ''

                    const itemsToShow = Math.min(resultadoToShow[i].textos.length, 8);

                      for (let j = 0; j < itemsToShow; j++) {
                        let texto_de_palavra = document.createElement("a");
                        texto_de_palavra.className = "item-texto";
                        texto_de_palavra.innerHTML = `${resultadoToShow[i].titulo[j]} <br><br>`; // em vez do id, colocar o número
                        item_textos.appendChild(texto_de_palavra);
                        texto_de_palavra.href = `index.html?id=${resultadoToShow[i].textos[j].id_text}`
                      }

                      let menos = document.createElement("div")
                      item_textos.appendChild(menos)
                      menos.className += "item-texto menos"
                      menos.innerHTML = "<span>Menos</span>"

                      if(resultadoToShow[i].textos.length > 3 + 5){
                        let item_textosv2 = document.createElement("div")
                        item_textos.appendChild(item_textosv2)
                        item_textosv2.className += "item-texto ver-todos"
                        item_textosv2.innerHTML = "<span>Ver todos</span>"

                        item_textosv2.addEventListener("click", (e) =>{
                          window.location.href=(`lista_palavras.html?palavra=${resultadoToShow[i].palavra}`);
                        })
                      }
                      
                    
                    menos.addEventListener('click', (e) =>{
                      renderInitialState();
                    })
                  })
                } 
              }

              renderInitialState();

            }

            let item_frequencia = document.createElement("div");
            document.querySelector(`.ct-item${i + 1}`).appendChild(item_frequencia);
            item_frequencia.className += "item-frequencia freq";
            item_frequencia.innerHTML = `${resultadoToShow[i].freq}x`; //`${wordData.palavras[indexPal].frequencia}x`;
          }
        }

        /*:::::  Display de páginas de resultados  :::::*/
        // remove outro nPages que existam anteriormente em list_all_container
        const oldPages = list_all_container.querySelector('.n-page-ct')
        if(oldPages) oldPages.remove()

        // div com bts de exibir pág de resultados
        let nPages = document.createElement("div")
        list_all_container.appendChild(nPages)
        nPages.className += "n-page n-page-ct"

        nPages.addEventListener('wheel', (e) => {
          e.preventDefault()
          //scroll horizontal
          nPages.scrollLeft += e.deltaY *5
        })

        //console.log("VALOR " + nPages.scrollLeft)
        //console.log("VALOR " +nPages.scrollWidth)
        if(resultadoToShow == undefined || resultadoToShow == [] || resultadoToShow == ""){
          nPages.innerHTML = ""
        } else {
          nPages.innerHTML = ""
          for(let i = 0; i < arrayResultados.length; i++){ // isto atualiza-se, mas 
            let nPage = document.createElement("a")
            nPages.appendChild(nPage)
            nPage.className += "n-page n-page-i n-page" + i
            nPage.id = `n-page${i}`
            nPage.innerText = i+1
            nPage.href = `#n-page${i}` //problema de n começar em cima
            

            nPage.addEventListener('click', (e) =>{
              console.log(`Click, page ${nPage.innerText}`)
              iP = i // tem de ser chamado acima
              displayResultado(resultadoToShow, valor)
            })
          }
        }

        //console.log(`Resultado atualizado: ${arrayResultados.length}`)
        sepPage()
        document.querySelector('#n-page' + iP).style.backgroundColor = "#223F29"
        document.querySelector('#n-page' + iP).style.color = "#FFFEF2"
      }


/////////////precisa mudar
      //adiciona eventlistners a elementos de freq input
      const freqInputValue = document.querySelectorAll(".freq-input-field input")

      //event listners para range inputs de frequencia
      freqRangeInputValue[0].addEventListener("mousedown", () => showFreqTooltip(freqMinToolTip))
      freqRangeInputValue[0].addEventListener("touchstart", () => showFreqTooltip(freqMinToolTip))

      freqRangeInputValue[1].addEventListener("mousedown", () => showFreqTooltip(freqMaxToolTip))
      freqRangeInputValue[1].addEventListener("touchstart", () => showFreqTooltip(freqMaxToolTip))

      for (let i = 0; i < freqInputValue.length; i++) {
        freqInputValue[i].addEventListener("input", e => {
          let minp = parseInt(freqInputValue[0].value)
          let maxp = parseInt(freqInputValue[1].value)
          let diff = maxp - minp

          if(minp < 1){ //definir o ninimo
            freqInputValue[0].value = 1
            minp = 1
          }

          //valida valores de input
          if(maxp > 1300){
            freqInputValue[1].value = 1300
            maxp = 1300
          }

          if(minp > maxp - freqGap){
            freqInputValue[0].value = maxp - freqGap
            minp = maxp - freqGap

            if(minp < 1){
              freqInputValue[0].value = 1
              minp = 1
            }
          }

          //verifica se "freq gap" é atingido e está dentro do intervalo
          if(diff >= freqGap && maxp <= freqRangeInputValue[1].max){
            if(e.target.className === "min-input"){
              freqRangeInputValue[0].value = minp
            } else {
              freqRangeInputValue[1].value = maxp
            }
            updateFreqSlider()
          }
        })
      }

      
      
      //Atualiza dinamicamente o html
      freqRangeInputValue[0].max = maxFreq
      freqRangeInputValue[1].max = maxFreq
      freqRangeInputValue[1].value = maxFreq
      freqInputValue[0].max = maxFreq
      freqInputValue[1].max = maxFreq
      freqInputValue[1].value = maxFreq

    /////////////precisa mudar



    // Initialize slider
    updateFreqSlider()
    ordFreq(ordFre_) // dá erro, mas n sei se é pela quantidade de valores
    displayResultado(resultado)

   /*:::::::::::  ________EVENT LISTNERS________  :::::::::::*/

    /***************** Ordem Alfabetica ********************/
     document.querySelector('#Ord-Alfa').addEventListener('click', (e) =>{
      ordPal(ordAlf_)
      iP = 0
      displayResultado(resultado) // funcionouu!!!
      console.log("Click!!") // funciona!!
    }) // talvez n esteje destacado
     //document.querySelector('#Ord-Alfa').style.backgroundColor = "blue"


    /***************** Ordem Freq ********************/
    document.querySelector('#Ord-Freq').addEventListener('click', (e) =>{
      ordFreq(ordFre_) // falta o valor
      displayResultado(resultado) 
      console.log("Click!!")
    })
    //document.querySelector('#Ord-Freq').style.backgroundColor = "blue"

    /***************** Ordem Tit ********************/
    document.querySelector('#Ord-Tit').addEventListener('click', (e) =>{
      ordTitle(ordTit_)
      displayResultado(resultado) 
      console.log("Click!!") // funciona
      console.log(ordTit_) // está a alterar
    })
    //document.querySelector('#Ord-Tit').style.backgroundColor = "blue"

   




    /*:::::::::::  __Pesquisa livre__  :::::::::::*/

    /***************** Pesquisa palavras ********************/
    palInput.addEventListener('input', (e) =>{
      let value = e.target.value

      if(value && value.trim().length > 0){
        value = value.trim().toLowerCase()
        
        const filteredResultado = resultado
          .filter(item =>{ // que compara a palavra com o valor normalizado
            const palavra = normalize(item?.palavra || "")
            const val = normalize(value) // input-value normalizado
            return palavra.includes(val)
          })
          .sort((a,b) => { // ordem alfabetica com os valores dos resultados normalizados
              const aPal = normalize(a.palavra)
              const bPal = normalize(b.palavra)
              const val = normalize(value) // input-value normalizado

              const aStarts = aPal.startsWith(val) // compara se começa com o valor versao normalizada
              const bStarts = bPal.startsWith(val)

              if(aStarts && !bStarts) return -1
              if(!aStarts && bStarts) return 1

              return aPal.localeCompare(bPal, 'pt', { sensitivity: 'base' })

          })

        // if(filteredResultado == undefined){
        //   filteredResultado = ""
        // }
        resPPage(filteredResultado.length, rPP) // still error
        //console.log(filteredResultado.length)
        //console.log(filteredResultado)
        displayResultado(filteredResultado, value) // tem erro no undefined (preciso de diplay quando n há resultados)
      } else{
        resPPage(resultado.length, rPP)
        displayResultado(resultado, value)
      }
    })

    /***************** Titulo pesquisa ********************/
          // posso fazer um pequeno teste básico primeiro
    titInput.addEventListener('input', (e) => {
      let value = e.target.value

      if(value && value.trim().length > 0){
          value = value.trim().toLowerCase()

          const filteredResultado = resultado
            .map(item =>{
              const val = normalize(value)
              const mainTitle = normalize(item?.title || "")

              //se o titulo corresponde, devolve item sem modificação
              if(mainTitle.includes(val)){
                return item
              }

              //se item é array, filtra resultados
              if(Array.isArray(item.textos)){
                const filteredPairs = []

                item.textos.forEach((texto, i) => {
                  const titulo = normalize(textData?.[texto.id_text-1]?.title || "")

                  //mantém apenas os titulos compatíveis
                  if(titulo.includes(val)){
                    filteredPairs.push({
                      texto: texto,
                      titulo: Array.isArray(item.titulo) ? item.titulo[i] : undefined,
                      normalizedTitle: titulo
                    })
                  }

                })

                //se corresponder, devolve versão filtrada
                if(filteredPairs.length > 0){
                  // ordena items por semelhança
                  filteredPairs.sort((a,b) => {
                    const aTitle = a.normalizedTitle
                    const bTitle = b.normalizedTitle


                    //verifica se título começa com valor pesquisado
                    let aStarts, bStarts

                    if(aTitle.startsWith("[")){
                      aStarts = aTitle.startsWith(val, 1) // começa pelo index 1
                    } else{
                      aStarts = aTitle.startsWith(val)
                    } 
                    
                    if(bTitle.startsWith("[")){
                      bStarts = bTitle.startsWith(val, 1)
                    } else{
                      bStarts = bTitle.startsWith(val)
                    }

                    // prioriza titulos com valor pesquisado
                    if(aStarts && !bStarts) return -1
                    if(!aStarts && bStarts) return 1

                    return aTitle.localeCompare(bTitle, 'pt', { sensitivity: 'base' })
                  })

                  return {
                    ...item,
                    textos: filteredPairs.map(p => p.texto),
                    titulo: filteredPairs.map(p => p.titulo).filter(t => t !== undefined)
                  }
                }
              }

              //não foram encontrados resultados
              return null
            })
            .filter(item => item !== null) // remove items sem correspondência
            .sort((a, b) => {
              const val = normalize(value)

              // funcao para ajudar a encontrar o melhor titulo correspondente
              const getBestMatch = (item) => {
                const mainTitle = normalize(item?.title || "")

                //verifica se titulo corresponde
                if(mainTitle.includes(val)){
                  return mainTitle
                }

                // verifica titulos dentro (já filtrados)
                if(Array.isArray(item.textos) && item.textos.length > 0){
                  const texto = item.textos[0] // obtém primeira correspondência
                  const titulo = normalize(textData?.[texto.id_text-1]?.title || "")

                  if(titulo.includes(val)){
                    return titulo
                  }
                }

                return mainTitle
              }

              const aTit = getBestMatch(a)
              const bTit = getBestMatch(b)

              //resolver titulos que começam por "["
              let aStarts, bStarts

              if(aTit.startsWith("[")){
                aStarts = aTit.startsWith(val, 1) // começa pelo index 1
              } else{
                aStarts = aTit.startsWith(val)
              } 
              
              if(bTit.startsWith("[")){
                bStarts = bTit.startsWith(val, 1)
              } else{
                bStarts = bTit.startsWith(val)
              }

              // prioriza titulos com valor pesquisado
              if(aStarts && !bStarts) return -1
              if(!aStarts && bStarts) return 1

              return aTit.localeCompare(bTit, 'pt', { sensitivity: 'base' })

            })
            

          resPPage(filteredResultado.length, rPP)
          displayResultado(filteredResultado, value)
      
      }else{
        resPPage(resultado.length, rPP)
        displayResultado(resultado, value)
      }

    })

    //console.log(resultado)
    

    // /***************** freq pesquisa ********************/
    // freqInput.addEventListener('input', (e) => {
    //   let value = String(e.target.value).trim()

    //         if(value.length > 0){
     
    //             const filteredResultado = resultado
    //                 .filter(item => {
    //                     const f = String(item?.freq ?? "")
    //                     return f.startsWith(value)
    //                 })
    //                 .sort((a,b) => {
    //                     const na = Number(a.freq)
    //                     const nb = Number(b.freq)
    //                     return (Number.isNaN(na) ? Infinity : na) - (Number.isNaN(nb) ? Infinity : nb)
    //                 })

    //             resPPage(filteredResultado.length, rPP)
    //             displayResultado(filteredResultado, value)

    //         } else {
    //             resPPage(resultado.length, rPP)
    //             displayResultado(resultado, value)
    //         }
    // })

    /*:::::::: Event listners para sliders de frequencia ::::::::*/
      for (let i = 0; i < freqRangeInputValue.length; i++) {

        freqRangeInputValue[i].addEventListener("input", e => {
          let minVal = parseInt(freqRangeInputValue[0].value)
          let maxVal = parseInt(freqRangeInputValue[1].value)
          let diff = maxVal - minVal

          //Mostrar tooltip correspondente
          if(e.target.className === "min-range"){
            showFreqTooltip(freqMinToolTip)
          } else {
            showFreqTooltip(freqMaxToolTip)
          }

          // verifica se "freq gap" excedeu
          if(diff < freqGap){
            if(e.target.className === "min-range"){
              freqInputValue[0].value = maxVal - freqGap
              minVal = maxVal- freqGap
            } else {
              freqInputValue[1].value = minVal + freqGap
              maxVal = minVal + freqGap
            }
          }

          //atualiza inputs de freq e progresso de range
          freqInputValue[0].value = minVal
          freqInputValue[1].value = maxVal
          updateFreqSlider()

          //filtrar resultados por frequencia - espero que funcione
          const filteredResultado = resultado.filter(item => {
            const freq = item.freq
            return freq >= minVal && freq <= maxVal
          })

          // Sort filtered results by frequency (descending)
          filteredResultado.sort((a, b) => b.freq - a.freq)

          resPPage(filteredResultado.length, rPP)
          iP = 0;
          displayResultado(filteredResultado, `freq: ${minVal}-${maxVal}`)
        })

        //Esconder a tooltip ao soltar
        freqRangeInputValue[i].addEventListener("mouseup", (e) => {
          if(e.target.className === "min-range"){
            hideFreqTooltip(freqMinToolTip)
          } else {
            hideFreqTooltip(freqMaxToolTip)
          }
        })

        freqRangeInputValue[i].addEventListener("touchend", (e) => {
          if(e.target.className === "min-range"){
            hideFreqTooltip(freqMinToolTip)
          } else {
            hideFreqTooltip(freqMaxToolTip)
          }
        })
        
      }

    

    //inicializa slider de freq
    updateFreqSlider()

  // indexPal parece funcionar segundo estes parametros
  // for(let i = 0; i < todosOBJpalavrasSStopwords.length; i++){
  //   let indexPal = todosOBJpalavrasSStopwords[i].indice;
  //   console.log(`${i-indexPal}`)
  // }

}




