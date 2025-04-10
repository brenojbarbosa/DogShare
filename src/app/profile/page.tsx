'use client'

import { useEffect, useState } from 'react'
import { Card, Row, Col, Spinner, Form, Button } from 'react-bootstrap'
import ProfileCard from '../../components/ProfileCard'

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
  editando?: boolean
  comentarios?: string[]
}

export default function Profile() {
  const [posts, setPosts] = useState<Post[]>([])
  const [carregando, setCarregando] = useState(true)
  const [imagem, setImagem] = useState('')
  const [descricao, setDescricao] = useState('')
  const usuario = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('usuarioLogado') || 'null') : null

  const atualizarPosts = (todosPosts: Post[]) => {
    const meusPosts = todosPosts.filter((post: Post) => post.autor?.email === usuario?.email)
    setPosts(meusPosts)
  }

  useEffect(() => {
    if (!usuario) return
    const todosPosts = JSON.parse(localStorage.getItem('postsDogSpot') || '[]')
    atualizarPosts(todosPosts)
    setCarregando(false)
  }, [])

  const criarPost = () => {
    if (!imagem || !descricao) return
    const novoPost: Post = {
      id: Date.now(),
      url: imagem,
      descricao,
      autor: usuario,
      curtidas: 0,
      curtido: false,
      comentarios: []
    }
    const todosPosts = JSON.parse(localStorage.getItem('postsDogSpot') || '[]')
    const atualizados = [novoPost, ...todosPosts]
    localStorage.setItem('postsDogSpot', JSON.stringify(atualizados))
    atualizarPosts(atualizados)
    setImagem('')
    setDescricao('')
  }

  const toggleEditar = (id: number) => {
    setPosts(prev => prev.map(post => post.id === id ? { ...post, editando: !post.editando } : post))
  }

  const salvarLegenda = (id: number, novaLegenda: string) => {
    const novosPosts = posts.map(post => post.id === id ? { ...post, descricao: novaLegenda, editando: false } : post)
    setPosts(novosPosts)
    const todosPosts = JSON.parse(localStorage.getItem('postsDogSpot') || '[]')
    const atualizados = todosPosts.map((post: Post) => post.id === id ? { ...post, descricao: novaLegenda } : post)
    localStorage.setItem('postsDogSpot', JSON.stringify(atualizados))
  }

  const toggleCurtir = (id: number) => {
    const novosPosts = posts.map(post => {
      if (post.id === id) {
        const novoStatus = !post.curtido
        const novasCurtidas = (post.curtidas || 0) + (novoStatus ? 1 : -1)
        return { ...post, curtido: novoStatus, curtidas: novasCurtidas }
      }
      return post
    })
    setPosts(novosPosts)
    const todosPosts = JSON.parse(localStorage.getItem('postsDogSpot') || '[]')
    const atualizados = todosPosts.map((post: Post) => {
      if (post.id === id) {
        const curtidoAntes = post.curtido || false
        const curtidas = post.curtidas || 0
        return { ...post, curtido: !curtidoAntes, curtidas: curtidoAntes ? curtidas - 1 : curtidas + 1 }
      }
      return post
    })
    localStorage.setItem('postsDogSpot', JSON.stringify(atualizados))
  }

  const excluirPost = (id: number) => {
    const novosPosts = posts.filter(post => post.id !== id)
    setPosts(novosPosts)
    const todosPosts = JSON.parse(localStorage.getItem('postsDogSpot') || '[]')
    const atualizados = todosPosts.filter((post: Post) => post.id !== id)
    localStorage.setItem('postsDogSpot', JSON.stringify(atualizados))
  }

  const excluirComentario = (postId: number, index: number) => {
    const novosPosts = posts.map(post => {
      if (post.id === postId) {
        const novosComentarios = [...(post.comentarios || [])]
        novosComentarios.splice(index, 1)
        return { ...post, comentarios: novosComentarios }
      }
      return post
    })
    setPosts(novosPosts)
    const todosPosts = JSON.parse(localStorage.getItem('postsDogSpot') || '[]')
    const atualizados = todosPosts.map((post: Post) => {
      if (post.id === postId) {
        const novosComentarios = [...(post.comentarios || [])]
        novosComentarios.splice(index, 1)
        return { ...post, comentarios: novosComentarios }
      }
      return post
    })
    localStorage.setItem('postsDogSpot', JSON.stringify(atualizados))
  }

  if (carregando) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    )
  }

  return (
    <div className="container py-5" style={{ backgroundColor: '#232946', minHeight: '100vh' }}>
      <h2 className="mb-4 text-center" style={{ color: "#eebbc3" }}>Meu Perfil</h2>

      <div className="mb-4">
        <ProfileCard />
      </div>
      <h2 className='text-center'>Meu Feed</h2>
      <Card className="p-3 mb-4 shadow-sm rounded-4 mx-auto" style={{ maxWidth: '600px', width: '100%' }}>
        <h5 className="mb-3">Novo Post</h5>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="URL da imagem"
            value={imagem}
            onChange={(e) => setImagem(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </Form.Group>
        <Button
          size="sm"
          style={{ backgroundColor: '#eebbc3', border: 'none', color: '#232946' }}
          onClick={criarPost}
        >
          Postar
        </Button>
      </Card>

      {posts.length === 0 ? (
        <p className="text-center" style={{ color: '#eebbc3' }}>Você ainda não tem posts.</p>
      ) : (
        <Row xs={1} sm={2} md={3} className="g-4">
          {posts.map((post) => (
            <Col key={post.id}>
              <Card className="shadow-sm rounded-4">
                <Card.Img variant="top" src={post.url} alt="Dog" className="rounded-top-4" />
                <Card.Body>
                  <Card.Title>{post.autor?.nome}</Card.Title>
                  {post.editando ? (
                    <>
                      <Form.Control
                        type="text"
                        className="mb-2"
                        value={post.descricao}
                        onChange={(e) => {
                          const valor = e.target.value
                          setPosts(prev => prev.map(p => p.id === post.id ? { ...p, descricao: valor } : p))
                        }}
                      />
                      <Button className="me-2 btn-sm" variant="success" onClick={() => salvarLegenda(post.id, post.descricao || '')}>Salvar</Button>
                      <Button className="btn-sm" variant="secondary" onClick={() => toggleEditar(post.id)}>Cancelar</Button>
                    </>
                  ) : (
                    <>
                      <Card.Text>{post.descricao}</Card.Text>
                      <Button className="btn-sm me-2" variant="outline-primary" onClick={() => toggleEditar(post.id)}>Editar</Button>
                    </>
                  )}
                  <div className="mt-3 d-flex gap-2">
                    <Button
                      className="btn-sm"
                      variant={post.curtido ? 'danger' : 'outline-danger'}
                      onClick={() => toggleCurtir(post.id)}
                    >
                      ❤️ Curtir ({post.curtidas || 0})
                    </Button>
                    <Button className="btn-sm" variant="outline-danger" onClick={() => excluirPost(post.id)}>🗑️ Excluir</Button>
                  </div>
                  <div className="mt-3">
                    <strong>Comentários:</strong>
                    <ul className="list-unstyled mt-2">
                      {(post.comentarios || []).map((comentario, index) => (
                        <li key={index} className="d-flex justify-content-between bg-light rounded px-2 py-1 mb-1">
                          {comentario}
                          <Button
                            className="btn-sm"
                            variant="outline-secondary"
                            onClick={() => excluirComentario(post.id, index)}
                          >
                            ❌
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}
