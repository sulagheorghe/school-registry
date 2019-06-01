import React from 'react'
import { Container } from 'reactstrap'

export function Footer() {
  return (
    <section className="bg-dark text-light p-3 mt-auto text-center">
      <Container>
        School registry 2019 - {new Date().getFullYear()}
      </Container>
    </section>
  );
}
