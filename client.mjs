const base = "http://localhost:3000";

fetch(`${base}/cursos`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    nome: "HTML Completo",
    slug: "html-completo",
    descricao: "Curso de HTML Completo",
  }),
});

fetch(`${base}/aulas`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    slug: "arrays",
    nome: "Arrays em JavaScript",
    cursoSlug: "javascript",
  }),
});

const aula = await fetch(base + "/aula?curso=javascript&slug=arrays").then(
  (res) => res.json(),
);
console.log(aula);

// const aulas = await fetch(base + "/aulas?curso=javascript").then((res) =>
//   res.json(),
// );
// console.log(aulas);

// const curso = await fetch(base + "/curso?slug=javascript").then((res) =>
//   res.json(),
// );
// console.log(curso);

const cursos = await fetch(base + "/cursos").then((res) => res.json());
// console.log(cursos);
