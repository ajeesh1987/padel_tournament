import React, { useMemo, useState, useEffect, useRef } from "react";

// ─── CONFIG ────────────────────────────────────────────────────────────────
const GAMES_START = new Date('2026-04-15T17:00:00+02:00')
const ADMIN_CODE = 'letmein'
const DEFAULT_LOCKED = true                          // Flip to false to open score entry
// ───────────────────────────────────────────────────────────────────────────

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --accent: #3B6D11;
    --accent-bg: #EAF3DE;
    --accent-mid: #639922;
    --surface: #ffffff;
    --surface2: #f9fafb;
    --border: #e5e7eb;
    --border2: #d1d5db;
    --text: #111827;
    --text2: #6b7280;
    --text3: #9ca3af;
    --win: #639922;
    --win-bg: #EAF3DE;
  }

  .app {
    min-height: 100vh;
    background: transparent;
    padding: 8px 12px 60px;
    font-family: 'DM Sans', sans-serif;
    color: var(--text);
  }

  .container { max-width: 960px; margin: 0 auto; }

  /* COUNTDOWN */
  .countdown {
    display: flex; flex-direction: column; align-items: center; gap: 6px;
    padding: 16px 24px 14px;
    background: var(--accent-bg); border-bottom: 1.5px solid #C0DD97;
  }
  .countdown-label {
    font-size: 10px; font-weight: 700; letter-spacing: 2.5px;
    text-transform: uppercase; color: var(--accent-mid); opacity: 0.8;
  }
  .countdown-tiles { display: flex; align-items: center; gap: 6px; }
  .countdown-tile { display: flex; flex-direction: column; align-items: center; min-width: 52px; }
  .countdown-tile span {
    font-family: 'Bebas Neue', sans-serif; font-size: 2.4rem; line-height: 1;
    color: var(--accent); font-variant-numeric: tabular-nums;
  }
  .countdown-tile small {
    font-size: 9px; font-weight: 600; letter-spacing: 1.5px;
    text-transform: uppercase; color: var(--accent-mid); opacity: 0.6;
  }
  .countdown-sep {
    font-family: 'Bebas Neue', sans-serif; font-size: 1.8rem;
    color: var(--accent-mid); opacity: 0.3; margin-bottom: 14px;
  }
  .countdown-done {
    font-family: 'Bebas Neue', sans-serif; font-size: 1.6rem;
    letter-spacing: 1px; color: var(--accent);
    padding: 16px 24px; background: var(--accent-bg);
    border-bottom: 1.5px solid #C0DD97; text-align: center;
  }

  .header {
    padding: 24px 0 20px;
    margin-bottom: 28px;
    border-bottom: 1.5px solid var(--border);
    display: flex; align-items: flex-end; justify-content: space-between;
    gap: 16px; flex-wrap: wrap;
  }
  .header-eyebrow {
    font-size: 11px; font-weight: 600; letter-spacing: 3px;
    text-transform: uppercase; color: var(--accent-mid); margin-bottom: 4px;
  }
  .header-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(30px, 6vw, 60px);
    line-height: 0.95; color: var(--text); letter-spacing: 0.5px;
  }
  .header-title span { color: var(--accent); }
  .header-pills { display: flex; gap: 8px; flex-wrap: wrap; align-items: flex-end; padding-bottom: 4px; }
  .pill {
    border: 1.5px solid var(--border2); border-radius: 100px;
    padding: 4px 12px; font-size: 12px; font-weight: 500;
    color: var(--text2); background: var(--surface2); white-space: nowrap;
  }
  .pill strong { color: var(--accent); margin-right: 3px; }

  .section {
    background: var(--surface); border: 1.5px solid var(--border);
    border-radius: 16px; padding: 24px; margin-bottom: 16px;
  }
  .section-title {
    font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: 1px;
    color: var(--text2); text-transform: uppercase; margin-bottom: 18px;
    display: flex; align-items: center; gap: 8px;
  }
  .section-title-bar { width: 3px; height: 18px; border-radius: 2px; background: var(--accent-mid); flex-shrink: 0; }

  .group-divider { display: flex; align-items: center; gap: 10px; margin: 20px 0 12px; }
  .group-divider:first-of-type { margin-top: 0; }
  .group-tag {
    font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
    color: var(--accent); background: var(--accent-bg);
    border-radius: 4px; padding: 3px 9px; flex-shrink: 0;
  }
  .group-line { flex: 1; height: 1px; background: var(--border); }

  .match-row {
    display: grid; grid-template-columns: 1fr auto 1fr; align-items: center;
    gap: 10px; padding: 10px 14px; border-radius: 10px;
    background: var(--surface2); border: 1.5px solid transparent;
    margin-bottom: 7px; transition: border-color 0.12s;
  }
  .match-row.scored { border-color: #C0DD97; background: #f7fbf0; }
  .team-name { font-size: 13px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .team-name-right { text-align: right; }
  .team-name.winner { color: var(--win); font-weight: 600; }

  .score-wrap { display: flex; flex-direction: column; align-items: center; gap: 4px; flex-shrink: 0; }
  .score-inputs { display: flex; align-items: center; gap: 6px; }
  .score-input {
    width: 42px; height: 38px; background: var(--surface);
    border: 1.5px solid var(--border2); border-radius: 8px;
    color: var(--text); font-family: 'Bebas Neue', sans-serif; font-size: 22px;
    text-align: center; outline: none; transition: border-color 0.12s;
  }
  .score-input:focus { border-color: var(--accent-mid); }
  .score-input:disabled { opacity: 0.3; cursor: not-allowed; }
  .vs { font-family: 'Bebas Neue', sans-serif; font-size: 12px; letter-spacing: 1px; color: var(--text3); }

  .match-footer { display: flex; align-items: center; gap: 5px; }
  .court-badge {
    font-size: 10px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;
    color: var(--text3); background: var(--border); border-radius: 4px; padding: 2px 6px;
  }
  .done-badge {
    font-size: 10px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
    color: var(--accent); background: var(--accent-bg); border-radius: 4px; padding: 2px 6px;
  }

  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px; }
  @media (max-width: 580px) { .two-col { grid-template-columns: 1fr; } }

  .standings-card {
    background: var(--surface); border: 1.5px solid var(--border);
    border-radius: 14px; padding: 18px;
  }
  .standings-card-title {
    font-family: 'Bebas Neue', sans-serif; font-size: 15px; letter-spacing: 1px;
    margin-bottom: 12px; display: flex; align-items: center; gap: 8px; color: var(--text2);
  }
  .standings-col-labels {
    display: grid; grid-template-columns: 22px 1fr 24px 28px 28px;
    gap: 4px; padding: 0 8px; margin-bottom: 6px;
  }
  .col-label { font-size: 10px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text3); text-align: center; }
  .col-label.left { text-align: left; }
  .standing-row {
    display: grid; grid-template-columns: 22px 1fr 24px 28px 28px;
    align-items: center; gap: 4px; padding: 7px 8px; border-radius: 8px;
    margin-bottom: 3px; border: 1.5px solid transparent;
  }
  .standing-row.q { background: #f7fbf0; border-color: #C0DD97; }
  .standing-pos { font-family: 'Bebas Neue', sans-serif; font-size: 15px; color: var(--text3); text-align: center; }
  .standing-row.q .standing-pos { color: var(--accent); }
  .standing-name { font-size: 13px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .standing-stat { font-family: 'Bebas Neue', sans-serif; font-size: 16px; text-align: center; color: var(--text2); }
  .standing-stat.pts { color: var(--accent); font-size: 17px; }
  .standing-stat.diff { font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500; color: var(--text3); }
  .qualifies-hint {
    font-size: 10px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase;
    color: var(--accent); margin-top: 8px; padding-left: 8px; opacity: 0.75;
  }

  .ko-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
  @media (max-width: 580px) { .ko-grid { grid-template-columns: 1fr; } }

  .ko-card {
    background: var(--surface2); border: 1.5px solid var(--border);
    border-radius: 12px; padding: 16px;
  }
  .ko-card-label {
    font-size: 10px; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; color: var(--text3); margin-bottom: 10px;
  }
  .ko-team {
    display: flex; align-items: center; justify-content: space-between;
    gap: 8px; padding: 8px 10px; border-radius: 8px;
    background: var(--surface); border: 1.5px solid var(--border); margin-bottom: 6px;
  }
  .ko-team.winner { background: var(--win-bg); border-color: #C0DD97; }
  .ko-team:last-child { margin-bottom: 0; }
  .ko-team-name { font-size: 13px; font-weight: 500; flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .ko-team-name.tbd { color: var(--text3); font-style: italic; font-weight: 400; }
  .ko-score {
    width: 38px; height: 32px; flex-shrink: 0;
    background: var(--surface2); border: 1.5px solid var(--border2); border-radius: 6px;
    color: var(--text); font-family: 'Bebas Neue', sans-serif; font-size: 20px;
    text-align: center; outline: none; transition: border-color 0.12s;
  }
  .ko-score:focus { border-color: var(--accent-mid); }
  .ko-score:disabled { opacity: 0.3; cursor: not-allowed; }

  .final-card {
    background: #f7fbf0; border: 1.5px solid #C0DD97;
    border-radius: 14px; padding: 20px; margin-bottom: 14px;
  }
  .final-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 16px; flex-wrap: wrap; gap: 8px;
  }
  .final-title { font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 1px; color: var(--text); }
  .final-meta { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
  .final-badge {
    font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;
    background: var(--accent-bg); color: var(--accent); border-radius: 4px; padding: 3px 8px;
  }
  .final-duration { font-size: 11px; color: var(--text3); font-weight: 500; }

  .games-tally {
    display: flex; align-items: center; gap: 16px;
    background: var(--surface); border: 1.5px solid var(--border);
    border-radius: 10px; padding: 12px 16px; margin-bottom: 14px;
  }
  .tally-team { flex: 1; }
  .tally-name { font-size: 13px; font-weight: 500; color: var(--text2); margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .tally-name.tbd { color: var(--text3); font-style: italic; font-weight: 400; }
  .tally-score { font-family: 'Bebas Neue', sans-serif; font-size: 36px; line-height: 1; color: var(--text3); }
  .tally-score.leading { color: var(--accent); }
  .tally-score.champion-score { color: var(--accent); }
  .tally-divider { font-family: 'Bebas Neue', sans-serif; font-size: 22px; color: var(--border2); flex-shrink: 0; }
  .tally-right { text-align: right; }

  .game-label {
    font-size: 10px; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; color: var(--text3); margin-bottom: 8px;
    display: flex; align-items: center; gap: 6px;
  }
  .game-number {
    background: var(--border); color: var(--text3);
    border-radius: 3px; padding: 1px 6px; font-size: 10px; font-weight: 700; letter-spacing: 1px;
  }
  .game-number.played { background: var(--accent-bg); color: var(--accent); }
  .game-row {
    display: grid; grid-template-columns: 1fr auto 1fr;
    align-items: center; gap: 8px; padding: 8px 10px; border-radius: 8px;
    background: var(--surface); border: 1.5px solid var(--border); margin-bottom: 8px;
  }
  .game-row.game-won { border-color: #C0DD97; background: #f7fbf0; }
  .game-row.disabled { opacity: 0.4; pointer-events: none; }
  .game-team { font-size: 12px; font-weight: 500; color: var(--text); }
  .game-team.right { text-align: right; }
  .game-team.w { color: var(--win); font-weight: 600; }
  .game-inputs { display: flex; align-items: center; gap: 5px; flex-shrink: 0; }
  .game-score-input {
    width: 38px; height: 32px; background: var(--surface2);
    border: 1.5px solid var(--border2); border-radius: 6px;
    color: var(--text); font-family: 'Bebas Neue', sans-serif; font-size: 19px;
    text-align: center; outline: none; transition: border-color 0.12s;
  }
  .game-score-input:focus { border-color: var(--accent-mid); }
  .game-score-input:disabled { opacity: 0.3; cursor: not-allowed; }
  .game-vs { font-family: 'Bebas Neue', sans-serif; font-size: 11px; color: var(--text3); }
  .game-divider { height: 1px; background: var(--border); margin: 10px 0 14px; }

  .champion {
    background: var(--win-bg); border: 1.5px solid #C0DD97; border-radius: 12px;
    padding: 20px 24px; display: flex; align-items: center; gap: 14px; margin-top: 4px;
  }
  .champion-icon { font-size: 28px; }
  .champion-label {
    font-size: 10px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase;
    color: var(--accent-mid); margin-bottom: 3px;
  }
  .champion-name {
    font-family: 'Bebas Neue', sans-serif; font-size: 32px;
    color: var(--text); letter-spacing: 0.5px; line-height: 1;
  }

  /* ADMIN */
  .admin-trigger {
    position: fixed; bottom: 1rem; right: 1rem;
    background: transparent; border: none; font-size: 1rem;
    opacity: 0.1; cursor: pointer; padding: 0.25rem;
    transition: opacity 0.25s; z-index: 100; line-height: 1;
  }
  .admin-trigger:hover { opacity: 0.5; }

  .admin-modal-backdrop {
    position: fixed; inset: 0; background: rgba(0,0,0,0.45);
    display: flex; align-items: center; justify-content: center;
    z-index: 200; backdrop-filter: blur(4px);
  }
  .admin-modal {
    background: var(--surface); border: 1.5px solid var(--border2);
    border-radius: 12px; padding: 1.5rem;
    display: flex; flex-direction: column; gap: 1rem; min-width: 280px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  }
  .admin-modal h4 { margin: 0; font-size: 0.95rem; color: var(--text2); }
  .admin-modal-input {
    background: var(--surface2); border: 1.5px solid var(--border2);
    border-radius: 6px; padding: 0.5rem 0.75rem;
    color: var(--text); font-size: 1rem; outline: none; width: 100%;
    transition: border-color 0.15s; font-family: 'DM Sans', sans-serif;
  }
  .admin-modal-input:focus { border-color: var(--accent-mid); }
  .admin-modal-actions { display: flex; gap: 0.5rem; justify-content: flex-end; }
  .admin-modal-actions button {
    padding: 0.4rem 1rem; border-radius: 6px;
    border: 1.5px solid var(--border2); background: transparent;
    color: var(--text); cursor: pointer; font-size: 0.875rem;
    font-family: 'DM Sans', sans-serif; transition: background 0.15s;
  }
  .admin-modal-actions button:hover { background: var(--surface2); }
  .admin-modal-submit { background: var(--accent-bg) !important; color: var(--accent) !important; border-color: #C0DD97 !important; font-weight: 600 !important; }
  @keyframes shake {
    0%,100% { transform: translateX(0); }
    20%,60% { transform: translateX(-8px); }
    40%,80% { transform: translateX(8px); }
  }
  .admin-modal-shake { animation: shake 0.4s ease; }

  .admin-panel {
    background: var(--accent-bg); border: 1.5px solid #C0DD97;
    border-radius: 12px; padding: 16px 20px;
    display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px;
  }
  .admin-panel h3 { margin: 0; font-size: 0.875rem; color: var(--accent); font-weight: 700; }
  .admin-panel-row {
    display: flex; align-items: center; justify-content: space-between;
    font-size: 0.875rem; color: var(--text2);
  }
  .admin-badge-locked { background: rgba(220,50,50,0.1); color: #c0392b; border-radius: 20px; padding: 2px 10px; font-size: 0.75rem; font-weight: 700; }
  .admin-badge-open { background: rgba(59,109,17,0.12); color: var(--accent); border-radius: 20px; padding: 2px 10px; font-size: 0.75rem; font-weight: 700; }
  .admin-hint { font-size: 0.72rem; color: var(--text3); margin: 0; }
  .admin-signout {
    display: block; margin: -6px auto 10px; background: transparent;
    border: none; font-size: 0.72rem; color: var(--text3);
    cursor: pointer; transition: color 0.2s; font-family: 'DM Sans', sans-serif;
  }
  .admin-signout:hover { color: var(--text2); }
`;

// ─── COUNTDOWN ───────────────────────────────────────────────────────────────
function useCountdown(target: Date) {
  const calc = () => {
    const diff = target.getTime() - Date.now()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true }
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
      done: false,
    }
  }
  const [time, setTime] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

function Countdown() {
  const { days, hours, minutes, seconds, done } = useCountdown(GAMES_START)
  const pad = (n: number) => String(n).padStart(2, '0')
  if (done) return <div className="countdown-done">🏆 Let the games begin!</div>
  return (
    <div className="countdown">
      <div className="countdown-label">Let the games begin in</div>
      <div className="countdown-tiles">
        <div className="countdown-tile"><span>{days}</span><small>days</small></div>
        <div className="countdown-sep">:</div>
        <div className="countdown-tile"><span>{pad(hours)}</span><small>hrs</small></div>
        <div className="countdown-sep">:</div>
        <div className="countdown-tile"><span>{pad(minutes)}</span><small>min</small></div>
        <div className="countdown-sep">:</div>
        <div className="countdown-tile"><span>{pad(seconds)}</span><small>sec</small></div>
      </div>
    </div>
  )
}

// ─── ADMIN ────────────────────────────────────────────────────────────────────
function AdminGate({ isAdmin, setIsAdmin }: { isAdmin: boolean; setIsAdmin: (v: boolean) => void }) {
  const [visible, setVisible] = useState(false)
  const [input, setInput] = useState('')
  const [shake, setShake] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const open = () => { setVisible(true); setTimeout(() => inputRef.current?.focus(), 50) }
  const attempt = () => {
    if (input === ADMIN_CODE) { setIsAdmin(true); setVisible(false); setInput('') }
    else { setShake(true); setInput(''); setTimeout(() => setShake(false), 500) }
  }

  return (
    <>
      {!isAdmin && (
        <button className="admin-trigger" onClick={open} aria-label="Admin login">🔑</button>
      )}
      {visible && (
        <div className="admin-modal-backdrop" onClick={() => setVisible(false)}>
          <div className={`admin-modal ${shake ? 'admin-modal-shake' : ''}`} onClick={e => e.stopPropagation()}>
            <h4>Enter admin code</h4>
            <input
              ref={inputRef} type="password" value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && attempt()}
              placeholder="••••••••" className="admin-modal-input"
            />
            <div className="admin-modal-actions">
              <button onClick={() => setVisible(false)}>Cancel</button>
              <button onClick={attempt} className="admin-modal-submit">Enter</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function AdminPanel({
  isLocked,
  onToggleLock,
  onReset,
  onSignOut,
}: any) {
  return (
    <>
      <div className="admin-panel">
        <h3>⚙️ Admin</h3>

        <div className="admin-panel-row">
          <span>Score entry</span>
          <span className={isLocked ? 'admin-badge-locked' : 'admin-badge-open'}>
            {isLocked ? '🔒 Locked' : '🔓 Open'}
          </span>
        </div>

        <div className="admin-modal-actions" style={{ justifyContent: "flex-start" }}>
          <button onClick={onToggleLock} className="admin-modal-submit">
            {isLocked ? "Unlock scoring" : "Lock scoring"}
          </button>
          <button onClick={onReset}>
            Reset scores
          </button>
        </div>
      </div>

      <button className="admin-signout" onClick={onSignOut}>
        sign out of admin
      </button>
    </>
  );
}

// ─── TYPES & DATA ─────────────────────────────────────────────────────────────
type Team = { id: string; name: string; players: string[]; levelSum: number };
type GroupKey = "A" | "B";
type GroupMatch = {
  id: string; group: GroupKey; round: number; court: number;
  team1Id: string; team2Id: string; team1Games: string; team2Games: string;
};
type GameScore = { t1: string; t2: string };

const initialTeams: Team[] = [
  { id:"T1",  name:"Team 1",  players:["A","B"],  levelSum:4 },
  { id:"T2",  name:"Team 2",  players:["C","D"],  levelSum:4 },
  { id:"T3",  name:"Team 3",  players:["E","F"],  levelSum:3 },
  { id:"T4",  name:"Team 4",  players:["G","H"],  levelSum:3 },
  { id:"T5",  name:"Team 5",  players:["I","J"],  levelSum:3 },
  { id:"T6",  name:"Team 6",  players:["K","L"],  levelSum:4 },
  { id:"T7",  name:"Team 7",  players:["M","N"],  levelSum:3 },
  { id:"T8",  name:"Team 8",  players:["O","P"],  levelSum:3 },
  { id:"T9",  name:"Team 9",  players:["Q","R"],  levelSum:2 },
  { id:"T10", name:"Team 10", players:["S","T"],  levelSum:3 },
];

const initialGroupMatches: GroupMatch[] = [
  { id:"A1", group:"A", round:1, court:1, team1Id:"T1", team2Id:"T2", team1Games:"", team2Games:"" },
  { id:"A2", group:"A", round:1, court:2, team1Id:"T3", team2Id:"T4", team1Games:"", team2Games:"" },
  { id:"A3", group:"A", round:2, court:1, team1Id:"T1", team2Id:"T3", team1Games:"", team2Games:"" },
  { id:"A4", group:"A", round:2, court:2, team1Id:"T2", team2Id:"T5", team1Games:"", team2Games:"" },
  { id:"A5", group:"A", round:3, court:1, team1Id:"T4", team2Id:"T5", team1Games:"", team2Games:"" },
  { id:"B1", group:"B", round:1, court:3, team1Id:"T6", team2Id:"T7", team1Games:"", team2Games:"" },
  { id:"B2", group:"B", round:1, court:4, team1Id:"T8", team2Id:"T9", team1Games:"", team2Games:"" },
  { id:"B3", group:"B", round:2, court:3, team1Id:"T6", team2Id:"T8", team1Games:"", team2Games:"" },
  { id:"B4", group:"B", round:2, court:4, team1Id:"T7", team2Id:"T10", team1Games:"", team2Games:"" },
  { id:"B5", group:"B", round:3, court:3, team1Id:"T9", team2Id:"T10", team1Games:"", team2Games:"" },
];


// ─── HELPERS ──────────────────────────────────────────────────────────────────
function parseScore(v: string) {
  if (!v.trim()) return null;
  const n = Number(v);
  return isNaN(n) ? null : n;
}

function getWinner(t1: string|null, t2: string|null, g1: string, g2: string): string|null {
  if (!t1 || !t2) return null;
  const s1 = parseScore(g1), s2 = parseScore(g2);
  if (s1 === null || s2 === null || s1 === s2) return null;
  return s1 > s2 ? t1 : t2;
}

function countWins(games: GameScore[]): [number, number] {
  let w1 = 0, w2 = 0;
  games.forEach(g => {
    const s1 = parseScore(g.t1), s2 = parseScore(g.t2);
    if (s1 === null || s2 === null || s1 === s2) return;
    if (s1 > s2) w1++; else w2++;
  });
  return [w1, w2];
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
function MatchRow({ m, teamsById, updateGroup, locked }: {
  m: GroupMatch; teamsById: Record<string, Team>;
  updateGroup: (id: string, field: string, val: string) => void; locked: boolean;
}) {
  const s1 = parseScore(m.team1Games), s2 = parseScore(m.team2Games);
  const done = s1 !== null && s2 !== null;
  const w = done && s1 !== s2 ? (s1! > s2! ? m.team1Id : m.team2Id) : null;
  return (
    <div className={`match-row ${done ? "scored" : ""}`}>
      <div className={`team-name ${w === m.team1Id ? "winner" : ""}`}>{teamsById[m.team1Id].name}</div>
      <div className="score-wrap">
        <div className="score-inputs">
          <input type="text" inputMode="numeric" pattern="[0-9]*" className="score-input"
            value={m.team1Games} disabled={locked}
            onChange={e => updateGroup(m.id, "team1Games", e.target.value.replace(/\D/g,"").slice(0,2))} />
          <span className="vs">VS</span>
          <input type="text" inputMode="numeric" pattern="[0-9]*" className="score-input"
            value={m.team2Games} disabled={locked}
            onChange={e => updateGroup(m.id, "team2Games", e.target.value.replace(/\D/g,"").slice(0,2))} />
        </div>
        <div className="match-footer">
          <span className="court-badge">Court {m.court}</span>
          {w && <span className="done-badge">Done</span>}
        </div>
      </div>
      <div className={`team-name team-name-right ${w === m.team2Id ? "winner" : ""}`}>{teamsById[m.team2Id].name}</div>
    </div>
  );
}


function StandingsCard({ group, data }: { group: string; data: any[] }) {
  return (
    <div className="standings-card">
      <div className="standings-card-title">
        <span className="group-tag">Group {group}</span> Standings
      </div>
      <div className="standings-col-labels">
        <span className="col-label">#</span>
        <span className="col-label left">Team</span>
        <span className="col-label">W</span>
        <span className="col-label">+/-</span>
        <span className="col-label">Pts</span>
      </div>
      {data.map((t, i) => (
        <div key={t.teamId} className={`standing-row ${i < 2 ? "q" : ""}`}>
          <span className="standing-pos">{i + 1}</span>
          <span className="standing-name">{t.teamName}</span>
          <span className="standing-stat">{t.wins}</span>
          <span className="standing-stat diff">{t.gameDiff > 0 ? "+" : ""}{t.gameDiff}</span>
          <span className="standing-stat pts">{t.points}</span>
        </div>
      ))}
      <div className="qualifies-hint">↑ Top 2 qualify</div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [teams] = useState(initialTeams);
  const [groupMatches, setGroupMatches] = useState(initialGroupMatches);
  const [isAdmin, setIsAdmin] = useState(false);
const [isLocked, setIsLocked] = useState(DEFAULT_LOCKED);
const [sf1, setSf1] = useState([
  { t1: "", t2: "" },
  { t1: "", t2: "" },
  { t1: "", t2: "" },
]);

const [sf2, setSf2] = useState([
  { t1: "", t2: "" },
  { t1: "", t2: "" },
  { t1: "", t2: "" },
]);
  const [finalGames, setFinalGames] = useState<GameScore[]>([
    { t1:"", t2:"" }, { t1:"", t2:"" }, { t1:"", t2:"" },
  ]);

const locked = isLocked && !isAdmin;

  const teamsById = Object.fromEntries(teams.map(t => [t.id, t])) as Record<string, Team>;

  const standings = useMemo(() => {
    const mk = (ids: string[]) => ids.map(id => ({
      teamId: id, teamName: teamsById[id].name,
      played:0, wins:0, gamesFor:0, gamesAgainst:0, gameDiff:0, points:0
    }));
    const A = mk(["T1","T2","T3","T4","T5"]);
    const B = mk(["T6","T7","T8","T9","T10"]);
    groupMatches.forEach(m => {
      const s1 = parseScore(m.team1Games), s2 = parseScore(m.team2Games);
      if (s1 === null || s2 === null || s1 === s2) return;
      const tbl = m.group === "A" ? A : B;
      const t1 = tbl.find(t => t.teamId === m.team1Id)!;
      const t2 = tbl.find(t => t.teamId === m.team2Id)!;
      t1.played++; t2.played++;
      t1.gamesFor += s1; t1.gamesAgainst += s2;
      t2.gamesFor += s2; t2.gamesAgainst += s1;
      if (s1 > s2) { t1.wins++; t1.points++; } else { t2.wins++; t2.points++; }
      t1.gameDiff = t1.gamesFor - t1.gamesAgainst;
      t2.gameDiff = t2.gamesFor - t2.gamesAgainst;
    });
    A.sort((a,b) => b.points-a.points || b.gameDiff-a.gameDiff);
    B.sort((a,b) => b.points-a.points || b.gameDiff-a.gameDiff);
    return { A, B };
  }, [groupMatches, teamsById]);
const resetAll = () => {
  setGroupMatches(initialGroupMatches);
};
  const q = {
    a1: standings.A[0]?.teamId ?? null, a2: standings.A[1]?.teamId ?? null,
    b1: standings.B[0]?.teamId ?? null, b2: standings.B[1]?.teamId ?? null,
  };
  const sf1t1 = q.a1, sf1t2 = q.b2;
  const sf2t1 = q.b1, sf2t2 = q.a2;
 const [sf1w1, sf1w2] = countWins(sf1);
const [sf2w1, sf2w2] = countWins(sf2);

const sf1Winner = sf1w1 >= 2 ? sf1t1 : sf1w2 >= 2 ? sf1t2 : null;
const sf2Winner = sf2w1 >= 2 ? sf2t1 : sf2w2 >= 2 ? sf2t2 : null;
  const finalT1 = sf1Winner, finalT2 = sf2Winner;
  const [fw1, fw2] = countWins(finalGames);
  const finalOver = fw1 >= 2 || fw2 >= 2;
  const champion = finalOver ? (fw1 > fw2 ? finalT1 : finalT2) : null;
  const game1Won = !!getWinner(finalT1, finalT2, finalGames[0].t1, finalGames[0].t2);
  const game2Won = !!getWinner(finalT1, finalT2, finalGames[1].t1, finalGames[1].t2);
  const gameEnabled = [
    !!finalT1 && !!finalT2,
    game1Won,
    game1Won && game2Won && fw1 === 1 && fw2 === 1,
  ];

  const updateGroup = (id: string, field: string, val: string) =>
    setGroupMatches(prev => prev.map(m => m.id === id ? { ...m, [field]: val } : m));
  const updateFinalGame = (idx: number, side: "t1"|"t2", val: string) =>
    setFinalGames(prev => prev.map((g, i) => i === idx ? { ...g, [side]: val } : g));

  const groupA = groupMatches.filter(m => m.group === "A");
  const groupB = groupMatches.filter(m => m.group === "B");
  const t1name = finalT1 ? teamsById[finalT1]?.name : null;
  const t2name = finalT2 ? teamsById[finalT2]?.name : null;

  return (
    <>
      <style>{style}</style>
      <Countdown />
      <div className="app">
        <div className="container">

          {isAdmin && <AdminPanel
  isLocked={isLocked}
  onToggleLock={() => setIsLocked(p => !p)}
  onReset={resetAll}
  onSignOut={() => setIsAdmin(false)}
/>}
<div className="header">
  <div>
    <div className="header-eyebrow">Padel Tournament</div>
    <div className="header-title">
      Convert &amp; Create<br />
      <span>Impact</span>
    </div>
  </div>

  <div className="header-pills">
    <span className="pill"><strong>10</strong> Teams</span>
    <span className="pill"><strong>4</strong> Courts</span>
    <span className="pill"><strong>10 min</strong> Matches</span>
    <span className="pill"><strong>Best of 3</strong> Final</span>

    <a
      href="https://raw.githubusercontent.com/ajeesh1987/padel_tournament/refs/heads/main/README.md"
      target="_blank"
      rel="noopener noreferrer"
      className="pill"
      style={{ textDecoration: "none" }}
    >
      🎲 View Draw guidelines
    </a>
  </div>
</div>

          <div className="section">
            <div className="section-title"><div className="section-title-bar" />Group Matches (10 min time limit. Each player gets 2 serves. The team with the most points at the end wins)</div>
            <div className="group-divider"><span className="group-tag">Group A</span><div className="group-line" /></div>
            {groupA.map(m => <MatchRow key={m.id} m={m} teamsById={teamsById} updateGroup={updateGroup} locked={locked} />)}
            <div className="group-divider"><span className="group-tag">Group B</span><div className="group-line" /></div>
            {groupB.map(m => <MatchRow key={m.id} m={m} teamsById={teamsById} updateGroup={updateGroup} locked={locked} />)}
          </div>

          <div className="two-col">
            <StandingsCard group="A" data={standings.A} />
            <StandingsCard group="B" data={standings.B} />
          </div>

<div className="section">
  <div className="section-title">
    <div className="section-title-bar" />
    Semi Finals (Americano · 21 points)
  </div>

  <div className="final-meta" style={{ marginBottom: 12 }}>
    <span className="final-badge">Best of 3</span>
    <span className="final-duration">first to win 2 games</span>
  </div>

  <div className="ko-grid">

    {/* SF1 */}
    <div className="ko-card">
      <div className="ko-card-label">Semi Final 1 · A1 vs B2</div>

      {sf1.map((g, idx) => {
        const game1Won = !!getWinner(sf1t1, sf1t2, sf1[0].t1, sf1[0].t2);
        const game2Won = !!getWinner(sf1t1, sf1t2, sf1[1].t1, sf1[1].t2);
        const game1w1 = game1Won && getWinner(sf1t1, sf1t2, sf1[0].t1, sf1[0].t2) === sf1t1;
        const game2w2 = game2Won && getWinner(sf1t1, sf1t2, sf1[1].t1, sf1[1].t2) === sf1t2;
        const game1w2 = game1Won && getWinner(sf1t1, sf1t2, sf1[0].t1, sf1[0].t2) === sf1t2;
        const game2w1 = game2Won && getWinner(sf1t1, sf1t2, sf1[1].t1, sf1[1].t2) === sf1t1;
        const needsGame3 = game1Won && game2Won && ((game1w1 && game2w2) || (game1w2 && game2w1));

        const enabled =
          idx === 0 ||
          (idx === 1 && game1Won) ||
          (idx === 2 && needsGame3);

        const winner = getWinner(sf1t1, sf1t2, g.t1, g.t2);

        return (
          <div key={idx} style={{ marginBottom: 10, opacity: enabled ? 1 : 0.4 }}>
            <div style={{ fontSize: 11, marginBottom: 4 }}>
              Game {idx + 1}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 8, alignItems: "center" }}>
              <div style={{ fontSize: 13, fontWeight: winner === sf1t1 ? 600 : 400 }}>
                {sf1t1 ? teamsById[sf1t1]?.name : "TBD"}
              </div>

              <div style={{ display: "flex", gap: 6 }}>
                <input
                  className="game-score-input"
                  value={g.t1}
                  disabled={!enabled || locked}
                  onChange={e => {
                    const v = e.target.value.replace(/\D/g, "").slice(0, 2);
                    setSf1(prev => prev.map((x, i) => i === idx ? { ...x, t1: v } : x));
                  }}
                />
                <span>VS</span>
                <input
                  className="game-score-input"
                  value={g.t2}
                  disabled={!enabled || locked}
                  onChange={e => {
                    const v = e.target.value.replace(/\D/g, "").slice(0, 2);
                    setSf1(prev => prev.map((x, i) => i === idx ? { ...x, t2: v } : x));
                  }}
                />
              </div>

              <div style={{ textAlign: "right", fontSize: 13, fontWeight: winner === sf1t2 ? 600 : 400 }}>
                {sf1t2 ? teamsById[sf1t2]?.name : "TBD"}
              </div>
            </div>
          </div>
        );
      })}
    </div>

    {/* SF2 */}
    <div className="ko-card">
      <div className="ko-card-label">Semi Final 2 · B1 vs A2</div>

      {sf2.map((g, idx) => {
        const game1Won = !!getWinner(sf2t1, sf2t2, sf2[0].t1, sf2[0].t2);
        const game2Won = !!getWinner(sf2t1, sf2t2, sf2[1].t1, sf2[1].t2);
        const game1w1 = game1Won && getWinner(sf2t1, sf2t2, sf2[0].t1, sf2[0].t2) === sf2t1;
        const game2w2 = game2Won && getWinner(sf2t1, sf2t2, sf2[1].t1, sf2[1].t2) === sf2t2;
        const game1w2 = game1Won && getWinner(sf2t1, sf2t2, sf2[0].t1, sf2[0].t2) === sf2t2;
        const game2w1 = game2Won && getWinner(sf2t1, sf2t2, sf2[1].t1, sf2[1].t2) === sf2t1;
        const needsGame3 = game1Won && game2Won && ((game1w1 && game2w2) || (game1w2 && game2w1));

        const enabled =
          idx === 0 ||
          (idx === 1 && game1Won) ||
          (idx === 2 && needsGame3);

        const winner = getWinner(sf2t1, sf2t2, g.t1, g.t2);

        return (
          <div key={idx} style={{ marginBottom: 10, opacity: enabled ? 1 : 0.4 }}>
            <div style={{ fontSize: 11, marginBottom: 4 }}>
              Game {idx + 1}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 8, alignItems: "center" }}>
              <div style={{ fontSize: 13, fontWeight: winner === sf2t1 ? 600 : 400 }}>
                {sf2t1 ? teamsById[sf2t1]?.name : "TBD"}
              </div>

              <div style={{ display: "flex", gap: 6 }}>
                <input
                  className="game-score-input"
                  value={g.t1}
                  disabled={!enabled || locked}
                  onChange={e => {
                    const v = e.target.value.replace(/\D/g, "").slice(0, 2);
                    setSf2(prev => prev.map((x, i) => i === idx ? { ...x, t1: v } : x));
                  }}
                />
                <span>VS</span>
                <input
                  className="game-score-input"
                  value={g.t2}
                  disabled={!enabled || locked}
                  onChange={e => {
                    const v = e.target.value.replace(/\D/g, "").slice(0, 2);
                    setSf2(prev => prev.map((x, i) => i === idx ? { ...x, t2: v } : x));
                  }}
                />
              </div>

              <div style={{ textAlign: "right", fontSize: 13, fontWeight: winner === sf2t2 ? 600 : 400 }}>
                {sf2t2 ? teamsById[sf2t2]?.name : "TBD"}
              </div>
            </div>
          </div>
        );
      })}
    </div>

  </div>
</div>



          <div className="final-card">
            <div className="final-header">
              <div className="final-title">Final (Americano - 21 points)</div>
              <div className="final-meta">
                <span className="final-badge">Best of 3</span>
                <span className="final-duration">first to win 2 games</span>
              </div>
            </div>
            <div className="games-tally">
              <div className="tally-team">
                <div className={`tally-name ${!t1name ? "tbd" : ""}`}>{t1name ?? "TBD"}</div>
                <div className={`tally-score ${champion === finalT1 ? "champion-score" : fw1 > fw2 ? "leading" : ""}`}>{fw1}</div>
              </div>
              <div className="tally-divider">—</div>
              <div className="tally-team tally-right">
                <div className={`tally-name ${!t2name ? "tbd" : ""}`}>{t2name ?? "TBD"}</div>
                <div className={`tally-score ${champion === finalT2 ? "champion-score" : fw2 > fw1 ? "leading" : ""}`}>{fw2}</div>
              </div>
            </div>
            {[0,1,2].map(idx => {
              const g = finalGames[idx];
              const enabled = gameEnabled[idx] && !locked;
              const gWinner = getWinner(finalT1, finalT2, g.t1, g.t2);
              const labels = ["Game 1","Game 2","Game 3 · Decider"];
              return (
                <React.Fragment key={idx}>
                  {idx > 0 && <div className="game-divider" />}
                  <div className="game-label">
                    <span className={`game-number ${gWinner ? "played" : ""}`}>{labels[idx]}</span>
                    {idx === 2 && !gameEnabled[2] && <span style={{color:"var(--text3)",fontSize:10,fontWeight:500}}>— played if needed</span>}
                  </div>
                  <div className={`game-row ${gWinner ? "game-won" : ""} ${!enabled ? "disabled" : ""}`}>
                    <div className={`game-team ${gWinner === finalT1 ? "w" : ""}`}>{t1name ?? "TBD"}</div>
                    <div className="game-inputs">
                      <input type="text" inputMode="numeric" pattern="[0-9]*" className="game-score-input"
                        value={g.t1} disabled={!enabled}
                        onChange={e => updateFinalGame(idx,"t1",e.target.value.replace(/\D/g,"").slice(0,2))} />
                      <span className="game-vs">VS</span>
                      <input type="text" inputMode="numeric" pattern="[0-9]*" className="game-score-input"
                        value={g.t2} disabled={!enabled}
                        onChange={e => updateFinalGame(idx,"t2",e.target.value.replace(/\D/g,"").slice(0,2))} />
                    </div>
                    <div className={`game-team right ${gWinner === finalT2 ? "w" : ""}`}>{t2name ?? "TBD"}</div>
                  </div>
                </React.Fragment>
              );
            })}
            {champion && (
              <div className="champion" style={{marginTop:16}}>
                <div className="champion-icon">🏆</div>
                <div>
                  <div className="champion-label">Tournament Champion</div>
                  <div className="champion-name">{teamsById[champion]?.name}</div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
      <AdminGate isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
    </>
  );
}
