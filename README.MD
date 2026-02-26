# ⚡ BetPawa VFL Predictor — OBR Engine v5.0

> **Over 2.5 Goals Predictor for BetPawa Zambia Virtual Football**  
> Three-Layer Filter System: OBR Classification → High Scorer Gate → 6 Fail State Formulas

---

## 🎯 How It Works

### Layer 1 — OBR (Offensive Bias Ratio) Classification

Every team is classified based on real historical match data:

```
OBR = (GS_avg / (GC_avg + 0.1)) + (GS_avg / 2.5)
```

| Class | OBR Range | Description |
|-------|-----------|-------------|
| ⭐ **GIANT** | ≥ 1.80 | High scorers, low conceded. Primary Over 2.5 candidates |
| 🌊 **CHAOS** | 0.90–1.79 | Score freely but also concede. Open, chaotic games |
| ⚠️ NEUTRAL | 0.50–0.89 | Borderline — rarely qualify |
| 🧱 **BLANKET** | < 0.50 | Low attack coding — **instant disqualification** |

### Layer 2 — High Scorer Gate

Both teams **must** have OBR ≥ 0.90 (Giant or Chaos).  
**One Wet Blanket poisons the entire match.**

### Layer 3 — Six Fail State Formulas

Applied based on detected matchup type:

| Formula | Matchup | Detects | FAIL Condition |
|---------|---------|---------|----------------|
| **SI** — Stalemate Index | Strong vs Strong | Gridlock | SI > 1.50 |
| **ER** — Efficiency Ratio | Strong vs Balanced | Dominance Trap | ER < 0.50 |
| **CI** — Compassion Index | Strong vs Weak | Mercy Rule | CI < 0.50 |
| **ESI** — Equilibrium Stagnation Index | Balanced vs Balanced | Entropy/Stagnation | ESI > 2.00 |
| **MD** — Motivation Deficit | Balanced vs Weak | Late Season Apathy | MD > 5.00 |
| **EVC** — Error Variance Check | Weak vs Weak | Chaos Control | EVC < 0.80 |

Only matches that **pass ALL applicable formulas** are posted.

---

## 📱 Features

- **🔴 Live Tab** — Real-time qualified picks with full formula breakdown
- **📋 Results Tab** — Rolling window result tracking (✅/❌) with accuracy stats
- **🎯 Predict Tab** — Manual predictor with OBR + Fail State analysis
- **📊 OBR Tab** — Full league OBR classification table
- **🧠 ML Tab** — Self-learning engine, dataset download, learned adjustments
- **📚 Guide Tab** — Complete formula reference

### Self-Learning System

After each failed prediction:
1. Identifies which formula type failed to catch the bad pick
2. Tightens the corresponding threshold automatically
3. Tracks overall accuracy → adjusts confidence floor
4. Logs all changes in ML tab

### Result Tracking

- Each qualified pick is tracked until the round completes
- Results auto-fetched from BetPawa API
- Rolling window: after 5 new results, oldest 5 cleared
- Failed predictions trigger formula threshold adjustment

---

## 🚀 Deployment to GitHub Pages

### Step 1 — Create a GitHub Repository

1. Go to [github.com](https://github.com) → New repository
2. Name it: `betpawa-vfl-predictor`
3. Set to **Public**
4. Do NOT initialize with README (we have our own)

### Step 2 — Upload Files

Upload all files from this package:
```
betpawa-vfl-predictor/
├── index.html          ← Main app (complete single-file PWA)
├── manifest.json       ← PWA manifest
├── sw.js               ← Service worker (offline support)
├── icon.svg            ← App icon (SVG)
├── README.md           ← This file
└── .github/
    └── workflows/
        └── deploy.yml  ← Auto-deploy to GitHub Pages
```

### Step 3 — Enable GitHub Pages

1. Go to repository **Settings** → **Pages**
2. Source: **GitHub Actions**
3. Push to `main` branch → auto-deploys

### Step 4 — Access Your App

URL will be: `https://YOUR_USERNAME.github.io/betpawa-vfl-predictor/`

### Step 5 — Install as PWA on Phone

1. Open the URL in Chrome (Android) or Safari (iOS)
2. Android: Menu → "Add to Home Screen"
3. iOS: Share → "Add to Home Screen"

---

## 📊 Data Pipeline

```
BetPawa API
    ↓
Fetch last 25 rounds of results
    ↓
Compute GS_avg, GC_avg per team
    ↓
Calculate OBR = (GS/(GC+0.1)) + (GS/2.5)
    ↓
Classify: GIANT | CHAOS | NEUTRAL | BLANKET
    ↓
For upcoming round matches:
    ↓
HIGH SCORER GATE → both OBR ≥ 0.90?
    ↓ (pass)
DETERMINE MATCHUP TYPE
    ↓
RUN APPLICABLE FAIL STATE FORMULA(S)
    ↓ (all pass)
POST QUALIFIED PICK
    ↓
TRACK RESULT → SELF-LEARN
```

---

## ⚠️ Disclaimer

This tool is for research and entertainment purposes. Virtual football uses RNG-based algorithms — no prediction system guarantees results. Bet responsibly.

---

## 🔧 Technical Stack

- **Frontend**: Vanilla HTML/CSS/JS (no framework dependencies)
- **Storage**: IndexedDB (persistent, offline)
- **PWA**: Service Worker + Web App Manifest
- **API**: BetPawa proxy (Railway.app hosted)
- **Fonts**: Google Fonts (Orbitron, Exo 2, JetBrains Mono)
- **Deployment**: GitHub Pages via GitHub Actions

---

*Built with the OBR Engine — detecting High Scorers and eliminating Fail States.*
