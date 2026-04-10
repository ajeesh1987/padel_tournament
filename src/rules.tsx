import { useEffect, useState } from "react";
import "./App.css";

// CONFIG
const GAMES_START = new Date("2026-04-15T17:00:00+02:00");

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

// COUNTDOWN
function useCountdown(target: Date) {
  const calc = () => {
    const targetTime = target.getTime();

    if (Number.isNaN(targetTime)) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        done: true,
      };
    }

    const diff = targetTime - Date.now();

    if (diff <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        done: true,
      };
    }

    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
      done: false,
    };
  };

  const [time, setTime] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => {
      setTime(calc());
    }, 1000);

    return () => clearInterval(id);
  }, [target]);

  return time;
}

function Countdown() {
  const { days, hours, minutes, seconds, done } = useCountdown(GAMES_START);
  const pad = (n: number) => String(n).padStart(2, "0");

  if (done) {
    return <div className="countdown-done">🏆 Let the games begin!</div>;
  }

  return (
    <div className="countdown">
      <div className="countdown-label">Let the games begin in</div>
      <div className="countdown-tiles">
        <div className="countdown-tile">
          <span>{days}</span>
          <small>days</small>
        </div>
        <div className="countdown-sep">:</div>
        <div className="countdown-tile">
          <span>{pad(hours)}</span>
          <small>hrs</small>
        </div>
        <div className="countdown-sep">:</div>
        <div className="countdown-tile">
          <span>{pad(minutes)}</span>
          <small>min</small>
        </div>
        <div className="countdown-sep">:</div>
        <div className="countdown-tile">
          <span>{pad(seconds)}</span>
          <small>sec</small>
        </div>
      </div>
    </div>
  );
}

const rules = [
  "Match pairings are not fixed in advance",
  "First round is assigned by random lottery",
  "From round 2 onwards, pairings follow the leaderboard",
  "You may play with or against the same player more than once",
  "Some players will rest between rounds because there are 4 courts and 26 players",
  "Final round starts when 15 to 20 minutes remain",
  "Top 16 players qualify for the final round",
  "Final round pairing will be 1 & 4 vs 2 & 3 and so on",
  "Matches are played to a total of 21 points",
  "Each player serves 2 consecutive points; once to each opponent",
];

const mantra =
  "Play fair, respect your partners and opponents, and enjoy the game";

export default function App() {
  return (
    <div className="page">
      <div className="container">
        <section className="hero">
          <div className="heroText">
            <span className="eyebrow">CCI Padel Event 🎾</span>
            <h1>Mexicano Tournament</h1>
            <p>
              Rotating partners, live rankings, and balanced matches throughout
              the event.
            </p>
          </div>

          <Countdown />
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

<div className="mantra">
  🏆 {mantra}
</div>
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
