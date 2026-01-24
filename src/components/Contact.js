import { Container, Row, Col } from "react-bootstrap";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { EnvelopeFill, TelephoneFill, GeoAltFill } from 'react-bootstrap-icons';
import { Linkedin } from "react-bootstrap-icons";

export const Contact = () => {
  return (
    <section className="contact" id="contact">
      <Container>
        <Row className="align-items-center">
          {/* Left Side: Contact Info + Form */}
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Contact Us</h2>

                  {/* Contact Details with Icons */}
                  <div className="contact-details mb-4">
                    <p>
                      <Linkedin className="me-2 text-primary" />
                        <a
                          href="https://www.linkedin.com/company/medisa-lab/posts/?feedView=all"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "#fff"
                          }}
                        >
                          LinkedIn
                        </a>
                    </p>
                    <p>
                      <EnvelopeFill className="me-2 text-primary" />
                      <a 
                      href="mailto:medisa.iitj@gmail.com"
                      style={{
                            color: "#fff",
                          }}
                      >
                        medisa.iitj@gmail.com
                      </a>
                    </p>
                    <p>
                      <TelephoneFill className="me-2 text-success" /> 291 280 1274
                    </p>
                    <p>
                      <GeoAltFill className="me-2 text-danger" />
                      NH 62, Surpura Bypass Rd, Karwar, Jheepasani, Rajasthan 342030
                    </p>
                  </div>

                  {/* ✅ Formspree Form */}
                  <form
                    action="https://formspree.io/f/xovnbple" // your Formspree endpoint
                    method="POST"
                  >
                    <Row>
                      <Col size={12} sm={6} className="px-1 mb-2">
                        <input
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                          required
                        />
                      </Col>
                      <Col size={12} sm={6} className="px-1 mb-2">
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          required
                        />
                      </Col>
                      <Col size={12} sm={6} className="px-1 mb-2">
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address"
                          required
                        />
                      </Col>
                      <Col size={12} sm={6} className="px-1 mb-2">
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone No."
                        />
                      </Col>
                      <Col size={12} className="px-1 mb-2">
                        <textarea
                          rows="6"
                          name="message"
                          placeholder="Message"
                          required
                        ></textarea>
                        <button type="submit" className="mt-2">
                          <span>Send</span>
                        </button>
                      </Col>
                    </Row>
                  </form>
                </div>
              }
            </TrackVisibility>
          </Col>

          {/* Right Side: Map */}
          <Col size={12} md={6}>
            <div className="map-responsive">
              <iframe
                title="IIT Jodhpur Location"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d457263.9153916125!2d72.6608751!3d26.4436599!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418c5ea672337b%3A0xb6c9a5a9b08db22e!2sIndian%20Institute%20of%20Technology%20(IIT)%2C%20Jodhpur!5e0!3m2!1sen!2sin!4v1756513458755!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
