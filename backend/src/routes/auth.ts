import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: "Email e senha são obrigatórios." });
    }

    const usuario = await prisma.user.findUnique({ where: { email } });

    if (!usuario) {
      return res.status(401).json({ erro: "Email ou senha inválidos." });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ erro: "Email ou senha inválidos." });
    }

    const token = jwt.sign(
      { usuarioId: usuario.id },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return res.json({ token, usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email } });
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao fazer login." });
  }
});

export default router;