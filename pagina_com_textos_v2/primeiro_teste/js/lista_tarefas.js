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

        PÁGINA DE CATEGORIA ESPECÍFICA:
        - Colocar as barras em representação da frequencia

        PÁGINA DE ELEMENTO DE CATEGORIA:
        - Colocar o resumo da wikipédia menor
        - Garantir que ao clicar, consigo aceder à wikipédia
        - (se necessário) colocar filtro de pesquisa [consoante a quantidade de resultados]- ex: em sabiá é necessário
        - Colocar botão "voltar"


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



    */


// começar com 3, se houver mais, colocar ver mais
if(resultado[i].textos.length <= 3){
    for (let j = 0; j < resultado[i].textos.length; j++) {
      let texto_de_palavra = document.createElement("a");
      texto_de_palavra.className = "item-texto";
      texto_de_palavra.innerHTML = `${resultado[i].textos[j].id_text}  ${resultado[i].titulo[j]} <br><br>`;
      item_textos.appendChild(texto_de_palavra);
      texto_de_palavra.href = `index.html?id=${resultado[i].textos[j].id_text}`
    }
} else {
    // Create a function to render the initial state (first 3 + "Mais..." button)
    const renderInitialState = () => {
      item_textos.innerHTML = ''; // Clear everything
      
      // Show first 3 items
      for (let j = 0; j < 3; j++) {
        let texto_de_palavra = document.createElement("a");
        texto_de_palavra.className = "item-texto";
        texto_de_palavra.innerHTML = `${resultado[i].textos[j].id_text}  ${resultado[i].titulo[j]} <br><br>`;
        item_textos.appendChild(texto_de_palavra);
        texto_de_palavra.href = `index.html?id=${resultado[i].textos[j].id_text}`
      }

      // Only add "Mais..." button if there are more than 3 results
      if(resultado[i].textos.length > 3){
        let item_textosv1 = document.createElement("div")
        item_textos.appendChild(item_textosv1)
        item_textosv1.className += "item-texto mais"
        item_textosv1.innerHTML = "Mais..."

        item_textosv1.addEventListener("click", (e) => {
          item_textos.innerHTML = ''
          
          // Determine how many to show (up to 8)
          const itemsToShow = Math.min(resultado[i].textos.length, 8);
          
          for (let j = 0; j < itemsToShow; j++) {
            let texto_de_palavra = document.createElement("a");
            texto_de_palavra.className = "item-texto";
            texto_de_palavra.innerHTML = `${resultado[i].textos[j].id_text}  ${resultado[i].titulo[j]} <br><br>`;
            item_textos.appendChild(texto_de_palavra);
            texto_de_palavra.href = `index.html?id=${resultado[i].textos[j].id_text}`
          }

          // Add "Ver todos" if there are more than 8
          if(resultado[i].textos.length > 8){
            let item_textosv2 = document.createElement("div")
            item_textos.appendChild(item_textosv2)
            item_textosv2.className += "item-texto ver-todos"
            item_textosv2.innerHTML = "Ver todos"

            item_textosv2.addEventListener("click", (e) => {
              window.location.href=(`lista_palavras.html?palavra=${resultado[i].palavra}`);
            })
          }

          // Add "menos" button to go back to initial state
          let menos = document.createElement("div")
          item_textos.appendChild(menos)
          menos.className += "item-texto menos"
          menos.innerHTML = "menos"

          menos.addEventListener('click', (e) => {
            renderInitialState(); // Go back to showing first 3 + "Mais..." button
          })
        })
      }
    }
    
    // Call it initially to set up the page
    renderInitialState();
}