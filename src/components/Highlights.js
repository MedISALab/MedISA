import 'react-multi-carousel/lib/styles.css';
import cardImage from "../assets/img/highlight-img.png";

export const Highlights = () => {
  return (
    <section className="skill" id="skills">
      <div className="row">
        <div className="col-12">
          <div className="skill-bx wow zoomIn highlight-container">
            <div className="image-container">
              <img src={cardImage} alt="Research Overview" className="overview-image" />
            </div>
            <div className="text-container">
              <h2>RESEARCH OVERVIEW</h2>
              <p> 
                Our lab focuses on developing innovative deep learning solutions for medical imaging problems. Our research addresses key problems in areas such as disease detection and diagnosis. Currently, significant work is being done in medical image classification, segmentation, reconstruction, super resolution, synthetic data generation, etc. Our work also addresses challenges related to learning from distributed data, vision language modeling and reinforcement learning. Our goal is to develop deep learning solutions that are robust and effective in any real-world clinical settings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

