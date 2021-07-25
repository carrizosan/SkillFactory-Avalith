const original = {
    a: 1,
    b: 2,
    c: 3,
};


let sinB = null;
let valorDeC = null;

let {a, c} = original;

sinB = {a, c};
valorDeC = c

console.log(sinB);
console.log(valorDeC);