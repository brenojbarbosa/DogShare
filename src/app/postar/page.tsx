'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Form, Button, Container, Card } from "react-bootstrap"

export default function PostarPage() {
  const [imagem, setImagem] = useState("")
  const [descricao, setDescricao] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const novoPost = {
      imagem,
      descricao,
      autor: JSON.parse(localStorage.getItem("usuarioLogado") || "{}"),
    }

    const postsExistentes = JSON.parse(localStorage.getItem("posts") || "[]")
    const todosPosts = [novoPost, ...postsExistentes]

    localStorage.setItem("posts", JSON.stringify(todosPosts))
    alert("Post enviado com sucesso! 🐾")
    router.push("/")
  }

  return (
    <Container className="py-5" style={{ backgroundColor: '#232946' }}>
      <Card className="p-4 shadow rounded-4 text-light" style={{ backgroundColor: '#232946', border: 'none', maxWidth: '500px', margin: '0 auto' }}>
        <h2 className="text-center mb-4" style={{ color: '#eebbc3' }}>Postar um doguinho</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: '#eebbc3' }}>URL da Imagem</Form.Label>
            <Form.Control
              type="url"
              placeholder="https://..."
              value={imagem}
              onChange={(e) => setImagem(e.target.value)}
              required
              style={{ height: '35px' }}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={{ color: '#eebbc3' }}>Descrição</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Fale algo sobre esse doguinho"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
              style={{ height: '75px' }}
            />
          </Form.Group>

          <Button
            type="submit"
            className="w-100 rounded-pill border-0"
            style={{
              backgroundColor: '#eebbc3',
              color: '#232946',
              fontSize: '1rem',
            }}
          >
            Postar
          </Button>
        </Form>
      </Card>
    </Container>
  )
}
