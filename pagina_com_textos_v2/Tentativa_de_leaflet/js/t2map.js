// const map = L.map('map', {
//     center: [-29.50, 145],
//     zoom: 3.5
//   });

//   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);

//   // pequeno teste com dados do ficheiro
//   const marker1 = L.marker([-37.699450, 176.279420]).addTo(map);

function fetchData() {
  let textData;

  fetch("./json/t4_textos_loc_fauna_flora.json")
    .then((response) => {
      if (!response.ok) {
        // mensagem de erro
        throw new Error(`HTTP error! Status ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      textData = data;

      //funcao para aceder aos dados:
      displayData(textData);
    })
    .catch((error) => console.error("Falha em fetch data", error));
}

fetchData();

function displayData(textData) {
  console.log(
    `Teste latitude:${get_latitude(
      textData[19 - 1].categorias.locais.coordenadas_geograficas[0]
    )}`
  );
  console.log(
    `Teste longitude:${get_longitude(
      textData[19 - 1].categorias.locais.coordenadas_geograficas[0]
    )}`
  );

  const map = L.map("map", {
    center: [10, -30],
    zoom: 1.5,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);


 L.control.scale({ // adicioa a escala em baixo
  metric: true,
  imperial: false
 }).addTo(map)


 ///////////////////  Cria array de coordenadas  ////////////////////////
/*
 - Estrutura:
 [
  { Coordenada: [valor coordenada]
    nomes: 
      [
        {nome: "",
         textos: [id1, id2, id3...]},

         {nome: "",
         textos: [id1, id2, id3...]},
      ]
    },

    { Coordenada: [valor coordenada]
    nomes: 
      [
        {nome: "",
         textos: [id1, id2, id3...]},

         {nome: "",
         textos: [id1, id2, id3...]},
      ]
    }
  ]


*/


//// ANTES DISTO: descobrir quais os poemas com coordenadas erradas (ou a menos!!!)
let textosMal = []

textData.forEach(item => {
  let n_locais = item.categorias.locais.locais_limpos.length
  let n_coordenadas = item.categorias.locais.coordenadas_geograficas.length

  if(n_locais != n_coordenadas){
    textosMal.push({
      texto: item.id,
      diferença: Math.abs(n_locais-n_coordenadas)
    })
  }
})

console.log(textosMal)


/////
const objListaCoord = []
const coordMap = new Map() // array: [(coord, nomes: [array de nomes]), (...)]
/*
  Objeto mapa:
  -> key-value pairs 
  -> remembers the original insertion order of the keys
*/

//iteração sobre cada item 
textData.forEach(item => {
  const id = item.id
  const locais = item.categorias.locais.locais_limpos
  const coords = item.categorias.locais.coordenadas_geograficas


  // iteração sobre cada localização e coordenada correspondente
  locais.forEach((local, index) => {
    const coord = coords[index]
    const coordKey = JSON.stringify(coord) // usa string key para mapa

    // se coordenada não existe, cria
    if(!coordMap.has(coordKey)){ // 
      coordMap.set(coordKey, {
        coordenada: coord,
        nomes: []
      })
    }

    //descobre se este 'nome' já existe para a coordenada
    const coordObj = coordMap.get(coordKey)
    let nomeObj = coordObj.nomes.find(n => n.nome === local)

    // se nome não existe, cria
    if(!nomeObj){
      nomeObj = {
        nome: local,
        textos: []
      }
      coordObj.nomes.push(nomeObj)
    }

    // adiciona id ao array de textos se não estiver la
    if(!nomeObj.textos.includes(id)){
      nomeObj.textos.push(id)
    }
  })
})

// Converte mapa para array
coordMap.forEach(value => {

  // ordena nomes (primeiro por nTextos (des) depois AZ)
  value.nomes.sort((a, b) => {
    if(b.textos.length !== a.textos.length){
      return b.textos.length - a.textos.length // desc por numero de textos
    } 
    return a.nome.localeCompare(b.nome) // alfabetica se igual
  })

  // Calcula o total de textos para a coordenada
  const uniqueTextos = new Set()
  value.nomes.forEach(nomeObj => {
    nomeObj.textos.forEach(id => uniqueTextos.add(id))
  })
  value.nTextos = uniqueTextos.size

  objListaCoord.push(value)
})

console.log(objListaCoord) // funciona!!



/*********  ICON DO MAPA  **********/
var leafletIcon = L.icon ({
  iconUrl: './icons/m2.svg',
  shadowUrl:'./icons/s6.png',
  iconSize: [25, 35],
  iconAnchor: [12.5,35],
  // shadowAnchor:[150/2, 171/2], // icon lateral
  // shadowSize:[341/2, 312/2]
  shadowAnchor:[7, 30], // icon svg
  shadowSize:[40/1.5, 43/1.5],
  popupAnchor: [2, -30]
})


  // pequeno teste com dados do ficheiro
  //const marker3 = L.marker([get_latitude(textData[19-1].coordenadas_geograficas[0]), get_longitude(textData[19-1].coordenadas_geograficas[0])]).addTo(map); //FUNCIONOUUUU!!!!

  //teste para id = 19-1

// com marker
// const marker = [];
// for(let i = 0; i < objListaCoord.length; i++){
//   // coordenadas
//   let lat = get_latitude(objListaCoord[i].coordenada)
//   let lon = get_longitude(objListaCoord[i].coordenada)

//   let nome = objListaCoord[i].nomes[0].nome

//   marker[i] = L.marker([lat, lon], {icon:leafletIcon})
//               .addTo(map)
//               .bindPopup(
//                 `<a>${nome}</a>`
//               )
//   //teste de display com circulos (raio correspondente a n de textos) + popup com frequencia
// }

const circ = []
for(let i = 0; i < objListaCoord.length; i++){
  let lat = get_latitude(objListaCoord[i].coordenada)
  let lon = get_longitude(objListaCoord[i].coordenada)

  let nome = objListaCoord[i].nomes[0].nome
  let nTextos = objListaCoord[i].nTextos + 2

  circ[i] = L.circle([lat, lon], {
    color: "#223F29",
    fillColor: '#223f29a4',
    fillOpacity: 1,
    radius: 9000*nTextos
  }).addTo(map)
    .bindPopup(`<a>${nome}</a>, nTextos: ${objListaCoord[i].nTextos}`)

}


//const mark = L.marker([9.5250254, -13.6826763], {icon:leafletIcon}).addTo(map)



//   /*****  Circulos  *****/
//   let circle = L.circle([-10.3333333, -53.2], {
//     color: "#223F29",
//     fillColor: '#223f29a4',
//     fillOpacity: 1,
//     radius: 20000
//   }).addTo(map)





//   /*****  Poligonos  *****/
// let polygon = L.polygon([
//   [-10.3333333, -53.2],
//   [28.3347722, -10.3713379],
//   [9.5250254, -13.6826763]
// ], {
//   color: "#223F29",
//     fillColor: '#223f29a4',
//     fillOpacity: 1
// }).addTo(map)



//   /*****  Poligonos  *****/ // Teste de poligono (caso queira criar área de abrangencia do poema)
// let polygon = L.polygon([
//   [39.6621648, -8.135351],
//   [51.0, 10.],
//   [39.5428862, -8.919552],
//   [41.5314496, -8.619230],
//   [41.5084468, -6.773302],
//   [33.8439408, 9.40013],
//   [37.1734995, -3.599533],
//   [28.3347722, -10.371337],
//   [34.0346534, -5.016192],
//   [-10.3333333, -53.],
//   [9.5250254, -13.682676],
//   [-22.8169023, -43.127220],
//   [13.8905104, -2.574941],
//   [38.569601, -8.901165],
//   [38.8355446, -9.352237],
//   [-22.9247351, -43.232716]
// ], {
//   color: "#223F29",
//     fillColor: '#223f29a4',
//     fillOpacity: 1
// }).addTo(map)






  function get_latitude(element) {
    elemento_limpo = element.replace("(", "").replace(")", "");
    latitude = elemento_limpo.split(", ")[0];
    return latitude;
  }

  function get_longitude(element) {
    elemento_limpo = element.replace("(", "").replace(")", "");
    longitude = elemento_limpo.split(", ")[1];
    return longitude;
  }



  // pequeno teste com dados do ficheiro
  //const marker3 = L.marker([get_latitude(textData[19-1].categorias.locais.coordenadas_geograficas[0]), get_longitude(textData[19-1].categorias.locais.coordenadas_geograficas[0])], {icon:leafletIcon}).addTo(map);
}
