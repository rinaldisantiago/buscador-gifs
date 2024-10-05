const apiKey = "LbSB5LtJtC2OJev3E1fmUOtyaqfucypI";
let entrada = document.getElementById("entrada");
let boton = document.getElementById("buscar");
let busquedaVacia = document.getElementById("empty-search"); 
let contenedor = document.getElementById("container-gifs");

const giphyFetch = (ak, kw) => {
  return fetch(`
https://api.giphy.com/v1/gifs/search
?api_key=${ak}
&q=${kw}
&limit=9
&offset=0
&rating=g
&lang=es
&bundle=messaging_non_clips`);
};

boton.addEventListener("click", () => {
  term = entrada.value;
  
  if (term === "") {
    busquedaVacia.innerHTML = "Debe ingresar un texto para obtener resultados...";
    contenedor.innerHTML = "";
  } else {
    giphyFetch(apiKey, term)
      .then((response) => {
        return response.json();
      })
  
      .then((results) => {
        busquedaVacia.innerHTML = "";
        contenedor.innerHTML = "";
        results.data.forEach((element) => {
          console.log(element.images.original.url);
          let imagen = document.createElement("img");
          imagen.setAttribute("src", element.images.original.url);
          imagen.classList.add("gif");
          contenedor.appendChild(imagen);
        });
      })
  
      .catch((error) => {
        console.error(error.message);
      });
  }
});