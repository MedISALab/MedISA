import React, { useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { publications } from "../data/publications";

export const Publications = () => {
  const [visibleCount, setVisibleCount] = useState(10);

  const sortedPubs = publications.sort((a, b) => b.year - a.year);

  const handleViewMore = () => {
    setVisibleCount(sortedPubs.length);
  };

  return (
    <section id="publications" className="py-5 bg-light">
      <Container>
        <h2
          className="mb-4 text-center"
          style={{
            color: "#333333",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
            letterSpacing: "0.5px",
          }}
        >
          Publications
        </h2>

        {sortedPubs.slice(0, visibleCount).map((pub, idx) => (
          <Card key={idx} className="mb-4 shadow-sm p-3">
            <Card.Body>
              <Card.Title style={{ fontSize: "1.1rem", fontWeight: "600" }}>
                {pub.title}
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
        ))}

        {visibleCount < sortedPubs.length && (
          <div className="text-center mt-3">
            <Button onClick={handleViewMore} variant="outline-primary">
              View All
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
};
