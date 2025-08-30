import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { members } from "../data/members";

// Helper function to try multiple extensions
const getImagePath = (name) => {
  const extensions = ["jpg", "jpeg", "png"];
  for (let ext of extensions) {
    try {
      return require(`../assets/img/profile_photo/${name}.${ext}`);
    } catch (err) {}
  }
  return require("../assets/img/profile_photo/default.png");
};

export const Members = () => (
  <section id="members" className="py-5 bg-light">
    <Container>
      <h2
        className="mb-4 text-center"
        style={{
          color: "#333333", // dark grey
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 600,
          letterSpacing: "0.5px",
        }}
      >
        Lab Members
      </h2>
      {members
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((member, idx) => (
          <Card key={idx} className="mb-4 shadow-sm p-3">
            <div className="d-flex align-items-center">
              <Card.Img
                src={getImagePath(member.name)}
                alt={member.name}
                style={{
                  width: "180px",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  flexShrink: 0,
                }}
                className="m-3"
              />
              <Card.Body>
                <Card.Title>{member.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {member.program}
                </Card.Subtitle>
                <Card.Text>
                  <strong>Research:</strong> {member.research}
                </Card.Text>
                <Card.Text style={{ fontSize: "0.95rem" }}>
                  {member.description}
                </Card.Text>
                {member.github && (
                  <Button
                    variant="secondary"
                    size="sm"
                    className="me-2"
                    href={member.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </Button>
                )}
                {member.portfolio && (
                  <Button
                    variant="primary"
                    size="sm"
                    className="me-2"
                    href={member.portfolio}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Portfolio
                  </Button>
                )}
                {member.name && (
                  <Link
                    to={`/publications?name=${encodeURIComponent(member.name)}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Publications
                  </Link>
                )}
              </Card.Body>
            </div>
          </Card>
        ))}
    </Container>
  </section>
);
