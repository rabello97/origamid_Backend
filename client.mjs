const produtosRespo = await fetch("http://localhost:3000/produtos");
const produtos = await produtosRespo.json();
console.log("produtos", produtos);
console.log("produtosRespo", produtosRespo);

// const notebookRespo = await fetch(
//   "http://localhost:3000/produto?categoria=eletronicos&slug=notebook",
// );
// const notebook = await notebookRespo.text();
// console.log("notebook", notebook);

const response = await fetch("http://localhost:3000/produtos", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    nome: "Notebook",
    slug: "notebook",
    categoria: "eletronicos",
    preco: 4000,
  }),
});

// console.log(response);

const body = await response.text();
// console.log(body);

await fetch("http://localhost:3000/produtos", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    nome: "Mesa",
    slug: "mesa",
    categoria: "moveis",
    preco: 4000,
  }),
});

await fetch("http://localhost:3000/produtos", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    nome: "Mouse",
    slug: "mouse",
    categoria: "eletronicos",
    preco: 100,
  }),
});
