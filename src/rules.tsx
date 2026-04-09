import "./App.css";

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

const rules = [
  "Match pairings are not fixed in advance",
  "First round is assigned by random lottery",
  "From round 2 onwards, pairings follow the leaderboard",
  "#1 & #3 vs #2 & #4, #5 & #7 vs #6 & #8, and so on",
  "You may play with or against the same player more than once",
  "Some players will rest between rounds because there are 4 courts and 26 players",
  "Final round starts when 15 to 20 minutes remain",
  "Top 16 players qualify for the final round",
  "Matches are played to a total of 21 points",
  "Each player serves 2 consecutive points; once to each opponent",
  "Play fair, respect your partners and opponents, and enjoy the game",
];

export default function App() {
  return (
    <div className="page">
      <div className="container">
        <section className="hero">
          <div className="heroText">
            <span className="eyebrow">CCI Padel Event</span>
            <h1>Mexicano Tournament Rules</h1>
            <p>
              Rotating partners, live rankings, and balanced matches throughout the event.
            </p>
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
                  <span className="playerNumber">
                    {String(index + 1).padStart(2, "0")}
                  </span>
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
