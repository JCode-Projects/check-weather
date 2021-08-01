const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

window.addEventListener("load", () => {
    formulario.addEventListener("submit", buscarClima);
});

function buscarClima(e) {
    e.preventDefault();

    // Validar Formulario
    const ciudad = document.querySelector("#ciudad").value;
    const pais = document.querySelector("#pais").value;
    
    if(ciudad.trim() === "" || pais.trim() === "") {
        mostrarError("Ambos campos son obligatorios.");
        return;
    }

    // Consultar la API
    consultarAPI(ciudad, pais);
}

function mostrarError(mensaje) {
    const alerta = document.createElement("div");
    alerta.classList.add("bg-red-100", "border-red-400", "text-red-700", "px-4", "py-3", "rounded", "max-w-md", "mx-auto", "mt-6", "text-center", "error");
    alerta.innerHTML = `
        <strong class="font-bold">Error: </strong>
        <span class="block">${mensaje}</span>
    `;
    if(!document.querySelector(".error")) {
        container.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}

function consultarAPI(ciudad, pais) {
    const appKey = "81f976a8dd705546a5b623959668e22f";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appKey}`;
    
    spinner();

    fetch(url)
        .then(response => response.json())
        .then(datos => {
            if(datos.cod === "404") {
                mostrarError("Ciudad no encontrada.");
                return;
            }

            mostrarClima(datos);
        })
}

function mostrarClima(datos) {
    limpiarHTML();

    const { name, main: { temp, temp_max, temp_min } } = datos;

    const nombreCiudad = document.createElement("p");
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add("font-bold", "text-2xl");

    const actual = document.createElement("p");
    actual.innerHTML = `${kelvinACentigrados(temp)} &#8451;`;
    actual.classList.add("font-bold", "text-6xl");

    const tempMaxima = document.createElement("p");
    tempMaxima.innerHTML = `Max: ${kelvinACentigrados(temp_max)} &#8451;`;
    tempMaxima.classList.add("text-xl");
    
    const tempMinima = document.createElement("p");
    tempMinima.innerHTML = `Min: ${kelvinACentigrados(temp_min)} &#8451;`;
    tempMinima.classList.add("text-xl");

    const resultadoDiv = document.createElement("div");
    resultadoDiv.classList.add("text-center", "text-white");
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);

    resultado.appendChild(resultadoDiv);
}

const kelvinACentigrados = gradosKelvin => parseInt(gradosKelvin - 273.15);

function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function spinner() {
    limpiarHTML();

    const divSpinner = document.createElement('div');
    divSpinner.classList.add("sk-circle");
    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-child"></div>
        <div class="sk-circle2 sk-child"></div>
        <div class="sk-circle3 sk-child"></div>
        <div class="sk-circle4 sk-child"></div>
        <div class="sk-circle5 sk-child"></div>
        <div class="sk-circle6 sk-child"></div>
        <div class="sk-circle7 sk-child"></div>
        <div class="sk-circle8 sk-child"></div>
        <div class="sk-circle9 sk-child"></div>
        <div class="sk-circle10 sk-child"></div>
        <div class="sk-circle11 sk-child"></div>
        <div class="sk-circle12 sk-child"></div>
    `;

    resultado.appendChild(divSpinner);
}