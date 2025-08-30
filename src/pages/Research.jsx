import React from "react";
import { Container, Card, Button, Row, Col, Badge } from "react-bootstrap";
import { members } from "../data/members";
import { Link } from "react-router-dom";

// Load profile photo
const getImagePath = (name) => {
  const extensions = ["jpg", "jpeg", "png"];
  for (let ext of extensions) {
    try {
      return require(`../assets/img/profile_photo/${name}.${ext}`);
    } catch (err) {}
  }
  return require("../assets/img/profile_photo/default.png");
};

// Extract years
const getYears = (program) => {
  const years = program.match(/\d{4}/g);
  if (!years) return { start: 9999, end: null };
  return {
    start: Number(years[0]),
    end: years.length > 1 ? Number(years[1]) : null,
  };
};

// Group members by `group`
const groupMembers = (list) => {
  return list.reduce((acc, member) => {
    if (!member.group) return acc;
    if (!acc[member.group]) acc[member.group] = [];
    acc[member.group].push(member);
    return acc;
  }, {});
};

const Research = () => {
  const grouped = groupMembers(members);

  const sortByStartYear = (list) =>
    [...list].sort(
      (a, b) => getYears(a.program).start - getYears(b.program).start
    );

  const renderMemberCard = (member, idx) => (
    <Col key={idx} xs={12} sm={6} md={4} lg={3} className="mb-4">
      <Card
        className="h-100"
        style={{
          backgroundColor: "#292929",
          color: "#fff",
          border: "1px solid #444",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.3)";
        }}
      >
        <Card.Img
          variant="top"
          src={getImagePath(member.name)}
          alt={member.name}
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
          }}
        />
        <Card.Body>
          <Card.Title style={{ fontWeight: 600 }}>{member.name}</Card.Title>
          <Card.Subtitle className="mb-3 " style={{ fontSize: "0.9rem" , color: "#A9A9A9"}}>
            {member.program}
          </Card.Subtitle>

          {member.research && (
            <div className="mb-3">
              <Badge
                bg="info"
                text="dark"
                style={{
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  fontSize: "0.85rem",
                  padding: "0.4em 0.6em",
                  lineHeight: "1.2",
                }}
              >
                {member.research}
              </Badge>
            </div>
          )}

          <div>
            {member.github && (
              <Button
                variant="outline-light"
                size="sm"
                className="me-2 mb-2"
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
                className="me-2 mb-2"
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
                className="btn btn-warning btn-sm me-2 mb-2"
              >
                Publications
              </Link>
            )}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );

  return (
    <div style={{ backgroundColor: "#1f1f1f", padding: "2rem", minHeight: "80vh" }}>
      <Container style={{ fontFamily: "'Poppins', sans-serif" }}>
        {Object.entries(grouped)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([groupName, groupMembers]) => (
            <div key={groupName}>
              <h2
                className="mb-4 text-center"
                style={{
                  color: "#ffffff",
                  borderBottom: "2px solid #A9A9A9",
                  paddingBottom: "10px",
                  fontWeight: 600,
                  marginTop: "60px",
                }}
              >
                {groupName}
              </h2>
              <Row>{sortByStartYear(groupMembers).map(renderMemberCard)}</Row>
            </div>
          ))}
      </Container>
    </div>
  );
};

export default Research;
