import fs from "node:fs/promises";

try {
  await fs.mkdir("./produtos");
} catch (error) {
  console.error("Erro ao criar diretório:");
}

fs.writeFile(
  "./produtos/notebook.json",
  JSON.stringify({ nome: "Notebook", cor: "Azul" }),
);

const dados = await fs.readFile("./produtos/notebook.json", "utf-8");
console.log(dados);

const dir = await fs.readdir("./produtos", { recursive: true });
console.log(dir);

console.log(dir.filter((file) => file.endsWith(".txt")));
