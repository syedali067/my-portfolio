import { useState, useEffect, useRef } from "react";
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Copy, Check, Download } from "lucide-react";

const CMD = "whoami";

function useTypewriter(text, speed = 65, startDelay = 300) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    let interval;
    const t = setTimeout(() => {
      interval = setInterval(() => {
        i++;
        setOut(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(t);
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);
  return { out, done };
}

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      {children}
    </div>
  );
}

function SectionHeader({ cmd, title }) {
  return (
    <div className="flex items-baseline gap-3 mb-8 md:mb-10">
      <span className="cmd-prompt">$</span>
      <span className="cmd-text">{cmd}</span>
      <span className="section-title">{title}</span>
    </div>
  );
}

const experience = [
  {
    hash: "a3f9e21",
    role: "Junior MERN Stack Developer",
    org: "Codedile Solutions, Sargodha, Pakistan",
    date: "Sep 2024 — Apr 2026",
    bullets: [
      "Built and maintained responsive React.js interfaces, consuming REST APIs and managing state with Redux Toolkit",
      "Integrated third-party and internal REST APIs for dynamic data rendering, form handling, and auth flows",
      "Worked with MySQL for data modeling and optimized queries to support frontend data needs",
      "Implemented JWT-based auth on the frontend, including protected routes and session management",
      "Developed reusable React components with consistent UI patterns using Tailwind CSS",
      "Collaborated via Git/GitHub, code reviews, and Agile workflow",
    ],
  },
];

const projects = [
  {
    name: "megablog",
    desc: "Full-stack blog platform with auth, rich text editing, image uploads, and full CRUD.",
    detail: "Global auth state via Redux Toolkit, protected routes with React Router DOM v6, Appwrite for DB/storage/auth. Deployed on Vercel.",
    stack: ["React.js", "Appwrite", "Redux Toolkit", "Tailwind CSS"],
    github: "https://github.com/syedali067/megablog",
    live: "https://megablog-app-eight.vercel.app",
    year: "2025",
  },
  {
    name: "kinsyn-patient-portal",
    desc: "Frontend patient portal demonstrating adaptability across modern JS frameworks.",
    detail: "Built with Vue 3, containerized with Docker for consistent dev/prod environments, clean component architecture.",
    stack: ["Vue 3", "Docker"],
    github: "https://github.com/syedali067/kinsyn-patient-portal",
    live: null,
    year: "2025",
  },
  {
    name: "react-mini-store",
    desc: "Fully functional e-commerce frontend with cart management and checkout flow.",
    detail: "REST API integration for live product data, state persistence via localStorage, responsive component architecture.",
    stack: ["React.js", "REST API", "Tailwind CSS"],
    github: null,
    live: "https://react-ecommerce-store-sable.vercel.app",
    year: "2024",
  },
  {
    name: "virtual-museum-tour",
    desc: "Immersive Unity-based virtual museum with LiDAR-scanned 3D artifacts — Final Year Project.",
    detail: "Firebase Authentication for secure access, multi-scene Unity management, realistic navigation through the Sir Syed Memorial Museum.",
    stack: ["Unity", "C#", "Firebase", "LiDAR Scanning"],
    github: "https://github.com/syedali067/virtual-museum-tour",
    live: "https://youtu.be/bPWfc3zBSPU",
    year: "2024",
  },
];

const skills = {
  frontend: ["react.js", "javascript-es6+", "html5", "css3", "tailwindcss", "redux-toolkit", "react-router-dom", "react-hook-form"],
  backend: ["node.js", "express.js", "rest-apis", "jwt-auth"],
  database: ["mongodb", "mongoose", "mysql"],
  tooling: ["git", "github", "docker", "appwrite", "firebase", "vscode", "vite", "vercel"],
};

export default function Portfolio() {
  const { out, done } = useTypewriter(CMD);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard?.writeText("muhammadali.mern067@gmail.com").catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="site">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&family=IBM+Plex+Sans:wght@400;500;600&display=swap');

        :root {
          --bg: #0B1210;
          --bg-elevated: #121C19;
          --bg-card: #0F1815;
          --border: #223029;
          --border-bright: #3A5148;
          --text: #E9E6DD;
          --text-muted: #8B978F;
          --text-dim: #5C6A63;
          --copper: #C9814B;
          --copper-bright: #E29A61;
          --cyan: #6FCFC0;
        }

        * { box-sizing: border-box; }

        .site {
          background: var(--bg);
          color: var(--text);
          font-family: 'IBM Plex Sans', sans-serif;
          min-height: 100vh;
          background-image:
            linear-gradient(rgba(111,207,192,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(111,207,192,0.035) 1px, transparent 1px);
          background-size: 42px 42px;
        }

        .mono { font-family: 'JetBrains Mono', monospace; }

        .cmd-prompt { font-family: 'JetBrains Mono', monospace; color: var(--copper); font-weight: 700; }
        .cmd-text { font-family: 'JetBrains Mono', monospace; color: var(--cyan); font-size: 0.95rem; }
        .section-title {
          font-family: 'JetBrains Mono', monospace;
          color: var(--text-dim);
          font-size: 0.8rem;
          letter-spacing: 0.12em;
        }

        .nav-link {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.82rem;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.2s ease;
          white-space: nowrap;
        }
        .nav-link:hover { color: var(--cyan); }

        .accent-line {
          height: 1px;
          background: linear-gradient(90deg, var(--copper) 0%, transparent 100%);
          opacity: 0.5;
        }

        .card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 3px;
          transition: border-color 0.25s ease, transform 0.25s ease;
        }
        .card:hover {
          border-color: var(--border-bright);
          transform: translateY(-2px);
        }

        .pill {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem;
          color: var(--cyan);
          background: rgba(111,207,192,0.08);
          border: 1px solid rgba(111,207,192,0.25);
          padding: 3px 9px;
          border-radius: 2px;
        }

        .link-icon {
          color: var(--text-muted);
          transition: color 0.2s ease, transform 0.2s ease;
        }
        .link-icon:hover { color: var(--copper-bright); transform: translateY(-1px); }

        .glow-cursor {
          display: inline-block;
          width: 10px;
          height: 1.1em;
          background: var(--cyan);
          margin-left: 4px;
          animation: blink 1s step-end infinite;
          vertical-align: text-bottom;
        }
        @keyframes blink { 50% { opacity: 0; } }

        .commit-line { position: relative; }
        .commit-line::before {
          content: '';
          position: absolute;
          left: 5px;
          top: 22px;
          bottom: -8px;
          width: 1px;
          background: var(--border-bright);
        }
        .commit-dot {
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background: var(--bg);
          border: 2px solid var(--copper);
          flex-shrink: 0;
          margin-top: 4px;
        }

        .skill-key { color: var(--text-dim); }
        .skill-val { color: var(--copper-bright); }

        ::selection { background: rgba(111,207,192,0.3); color: var(--text); }

        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>

      {/* NAV */}
      <nav className="sticky top-0 z-40 border-b" style={{ borderColor: "var(--border)", background: "rgba(11,18,16,0.88)", backdropFilter: "blur(8px)" }}>
        <div className="max-w-5xl mx-auto px-5 md:px-8 py-3.5 flex items-center justify-between">
          <span className="mono text-sm" style={{ color: "var(--text-muted)" }}>
            <span style={{ color: "var(--copper)" }}>~/</span>ali-shah<span style={{ color: "var(--text-dim)" }}>/portfolio</span>
          </span>
          <div className="hidden sm:flex items-center gap-5">
            <a href="#about" className="nav-link">about</a>
            <a href="#experience" className="nav-link">experience</a>
            <a href="#projects" className="nav-link">projects</a>
            <a href="#skills" className="nav-link">skills</a>
            <a href="#contact" className="nav-link">contact</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="max-w-5xl mx-auto px-5 md:px-8 pt-20 pb-20 md:pt-28 md:pb-28">
        <div className="mono text-sm mb-4" style={{ color: "var(--text-dim)" }}>
          <span style={{ color: "var(--copper)" }}>$</span> {out}
          {!done && <span className="glow-cursor" />}
        </div>
        <div style={{ opacity: done ? 1 : 0, transition: "opacity 0.7s ease" }}>
          <h1 className="mono font-extrabold leading-[1.05]" style={{ fontSize: "clamp(2.2rem, 6vw, 4.2rem)", color: "var(--text)" }}>
            Muhammad Ali Shah
          </h1>
          <p className="mono mt-4 text-lg md:text-xl" style={{ color: "var(--cyan)" }}>
            MERN Stack Developer
          </p>
          <p className="mt-5 max-w-xl leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Building full-stack web applications with React, Node.js, Express, and MongoDB —
            from REST APIs and JWT auth to responsive, production-ready UIs.
          </p>

          <div className="flex flex-wrap items-center gap-5 mt-8">
            <span className="flex items-center gap-1.5 text-sm mono" style={{ color: "var(--text-dim)" }}>
              <MapPin size={14} /> Lahore, Pakistan
            </span>
            <a href="https://github.com/syedali067" target="_blank" rel="noreferrer" className="link-icon"><Github size={19} /></a>
            <a href="https://linkedin.com/in/muhammad-ali-mern067" target="_blank" rel="noreferrer" className="link-icon"><Linkedin size={19} /></a>
            <a href="mailto:muhammadali.mern067@gmail.com" className="link-icon"><Mail size={19} /></a>
            <a href="tel:+923002931512" className="link-icon"><Phone size={19} /></a>
          </div>

          <a
            href="/Muhammad_Ali_Shah_CV.pdf"
            download
            className="mono inline-flex items-center gap-2 text-sm mt-9 px-5 py-2.5"
            style={{
              color: "var(--bg)",
              background: "var(--copper)",
              borderRadius: "3px",
              fontWeight: 600,
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--copper-bright)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--copper)")}
          >
            <Download size={15} /> download resume
          </a>
        </div>
      </header>

      {/* ABOUT */}
      <section id="about" className="max-w-5xl mx-auto px-5 md:px-8 py-14 md:py-16">
        <Reveal>
          <SectionHeader cmd="cat about.md" title="README" />
          <div className="card p-6 md:p-8 max-w-2xl">
            <p className="leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Motivated MERN Stack Developer and Computer Science graduate with hands-on experience
              building full-stack web applications using <span style={{ color: "var(--text)" }}>React.js, Node.js, Express.js, and MongoDB</span>.
              Proficient in consuming and integrating RESTful APIs, implementing JWT-based authentication,
              and designing responsive UIs with Tailwind CSS. Passionate about writing clean, maintainable
              code and delivering production-ready web solutions.
            </p>
            <div className="accent-line my-6" />
            <div className="mono text-xs" style={{ color: "var(--text-dim)" }}>
              <div><span className="skill-key">education</span>: <span className="skill-val">BSCS, COMSATS University Islamabad</span></div>
              <div className="mt-1"><span className="skill-key">campus</span>: <span className="skill-val">Abbottabad, Pakistan</span> · <span className="skill-key">graduated</span> <span className="skill-val">Aug 2024</span></div>
              <div className="mt-1"><span className="skill-key">languages</span>: <span className="skill-val">Urdu (native), English (fluent)</span></div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="max-w-5xl mx-auto px-5 md:px-8 py-14 md:py-16">
        <Reveal>
          <SectionHeader cmd="git log --experience" title="HISTORY" />
        </Reveal>
        <div className="max-w-2xl">
          {experience.map((job, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="commit-line flex gap-4 pb-10">
                <div className="commit-dot" />
                <div className="flex-1">
                  <div className="mono text-xs mb-1" style={{ color: "var(--copper)" }}>
                    commit {job.hash}
                  </div>
                  <h3 className="font-semibold text-lg" style={{ color: "var(--text)" }}>{job.role}</h3>
                  <div className="mono text-sm mb-3" style={{ color: "var(--text-dim)" }}>
                    {job.org} · {job.date}
                  </div>
                  <ul className="space-y-2">
                    {job.bullets.map((b, j) => (
                      <li key={j} className="text-sm leading-relaxed flex gap-2" style={{ color: "var(--text-muted)" }}>
                        <span style={{ color: "var(--cyan)" }}>+</span>{b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="max-w-5xl mx-auto px-5 md:px-8 py-14 md:py-16">
        <Reveal>
          <SectionHeader cmd="ls ./projects" title="4 REPOS" />
        </Reveal>
        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 80}>
              <div className="card p-6 h-full flex flex-col">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="mono font-bold text-base" style={{ color: "var(--cyan)" }}>{p.name}</h3>
                  <span className="mono text-xs shrink-0" style={{ color: "var(--text-dim)" }}>{p.year}</span>
                </div>
                <p className="text-sm font-medium mb-2" style={{ color: "var(--text)" }}>{p.desc}</p>
                <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "var(--text-muted)" }}>{p.detail}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.stack.map((s) => <span key={s} className="pill">{s}</span>)}
                </div>
                <div className="flex items-center gap-4 pt-3 border-t" style={{ borderColor: "var(--border)" }}>
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noreferrer" className="link-icon flex items-center gap-1.5 mono text-xs">
                      <Github size={14} /> source
                    </a>
                  )}
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer" className="link-icon flex items-center gap-1.5 mono text-xs">
                      <ExternalLink size={14} /> live
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="max-w-5xl mx-auto px-5 md:px-8 py-14 md:py-16">
        <Reveal>
          <SectionHeader cmd="cat skills.json" title="DEPENDENCIES" />
          <div className="card p-6 md:p-8 max-w-2xl mono text-sm leading-loose">
            <div style={{ color: "var(--text-dim)" }}>{"{"}</div>
            {Object.entries(skills).map(([cat, items], idx, arr) => (
              <div key={cat} className="pl-4">
                <span className="skill-key">"{cat}"</span>: [
                <div className="pl-4">
                  {items.map((it, j) => (
                    <div key={it}>
                      <span className="skill-val">"{it}"</span>{j < items.length - 1 ? "," : ""}
                    </div>
                  ))}
                </div>
                ]{idx < arr.length - 1 ? "," : ""}
              </div>
            ))}
            <div style={{ color: "var(--text-dim)" }}>{"}"}</div>
          </div>
        </Reveal>
      </section>

      {/* CONTACT */}
      <section id="contact" className="max-w-5xl mx-auto px-5 md:px-8 py-14 md:py-24">
        <Reveal>
          <SectionHeader cmd="./contact.sh" title="GET IN TOUCH" />
          <div className="card p-6 md:p-8 max-w-2xl">
            <p className="leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
              Open to fullstack and backend roles. Reach out directly — I typically respond within a day.
            </p>
            <div className="space-y-3 mono text-sm">
              <button onClick={copyEmail} className="flex items-center gap-2 w-full text-left" style={{ color: "var(--text)" }}>
                <Mail size={15} style={{ color: "var(--copper)" }} />
                muhammadali.mern067@gmail.com
                <span className="ml-auto link-icon">{copied ? <Check size={14} style={{ color: "var(--cyan)" }} /> : <Copy size={14} />}</span>
              </button>
              <a href="tel:+923002931512" className="flex items-center gap-2" style={{ color: "var(--text)" }}>
                <Phone size={15} style={{ color: "var(--copper)" }} /> +92 300 2931512
              </a>
              <a href="https://linkedin.com/in/muhammad-ali-mern067" target="_blank" rel="noreferrer" className="flex items-center gap-2" style={{ color: "var(--text)" }}>
                <Linkedin size={15} style={{ color: "var(--copper)" }} /> linkedin.com/in/muhammad-ali-mern067
              </a>
              <a href="https://github.com/syedali067" target="_blank" rel="noreferrer" className="flex items-center gap-2" style={{ color: "var(--text)" }}>
                <Github size={15} style={{ color: "var(--copper)" }} /> github.com/syedali067
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="border-t py-8" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-5xl mx-auto px-5 md:px-8 mono text-xs text-center" style={{ color: "var(--text-dim)" }}>
          exit 0 — built by Muhammad Ali Shah
        </div>
      </footer>
    </div>
  );
}
