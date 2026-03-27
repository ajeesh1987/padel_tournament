import React, { useMemo, useState } from "react";

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

  .header {
    padding: 24px 0 20px;
    margin-bottom: 28px;
    border-bottom: 1.5px solid var(--border);
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
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
  .final-title {
    font-family: 'Bebas Neue', sans-serif; font-size: 20px;
    letter-spacing: 1px; color: var(--text);
  }
  .final-meta {
    display: flex; gap: 8px; align-items: center; flex-wrap: wrap;
  }
  .final-badge {
    font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;
    background: var(--accent-bg); color: var(--accent); border-radius: 4px; padding: 3px 8px;
  }
  .final-duration {
    font-size: 11px; color: var(--text3); font-weight: 500;
  }

  .games-tally {
    display: flex; align-items: center; gap: 16px;
    background: var(--surface); border: 1.5px solid var(--border);
    border-radius: 10px; padding: 12px 16px; margin-bottom: 14px;
  }
  .tally-team { flex: 1; }
  .tally-name { font-size: 13px; font-weight: 500; color: var(--text2); margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .tally-name.tbd { color: var(--text3); font-style: italic; font-weight: 400; }
  .tally-score {
    font-family: 'Bebas Neue', sans-serif; font-size: 36px; line-height: 1;
    color: var(--text3);
  }
  .tally-score.leading { color: var(--accent); }
  .tally-score.champion-score { color: var(--accent); }
  .tally-divider {
    font-family: 'Bebas Neue', sans-serif; font-size: 22px;
    color: var(--border2); flex-shrink: 0;
  }
  .tally-right { text-align: right; }

  .game-label {
    font-size: 10px; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; color: var(--text3); margin-bottom: 8px;
    display: flex; align-items: center; gap: 6px;
  }
  .game-number {
    background: var(--border); color: var(--text3);
    border-radius: 3px; padding: 1px 6px;
    font-size: 10px; font-weight: 700; letter-spacing: 1px;
  }
  .game-number.played { background: var(--accent-bg); color: var(--accent); }
  .game-row {
    display: grid; grid-template-columns: 1fr auto 1fr;
    align-items: center; gap: 8px;
    padding: 8px 10px; border-radius: 8px;
    background: var(--surface); border: 1.5px solid var(--border);
    margin-bottom: 8px;
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
`;

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

const emptyKO = { t1:"", t2:"" };

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

function MatchRow({
  m,
  teamsById,
  updateGroup,
}: {
  m: GroupMatch;
  teamsById: Record<string, Team>;
  updateGroup: (id: string, field: string, val: string) => void;
}) {
  const s1 = parseScore(m.team1Games), s2 = parseScore(m.team2Games);
  const done = s1 !== null && s2 !== null;
  const w = done && s1 !== s2 ? (s1! > s2! ? m.team1Id : m.team2Id) : null;

  return (
    <div className={`match-row ${done ? "scored" : ""}`}>
      <div className={`team-name ${w === m.team1Id ? "winner" : ""}`}>{teamsById[m.team1Id].name}</div>
      <div className="score-wrap">
        <div className="score-inputs">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className="score-input"
            value={m.team1Games}
onChange={e=>{
  const v = e.target.value.replace(/\D/g, "").slice(0,2);
  updateGroup(m.id,"team1Games",v);
}}          />
          <span className="vs">VS</span>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className="score-input"
            value={m.team2Games}
onChange={e=>{
  const v = e.target.value.replace(/\D/g, "").slice(0,2);
  updateGroup(m.id,"team2Games",v);
}}          />
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

function KOTeam({
  teamId,
  games,
  onChange,
  otherId,
  otherGames,
  teamsById,
}: {
  teamId: string | null;
  games: string;
  onChange: (v: string) => void;
  otherId: string | null;
  otherGames: string;
  teamsById: Record<string, Team>;
}) {
  const s1 = parseScore(games), s2 = parseScore(otherGames);
  const isWinner = teamId && s1 !== null && s2 !== null && s1 > s2;

  return (
    <div className={`ko-team ${isWinner ? "winner" : ""}`}>
      <span className={`ko-team-name ${!teamId ? "tbd" : ""}`}>
        {teamId ? (teamsById[teamId]?.name ?? "TBD") : "TBD"}
      </span>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        className="ko-score"
        value={games}
        disabled={!teamId || !otherId}
onChange={e=>{
  const v = e.target.value.replace(/\D/g, "").slice(0,2);
  onChange(v);
}}      />
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

export default function App() {
  const [teams] = useState(initialTeams);
  const [groupMatches, setGroupMatches] = useState(initialGroupMatches);
  const [sf1, setSf1] = useState(emptyKO);
  const [sf2, setSf2] = useState(emptyKO);
  const [finalGames, setFinalGames] = useState<GameScore[]>([
    { t1:"", t2:"" },
    { t1:"", t2:"" },
    { t1:"", t2:"" },
  ]);

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

  const q = {
    a1: standings.A[0]?.teamId ?? null,
    a2: standings.A[1]?.teamId ?? null,
    b1: standings.B[0]?.teamId ?? null,
    b2: standings.B[1]?.teamId ?? null,
  };

  const sf1t1 = q.a1, sf1t2 = q.b2;
  const sf2t1 = q.b1, sf2t2 = q.a2;

  const sf1Winner = getWinner(sf1t1, sf1t2, sf1.t1, sf1.t2);
  const sf2Winner = getWinner(sf2t1, sf2t2, sf2.t1, sf2.t2);

  const finalT1 = sf1Winner;
  const finalT2 = sf2Winner;
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
      <div className="app">
        <div className="container">
          <div className="header">
            <div>
              <div className="header-eyebrow">Padel Tournament</div>
              <div className="header-title">Convert &amp; Create<br /><span>Impact</span></div>
            </div>
            <div className="header-pills">
              <span className="pill"><strong>10</strong>Teams</span>
              <span className="pill"><strong>4</strong>Courts</span>
              <span className="pill"><strong>10 min</strong>Groups & SF</span>
              <span className="pill"><strong>Best of 3</strong>Final</span>
            </div>
          </div>

          <div className="section">
            <div className="section-title"><div className="section-title-bar" />Group Matches</div>
            <div className="group-divider"><span className="group-tag">Group A</span><div className="group-line" /></div>
            {groupA.map(m => (
              <MatchRow key={m.id} m={m} teamsById={teamsById} updateGroup={updateGroup} />
            ))}
            <div className="group-divider"><span className="group-tag">Group B</span><div className="group-line" /></div>
            {groupB.map(m => (
              <MatchRow key={m.id} m={m} teamsById={teamsById} updateGroup={updateGroup} />
            ))}
          </div>

          <div className="two-col">
            <StandingsCard group="A" data={standings.A} />
            <StandingsCard group="B" data={standings.B} />
          </div>

          <div className="section">
            <div className="section-title"><div className="section-title-bar" />Semi Finals</div>
            <div className="ko-grid">
              <div className="ko-card">
                <div className="ko-card-label">Semi Final 1 · A1 vs B2</div>
                <KOTeam
                  teamId={sf1t1}
                  games={sf1.t1}
                  otherId={sf1t2}
                  otherGames={sf1.t2}
                  teamsById={teamsById}
                  onChange={v => setSf1(p => ({ ...p, t1: v }))}
                />
                <KOTeam
                  teamId={sf1t2}
                  games={sf1.t2}
                  otherId={sf1t1}
                  otherGames={sf1.t1}
                  teamsById={teamsById}
                  onChange={v => setSf1(p => ({ ...p, t2: v }))}
                />
              </div>
              <div className="ko-card">
                <div className="ko-card-label">Semi Final 2 · B1 vs A2</div>
                <KOTeam
                  teamId={sf2t1}
                  games={sf2.t1}
                  otherId={sf2t2}
                  otherGames={sf2.t2}
                  teamsById={teamsById}
                  onChange={v => setSf2(p => ({ ...p, t1: v }))}
                />
                <KOTeam
                  teamId={sf2t2}
                  games={sf2.t2}
                  otherId={sf2t1}
                  otherGames={sf2.t1}
                  teamsById={teamsById}
                  onChange={v => setSf2(p => ({ ...p, t2: v }))}
                />
              </div>
            </div>
          </div>

          <div className="final-card">
            <div className="final-header">
              <div className="final-title">Final</div>
              <div className="final-meta">
                <span className="final-badge">Best of 3</span>
                <span className="final-duration">20–25 min · first to win 2 games</span>
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
              const enabled = gameEnabled[idx];
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
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        className="game-score-input"
                        value={g.t1}
                        disabled={!enabled}
onChange={e=>{
  const v = e.target.value.replace(/\D/g, "").slice(0,2);
  updateFinalGame(idx,"t1",v);
}}                      />
                      <span className="game-vs">VS</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        className="game-score-input"
                        value={g.t2}
                        disabled={!enabled}
onChange={e=>{
  const v = e.target.value.replace(/\D/g, "").slice(0,2);
  updateFinalGame(idx,"t2",v);
}}                      />
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
    </>
  );
}
