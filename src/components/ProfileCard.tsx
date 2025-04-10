'use client'

import { useState, useEffect } from 'react'
import { Card, Button, Form } from 'react-bootstrap'

export default function ProfileCard() {
  const [editando, setEditando] = useState(false)
  const [nome, setNome] = useState('')
  const [raca, setRaca] = useState('')
  const [descricao, setDescricao] = useState('')
  const [fotoPerfil, setFotoPerfil] = useState('')
  const [carregado, setCarregado] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const perfilSalvo = localStorage.getItem('perfilDog')
      if (perfilSalvo) {
        const { nome, raca, descricao, fotoPerfil } = JSON.parse(perfilSalvo)
        setNome(nome)
        setRaca(raca)
        setDescricao(descricao)
        setFotoPerfil(fotoPerfil)
      } else {
        setNome('Rex (Dono: Breno)')
        setRaca('Shiba Inu')
        setDescricao('Amante de longos passeios no parque, petiscos gourmet e muitos cafunés.')
        setFotoPerfil('https://images.dog.ceo/breeds/shiba/shiba-10.jpg')
      }
      setCarregado(true)
    }
  }, [])

  const handleSalvar = () => {
    const perfil = { nome, raca, descricao, fotoPerfil }
    localStorage.setItem('perfilDog', JSON.stringify(perfil))
    setEditando(false)
  }

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        setFotoPerfil(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  if (!carregado) return null

  return (
    <Card className="shadow rounded-4 p-3 text-center text-light" style={{ backgroundColor: '#232946' }}>
      <Card.Img
        variant="top"
        src={fotoPerfil}
        alt="Dog profile"
        className="rounded-circle mx-auto mt-3"
        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
      />
      <Form.Group className="mb-3 mt-2">
        <Form.Label
          htmlFor="fotoUpload"
          className="btn btn-sm rounded-pill"
          style={{ backgroundColor: '#eebbc3', color: '#232946', cursor: 'pointer' }}
        >
          Alterar Foto
        </Form.Label>
        <Form.Control
          id="fotoUpload"
          type="file"
          accept="image/*"
          onChange={handleFotoChange}
          style={{ display: 'none' }}
        />
      </Form.Group>
      <Card.Body>
        {editando ? (
          <>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#eebbc3' }}>Nome</Form.Label>
              <Form.Control
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#eebbc3' }}>Raça preferida</Form.Label>
              <Form.Control
                type="text"
                value={raca}
                onChange={(e) => setRaca(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ color: '#eebbc3' }}>Descrição</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </Form.Group>

            <Button
              className="rounded-pill w-100"
              style={{ backgroundColor: '#eebbc3', borderColor: '#eebbc3', color: '#232946' }}
              onClick={handleSalvar}
            >
              Salvar
            </Button>
          </>
        ) : (
          <>
            <Card.Title className="fs-3" style={{ color: '#eebbc3' }}>{nome}</Card.Title>
            <Card.Text>🐶 Raça preferida: {raca}</Card.Text>
            <Card.Text>{descricao}</Card.Text>
            <Button
              className="rounded-pill mt-2"
              style={{ borderColor: '#eebbc3', color: '#eebbc3' }}
              variant="outline-light"
              onClick={() => setEditando(true)}
            >
              Editar Perfil
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  )
}
