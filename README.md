<img width="1121" height="876" alt="image" src="https://github.com/user-attachments/assets/43f062f6-9416-406b-ac69-4f6818f757ae" />

# Double Pendulum Chaos

An interactive **double pendulum chaos simulator** built with React, TypeScript, Vite, and Recharts.

Drag the slider to change the initial angle of the second pendulum and watch how even tiny differences lead to completely different chaotic trajectories — a classic demonstration of sensitivity to initial conditions.

---

## ✨ Features

- Real-time physics simulation using Euler integration
- Coloured motion trails for both pendulum bobs
- Live angle-vs-time chart (Recharts)
- Slider to set the initial angle of the second pendulum
- Fully typed with TypeScript

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) ≥ 18
- npm ≥ 9

### Installation

```bash
npm install
```

### Development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production build

```bash
npm run build
npm run preview
```

---

## 📁 Project structure

```
double-pendulum-chaos/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── DoublePendulum.tsx   # Canvas simulation + chart
│   ├── types/
│   │   └── pendulum.ts          # Shared TypeScript types
│   ├── App.tsx                  # Root component / layout
│   ├── main.tsx                 # React entry point
│   └── index.css                # Global styles
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## ⚙️ Physics

The equations of motion are the standard Lagrangian derivation for a double pendulum:

```
θ₁̈ = [–g(2m₁+m₂)sinθ₁ – m₂g·sin(θ₁–2θ₂) – 2sin(θ₁–θ₂)m₂(θ₂̇²l₂ + θ₁̇²l₁cos(θ₁–θ₂))]
      ──────────────────────────────────────────────────────────────────────────────────────
                         l₁(2m₁+m₂ – m₂cos(2θ₁–2θ₂))

θ₂̈ = [2sin(θ₁–θ₂)(θ₁̇²l₁(m₁+m₂) + g(m₁+m₂)cosθ₁ + θ₂̇²l₂m₂cos(θ₁–θ₂))]
      ─────────────────────────────────────────────────────────────────────────
                    l₂(2m₁+m₂ – m₂cos(2θ₁–2θ₂))
```

Default parameters: `l₁ = l₂ = 80 px`, `m₁ = m₂ = 10`, `g = 9.81`, `dt = 0.05 s`.

---

## 🛠️ Tech stack

| Tool | Purpose |
|------|---------|
| [React 18](https://react.dev) | UI framework |
| [TypeScript 5](https://www.typescriptlang.org) | Type safety |
| [Vite 8](https://vitejs.dev) | Dev server & bundler |
| [Recharts 2](https://recharts.org) | Angle-vs-time chart |
| [Tailwind CSS](https://tailwindcss.com) | Utility-first styling |

---

## 📜 License

[MIT](LICENSE)
