import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido' });
  }

  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Dados incompletos' });
  }

  const userDir = path.join(process.cwd(), 'users');
  const userFile = path.join(userDir, `${email}.json`);

  try {
    // Cria a pasta 'users' caso não exista
    await fs.mkdir(userDir, { recursive: true });

    // Verifica se usuário já existe
    await fs.access(userFile);
    return res.status(409).json({ erro: 'Usuário já existe' });
  } catch {
    // Se o usuário não existe, salva o novo
    const userData = { nome, email, senha };
    await fs.writeFile(userFile, JSON.stringify(userData, null, 2), 'utf8');
    return res.status(201).json({ msg: 'Usuário registrado com sucesso' });
  }
}
