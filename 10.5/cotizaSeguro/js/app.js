// cotizador para seguros
function Seguro(marca, anio, tipo) {
  this.marca = marca;
  this.anio = anio;
  this.tipo = tipo;
}
Seguro.prototype.cotizarSeguro = function () {
  /*americano = 1.15 
       asiatico = 1.05
       europeo = 1.35*/
  let cantidad;
  const base = 2000;
  switch(this.marca) {
    case '1':
      cantidad = base * 1.15;
      break;
    case '2':
      cantidad = base * 1.05;
      break;
    case '3':
      cantidad = base * 1.35;
      break;
  }
  //leer año
  const diferencia = new Date().getFullYear() - this.anio;
  //cada año se diferencia el seguro
  cantidad -= ((diferencia * 3) * cantidad) / 100;
  //si es basico por 1.30 si completo 1.50
  if(this.tipo === 'basico'){
       cantidad *= 1.30;
  }else{
     cantidad *= 1.50;
  }
  return cantidad;
};
//todo lo que se muestra
function Interfaz() {}
//mensaje que se imprime en el HTML
Interfaz.prototype.mostrarError = function (mensaje, tipo) {
  const div = document.createElement("div");
  if (tipo === "error") {
    div.classList.add("mensaje", "error");
  } else {
    div.classList.add("mensaje", "correcto");
  }
  div.innerHTML = `${mensaje}`;
  formulario.insertBefore(div, document.querySelector(".form-group"));
  setTimeout(function () {
    document.querySelector(".mensaje").remove();
  }, 3000);
};
//mostrar resultados
Interfaz.prototype.mostrarResultados = function(seguro, total){
     const resultado = document.querySelector('#resultado');
     let marca;
     switch(seguro.marca){
          case '1':
               marca = 'Americano';
               break;
          case '2':
               marca = 'Asiatico';
               break;
          case '3':
               marca = 'Europeo';
               break;
     }
     const div = document.createElement('div');
     div.innerHTML =`
     <p class='header'>Tu seguro:</p>
     <p>Marca: ${marca}</p>
     <p>Año:   ${seguro.anio}</p>
     <p>Tipo:  ${seguro.tipo}</p>
     <p>Total: ${total}</p>`;
     const spinner = document.querySelector('#cargando img');
     spinner.style.display = 'block';
     setTimeout(function(){
      spinner.style.display = 'none';
      resultado.appendChild(div);
     },3000);
}
//cotizar seguro
const formulario = document.getElementById("cotizar-seguro");
//event listener
formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  //leer marca seleccionada de marca
  const marca = document.getElementById("marca");
  const marcaSeleccionada = marca.options[marca.selectedIndex].value;
  //leer marca seleccionada de marca
  const anio = document.getElementById("anio");
  const anioSeleccionado = anio.options[anio.selectedIndex].value;
  //leer los radio bottom
  const tipo = document.querySelector('input[name = "tipo"]:checked').value;
  //crear instancia de interfaz
  const interfaz = new Interfaz();
  //que la interfaz no este vacio
  if (marcaSeleccionada === "" || anioSeleccionado === "" || tipo === "") {
    interfaz.mostrarError("Faltan datos porfavor intente de nuevo", "error");
  } else {
    const resultado = document.querySelector('#resultado div');
    if(resultado != null){
      resultado.remove();
    }
    //Instanciar seguro y Mostrar interfaz
    const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);
    //cotizar el seguro
    const cotizar = seguro.cotizarSeguro();
    //Mostrar resultados
    interfaz.mostrarResultados(seguro, cotizar);
    interfaz.mostrarError("Cotizando....", "Completado!");
  }
});

const max = new Date().getFullYear(),
  min = max - 20;

const selectAnios = document.getElementById("anio");
for (let i = max; i >= min; i--) {
  let option = document.createElement("option");
  option.value = i;
  option.innerHTML = i;
  selectAnios.appendChild(option);
}
