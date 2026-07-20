import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

// Criar anúncio
router.post("/", async (req, res) => {
  try {
    const { titulo, descricao, categoria, preco, imagemUrl, usuarioId } = req.body;

    if (!titulo || !descricao || !categoria || !imagemUrl || !usuarioId) {
      return res.status(400).json({ erro: "Campos obrigatórios faltando." });
    }

    const anuncio = await prisma.anuncio.create({
      data: { titulo, descricao, categoria, preco, imagemUrl, usuarioId },
    });

    return res.status(201).json(anuncio);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao criar anúncio." });
  }
});

// Listar anúncios (com filtro opcional por categoria)
router.get("/", async (req, res) => {
  try {
    const { categoria } = req.query;

    const anuncios = await prisma.anuncio.findMany({
      where: categoria ? { categoria: String(categoria) } : undefined,
      orderBy: { createdAt: "desc" },
    });

    return res.json(anuncios);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao listar anúncios." });
  }
});


router.get("/usuario/:usuarioId", async (req, res) => {
  try {
    const anuncios = await prisma.anuncio.findMany({
      where: { usuarioId: req.params.usuarioId },
      orderBy: { createdAt: "desc" },
    });

    return res.json(anuncios);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao listar anúncios do usuário." });
  }
});

// Buscar um anúncio específico
router.get("/:id", async (req, res) => {
  try {
    const anuncio = await prisma.anuncio.findUnique({
      where: { id: req.params.id },
    });

    if (!anuncio) {
      return res.status(404).json({ erro: "Anúncio não encontrado." });
    }

    return res.json(anuncio);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao buscar anúncio." });
  }
});

// Deletar anúncio
router.delete("/:id", async (req, res) => {
  try {
    await prisma.anuncio.delete({
      where: { id: req.params.id },
    });

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao deletar anúncio." });
  }
});

export default router;