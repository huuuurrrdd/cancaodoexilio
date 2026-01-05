
let container = document.createElement("div")
document.querySelector("body").appendChild(container)
container.className = "texto-container"

let margem_ct = document.createElement("div");
container.appendChild(margem_ct);
margem_ct.className = "margem-ct"

let titulo = document.createElement("h1")
margem_ct.appendChild(titulo)
titulo.className += "titulo page-title"

let conteudo = document.createElement("div")
margem_ct.appendChild(conteudo)
conteudo.className = "texto-conteudo conteudo"

titulo.innerHTML = "Sobre"

conteudo.innerHTML = `  <p>Em 1843, na cidade de Coimbra, o estudante brasileiro Antônio Gonçalves Dias compôs o poema <i>Canção do Exílio</i> como uma expressão de nostalgia pela sua pátria de origem. 
                        Desde a sua publicação em 1846, a obra tem inspirado inúmeras interpretações na forma de pastiches e paródias. Algumas dessas respostas enaltecem a cultura e a geografia do Brasil, 
                        enquanto outras criticam e expõem os problemas do país.</p>
                        
                        <p>Esta plataforma visa ser uma ferramenta de exploração do conjunto dos vários textos escritos a partir da Canção do Exílio ao longo dos anos, permitindo observar os textos interrelacionados e transformações ocorridas.</p>
                        <p>O ponto principal de ligação entre os poemas são as palavras que os compõem. É através das palavras que se estabelecem relações entre textos, se descobrem novos percursos de leitura e se revelam recorrências temáticas e simbólicas.</p>
                        <h2>Estrutura</h2>
                        <p>A organização da plataforma está assente em categorias, que funcionam como unidades estruturais e analíticas. Considera-se categoria qualquer palavra, tema ou expressão geral que permita agrupar textos ou informações associadas. 
                        Estas categorias possibilitam compreender de que forma determinados elementos surgem, se mantêm ou se transformam ao longo do tempo.</p>
                        <p>As categorias atualmente presentes são: textos, palavras, locais, fauna, flora, anos e autores.</p>
                        `

let titulo2 = document.createElement("h2")
margem_ct.appendChild(titulo2)
titulo2.className = "titulo2"
titulo2.innerHTML = `Outras representações da <i>Canção do Exílio</i>`

let conteudo2 = document.createElement("div")
margem_ct.appendChild(conteudo2)
conteudo2.className = "texto-conteudo conteudo2"

conteudo2.innerHTML = ` <p>Este projeto pertence a um estudo desenvolvido por Joshua Enslen, no qual foi construído um corpus de cerca de 500 intertextos variados. 
                        A partir desse corpus, foi aplicada uma metodologia que identifica instâncias de palavras e expressões relevantes do poema original em outras obras. 
                        Baseado desta análise, foram criadas diversas representações da Canção do Exílio:</p>
                        
                        <h4> Livro <i>Song of Exile: A cultural History of Brazil's most popular poem, 1846-2018</i></h4>
                        <p class = "subtopico">Um primeiro estudo abrangente sobre a influência cultural e literária da <i>Canção do Exílio</i>, desde a sua criação até às reinterpretações contemporâneas, com especial atenção às transformações históricas, políticas e tecnológicas.</p>
                        <a href = "https://docs.lib.purdue.edu/psrl/1/" target="_blank"><img class = "sobre-img sobre-img-liv zoom" src="imagens/livro.jpg"></a>

                        <h4>Exposição <i>Bird-watching: Visualizações da Influência de Canção do Exílio</i></h4>
                        <p class = "subtopico">Três exposições realizadas por Joshua Enslen e Alaina Enslen e exibidas no <i>Museu da Ciência da Universidade de Coimbra</i>, <i>Festival Literário Internacional de Óbidos</i> e <i>Edifício Caleidoscópio da Universidade de Lisboa</i>.</p>
                        <a href = "https://www.youtube.com/playlist?list=PL6ZJjMmX5Sqb6I4CPRDfgHYDYVmAAetoP" target="_blank"><img class = "sobre-img sobre-img-exp zoom" src = "./imagens/bird.png"></a>
                        
                        <h4>Dissertação <i>As Canções do Exílio</i></h4>
                        <p class = "subtopico">Website com visualizações interativas elaborado no âmbito da dissertação de Mestrado “As Canções do Exílio” de Adriana Barbosa.</p>
                        <a href = "https://student.dei.uc.pt/~abarbosa/ascancoesdoexilio/index.html" target="_blank"><img class = "sobre-img sobre-img-dis zoom" src="imagens/bird3.png"></a>`