/*
    Completar el siguiente segmento de codigo utilizando el concepto de async-await para
    que los mensajes se muestren de manera correcta (1,2,3,4,5)

    Solo puedes modificar o eliminar los comentarios marcados con "TODO" como crea necesario.
*/

console.log(1);

/* TODO */ function esperar2segundos() {
    console.log(3);
    /* TODO */
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(4);
            resolve();
        }, 2000);
    });
    /* TODO */
}

/* TODO */ function ejecutarMensajes() {
    console.log(2);
    /* TODO */ esperar2segundos();
    console.log(5);
}

/* TODO */ ejecutarMensajes();