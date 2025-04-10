'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    const userData = {
      email,
      nome: "Usuário DogSpot",
      foto: "https://randomuser.me/api/portraits/men/75.jpg"
    }

    localStorage.setItem("usuarioLogado", JSON.stringify(userData))

    router.push("/profile")
  }

  return (
    <Container className="d-flex justify-content-center align-items-center py-5" style={{ backgroundColor: '#232946' }}>
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <Card className="p-4 shadow rounded-4" style={{ backgroundColor: '#232946', border: 'none' }}>
            <Card.Body>
              <h2 className="text-center mb-4" style={{ color: '#eebbc3' }}>Entrar no DogSpot</h2>
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#eebbc3' }}>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Digite seu email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{ color: '#eebbc3' }}>Senha</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Digite sua senha"
                    onChange={(e) => setSenha(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100 rounded-pill border-0"
                  style={{ backgroundColor: '#eebbc3', color: '#232946' }}
                >
                  Entrar
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
