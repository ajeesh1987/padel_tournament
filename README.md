# 🎾 Padel Tournament App

## 🧩 Team Assignment Logic

**Goal:** create balanced teams so matches stay competitive and fun.

### ✅ Steps

1. Sort players by level  
   3 → 2 → 1 → 0  

2. Split into two halves  
   - Top half → higher level players  
   - Bottom half → lower level players  

3. Pair players  
   - Highest with lowest  
   - Second highest with second lowest  
   - Continue until all teams are formed  

---

### ⚖️ Handle uneven distributions

#### ❌ Avoid
- 3 + 3 → too strong  
- 3 + 2 → too strong  
- 0 + 0 → too weak  
- 0 + 1 → too weak  

#### 👍 Prefer
- 2 + 1 → most balanced  
- 2 + 2 → stable  

#### ⚠️ Acceptable if required
- 3 + 1  
- 3 + 0  

---

## 🏆 Group Assignment Logic

### 🎯 Goal
- No group of death  
- No easy group  
- Spread strong teams evenly  
- Keep matches competitive  

---

### ✅ Steps

1. Rank teams  
   - 2 + 1 
   - 2 + 2  
   - 3 + 0  
   - 3 + 1  

2. Distribute alternately  
   - Group A → strongest  
   - Group B → next strongest  

3. Balance team types  
   - Each group should have mix of:
     - 2 + 1  
     - 3 + 0  
     - 2 + 2  

---

## 💡 Key Principles

- Equal total ≠ equal gameplay strength  
- 2 + 1 is often more stable than 3 + 0  
- Avoid obvious weak targets  
- Consistency beats individual dominance  
