🎾 Padel Tournament App
🧩 Team Assignment Logic

Goal: create balanced teams so matches stay competitive and fun.

✅ Steps
Sort players by level
3 → 2 → 1 → 0
Split into two halves
Top half → higher level players
Bottom half → lower level players
Pair players
Highest with lowest
Second highest with second lowest
Continue until all teams are formed
⚖️ Handle uneven distributions
❌ Avoid
3 + 3 → too strong
3 + 2 → too strong
0 + 0 → too weak
0 + 1 → too weak
👍 Prefer
2 + 1 → most balanced
2 + 2 → stable
⚠️ Acceptable if required
3 + 1
3 + 0 → equal total, but can be targeted in gameplay
🏆 Group Assignment Logic
🎯 Goal
No “group of death”
No “easy group”
Spread strong teams evenly
Keep matches competitive
✅ Steps
Rank teams
Based on composition:
2 + 1 → most stable
2 + 2
3 + 0
3 + 1
Distribute alternately
Group A → strongest team
Group B → next strongest
Continue alternating
Balance team types
Each group should have a similar mix of:
2 + 1 teams
3 + 0 teams
2 + 2 teams
Handle uneven group sizes (e.g. 5 vs 4 teams)
Place slightly weaker team in the larger group
Final sanity check
No group should feel clearly stronger
Swap 1–2 teams if needed
💡 Key Principles
Equal total level ≠ equal gameplay strength
2 + 1 teams are often more stable than 3 + 0
Avoid creating obvious weak targets
Consistency beats individual dominance in doubles
Small manual adjustments improve fairness significantly
