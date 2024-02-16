import { Maze } from "./maze";

function App() {
  return (
    <div>
      <header className="navbar">
        <div className="sub_navbar">
          <img src="someways.png" alt="Someways" />
          <a className="title" href="https://nmenares.github.io/js_someways/">
            SomeWays
          </a>
        </div>
        <div className="sub_navbar left">
          <a
            href="https://github.com/nmenares/js_someways"
            target="_blank"
            rel="noreferrer"
          >
            <img src="images/GitHub.png" alt="GitHub" />
          </a>
          <a
            href="https://www.linkedin.com/in/nmenares/"
            target="_blank"
            rel="noreferrer"
          >
            <img src="images/in.png" alt="Linkedin" />
          </a>
        </div>
      </header>
      <div className="body">
        <div className="content">
          <Maze />
        </div>
      </div>
    </div>
  );
}

export default App;
