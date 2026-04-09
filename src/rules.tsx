import React from "react";
import "./App.css";

const participants: string[] = [
  "Ajeesh", "Hannes", "Tobias", "Ceyda", "Clare", "Simon", "Ekta", "Magnus",
  "Mustafa", "Hans VD", "Daniel", "Rajat", "Ganna", "Hans VM", "Bjoern",
  "Joao", "Devidutta", "Tim", "Quienne", "Vladimir", "Elena", "Rohan",
  "Julian", "Saurabh", "Oscar", "Torsten",
];

// Grouping rules makes them much more readable
const ruleSections = [
  {
    title: "Mexicano Tournament Format",
    items: [
      "First round is assigned by random lottery",
      "From round 2 onwards, pairings follow the leaderboard",
      "Live Pairings: #1 & #3 vs #2 & #4, #5 & #7 vs #6 & #8",
      "Resting: Some players rest between rounds (4 courts / 26 players)",
    ],
  },
  {
    title: "Gameplay & Scoring",
    items: [
      "Matches are played to a total of 21 points",
      "Each player serves 2 consecutive points; once to each opponent",
      "You may play with or against the same player multiple times",
    ],
  },
  {
    title: "The Finals",
    items: [
      "Final round starts when 15 to 20 minutes remain",
      "Top 16 players qualify for the final round",
      "Play fair, respect your partners, and enjoy the game",
    ],
  },
];

export default function Rules() {
  return (
    <div className="page">
      <div className="container">
        {/* --- REFINED HEADING --- */}
        <header className="hero">
          <div className="hero-content">
            <span className="eyebrow">CCI Padel Event</span>
            <h1>Mexicano <span className="accent">Tournament</span></h1>
            <p className="subtitle">
              Live ranking format with rotating partners and balanced matchups.
            </p>
          </div>
        </header>

        <div className="content-grid">
          {/* --- CATEGORIZED RULES --- */}
          <section className="rules-section">
            <div className="card">
              <div className="section-header">
                <h2>Rules of Engagement</h2>
              </div>
              <div className="rules-grid">
                {ruleSections.map((section, idx) => (
                  <div key={idx} className="rule-group">
                    <h3>{section.title}</h3>
                    <ul>
                      {section.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* --- PARTICIPANTS --- */}
          <section className="players-section">
            <div className="card">
              <div className="section-header">
                <h2>Participants</h2>
                <span className="pill">{participants.length} Players</span>
              </div>
              <div className="players-grid">
                {participants.map((name, index) => (
                  <div key={name} className="player-card">
                    <span className="player-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="player-name">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
