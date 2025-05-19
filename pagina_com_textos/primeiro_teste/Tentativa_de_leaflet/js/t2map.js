// const map = L.map('map', {
//     center: [-29.50, 145],
//     zoom: 3.5
//   });

//   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);

//   // pequeno teste com dados do ficheiro
//   const marker1 = L.marker([-37.699450, 176.279420]).addTo(map);

function fetchData() {
  let textData;

  fetch("./json/textos_coordenadas_geograficas.json")
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
      textData[19 - 1].coordenadas_geograficas[0]
    )}`
  );
  console.log(
    `Teste longitude:${get_longitude(
      textData[19 - 1].coordenadas_geograficas[0]
    )}`
  );

  const map = L.map("map", {
    center: [-29.5, 145],
    zoom: 3.5,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // pequeno teste com dados do ficheiro
  //const marker3 = L.marker([get_latitude(textData[19-1].coordenadas_geograficas[0]), get_longitude(textData[19-1].coordenadas_geograficas[0])]).addTo(map); //FUNCIONOUUUU!!!!

  //teste para id = 19-1

  const marker = [];

  for (t = 0; t < textData.length; t++) {
    for (i = 0; i < textData[t].coordenadas_geograficas.length; i++) {
      //nota: pode ser necessário verificar se os textos apresentam ou nao coordenada!!
      marker[i] = L.marker([
        get_latitude(textData[t].coordenadas_geograficas[i]),
        get_longitude(textData[t].coordenadas_geograficas[i]),
      ])
        .addTo(map)
        .bindPopup(
          `${textData[t].locais_limpos[i]}, TEXTO: ${textData[t].title}`
        );
    }
  }

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
