import 'react-multi-carousel/lib/styles.css';
import cardImage from "../assets/img/highlight-img.png";
import { texts } from "../data/text";
import logo from "../assets/img/new_logo.png"

export const Highlights = () => {
  const { title, description} = texts.highlights;
  return (
    <section className="skill" id="skills">
      <div className="row">
        <div className="col-12">
          <div className="skill-bx wow zoomIn highlight-container">
            <div className="image-container">
              <img src={logo} alt="Research Overview" className="overview-image" />
            </div>
            <div className="text-container">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

