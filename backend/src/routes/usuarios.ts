import { Router } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // Criptografa a senha
    const senhaSecreta = await bcrypt.hash(senha, 10);


    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: "Campos obrigatórios faltando." });
    }

    const usuario = await prisma.user.create({
      data: { nome, email, senha: senhaSecreta },
    });

    const { senha: _, ...usuarioSemSenha } = usuario;

    return res.status(201).json(usuarioSemSenha);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao criar usuário." });
  }
});



export default router;