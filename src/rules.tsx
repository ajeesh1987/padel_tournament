import "./App.css";

const participants: string[] = [
  "Ajeesh", "Hannes", "Tobias", "Ceyda", "Clare", "Simon", "Ekta", "Magnus",
  "Mustafa", "Hans VD", "Daniel", "Rajat", "Ganna", "Hans VM", "Bjoern",
  "Joao", "Devidutta", "Tim", "Quienne", "Vladimir", "Elena", "Rohan",
  "Julian", "Saurabh", "Oscar", "Torsten",
];

export default function App() {
  return (
    <div className="page">
      <div className="container">
        {/* --- STYLISH HEADING --- */}
        <header className="hero">
          <div className="badge">Padel Event 2024</div>
          <h1>Mexicano <span className="outline">Tournament</span></h1>
          <p className="subtitle">Rotating partners • Live ranking • Final round showdown</p>
        </header>

        <main className="content-grid">
          {/* --- ENHANCED RULES SECTION --- */}
          <section className="card rules-card">
            <div className="card-header">
              <h2>Quick Rules</h2>
            </div>
            
            <div className="rules-grid">
              <div className="rule-group">
                <h3>Matchmaking</h3>
                <ul>
                  <li>First round: Random lottery</li>
                  <li>Round 2+: Follows leaderboard (#1 & #3 vs #2 & #4)</li>
                  <li>Resting: Some players rest (4 courts available)</li>
                </ul>
              </div>

              <div className="rule-group">
                <h3>The Game</h3>
                <ul>
                  <li>Total of 21 points per match</li>
                  <li>Each player serves 2 consecutive points</li>
                  <li>Serve once to each opponent</li>
                </ul>
              </div>

              <div className="rule-group">
                <h3>The Finale</h3>
                <ul>
                  <li>Finals start with 15-20 mins remaining</li>
                  <li>Top 16 players qualify</li>
                  <li>Fair play and respect are mandatory</li>
                </ul>
              </div>
            </div>
          </section>

          {/* --- PARTICIPANTS SECTION --- */}
          <section className="card players-card">
            <div className="card-header">
              <h2>Participants</h2>
              <span className="count-pill">{participants.length} Players</span>
            </div>

            <div className="players-grid">
              {participants.sort().map((name, index) => (
                <div key={name} className="player-row">
                  <span className="player-index">{(index + 1).toString().padStart(2, '0')}</span>
                  <span className="player-name">{name}</span>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
