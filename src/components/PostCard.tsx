
import { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';

export default function ProfileCard() {
  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState('Rex (Dono: Breno)');
  const [raca, setRaca] = useState('Shiba Inu');
  const [descricao, setDescricao] = useState(
    'Amante de longos passeios no parque, petiscos gourmet e muitos cafunés.'
  );
  const [fotoPerfil, setFotoPerfil] = useState('https://images.dog.ceo/breeds/shiba/shiba-10.jpg');

  const handleSalvar = () => {
    setEditando(false);
    alert('Perfil atualizado!');
  };

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPerfil(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="shadow rounded-4 p-3 text-center">
      <Card.Img
        variant="top"
        src={fotoPerfil}
        alt="Dog profile"
        className="rounded-circle mx-auto mt-3"
        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
      />
      <Form.Group className="mb-3">
        <Form.Label>Alterar foto do perfil</Form.Label>
        <Form.Control type="file" accept="image/*" onChange={handleFotoChange} />
      </Form.Group>
      <Card.Body>
        {editando ? (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Raça preferida</Form.Label>
              <Form.Control
                type="text"
                value={raca}
                onChange={(e) => setRaca(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </Form.Group>

            <Button variant="success" className="rounded-pill w-100" onClick={handleSalvar}>
              Salvar
            </Button>
          </>
        ) : (
          <>
            <Card.Title className="fs-3 text-primary">{nome}</Card.Title>
            <Card.Text>🐶 Raça preferida: {raca}</Card.Text>
            <Card.Text>{descricao}</Card.Text>
            <Button
              variant="outline-primary"
              className="rounded-pill mt-2"
              onClick={() => setEditando(true)}
            >
              Editar Perfil
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
}
