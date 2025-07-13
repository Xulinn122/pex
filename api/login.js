import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ erro: 'Método não permitido' })

  const { email, senha } = req.body

  const { data, error } = await supabase
    .from('usuarios')
    .select('*')
    .eq('email', email)
    .eq('senha', senha)
    .single()

  if (error || !data) return res.status(401).json({ erro: 'Email ou senha inválidos' })

  res.status(200).json({ msg: 'Login autorizado', usuario: data })
}
