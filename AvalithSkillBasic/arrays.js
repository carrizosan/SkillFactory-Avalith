const original = ['Rojo', 'Verde', 'Azul', 'Amarillo'];
// -------
let indiceAmarillo = null;
let cantidadColoresConA = 0;
let arregloSinAzul = [];
let ordenadoPorCantidadLetras = [];
let arregloConNuevoColorInicio = [];
let arregloConNuevoColorFin = [];

// Resoluciones
indiceAmarillo = original.findIndex(e => e === 'Amarillo');
cantidadColoresConA = original.filter(e => e.toLowerCase().includes('a')).length;
arregloSinAzul = original.filter(e => e !== 'Azul');
ordenadoPorCantidadLetras = original.sort((a,b) => a.length > b.length ? 1 : -1);
arregloConNuevoColorInicio = ['Blanco', ...original]; // No utilizo unshift() para no mutar el arreglo original
arregloConNuevoColorFin = [...original, 'Negro']; // No utilizo push() para no mutar el arreglo original

// Logs
console.log(indiceAmarillo);
console.log(cantidadColoresConA);
console.log(arregloSinAzul);
console.log(ordenadoPorCantidadLetras);
console.log(arregloConNuevoColorInicio);
console.log(arregloConNuevoColorFin);
