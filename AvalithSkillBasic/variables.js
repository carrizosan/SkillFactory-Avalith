
try {
    var A = null;
    A = 'Valor A';
} catch (error) {
    console.log('Error al asignar A');
}

try {
    console.log(A)
} catch (error) {
    console.log('"A" no existe!');
}

try {
    let B = null;
    B = 'Valor B';
} catch (error) {
    console.log('Error al asignar B');
}

try {
    console.log(B)
} catch (error) {
    console.log('"B" no existe!');
}

try {
    const C = null;
    C = 'Valor C';
} catch (error) {
    console.log('Error al asignar C');
}

try {
    console.log(C)
} catch (error) {
    console.log('"C" no existe!');
}