import facebookIcon from './icons/facebook.svg';
import linkedinIcon from './icons/linkedin.svg';
import githubIcon from './icons/github.svg';

export default function App() {
  return (
    <>
      <footer>
        <div className="icon-wrapepr">
          <a className="icon" href="https://www.linkedin.com/in/emil-eriksson-208ab9297/%22%3E">
            <img src={linkedinIcon} alt='Linkedin icon'className="icon"></img>
          </a>
          <a className="icon" href="https://www.facebook.com/profile.php?id=100014670010758%22">
            <img src={facebookIcon} alt='Facebook icon' className="icon"></img>
          </a>
          <a className="icon" href="https://github.com/EmilErikssonKAU">
            <img src={githubIcon} alt='Github icon' className="icon"></img>
          </a>
        </div>

        <div className="cred" >
          Copyright &copy;2025. Designed by Emil Eriksson        
        </div>
      </footer>
    </>
  );
}