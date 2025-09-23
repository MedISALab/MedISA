import React, { useState } from "react";
import { Container, Card, Button, Badge } from "react-bootstrap";
import { news } from "../data/news";

export const News = () => {
  const [visibleCount, setVisibleCount] = useState(5);

  // Sort the news by year (descending)
  const sortedNews = news.sort((a, b) => b.year - a.year);

  const handleViewMore = () => {
    setVisibleCount(sortedNews.length);
  };

  return (
    <section id="news" className="py-5" style={{ backgroundColor: "#f9fbff" }}>
      {/* Inline CSS for animation and sizing */}
      <style>{`
        .new-badge {
          font-size: 0.8rem;
          padding: 0.5em 0.5em 0.25em 0.5em;
          border-radius: 8px;
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      <Container>
        <h2
          className="mb-4 text-center d-flex align-items-center justify-content-center gap-2"
          style={{
            color: "#333333",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
            letterSpacing: "0.5px",
          }}
        >
          Recent News{" "}
          <Badge bg="danger" className="new-badge">
            NEW
          </Badge>
        </h2>

        {sortedNews.slice(0, visibleCount).map((item, idx) => (
          <Card
            key={idx}
            className="mb-4 shadow-sm p-3"
            style={{ borderLeft: "5px solid #0d6efd" }}
          >
            <Card.Body>
              <Card.Title style={{ fontSize: "1.1rem", fontWeight: "600" }}>
                {item.title}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {item.authors.join(", ")}
              </Card.Subtitle>
              <Card.Text>
                <strong>Year:</strong> {item.year}
              </Card.Text>
              {item.published && (
                <Card.Text>
                  <strong>Accepted in:</strong> {item.published}
                </Card.Text>
              )}
              {item.description && (
                <Card.Text style={{ textAlign: "justify" }}>
                  {item.description}
                </Card.Text>
              )}
            </Card.Body>
          </Card>
        ))}

        {visibleCount < sortedNews.length && (
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
