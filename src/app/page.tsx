'use client'

import { useEffect, useState } from 'react'
import { Card, Row, Col, Spinner } from 'react-bootstrap'

interface Comentario {
  autor: string
  texto: string
}

interface Post {
  id: number
  url: string
  descricao?: string
  autor?: {
    nome: string
    email: string
    foto: string
  }
  curtidas?: number
  curtido?: boolean
  comentarios?: Comentario[]
  novoComentario?: string
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [carregando, setCarregando] = useState(true)

  const usuario = typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('usuarioLogado') || 'null')
    : null

  useEffect(() => {
    const fetchAPI = async () => {
      const res = await fetch('https://dog.ceo/api/breeds/image/random/9')
      const dados = await res.json()

      const gerarNomeDog = () => {
        const nomes = ['Bolt', 'Luna', 'Toby', 'Mel', 'Rex', 'Princesa', 'Thor', 'Nina', 'Max', 'Amora', 'Pingo', 'Lola', 'Simba', 'Belinha', 'Marley', 'Dudu', 'Paçoca']
        const sobrenomes = ['Latidor', 'Peloslongos', 'CaudaFeliz', 'Rabanada', 'Bigodes', 'Saltitante', 'Caramelo', 'Dorminhoco']
        const nome = nomes[Math.floor(Math.random() * nomes.length)]
        const sobrenome = sobrenomes[Math.floor(Math.random() * sobrenomes.length)]
        return `${nome} ${sobrenome}`
      }

      const postsAPI = dados.message.map((url: string, index: number) => ({
        id: 1000 + index,
        url,
        autor: {
          nome: gerarNomeDog(),
          email: 'api@dogspot.com',
          foto: ''
        },
        curtidas: 0,
        curtido: false,
        comentarios: []
      }))

      const postsLocal = JSON.parse(localStorage.getItem('postsDogSpot') || '[]')
      const todos = [...postsAPI, ...postsLocal]
      setPosts(todos)
      setCarregando(false)
    }

    if (typeof window !== 'undefined') fetchAPI()
  }, [])

  const toggleCurtir = (id: number) => {
    const novos = posts.map(post => {
      if (post.id === id) {
        const curtido = !post.curtido
        const curtidas = (post.curtidas || 0) + (curtido ? 1 : -1)
        return { ...post, curtido, curtidas }
      }
      return post
    })
    setPosts(novos)

    const locais = novos.filter(p => p.id < 1000)
    localStorage.setItem('postsDogSpot', JSON.stringify(locais))
  }

  const adicionarComentario = (id: number) => {
    const novos = posts.map(post => {
      if (post.id === id && post.novoComentario?.trim()) {
        const novo: Comentario = {
          autor: usuario?.nome || 'Anônimo',
          texto: post.novoComentario.trim()
        }
        return {
          ...post,
          comentarios: [...(post.comentarios || []), novo],
          novoComentario: ''
        }
      }
      return post
    })

    setPosts(novos)

    const locais = novos.filter(p => p.id < 1000)
    localStorage.setItem('postsDogSpot', JSON.stringify(locais))
  }

  if (carregando) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    )
  }

  return (
    <div className="container py-5 text-light min-vh-100" style={{ backgroundColor: '#1e1e2f' }}>
      <h2 className="mb-4 text-center d-flex justify-content-center align-items-center gap-2" style={{ color: '#eebbc3' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#eebbc3" viewBox="0 0 24 24">
          <path d="M4 5h16v2H4V5Zm0 6h10v2H4v-2Zm0 6h7v2H4v-2Z" />
        </svg>
        DogSpot - Feed
      </h2>

      {posts.length === 0 ? (
        <p className="text-center">Nenhum doguinho postado ainda! 😢</p>
      ) : (
        <Row xs={1} sm={2} md={3} className="g-4">
          {posts.map(post => (
            <Col key={post.id}>
              <Card className="shadow-sm rounded-4 h-100 bg-dark text-light">
                <div style={{ height: '250px', overflow: 'hidden' }}>
                  <Card.Img
                    variant="top"
                    src={post.url}
                    alt="Dog"
                    className="rounded-top-4"
                    style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                  />
                </div>
                <Card.Body>
                  <Card.Title>{post.autor?.nome}</Card.Title>
                  {post.descricao && <Card.Text>{post.descricao}</Card.Text>}

                  <button
                    className={`btn btn-sm ${post.curtido ? 'btn-danger' : 'btn-outline-danger'} me-2`}
                    onClick={() => toggleCurtir(post.id)}
                  >
                    ❤️ Curtir ({post.curtidas || 0})
                  </button>

                  <div className="mt-3">
                    <input
                      type="text"
                      placeholder="Comente aqui..."
                      className="form-control form-control-sm mb-2"
                      value={post.novoComentario || ''}
                      onChange={e => {
                        const valor = e.target.value
                        setPosts(prev =>
                          prev.map(p =>
                            p.id === post.id ? { ...p, novoComentario: valor } : p
                          )
                        )
                      }}
                    />
                    <button
                      className="btn btn-sm"
                      style={{
                        backgroundColor: '#eebbc3',
                        color: '#1e1e2f',
                        fontSize: '0.8rem',
                        padding: '4px 10px',
                        border: 'none'
                      }}
                      onClick={() => adicionarComentario(post.id)}
                    >
                      Comentar
                    </button>
                  </div>

                  {post.comentarios && post.comentarios.length > 0 && (
                    <div className="mt-3">
                      <h6 className="fw-bold">Comentários:</h6>
                      {post.comentarios.map((c, i) => (
                        <p key={i} className="mb-1">
                          <strong>{c.autor}:</strong> {c.texto}
                        </p>
                      ))}
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}
