import "./App.css";

const rules = [
  "Match pairings are not fixed in advance",
  "First round is assigned by random lottery",
  "From round 2 onwards, pairings follow the leaderboard",
  "#1 & #3 vs #2 & #4, #5 & #7 vs #6 & #8, and so on",
  "You may play with or against the same player more than once",
  "With 4 courts and more than 24 players, some players will rest between rounds",
  "Final round starts when 15 to 20 minutes remain",
  "Top 16 players qualify for the final round",
  "Matches are played to a total of 21 points",
  "Each player serves 2 consecutive points",
  "Each player serves once to each opponent",
  "Most important rule: play fair, respect your partners and opponents, and enjoy the game",
];

const participants = [
  "Ajeesh",
  "Hannes",
  "Tobias",
  "Ceyda",
  "Clare",
  "Simon",
  "Ekta",
  "Magnus",
  "Mustafa",
  "Hans VD",
  "Daniel",
  "Rajat",
  "Ganna",
  "Hans VM",
  "Bjoern",
  "Joao",
  "Devidutta",
  "Tim",
  "Quienne",
  "Vladimir",
  "Elena",
  "Rohan",
  "Julian",
  "Saurabh",
  "Oscar",
  "Torsten",
];

export default function App() {
  return (
    <div className="page">
      <div className="container">
        <header className="hero">
          <div className="heroText">
            <span className="eyebrow">CCI Padel Event</span>
            <h1>Mexicano Tournament Rules</h1>
            <p>
              Live ranking based format with rotating partners, balanced matchups,
              and a final round for the top players.
            </p>
          </div>
        </header>

        <section className="card">
          <div className="sectionHeader">
            <h2>Rules PDF</h2>
            <a href="/CCI-Padel-Event-format-and-rules.pdf" target="_blank" rel="noreferrer">
              Open PDF
            </a>
          </div>

          <div className="pdfWrapper">
            <iframe
              src="/CCI-Padel-Event-format-and-rules.pdf"
              title="CCI Padel Event Rules"
              className="pdfFrame"
            />
          </div>
        </section>

        <section className="gridSection">
          <div className="card">
            <div className="sectionHeader">
              <h2>Quick Rules</h2>
            </div>

            <ul className="rulesList">
              {rules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
          </div>

          <div className="card">
            <div className="sectionHeader">
              <h2>Participants</h2>
              <span className="pill">{participants.length} players</span>
            </div>

            <div className="playersGrid">
              {participants.map((name, index) => (
                <div key={name} className="playerCard">
                  <span className="playerNumber">{String(index + 1).padStart(2, "0")}</span>
                  <span className="playerName">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
