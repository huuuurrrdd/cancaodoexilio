

// const map = L.map('map', {
//     center: [-29.50, 145],
//     zoom: 3.5
//   });
  
//   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);
  
//   // pequeno teste com dados do ficheiro
//   const marker1 = L.marker([-37.699450, 176.279420]).addTo(map);




function fetchData(){

  let textData

  fetch("./json/textos_coordenadas_geograficas.json")
    .then(response => {
      if(!response.ok){ // mensagem de erro
        throw new Error(`HTTP error! Status ${response.status}`)
      }
      return response.json()
    })
    .then(data => {
      textData = data

      //funcao para aceder aos dados:
      displayData(textData)
    })
    .catch(error => console.error("Falha em fetch data", error))

}

fetchData()

function displayData(textData){

  dado1 = textData[4-1].coordenadas_geograficas[1].replace("(", "").replace(")","")
  console.log(`Dado1:${dado1}`)
  console.log(`Teste latitude:${get_latitude(textData[19-1].coordenadas_geograficas[0])}`)
  console.log(`Teste longitude:${get_longitude(textData[19-1].coordenadas_geograficas[0])}`)


const map = L.map('map', {
    center: [-29.50, 145],
    zoom: 3.5
  });
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);
  
  // pequeno teste com dados do ficheiro
  //const marker1 = L.marker([-37.699450, 176.279420]).addTo(map);
  //const marker2 = L.marker([39.6621648, -8.1353519]).addTo(map); // com coordenada "normal" funciona!!
  const marker3 = L.marker([get_latitude(textData[19-1].coordenadas_geograficas[0]), get_longitude(textData[19-1].coordenadas_geograficas[0])]).addTo(map); //FUNCIONOUUUU!!!!

  //teste para id = 19-1

  const marker = []
  const marca = []

  //pode não estar a funciona, porque precisa primeiro do mapa e depois da info ou pq precisa da info antes de criar o mapa!! Pode ser necessário criar um script de fetch antes??!!

  console.log(textData[19-1].coordenadas_geograficas[0]) // funcionaa!!
  console.log(textData[19-1].coordenadas_geograficas[0].replace("(", "[").replace(")","]")) // funcionaaa!!!

  for (i=0; i< textData[19-1].coordenadas_geograficas.length; i++){

    marker[i] = L.marker([get_latitude(textData[19-1].coordenadas_geograficas[i]), get_longitude(textData[19-1].coordenadas_geograficas[i])]).addTo(map);


  }


    function get_latitude(element){
      elemento_limpo = element.replace("(", "").replace(")","")
      latitude = elemento_limpo.split(", ")[0]
      return latitude
    }

    function get_longitude(element){
      elemento_limpo = element.replace("(", "").replace(")","")
      longitude = elemento_limpo.split(", ")[1]
      return longitude
    }

    

}

