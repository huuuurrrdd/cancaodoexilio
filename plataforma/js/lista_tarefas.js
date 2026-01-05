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

function displayData(wordData, textData, stoplist) {
 
  function frequencia_por_anos(Idx_Palavra) { // este IdPalavra deve ser um indice
    id_textos = [];
    frequencia = [];
    anos_pal = [];

    for (let i = 0; i < wordData.palavras[Idx_Palavra].textos.length; i++) {
      id_textos.push(wordData.palavras[Idx_Palavra].textos[i].id_text);
      frequencia.push(wordData.palavras[Idx_Palavra].textos[i].frequencia);
    }

    for (let i = 0; i < id_textos.length; i++) {
      anos_pal.push(textData[id_textos[i] - 1].date_of_publication);
    }

    const ag_anos = [];
    let gAtual_anos = [];

    const ag_freq = [];
    let gAtual_freq = [];

    const ag_id = [];
    let gAtual_id = [];

    for (let i = 0; i < anos_pal.length; i++) {
      if (i === 0 || anos_pal[i] == anos_pal[i - 1]) {
        gAtual_anos.push(anos_pal[i]); 

        gAtual_freq.push(frequencia[i]); 
        gAtual_id.push(id_textos[i]);
      } else {
        ag_anos.push(gAtual_anos); 
        gAtual_anos = [anos_pal[i]]; 

        ag_freq.push(gAtual_freq);
        gAtual_freq = [frequencia[i]];

        ag_id.push(gAtual_id);
        gAtual_id = [id_textos[i]];
      }
    }

    if (gAtual_anos.length) ag_anos.push(gAtual_anos);
    if (gAtual_freq.length) ag_freq.push(gAtual_freq);
    if (gAtual_id.length) ag_id.push(gAtual_id);

    const ag_anos_unidimensional = [];
    const ag_freq_p_ano = [];

    for (let i = 0; i < ag_anos.length; i++) {
      let soma_freq = 0;
      for (let j = 0; j < ag_anos[i].length; j++) {
        soma_freq += ag_freq[i][j];
      }
      ag_freq_p_ano.push(soma_freq);
      ag_anos_unidimensional.push(ag_anos[i][0]); 
    }

    const val_anos = ag_anos_unidimensional;
    const val_freq = ag_freq_p_ano;
    const val_id = ag_id 

    const start = 1846;
    const end = 2025;

    let anos_grafico = [];
    let freq_grafico = [];
    let ids_final = []
    let textosPAno = []

    for (let y = start; y <= end; y++) {
      anos_grafico.push(y); 

      const idx = val_anos.indexOf(y); 
      if (idx !== -1) {
        freq_grafico.push(val_freq[idx]); 
        ids_final.push(val_id[idx])
        textosPAno.push(val_id[idx].length)
      } else {
        freq_grafico.push(0); 
        ids_final.push(0)
        textosPAno.push(0)
      }
    }

    const itemPalavra = {};
    anos_grafico.forEach((key, index) => {
      itemPalavra[key] = freq_grafico[index];
    });

    const itemPalavra_ = {};
    anos_grafico.forEach((key, index) => { 
      itemPalavra[key] = {
        nome: wordData.palavras[Idx_Palavra].palavra,
        freq: freq_grafico[index],
        nTextos: textosPAno [index]
      }
    });

    return itemPalavra;
  }

  let arrayTodosOBJpalavras = [];
  for (let i = 0; i < wordData.palavras.length; i++) {
    arrayTodosOBJpalavras[i] = frequencia_por_anos(i); 
  }

  const stopSet = new Set(stoplist);
  const stopListOBJ = []; 
  for (let i = 0; i < wordData.palavras.length; i++) {
    const palavra = wordData.palavras[i].palavra;
    if (stopSet.has(palavra)) {
      stopListOBJ.push({
        indice: i,
        palavra: palavra,
      });
    }
  }

  const stopIndices = new Set(stopListOBJ.map((obj) => obj.indice)); 
  const start = 1846;
  const end = 2025;

  let n_palavras;
  let todosOBJpalavrasSStopwords;
  let anos_grafico = [];
  let todas_as_palavrasFreq_p_ano = [];
  for (let y = start; y <= end; y++) {
    anos_grafico.push(y);
    let lista_combinada_s_stopwords = []; 

    for (let i = 0; i < wordData.palavras.length; i++) {
      if (!stopIndices.has(i)) {
        lista_combinada_s_stopwords.push({
          indice: i,
          freq: arrayTodosOBJpalavras[i][y].freq || 0,
          nTextos: arrayTodosOBJpalavras[i][y].nTextos || 0,
          logFreqPTexto: ((arrayTodosOBJpalavras[i][y].freq)/(arrayTodosOBJpalavras[i][y].nTextos)||0)
        });
      }
    }

    console.log( Math.log(2))

    todosOBJpalavrasSStopwords = lista_combinada_s_stopwords;
    n_palavras = lista_combinada_s_stopwords.length;

    lista_combinada_s_stopwords.sort((a, b) => b.logFreqPTexto - a.logFreqPTexto);
    let maior_frequencia_do_ano = lista_combinada_s_stopwords[0]?.logFreqPTexto || 0;

    let lista_indices_com_maior_frequencia = lista_combinada_s_stopwords
      .filter((obj) => obj.logFreqPTexto === maior_frequencia_do_ano)
      .map((obj) => obj.indice); 

    if (lista_indices_com_maior_frequencia.length != n_palavras) {
      todas_as_palavrasFreq_p_ano.push({
        ano: y,
        lista: lista_combinada_s_stopwords,
        maior_freq: maior_frequencia_do_ano,
        indices_palavras_maior_freq: lista_indices_com_maior_frequencia,
      });
    } else {
      todas_as_palavrasFreq_p_ano.push({
        ano: y,
        lista: lista_combinada_s_stopwords,
        maior_freq: "",
        indices_palavras_maior_freq: "",
      });
    }
  }


  let freq_grafico = [];
  let palavras_grafico = [];

  for (let i = 0; i < todas_as_palavrasFreq_p_ano.length; i++) {
    const anoData = todas_as_palavrasFreq_p_ano[i];
    freq_grafico.push(anoData.maior_freq);

    if (anoData.indices_palavras_maior_freq.length != 0) {
      let idx = anoData.indices_palavras_maior_freq[0];
      let grupo = [];
      for (let j = 0; j < anoData.indices_palavras_maior_freq.length; j++) {
        let idxj = anoData.indices_palavras_maior_freq[j];
        grupo.push(wordData.palavras[idxj].palavra);
      }
      palavras_grafico.push(grupo.join(", "));
    } else {
      palavras_grafico.push("");
    }
  }

  let words_container = document.createElement("div");
  document.querySelector("body").appendChild(words_container);
  words_container.className += "words-container";

  let margem_ct = document.createElement("div");
  words_container.appendChild(margem_ct);
  margem_ct.className = "margem-ct"

  let title_h = document.createElement("h1");
  margem_ct.appendChild(title_h);
  title_h.className += "pesquisa-palavras-h page-title";
  title_h.innerText = `Pesquisa de palavras`;

  grafico_ct = document.createElement("div");
  margem_ct.appendChild(grafico_ct);
  grafico_ct.className = "grafico-ct";

  canvas = document.createElement("canvas");
  document.querySelector(".grafico-ct").appendChild(canvas);
  canvas.className = "grafico-palavras-populares";

  const ctx = document.querySelector(".grafico-palavras-populares");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: anos_grafico,
      datasets: [
        {
          label: "Palavras com maior frequencia em cada ano",
          data: freq_grafico,
          borderWidth: 0,
          backgroundColor: '#223F29'
        },
      ],
    },
    options: {
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              const i = context.dataIndex;
              const palavra = palavras_grafico[i];
              const freq = freq_grafico[i];
              return `${palavra}: ${freq}`;
            },
          },
        },
      },
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });


}



