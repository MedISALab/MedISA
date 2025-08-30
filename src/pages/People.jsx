// src/pages/People.js
import React, { useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { members } from "../data/members";
import { Link, useSearchParams } from "react-router-dom";

const getImagePath = (name) => {
  const extensions = ["jpg", "jpeg", "png"];
  for (let ext of extensions) {
    try {
      return require(`../assets/img/profile_photo/${name}.${ext}`);
    } catch (err) {}
  }
  return require("../assets/img/profile_photo/default.png");
};

const getYears = (program) => {
  const years = program.match(/\d{4}/g);
  if (!years) return { start: 9999, end: null };
  return { start: Number(years[0]), end: years.length > 1 ? Number(years[1]) : null };
};

const normalizeProgram = (program) => {
  if (/phd/i.test(program)) return "PhD";
  if (/m\.?tech/i.test(program)) return "M.Tech";
  return program;
};

const People = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type")?.toLowerCase();

  useEffect(() => {
    if (type === "mentor") {
      window.location.href = "https://research.iitj.ac.in/researcher/angshuman-paul-1";
    }
  }, [type]);

  let filteredMembers = members;

  if (type === "phd") {
    filteredMembers = members.filter((m) => /phd/i.test(m.program));
  } else if (type === "masters") {
    filteredMembers = members.filter((m) => /m\./i.test(m.program));
  } else if (type === "undergrad") {
    filteredMembers = members.filter((m) => /b\./i.test(m.program));
  }

  const currentMembers = filteredMembers.filter((m) => getYears(m.program).end === null);
  const alumni = filteredMembers.filter((m) => getYears(m.program).end !== null);

  const sortByYear = (list) =>
    [...list].sort((a, b) => getYears(a.program).start - getYears(b.program).start);

  const groupByProgram = (list) => {
    const groups = { PhD: [], "M.Tech": [], "B.Tech": [] };
    list.forEach((m) => {
      const prog = normalizeProgram(m.program);
      if (groups[prog]) groups[prog].push(m);
      else groups[prog] = [m];
    });
    return groups;
  };

  const renderMemberCard = (member, idx) => (
    <Card key={idx} className="mb-4 shadow-sm p-3">
      <div className="d-flex flex-column flex-md-row align-items-center">
        <div style={{ width: "150px", height: "150px", marginRight: "1rem" }}>
          <Card.Img
            src={getImagePath(member.name)}
            alt={member.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
          />
        </div>
        <Card.Body style={{ flex: 1 }}>
          <Card.Title style={{ fontSize: "1.1rem", fontWeight: 600 }}>{member.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{member.program}</Card.Subtitle>
          <Card.Text>
            <strong>Research:</strong> {member.research}
          </Card.Text>
          <Card.Text>{member.description}</Card.Text>
          <div className="mt-2 d-flex flex-wrap">
            {member.github && (
              <Button variant="secondary" size="sm" className="me-2 mb-2" href={member.github} target="_blank" rel="noreferrer">
                GitHub
              </Button>
            )}
            {member.portfolio && (
              <Button variant="primary" size="sm" className="me-2 mb-2" href={member.portfolio} target="_blank" rel="noreferrer">
                Portfolio
              </Button>
            )}
            {member.name && (
              <Link to={`/publications?name=${encodeURIComponent(member.name)}`} className="btn btn-warning btn-sm me-2 mb-2">
                Publications
              </Link>
            )}
          </div>
        </Card.Body>
      </div>
    </Card>
  );

  const renderGroupedMembers = (membersList) => {
    const groups = groupByProgram(membersList);
    const programOrder = ["PhD", "M.Tech", "B.Tech"];
    return programOrder.map(
      (prog) =>
        groups[prog] &&
        groups[prog].length > 0 && (
          <div key={prog}>
            <h3 style={{ color: "gray", marginTop: "30px", marginBottom: "20px" }}>{prog}</h3>
            {sortByYear(groups[prog]).map(renderMemberCard)}
          </div>
        )
    );
  };

  return (
    <div style={{ backgroundColor: "#f8f9fa", padding: "2rem", minHeight: "80vh" }}>
      <Container style={{ fontFamily: "'Poppins', sans-serif" }}>
        {/* Supervisor Section */}
        <div style={{ marginTop: "80px", textAlign: "center" }}>
          <div style={{ marginBottom: "20px" }}>
            <img
              src={require("../assets/img/profile_photo/supervisor.png")}
              alt="Supervisor"
              style={{ width: "180px", height: "180px", borderRadius: "8px", objectFit: "cover" }}
            />
          </div>
          <p style={{ maxWidth: "700px", margin: "0 auto", color: "#333" }}>
            The MedISA Lab is led by Dr. Angshuman Paul, Assistant Professor in the
            Department of Computer Science and Engineering at IIT Jodhpur. Dr. Angshuman
            holds a Ph.D. in Computer Science from the Indian Statistical Institute,
            Kolkata. Primary Research areas include Medical Image Analysis, Machine
            Learning, and Computer Vision.
          </p>
          <a
            className="prof-link"
            href="https://research.iitj.ac.in/researcher/angshuman-paul-1"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-block", marginTop: "10px", color: "#0d6efd", textDecoration: "none", fontWeight: "bold" }}
          >
            Read More
          </a>
          <hr style={{ paddingBottom: "10px", margin: "40px auto", width: "50%", borderTop: "2px solid #ccc" }} />
        </div>

        <h2 className="mb-4 text-center" style={{ color: "black", fontWeight: 600, letterSpacing: "0.5px" }}>
          Present Members
        </h2>
        {renderGroupedMembers(currentMembers)}

        <h2 className="mb-4 text-center" style={{ color: "black", fontWeight: 600, letterSpacing: "0.5px" }}>
          Past Members
        </h2>
        {renderGroupedMembers(alumni)}
      </Container>
    </div>
  );
};

export default People;
