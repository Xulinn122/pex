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

  const userFile = path.join(process.cwd(), 'users', `${email}.json`);

  try {
    // Verifica se usuário já existe
    await fs.access(userFile);
    return res.status(409).json({ erro: 'Usuário já existe' });
  } catch {
    // Se não existe, cria arquivo
    const userData = { nome, email, senha };
    await fs.mkdir(path.join(process.cwd(), 'users'), { recursive: true });
    await fs.writeFile(userFile, JSON.stringify(userData, null, 2), 'utf8');
    return res.status(201).json({ msg: 'Usuário registrado com sucesso' });
  }
}
