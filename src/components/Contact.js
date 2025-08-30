import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { EnvelopeFill, TelephoneFill, GeoAltFill } from 'react-bootstrap-icons';

export const Contact = () => {
  const formInitialDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  };

  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Send');
  const [status, setStatus] = useState({});

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Sending...");

    try {
      let response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(formDetails),
      });

      let result = await response.json();
      setButtonText("Send");
      setFormDetails(formInitialDetails);

      if (result.code === 200) {
        setStatus({ success: true, message: 'Message sent successfully' });
      } else {
        setStatus({ success: false, message: 'Something went wrong, please try again later.' });
      }
    } catch (error) {
      setButtonText("Send");
      setStatus({ success: false, message: 'Network error. Please try again later.' });
    }
  };

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
                    <p><EnvelopeFill className="me-2 text-primary" /> 
                      <a href="mailto:medisa.iitj@gmail.com">medisa.iitj@gmail.com</a>
                    </p>
                    <p><TelephoneFill className="me-2 text-success" /> 291 280 1274</p>
                    <p><GeoAltFill className="me-2 text-danger" /> 
                      NH 62, Surpura Bypass Rd, Karwar, Jheepasani, Rajasthan 342030
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit}>
                    <Row>
                      <Col size={12} sm={6} className="px-1 mb-2">
                        <input
                          type="text"
                          value={formDetails.firstName}
                          placeholder="First Name"
                          onChange={(e) => onFormUpdate('firstName', e.target.value)}
                        />
                      </Col>
                      <Col size={12} sm={6} className="px-1 mb-2">
                        <input
                          type="text"
                          value={formDetails.lastName}
                          placeholder="Last Name"
                          onChange={(e) => onFormUpdate('lastName', e.target.value)}
                        />
                      </Col>
                      <Col size={12} sm={6} className="px-1 mb-2">
                        <input
                          type="email"
                          value={formDetails.email}
                          placeholder="Email Address"
                          onChange={(e) => onFormUpdate('email', e.target.value)}
                        />
                      </Col>
                      <Col size={12} sm={6} className="px-1 mb-2">
                        <input
                          type="tel"
                          value={formDetails.phone}
                          placeholder="Phone No."
                          onChange={(e) => onFormUpdate('phone', e.target.value)}
                        />
                      </Col>
                      <Col size={12} className="px-1 mb-2">
                        <textarea
                          rows="6"
                          value={formDetails.message}
                          placeholder="Message"
                          onChange={(e) => onFormUpdate('message', e.target.value)}
                        ></textarea>
                        <button type="submit" className="mt-2"><span>{buttonText}</span></button>
                      </Col>
                      {status.message &&
                        <Col>
                          <p className={status.success === false ? "danger" : "success"}>
                            {status.message}
                          </p>
                        </Col>
                      }
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
