import RSlogo from '../assets/rss-logo.svg';
import KG from '../assets/KG.png';
import './about.css';

export default function About() {
  return (
    <>
      <div className="card-container">
        <div>
          <img className="KG-image" src={KG} />
        </div>
        <div className="text-container">
          <div className="name">Ksenia Gaevskaya </div>

          <div className="text">
            I am a Frontend Engineer with a passion for crafting intuitive,
            high-quality user interfaces. A precise learner with a sharp eye for
            detail, loving solving complex problems, and seeing the immediate
            impact of well-executed code. I am driven by the challenge of
            turning ideas into responsive, performant, and visually compelling
            applications.
          </div>
        </div>
      </div>
      <div className="logo">
        <img src={RSlogo} />
      </div>
    </>
  );
}
