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


/*********  Teste de icon no mapa  **********/
var leafletIcon = L.icon ({
  iconUrl: './icons/m2.svg',
  shadowUrl:'./icons/s6.png',
  iconSize: [25, 35],
  iconAnchor: [12.5,35],
  // shadowAnchor:[150/2, 171/2], // icon lateral
  // shadowSize:[341/2, 312/2]
  shadowAnchor:[7, 30], // icon svg
  shadowSize:[40/1.5, 43/1.5]
})


  // pequeno teste com dados do ficheiro
  //const marker3 = L.marker([get_latitude(textData[19-1].coordenadas_geograficas[0]), get_longitude(textData[19-1].coordenadas_geograficas[0])]).addTo(map); //FUNCIONOUUUU!!!!

  //teste para id = 19-1

  const marker = [];

  for (t = 0; t < textData.length; t++) {
    for (i = 0; i < textData[t].categorias.locais.coordenadas_geograficas.length; i++) {
      //nota: pode ser necessário verificar se os textos apresentam ou nao coordenada!!
      marker[i] = L.marker([
        get_latitude(textData[t].categorias.locais.coordenadas_geograficas[i]),
        get_longitude(textData[t].categorias.locais.coordenadas_geograficas[i]),
      ], {icon:leafletIcon})
        .addTo(map)
        .bindPopup(
          `${textData[t].categorias.locais.locais_limpos[i]}, TEXTO: ${textData[t].title}`
        );
    }
  }



const mark = L.marker([9.5250254, -13.6826763], {icon:leafletIcon}).addTo(map)

// Testar 2 no mesmo sitio//
const arraycircle = []

for(let i = 0; i < 3; i++){
  arraycircle[i] = L.circle([-10.3333333, (-53.2) +i], {
    color: "#223F29",
    fillColor: '#223f29a4',
    fillOpacity: 1,
    radius: 50000
  }).addTo(map)
  .bindPopup("<b>Alooo</b> <br> <br> MARKER")
}

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
}
