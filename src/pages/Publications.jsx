import React from "react";
import { useLocation } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import { publications } from "../data/publications";

export default function IndvPublications() {
  const query = new URLSearchParams(useLocation().search);
  const name = query.get("name");

  const filtered = name
    ? publications.filter(pub =>
        pub.authors.some(author =>
          author.toLowerCase().includes(name.toLowerCase())
        )
      )
    : publications.filter(pub =>
        pub.authors.some(author =>
          author.toLowerCase().includes("angshuman paul")
        )
      );

  const sorted = [...filtered].sort((a, b) => b.year - a.year);

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "80vh", padding: "2rem" }}>
      <Container style={{ fontFamily: "'Poppins', sans-serif", marginTop: "50px"}}>
        <h2
          className="mb-4 text-center"
          style={{ color: "#333", fontWeight: 600, letterSpacing: "0.5px" }}
        >
          {name ? `${name}'s Publications` : "All Publications"}
        </h2>

        {sorted.length === 0 ? (
          <p style={{ color: "#666", textAlign: "center" }}>No publications found for this author.</p>
        ) : (
          sorted.map((pub, idx) => (
            <Card key={idx} className="mb-4 shadow-sm p-3">
              <Card.Body>
                <Card.Title style={{ fontSize: "1.1rem", fontWeight: 600 }}>
                  {pub.link ? (
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noreferrer"
                      style={{ textDecoration: "none", color: "#1a73e8" }}
                      onMouseOver={e => (e.target.style.textDecoration = "underline")}
                      onMouseOut={e => (e.target.style.textDecoration = "none")}
                    >
                      {pub.title}
                    </a>
                  ) : (
                    pub.title
                  )}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {pub.authors.join(", ")}
                </Card.Subtitle>
                <Card.Text>
                  <strong>Year:</strong> {pub.year}
                </Card.Text>
                {pub.link && (
                  <Button
                    variant="primary"
                    size="sm"
                    href={pub.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Publication
                  </Button>
                )}
              </Card.Body>
            </Card>
          ))
        )}
      </Container>
    </div>
  );
}
