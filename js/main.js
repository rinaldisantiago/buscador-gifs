/* Creamos una variable constante llamada apiKey donde guardamos el string de la api rest que nos otorga la página de Giphy */
const apiKey = "LbSB5LtJtC2OJev3E1fmUOtyaqfucypI";

/* Creamos una variable llamada entrada donde obtenemos el elemento del documento HTML con id "entrada" */
let entrada = document.getElementById("entrada");

/* Creamos una variable llamada boton donde obtenemos el elemento del documento HTML con id "buscar" */
let boton = document.getElementById("buscar");

/* Creamos una variable llamada busquedaVacia donde obtenemos el elemento del documento HTML con id "empty-search" */
let busquedaVacia = document.getElementById("empty-search");

/* Creamos una variable llamada contenedor donde obtenemos el elemento del documento HTML con id "container-gifs" */
let contenedor = document.getElementById("container-gifs");

/* Creamos una función llamada giphyFetch donde le pasamos como parámetros ak (apy key) y kw (keyword).
Esta función retorna una solicitud HTTP asíncrona donde tendremos la URL de la solicitud y dentro de dicha URL se aplican los parámetros
definidas en la función. */
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

/* Le añadimos un evento de escucha al elemento de la variable botón cuando el usuario haga click en dicho elemento */
boton.addEventListener("click", () => {
  
  /* Creamos la variable term donde se guardará el texto insertado en el elemento perteneciente a la variable "entrada" */
  let term = entrada.value;
  
  /* En el caso de que el valor de la variable term sea un string vacío, se insertará un string en el elemento guardado en la variable busquedaVacia,
  mostrándose la misma en la página. Además, si el usuario habia realizado una búsqueda previamente, el elemento de la variable contenedor se vaciará */
  if (term === "") {
    busquedaVacia.innerHTML = "Debe ingresar un texto para obtener resultados...";
    contenedor.innerHTML = "";
  } else { /* En el caso de que el condicional anterior no se cumpla ingresará al else */

    /* Llamamos a la función giphyFetch y le pasamos los valores guardados en la variable apiKey y term */
    giphyFetch(apiKey, term)
      
      /* La función al retornar la solicitud HTTP se procede a crear una promesa, donde esta primera promesa convierte la respuesta en formato JSon y la retorna */
      .then((response) => {
        return response.json();
      })
      
      /* Cuando finaliza la promesa anterior con éxito ingresa a esta nueva promesa, donde el objetivo de la misma es mostrar los gifs en nuestra página */
      .then((results) => {
        
        /* Vaciamos el texto del elemento guardado en la variable busquedaVacia en el caso de que la misma tenga como valor el string
        "Debe ingresar un texto para obtener resultados..." */
        if (busquedaVacia.innerHTML === "Debe ingresar un texto para obtener resultados...") {
          busquedaVacia.innerHTML = "";
        };
        
        /* Vaciamos los gifs que se encuentren en el elemento guardado en la variable contenedor en el caso de que el usuario haya realizado
        previamente una búsqueda y el contenedor tenga elementos dentro de la misma */
        if (contenedor.innerHTML !== "") {
          contenedor.innerHTML = "";
        };
        
        /* Para el resultado obtenido recorremos cada elemento del array donde dentro del mismo se encuentran los 9 gifs,
        por ende ira desde el elemento 0 hasta el elemento 8 del array */
        results.data.forEach((element) => {
          
          /* Guardamos en la variable imagen la creación del elemento img en el documento HTML */
          let imagen = document.createElement("img");
          
          /* A la variable imagen se le atribuyen dos valores, el src siendo el atributo que se establece y se actualiza
          y por otro lado el valor que se le asigna al atributo, siendo la ruta donde se encuentra el gif */
          imagen.setAttribute("src", element.images.original.url);
          
          /* Se le agrega la clase "gif" al elemento guardado en la variable imagen. Esto nos sirve para poder 
          manipular el tamaño de los gifs en nuestro archivo CSS */
          imagen.classList.add("gif");
          
          /* Agregamos el gif guardado en la variable imagen al elemento que se encuentra en la variable contenedor */
          contenedor.appendChild(imagen);
        });
      })
      
      /* En el caso de que se produzca algún error en una de las dos promesas anteriores ingresa al catch donde
      imprime el mensaje de error en la consola del navegador */
      .catch((error) => {
        console.error(error.message);
      });
  }
});