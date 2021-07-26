
const stringA = 'Rojo,Verde,Amarillo,Azul';
const stringB = 'Sergio';
const stringC = 'Damian';
const stringD = 'Mi nombre es Damian y tengo 28 años';
// -------
let tamanioA = 0;
let cantidadLetraR = 0;
let nombreCompleto = '';
let fraseOtroNombre = '';
let posicionNombre = null;
let arregloParseado = [];

tamanioA = stringA.length;

for(let i = 0; i < stringA.length; i++) {
    if(stringA[i].toLowerCase() === 'r') {
        cantidadLetraR ++;
    }
}

nombreCompleto = stringB.concat(" ").concat(stringC);
fraseOtroNombre = stringD.replace(stringC, stringB);
posicionNombre = stringD.indexOf('Damian');
arregloParseado = stringA.split(",");

console.log(tamanioA);
console.log(cantidadLetraR);
console.log(nombreCompleto);
console.log(fraseOtroNombre);
console.log(posicionNombre);
console.log(arregloParseado);