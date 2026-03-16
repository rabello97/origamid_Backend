import { createServer } from "node:http";
import { Router } from "./router.mjs";
import { customRequest } from "./custom-request.mjs";
import { customResponse } from "./custom-response.mjs";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import {
  criarCurso,
  criarAula,
  pegarCursos,
  pegarCurso,
  pegarAulas,
  pegarAula,
} from "./database.mjs";

const router = new Router();

router.post("/cursos", async (req, res) => {
  const { slug, nome, descricao } = req.body;
  const criado = criarCurso({ slug, nome, descricao });
  if (criado) {
    res.status(201).end("Curso criado");
  } else {
    res.status(400).end("Erro ao criar curso");
  }
});

router.post("/aulas", async (req, res) => {
  const { slug, nome, cursoSlug } = req.body;
  const criada = criarAula({ slug, nome, cursoSlug });
  if (criada) {
    res.status(201).end("Aula criada");
  } else {
    res.status(400).end("Erro ao criar aula");
  }
});

router.get("/cursos", async (req, res) => {
  const cursos = pegarCursos();
  if (cursos && cursos.length) {
    res.status(200).json(cursos);
  } else {
    res.status(404).end("Cursos não encontrados");
  }
});

router.get("/curso", async (req, res) => {
  const slug = req.query.get("slug");
  const curso = pegarCurso(slug);
  if (curso) {
    res.status(200).json(curso);
  } else {
    res.status(404).end("Curso não encontrado");
  }
});
router.get("/aulas", async (req, res) => {
  const curso = req.query.get("curso");
  const aulas = pegarAulas(curso);
  if (aulas && aulas.length) {
    res.status(200).json(aulas);
  } else {
    res.status(404).end("Aulas não encontradas");
  }
});

router.get("/aula", async (req, res) => {
  const curso = req.query.get("curso");
  const slug = req.query.get("slug");
  const aula = pegarAula(curso, slug);
  if (aula) {
    res.status(200).json(aula);
  } else {
    res.status(404).end("Aula não encontrada");
  }
});

const server = createServer(async (request, response) => {
  const req = await customRequest(request);
  const res = customResponse(response);
  const handler = router.find(req.method, req.pathname);
  if (handler) {
    handler(req, res);
  } else {
    res.status(404).end("Não encontrada");
  }
});

server.listen(3000, () => {
  console.log("Server: http://localhost:3000");
});
