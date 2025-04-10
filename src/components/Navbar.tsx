'use client'

import { Navbar as BsNavbar, Nav, Container, Button } from "react-bootstrap"
import Link from "next/link"
import React, { useState, useEffect } from 'react'

function Navbar() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <BsNavbar variant="dark" expand="lg" style={{ background: "#232946" }}>
      <Container>
        <Link
          className="navbar-brand d-flex align-items-center"
          href="/"
          style={{
            fontSize: '2rem',
            fontFamily: "'Roboto', sans-serif",
            color: "#eebbc3"
          }}
        >
          {/* Ícone SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="#eebbc3"
            className="me-2"
            viewBox="0 0 16 16"
          >
            <path d="M11.273 1.114a1.5 1.5 0 1 1 2.454 1.772 1.5 1.5 0 0 1-2.454-1.772ZM6.5 3a1.5 1.5 0 1 1 0 3A1.5 1.5 0 0 1 6.5 3Zm-4 1a1.5 1.5 0 1 1 0 3A1.5 1.5 0 0 1 2.5 4Zm10.485 4.379a2.5 2.5 0 0 1-1.07 3.376c-.69.355-1.526.599-2.409.702l-.03.003a17.1 17.1 0 0 1-2.752 0l-.03-.003c-.883-.103-1.719-.347-2.408-.702a2.5 2.5 0 0 1-1.07-3.376c.34-.662.858-1.311 1.489-1.884a6.1 6.1 0 0 1 1.222-.847 3 3 0 0 1 2.346 0c.436.207.86.496 1.222.847.63.573 1.148 1.222 1.489 1.884Zm-3.167-6.918a1.5 1.5 0 1 1-2.454 1.772 1.5 1.5 0 0 1 2.454-1.772Z" />
          </svg>
          DogSpot
        </Link>

        <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link
              className="nav-link"
              href="/profile"
              style={{ fontFamily: "'Roboto', sans-serif", color: "#eebbc3" }}
            >
              Meu Perfil
            </Link>
            <Link
              className="nav-link"
              href="/login"
              style={{ fontFamily: "'Roboto', sans-serif", color: "#eebbc3" }}
            >
              Login
            </Link>
            <Link href="/postar" passHref>
              <Button
                variant="outline-light"
                className="ms-2"
                style={{
                  height: '40px',
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: '1rem',
                  borderRadius: '25px',
                  textTransform: 'uppercase',
                  color: "#eebbc3",
                  borderColor: "#eebbc3"
                }}
              >
                Upload
              </Button>
            </Link>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  )
}

export default Navbar
