import RSlogo from '../../assets/rss-logo.svg';
import KG from '../../assets/KG.png';
import './about.css';
import ThemeComponent from '../../components/theme-component/theme-component';

export default function About() {
  return (
    <>
      <div className="theme">
        <ThemeComponent></ThemeComponent>
      </div>
      <div className="card-container">
        <div>
          <img className="KG-image" src={KG} />
        </div>
        <div className="text-container">
          <a
            href="https://github.com/ksugaevskaya"
            rel="noreferrer"
            target="_blank"
            data-testid="github-link"
          >
            <div className="name">Ksenia Gaevskaya </div>
          </a>

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
      <a
        href="https://rs.school/courses/reactjs"
        rel="noreferrer"
        target="_blank"
        data-testid="rss-github-link"
      >
        <div className="logo">
          <img src={RSlogo} />
        </div>
      </a>
    </>
  );
}
