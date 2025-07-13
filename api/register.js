import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ erro: 'Método não permitido' })

  const { nome, email, senha } = req.body

  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Preencha todos os campos' })
  }

  const { error } = await supabase
    .from('usuarios')
    .insert([{ nome, email, senha }])

  if (error) return res.status(500).json({ erro: 'Erro ao registrar usuário' })

  res.status(201).json({ msg: 'Usuário registrado com sucesso' })
}