//*************  Acesso a dados  ****************/
// testando acesso a info wikipedia
function fetchData(){
    let wordData, textData, stoplist, lemmasData

    //dicionario json
    fetch("./Dict_palavras_lemas_v0004.json")
        //...
    }

fetchData()

// testar ainda nesta pagina o funcionamento de wikipédia
function displayData(wordData, textData, stoplist, lemmasData){

    //detetar se é categoria "palavras"
    const isCategoriaPalavra = categoria === "Palavras"
    if(isCategoriaPalavra){
        for(let i = 0; i < wordData.palavras.length; i++){
            const dictWord = wordData.palavras[i].palavra
            const queryWord = especifica

            if(dictWord === queryWord){
                indicePalavra = i
                break
            }
        }
    }


    let especificaDisplay = titleCase(especifica, stoplist)

    
    // Acedendo a dados de n de "especifica" por ano (igual a ano e autores em que conta 1 por texto se aparecer)
    // para específica: array para idTexto, freq, ano
    let id_textos = []
    let frequencia = []
    let frequencia_real = []
    let anos_esp = []

    let nomeCat

    if(categoria.toLowerCase() =="anos"){
        nomeCat = "date_of_publication"

    } else if(categoria.toLowerCase() =="autores"){
        nomeCat = "author"

    } else {
        nomeCat = categoria.toLowerCase() // caso de fauna e flora
    }

    console.log(`Nome categoria = ${nomeCat}`) // funciona (caso locais)
    // manter o nome original, pq é o da base de dados
    console.log(`Esp: ${especifica}`)

    let anos_grafico = []
    let freq_grafico = []
    let ids_final = [] 

    // antes de aceder à especifica, preciso da categoria

    if(nomeCat === "fauna" || nomeCat === "flora"){ 
        for(let i = 0; i < textData.length; i++){
            if(textData[i].categorias[nomeCat].length > 0){ // find() é para filtrar por funcoes
                if(textData[i].categorias[nomeCat].includes(especifica) == true ){ // verifica se a categoria inclui a palavra especifica 
                    id_textos.push(textData[i].id)
                    frequencia.push(1)
                    frequencia_real.push(false)
                    anos_esp.push(textData[i].date_of_publication)
                }
            }
        }
    } else if (nomeCat === "locais"){
            //does the same as the previous condition
    } else { // author e date_of_publication

        if(nomeCat === "author"){
            //...

        } else if (nomeCat === "date_of_publication") {
            //...
        } else if(nomeCat === "palavras") {
            //...
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
    for(let i = 0; i < anos_esp.length; i++){
        if(i === 0 || anos_esp[i] == anos_esp[i-1]){
            gAtual_anos.push(anos_esp[i]) //igual ao anterior, adiciona

            gAtual_freq.push(frequencia[i])
            gAtual_id.push(id_textos[i])

        } else {

                ag_anos.push(gAtual_anos) // push grupo finalizado
                gAtual_anos = [anos_esp[i]] // começa novo grupo

                    //o mesmo para ids e frequencias
                ag_freq.push(gAtual_freq);
                gAtual_freq = [frequencia[i]];

                ag_id.push(gAtual_id);
                gAtual_id = [id_textos[i]];
            }
    }

    if (gAtual_anos.length) ag_anos.push(gAtual_anos); 
    if (gAtual_freq.length) ag_freq.push(gAtual_freq); 
    if (gAtual_id.length) ag_id.push(gAtual_id); 


    const ag_anos_unidimensional = [] 
    const ag_freq_p_ano = [] 

            for(let i = 0; i < ag_anos.length; i++){
            let soma_freq = 0
            for(let j = 0; j < ag_anos[i].length; j++){
                soma_freq += ag_freq[i][j] 
            }
            ag_freq_p_ano.push(soma_freq)
            ag_anos_unidimensional.push(ag_anos[i][0])
        }

        const val_anos = ag_anos_unidimensional
        const val_freq = ag_freq_p_ano
        const val_id = ag_id
        const start = 1846
        const end = 2025

        for(let y = start; y <= end; y++){
            anos_grafico.push(y) 

            const idx = val_anos.indexOf(y) 
            if(idx !== -1){ 
                freq_grafico.push(val_freq[idx]) 
                ids_final.push(val_id[idx]) 
            } else {
                freq_grafico.push(0) 
                ids_final.push(0)
            }
        }

        let idLista = []

        for(let i = 0; i < val_id.length; i++) {
            for(let j = 0; j < val_id[i].length; j++){
                idLista.push(val_id[i][j])
            }
        }

    let elemento_container = document.createElement("div")
    document.querySelector("body").appendChild(elemento_container)
    elemento_container.className += "elemento-container elemento-container-" + classEsp

    let margem_ct = document.createElement("div")
    elemento_container.appendChild(margem_ct)
    margem_ct.className = "margem-ct margem-ct-" + classEsp

    //*************  Titulo de página  ****************/
    let elemento_h = document.createElement("h1")
    margem_ct.appendChild(elemento_h)
    elemento_h.className += "page-title elemento-h elemento-h-" + classEsp
    elemento_h.innerHTML = especificaDisplay

    let elemento_hover = document.createElement('div')
    margem_ct.appendChild(elemento_hover)
    elemento_hover.className = "elemento-hover"


    if(categoria !== "Anos"){
        let elemento_grafico = document.createElement("div")
        margem_ct.appendChild(elemento_grafico)
        elemento_grafico.className += "elemento-grafico grafico-" + classEsp

        let canvas = document.createElement("canvas")
        document.querySelector(".grafico-" + classEsp).appendChild(canvas)
        canvas.className += "grafico-palavras-populares"

        const GP = document.querySelector(".grafico-palavras-populares")

        new Chart(GP, {
            type: "line",
            data: {
                labels: anos_grafico,
                datasets:[{
                    label: `${categoria} ao longo do tempo`,
                    data: freq_grafico,
                    borderWidth: 1,
                    borderColor: '#223F29',
                    backgroundColor: '#223f29a4',
                    pointBorderWidth: 1,
                    pointRadius: 3
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
    }
    
    //*************  Textos que mencionam  ****************/
    let textos_mencionam = document.createElement("div")
    document.querySelector(".elemento-container-" + classEsp).appendChild(textos_mencionam)
    textos_mencionam.className += "textos-mencionam textos-mencionam-" + classEsp
    
    /************** titulo **************/
    let textos_mencionam_h = document.createElement("h2")
    document.querySelector(".textos-mencionam-" + classEsp).appendChild(textos_mencionam_h)
    textos_mencionam_h.className += "textos-mencionam-h textos-mencionam-h-" + classEsp
    if(nomeCat === "author"){
        textos_mencionam_h.innerHTML = "Textos de " + especificaDisplay
        let subH = document.createElement('h3')
        textos_mencionam.appendChild(subH)
        subH.innerHTML = `${idLista.length} textos`
        subH.className = "sub-h"
        
    } else if(nomeCat === "date_of_publication"){
        textos_mencionam_h.innerHTML = `${idLista.length} textos`
    }else {
        textos_mencionam_h.innerHTML = "Textos que mencionam " + especificaDisplay
        let subH = document.createElement('h3')
        textos_mencionam.appendChild(subH)
        subH.innerHTML = `${idLista.length} textos`
        subH.className = "sub-h"
    }

    // /************** Display textos *************/
    let div_textos = document.createElement("div")
    textos_mencionam.appendChild(div_textos)
    div_textos.className += "div-textos div-textos-display"
    

    /******************  Funções para display  *******************/
    // valores default para ordenação de resultados
    let ordTit = "AZ" // o atual ---- titulo
    let ordTit_ = "ZA" // o q muda
    let ordAut = "AZ" // o atual ---- autor
    let ordAut_ = "ZA" // o q muda
    let ordDat = "asc" // o atual ---- ano
    let ordDat_ = "des"// o que muda
    let ordFre = "asc" // o atual ---- freq
    let ordFre_ = "des" // o que muda


    /*:::::::::::  Resultados p/pagina  :::::::::::*/
    let rPP = 50
    let arrayResultados = []

    const txtTotal = idLista.length

    function resPPage(total, rPP){
      // resultado a devolver: arrayResultados
    }

    resPPage(txtTotal, rPP)

    // valor de indice da página
    let iP = 0

    /*:::::::::::  Array de obj com RESULTADOS  :::::::::::*/
    let resultado = []
    //let textosResultado =

    for(let i = 0; i < idLista.length; i++){
        //definicao variaveis...
        resultado.push({
            id: id,
            titulo: titulo,
            ano: ano,
            autor: autor
        })
    }

    if(isCategoriaPalavra){
        resultado = []
        let textosResultado = wordData.palavras[indicePalavra].textos.slice()

        for(let i = 0; i < textosResultado.length; i++){
            const texto = textosResultado[i] //percorre cada texto que contem a palavra(wordData)
            //metadata
            
            const metadata = textData[texto.id_text - 1] //objeto com todas as infos do texto selecionado
            const id_do_texto = metadata.id;
            const titul = metadata.title
            const data_pub = metadata.date_of_publication
            const autor = metadata.author
            const freq1 = texto.frequencia

            resultado.push({
                id: id_do_texto,
                titulo: titul,
                ano: data_pub,
                autor: autor,
                freq: freq1
            })

        }
    }

    /*:::::::::::  Ordem alfabética de titulos  :::::::::::*/
    function ordTitle(ord, data){
       //...
    }

    /*:::::::::::  Ordem alfabética de autores  :::::::::::*/
    function ordAutores(ord, data){
        //...
    }

    /*:::::::::::  Ordem cronologica de textos  :::::::::::*/
    function ordData(ord, data){
        //...
    }

    /*:::::::::::  Ordem por frequencia  :::::::::::*/
    function ordFreq(ord, data){
        //...
    }

    /*:::::::::::  Normalizar string  :::::::::::*/
    function normalize(str){
        //...
    }

    function displayTabela(){
        div_textos.innerHTML = ""

        let list_container = document.createElement("div")
        div_textos.appendChild(list_container)
        list_container.className += "list-container"
        //caso seja palavra, adiciona uma classe condicional
        if(isCategoriaPalavra){
            list_container.classList.add("layout-palavra")
        }

        //header
        let tentry_header = document.createElement("div")
        list_container.appendChild(tentry_header)
        tentry_header.className += "tentry-header"

        tentry_header.innerHTML =  `  <div class = "ano header ano-header">
                                        <div class = "seta-ct" title ="Pesquisa livre por ano"><div class = "seta seta-ano down"></div></div>
                                        <h2 class = "ano-o-h"><a href = './p_categoria.html?categoria=Anos'>Ano</a></h2> 
                                        <p id="Ord-Dat">Ord:</p>
                                        <div id = "year-search-bar">
                                            <input id="year-input" class="input-h" aria-label="ano?" type="number" class="year-search-bar__input" placeholder="ano?" min="1846" autofocus required>
                                            <input id="year-submit" type="image" class="year-search-bar__button bt-h" src='./imagens/lupa.svg' aria-label=""search>
                                        </div>
                                    </div>

                                    <div class = "titulo header titulo-header">
                                        <h2 class = "titul-o-h"><a href = './lista_textos.html'>Título</a></h2>
                                        <p id = "Ord-Tit">Ord: </p>
                                        <div id = "titul-search-bar">
                                            <input id="titul-input" class="input-h" aria-label="titulo?" type="text" class="titul-search-bar__input" placeholder="titulo?" autofocus required>
                                            <input id="titul-submit" type="image" class="titul-search-bar__button bt-h" src='./imagens/lupa.svg' aria-label=""search>
                                        </div>
                                    </div>

                                    <div class = "autor header autor-header">
                                        <h2 class = "aut-o-h"><a href = './p_categoria.html?categoria=Autores'>Autor</a></h2>
                                        <p id = "Ord-Aut">Ord: </p>
                                        <div id = "autor-search-bar">
                                            <input id="autor-input" class="input-h" aria-label="autor?" type="text" class="autor-search-bar__input" placeholder="autor?" autofocus required>
                                            <input id="autor-submit" type="image" class="autor-search-bar__button bt-h" src='./imagens/lupa.svg' aria-label=""search>
                                        </div>
                                    </div>
                                    
                                    ${isCategoriaPalavra ? `
                                    <div class = "freq header freq-header">
                                        <div class = "seta-ct" title ="Pesquisa livre por frequência"><div class = "seta seta-freq down"></div></div>
                                        <h2 class = "freq-o-h">Freq</h2> 
                                        <p id="Ord-Freq">Ord:</p>
                                        <div id = "freq-search-bar">
                                            <input id="freq-input" class="input-h" aria-label="freq?" type="text" class="freq-search-bar__input" placeholder="freq?" autofocus required>
                                            <input id="freq-submit" type="image" class="freq-search-bar__button bt-h" src='./imagens/lupa.svg' aria-label=""search>
                                        </div>
                                    </div>` 
                                        : ''}`

        let anoHeader = document.querySelector(".ano-header")
        let anoTitulo = document.querySelector(".ano-o-h")
        let ordemAno = document.querySelector("#Ord-Dat") // ano e ordem
        let inputAno = document.querySelector("#year-search-bar") // div input

        inputAno.style.display = "none"
 
        let seta_ano = document.querySelector(".seta-ano")
        seta_ano.addEventListener('click', (e) => {
        if(seta_ano.classList.contains('down')){
            //...
        }
        })

        /*:::::  Botoes  :::::*/
        const yearInput = document.querySelector('#year-input')
        const titulInput = document.querySelector('#titul-input')
        const autorInput = document.querySelector('#autor-input')

        //declarar   
        let freqSubmitButton = null
        let freqInput = null

        if(isCategoriaPalavra){
            let freqHeader = document.querySelector(".freq-header")
            let freqTitulo = document.querySelector(".freq-o-h")
            let ordemFreq = document.querySelector("#Ord-Freq")
            let inputFreq = document.querySelector("#freq-search-bar")

            inputFreq.style.display = "none"

            //definição das variáveis
            freqSubmitButton = document.querySelector('#freq-submit')
            freqInput = document.querySelector('#freq-input')

            //arrow toogle para freq
            let seta_freq = document.querySelector(".seta-freq")
            seta_freq.addEventListener('click', (e) => {
                if(seta_freq.classList.contains('down')){
                   //...
                }
            })
        }

        let container = document.createElement("div")
        list_container.appendChild(container)
        container.className += "container container-a"

        function displayResultado(resultado, valor){

            /*:::::  Atualiza os headers  :::::*/
            document.querySelector('#Ord-Tit').textContent = `Ord: ${ordTit}`
            document.querySelector('#Ord-Aut').textContent = `Ord: ${ordAut}`
            document.querySelector('#Ord-Dat').textContent = `Ord: ${ordDat}`

            if(isCategoriaPalavra) document.querySelector('#Ord-Freq').textContent = `Ord: ${ordFre}`

            container.innerHTML = ""

            if(resultado == undefined || resultado == [] || resultado == ""){
                container.innerHTML = `<p>Não foram encontrados resultados para: "${valor}" </p><br><br>`
            } else {
                for(let i = arrayResultados[iP].st; i < arrayResultados[iP].en; i++){
                    // cria a div principal
                    let tentry = document.createElement("div")
                    tentry.className += "tentry tentry-container tentry-container" + (i+1)
                    container.appendChild(tentry)

                    tentry.innerHTML = `<a class = "ano" href="p_categoria_especifica.html?categoria=Anos&especifica=${resultado[i].ano}">${resultado[i].ano}</a>
                                    <a class = "titulo" href="index.html?id=${resultado[i].id}">${resultado[i].titulo}</a>
                                    <a class = "autor" href="p_categoria_especifica.html?categoria=Autores&especifica=${resultado[i].autor}">${resultado[i].autor}</a>
                                    ${isCategoriaPalavra ?`<a class = "freq">${resultado[i].freq}</a>`:''}`
                }
            }

            /*:::::  Display de páginas de resultados  :::::*/
            // remove outro nPages que existam anteriormente em list_container
            const oldPages = list_container.querySelector('.n-page-ct')
            if(oldPages) oldPages.remove()

            if(arrayResultados.length > 1){
                // div com bts de exibir pag de resultados
                let nPages = document.createElement("div")
                list_container.appendChild(nPages)
                nPages.className += "n-page n-page-ct"

                if(resultado == undefined || resultado == [] || resultado == ""){
                    nPages.innerHTML = ""
                } else {
                    nPages.innerHTML = ""
                    for(let i = 0; i < arrayResultados.length; i++){ // isto atualiza-se, mas 
                        let nPage = document.createElement("a")
                        nPages.appendChild(nPage)
                        nPage.className += "n-page-i n-page" + i
                        nPage.id = `n-page${i}`
                        nPage.innerText = i+1

                        nPage.addEventListener('click', (e) =>{
                        console.log(`Click, page ${nPage.innerText}`)
                        iP = i // tem de ser chamado acima
                        })
                    }
                }
                
                //console.log(`Resultado atualizado: ${arrayResultados.length}`)
                sepPage()
                document.querySelector('#n-page' + iP).style.backgroundColor = "#223F29"
                document.querySelector('#n-page' + iP).style.color = "#FFFEF2"
            }
        }
        displayResultado(resultado)


        //funcao para verificar categorias
        function verificarCategorias(especifica, textData, wordData, stoplist){
            const categorias = [
                { categoria: "Palavras", existe: false },
                { categoria: "Anos", existe: false },
                { categoria: "Autores", existe: false },
                { categoria: "Locais", existe: false },
                { categoria: "Fauna", existe: false },
                { categoria: "Flora", existe: false }
            ]

           // Verificar Palavras
            categorias[0].existe = wordData.palavras.some(p => 
                p.palavra === especifica && !stoplist.includes(p.palavra)
            )

            for (let i = 0; i < textData.length; i++) {
                const texto = textData[i];

                //Verifica anos
                //Verificar autores (match exato)
                // Verificar Locais
                // Verificar Fauna
                // Verificar Flora
                // Se todas as categorias já foram encontradas, pode parar
                if (categorias.every(c => c.existe)) {
                    break
                }

            }

            return categorias
        }

       

        //função de display de botões para outras catgorias
        function displayOutrasCategorias() {
            //*************  caixa de bts de categorias diferentes  ****************/
            let outras_categorias = document.createElement("div")
            margem_ct.appendChild(outras_categorias)
            outras_categorias.className = "outras-categorias"

            outras_categorias.innerHTML = '<strong>Categorias: </strong>'
            let btn1 = document.createElement('a')
            btn1.className = 'btn-categoria-atual btn-categoria'
            btn1.href = `./p_categoria_especifica.html?categoria=${categoria}&especifica=${especifica}`
            btn1.textContent = categoria
            outras_categorias.appendChild(btn1)

            existeCategoria.forEach(cat => {
                if(cat.existe && cat.categoria.toLowerCase() !== categoria.toLowerCase()){
                    let btn = document.createElement('a')
                    btn.className = 'btn-categoria'
                    btn.href = `./p_categoria_especifica.html?categoria=${cat.categoria}&especifica=${especifica}`
                    btn.textContent = cat.categoria
                    outras_categorias.appendChild(btn)
                }
            })

            //caso não haja outras categorias
            const btns = outras_categorias.querySelectorAll('.btn-categoria')
            if(btns.length === 0) {
                outras_categorias.innerHTML = `` 
            }
        }
         //chamar a função, atualizando o array
        existeCategoria = verificarCategorias(especifica, textData, wordData, stoplist)

        displayOutrasCategorias() 


        /*:::::::::::  ____________FILTROS____________  :::::::::::*/

        /***************** Ordem Alfabetica [titulo] ********************/
        document.querySelector('#Ord-Tit').addEventListener('click', (e) => { // filtros funcionais
            //...
        })
        // document.querySelector('#Ord-Tit').style.backgroundColor = "white"

        /***************** Ordem Alfabetica [autor] ********************/
        document.querySelector('#Ord-Aut').addEventListener('click', (e) => {
            //...
        })
        // document.querySelector('#Ord-Aut').style.backgroundColor = "white"

        /***************** Ordem cronologica ********************/
        document.querySelector('#Ord-Dat').addEventListener('click', (e) => {
            //...
        })
        // document.querySelector('#Ord-Dat').style.backgroundColor = "white"

        /***************** Ordem frequencia ********************/
        if(isCategoriaPalavra){
            document.querySelector('#Ord-Freq').addEventListener('click', (e) => {
                //...
            })
        }

        /***************** Separadores page ********************/
        function sepPage(){
            for(let i = 0; i < arrayResultados.length; i++){ //funiona!! // deve ser por arrayResultados ter de se atualizar!!
                    document.querySelector('#n-page' + i).addEventListener('click', (e) => {
                    console.log(`Click, page ${document.querySelector('#n-page' + i).innerText}`)
                    iP = i
                    displayResultado(resultado)
                })
                document.querySelector('#n-page' + i).innerHTML += `<style> #n-page${i}:hover{background-color:#223F29; cursor:pointer; color:#FFFEF2}</style>`
            }
        }
        //sepPage() // ainda preciso de perceber!!


        /*:::::::::::  __Pesquisa livre__  :::::::::::*/

        /***************** Year pesquisa ********************/
        yearInput.addEventListener('input', (e) =>{
          //...
        })

        /***************** Title pesquisa ********************/
        titulInput.addEventListener('input', (e) =>{
          //...
        })

        /***************** autor pesquisa ********************/
        autorInput.addEventListener('input', (e) =>{ // n está confiavel!!
            //...
        })

  

    /***************** freq pesquisa ********************/
    if(isCategoriaPalavra && freqInput){
        //...
    }
}

    displayTabela()
}

