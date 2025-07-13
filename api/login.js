import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido' });
  }

  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Dados incompletos' });
  }

  const userFile = path.join(process.cwd(), 'users', `${email}.json`);

  try {
    const data = await fs.readFile(userFile, 'utf8');
    const user = JSON.parse(data);

    if (user.senha === senha) {
      return res.status(200).json({ msg: 'Login bem sucedido' });
    } else {
      return res.status(401).json({ erro: 'Senha incorreta' });
    }
  } catch {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }
}
