import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import {
  Github, Linkedin, Mail, Moon, Sun, ExternalLink, Code2, ArrowUp
} from "lucide-react";

/* ====== CONFIG ====== */
const LOGO_PATH = `${import.meta.env.BASE_URL}maxpayn-logo.png.png`;
const AVATAR_PATH = `${import.meta.env.BASE_URL}avatar.png`;
const PSEUDO = "Maxpayn";

/* ====== DATA ====== */
const PROFILE = {
  name: "Maxpayn",
  title: "Passionate student",
  bioLong:
    "I'm Paolo Quetel, a design-minded student focused on creating clean visuals and performant UIs. I enjoy bridging design and code — from crafting assets to shipping small, polished web experiences. Im lover of sport (practice a lot football and gym) and of nature (like hiking or trekking). I love to learn and fight new challenges. I got a real will to learn and push me to get better in every aspects of life.",
  links: {
    github: "https://github.com/paoloquetel",
    linkedin: "https://www.linkedin.com/in/paoloquetel",
    website: "",
    email: "paolo.quetel303005@gmail.com",
  },
};

const PROJECTS = [
  { id: 1, title: "Assets développement", type: "Professionnel", year: 2024, tech: ["Java"], description: "The desire to succeed in creating graphic assets for lightzino.", link: "#" },
  { id: 2, title: "Portfolio", type: "Scolaire", year: 2025, tech: ["Nginx"], description: "Simply the creation of my own Portfolio without skills in development.", link: "https://portfoliomaxpayne.vercel.app/" },
];

const SKILLS = [
  { t: "Java", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { t: "Nginx", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" },
  { t: "UI/UX", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { t: "Figma", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { t: "TailwindCSS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { t: "Framer Motion", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { t: "Git", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { t: "Linux", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
];

const EXPERIENCES = [
  { year: "2025", title: "Portfolio v1", desc: "Design + déploiement (Vercel), dark/light, animations.", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
  { year: "2024", title: "Assets graphique — Lightzino", desc: "Création d’assets & déclinaisons visuelles.", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { year: "2023", title: "MOMA — Undergraduate", desc: "Parcours étudiant, bases dev & design.", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" },
];

/* ====== HELPERS ====== */
const ease = [0.22, 1, 0.36, 1];

/* ====== SCROLL REVEALS ====== */
const reveal = {
  up:    { initial: { opacity: 0, y: 32 },  whileInView: { opacity: 1, y: 0 } },
  down:  { initial: { opacity: 0, y: -32 }, whileInView: { opacity: 1, y: 0 } },
  left:  { initial: { opacity: 0, x: -32 }, whileInView: { opacity: 1, x: 0 } },
  right: { initial: { opacity: 0, x: 32 },  whileInView: { opacity: 1, x: 0 } },
};

function Reveal({ children, dir = "up", delay = 0, duration = 0.6 }) {
  const v = reveal[dir] ?? reveal.up;
  return (
    <motion.div
      initial={v.initial}
      whileInView={{ ...v.whileInView, transition: { duration, ease, delay } }}
      viewport={{ once: true, amount: 0.25 }}
    >
      {children}
    </motion.div>
  );
}

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
};

/* ====== PARALLAX BACKGROUND ====== */
function ParallaxLayer({ children, speed = 40, className = "" }) {
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();
  const y = useTransform(scrollY, [0, 1000], [0, reduce ? 0 : -speed]);
  return (
    <motion.div
      aria-hidden
      style={{ y, willChange: "transform" }}
      className={`pointer-events-none fixed inset-0 z-0 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function BackgroundFX() {
  return (
    <>
      <ParallaxLayer speed={20}>
        <div className="absolute -top-24 -left-24 h:[42rem] w:[42rem] md:h-[42rem] md:w-[42rem] rounded-full blur-3xl
                        bg-gradient-to-br from-fuchsia-500/25 via-violet-500/20 to-sky-500/10
                        dark:from-fuchsia-500/25 dark:via-violet-500/20 dark:to-sky-500/10" />
      </ParallaxLayer>
      <ParallaxLayer speed={60}>
        <div className="absolute -bottom-40 -right-24 h:[56rem] w:[56rem] md:h-[56rem] md:w-[56rem] rounded-full blur-3xl
                        bg-gradient-to-tr from-sky-500/12 via-cyan-400/10 to-emerald-500/10
                        dark:from-sky-500/25 dark:via-cyan-400/15 dark:to-emerald-500/10" />
      </ParallaxLayer>
      <ParallaxLayer speed={90}>
        <div className="absolute right-[-10%] top-[10%] h-[40rem] w-[40rem] rounded-[40%] blur-2xl opacity-60
                        bg-[radial-gradient(closest-side,rgba(59,130,246,0.12),transparent_60%)]" />
      </ParallaxLayer>
      <ParallaxLayer speed={-25}>
        <div className="absolute inset-0 opacity-[0.06] mix-blend-soft-light
                        [background-image:radial-gradient(#000_1px,transparent_1px)]
                        dark:[background-image:radial-gradient(#fff_1px,transparent_1px)]
                        [background-size:14px_14px]" />
      </ParallaxLayer>
    </>
  );
}

/* ====== SMALL COMPONENTS ====== */
const Pill = ({ children }) => (
  <span className="inline-flex items-center rounded-full 
                   border border-black/15 dark:border-white/15 
                   px-2.5 py-1 text-xs font-medium 
                   bg-black/5 dark:bg-white/5 backdrop-blur">
    {children}
  </span>
);

function SectionTitle({ children }) {
  return (
    <h2 className="text-2xl md:text-3xl font-semibold mb-6 inline-block">
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-sky-500">
        {children}
      </span>
      <span className="block h-[2px] w-24 mt-2 bg-gradient-to-r from-fuchsia-500 to-sky-400 rounded-full" />
    </h2>
  );
}

function SnapSection({ id, children, className = "" }) {
  return (
    <section id={id} className={`snap-start scroll-mt-20 min-h-[100svh] flex items-center ${className}`}>
      <div className="mx-auto max-w-6xl w-full px-6">
        <div className="h-px w-full mb-10 bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-white/15" />
        {children}
      </div>
    </section>
  );
}

/* ====== SKILL TILE ====== */
function SkillTile({ t, url }) {
  return (
    <div className="group relative rounded-2xl p-[2px] bg-gradient-to-br from-fuchsia-500/50 via-sky-500/40 to-emerald-500/50">
      <div className="rounded-2xl border border-black/10 dark:border-white/10
                      bg-white/70 dark:bg-zinc-950/70 backdrop-blur 
                      p-5 grid place-items-center gap-3">
        <span className="grid place-items-center w-16 h-16 md:w-20 md:h-20 rounded-[12px]
                         bg-white/80 dark:bg-zinc-900/80 ring-1 ring-black/10 dark:ring-white/10">
          <img src={url} alt={t} className="w-10 h-10 md:w-12 md:h-12 object-contain" />
        </span>
        <div className="text-sm md:text-base font-semibold">{t}</div>
      </div>
      <span className="pointer-events-none absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition bg-cyan-400/10" />
    </div>
  );
}

/* ====== EXPERIENCE TILE ====== */
function ExperienceTile({ title, desc, year, url }) {
  return (
    <div className="group relative rounded-2xl p-[2px] bg-gradient-to-br from-fuchsia-500/50 via-sky-500/40 to-emerald-500/50">
      <div className="rounded-2xl border border-black/10 dark:border-white/10
                      bg-white/70 dark:bg-zinc-950/70 backdrop-blur 
                      p-5 md:p-6 h-full grid grid-rows-[auto_1fr_auto] gap-4">
        <div className="flex items-center gap-3">
          <span className="relative p-[2px] rounded-xl bg-gradient-to-br from-fuchsia-500 via-sky-500 to-emerald-500">
            <span className="grid place-items-center w-12 h-12 md:w-14 md:h-14 rounded-[10px]
                             bg-white/80 dark:bg-zinc-900/80
                             ring-1 ring-black/10 dark:ring-white/10">
              <img src={url} alt={title} className="w-7 h-7 md:w-8 md:h-8 object-contain" />
            </span>
          </span>
          <div className="font-semibold leading-tight">{title}</div>
        </div>
        <p className="text-sm md:text-[15px] opacity-90">{desc}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs opacity-70">Experience</span>
          <span className="inline-flex items-center rounded-full 
                           border border-black/15 dark:border-white/15 
                           px-2.5 py-1 text-xs 
                           bg-black/5 dark:bg-white/5 backdrop-blur">
            {year}
          </span>
        </div>
      </div>
      <span className="pointer-events-none absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition bg-cyan-400/10" />
    </div>
  );
}

function ProjectCard({ p }) {
  return (
    <a
      href={p.link}
      target="_blank"
      rel="noreferrer"
      className="group block rounded-2xl p-[1px] bg-gradient-to-r from-fuchsia-500/60 via-violet-500/40 to-sky-500/60 hover:shadow-[0_18px_60px_-20px_rgba(147,51,234,0.45)] transition"
    >
      <div className="rounded-2xl border border-black/10 dark:border-white/10 
                      bg-white/70 dark:bg-zinc-900/60 backdrop-blur p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-black/5 dark:bg-accent/15">
              <Code2 className="w-4 h-4 text-accent" />
            </span>
            <span>{p.title}</span>
          </h3>
          <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100" />
        </div>
        <p className="mt-2 text-sm opacity-90">{p.description}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Pill>{p.type}</Pill>
          <Pill>{p.year}</Pill>
          {p.tech.map((t) => (
            <span key={t} className="text-xs opacity-70">{t}</span>
          ))}
        </div>
      </div>
    </a>
  );
}

/* ====== BRAND BADGE ====== */
function BrandBadge() {
  return (
    <div className="hidden lg:flex fixed left-10 top-[30%] z-30">
      <div className="flex flex-col items-center">
        <div className="relative p-[4px] rounded-[28px] 
                        bg-gradient-to-br from-fuchsia-500/70 via-violet-500/40 to-sky-500/60 
                        shadow-[0_25px_80px_-20px_rgba(147,51,234,0.55)]">
          <div className="rounded-[24px] border border-black/15 dark:border-white/15 
                          bg-white/60 dark:bg-white/5 backdrop-blur p-6">
            <div
              className="w-56 h-56 rounded-2xl 
                         ring-1 ring-black/10 dark:ring-white/10
                         shadow-[0_12px_40px_-16px_rgba(34,197,94,0.35)]
                         dark:shadow-[0_12px_40px_-16px_rgba(34,197,94,0.55)]
                         bg-center bg-no-repeat bg-contain"
              style={{ backgroundImage: `url("${LOGO_PATH}")` }}
              aria-label="Maxpayn logo"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ====== HERO ====== */
function HeroBanner() {
  return (
    <section className="relative isolate overflow-hidden min-h-[70vh] grid place-items-center bg-transparent
                        text-neutral-900 dark:text-neutral-100">
      {/* glows (déjà via BackgroundFX) */}
      <div className="relative z-10 w-full max-w-6xl px-6 grid gap-8 md:grid-cols-[360px,1fr] items-center">
        {/* avatar */}
        <div className="mx-auto md:mx-0">
          <div className="relative">
            <img
              src={AVATAR_PATH}
              alt="Avatar"
              className="w-64 h-64 object-contain drop-shadow-[0_30px_60px_rgba(168,85,247,0.35)]"
            />
            <div className="absolute inset-0 rounded-full blur-2xl bg-fuchsia-600/15 dark:bg-fuchsia-600/25 -z-10 translate-y-4" />
          </div>
        </div>

        {/* texte */}
        <div className="space-y-6">
          <div className="relative inline-block">
            <span className="text-sm opacity-90">
              Hello! I am <span className="text-fuchsia-500 dark:text-fuchsia-400 font-medium">Paolo Quetel</span>
            </span>
            <svg viewBox="0 0 120 60" className="absolute -top-10 -left-14 w-28 h-14 text-fuchsia-400/70">
              <path d="M5,55 C35,15 70,5 110,15" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M105 12 L110 16 L103 17" fill="currentColor" />
            </svg>
          </div>

          <p className="text-xs md:text-sm tracking-[0.2em] uppercase opacity-70">A Designer who</p>

          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
            <span className="block">Judges a book</span>
            <span className="block">
              by its{" "}
              <span className="relative inline-block align-baseline px-3 py-1 font-extrabold">
                <span className="relative z-10">cover</span>
                {/* contour dégradé derrière le texte */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-full border-2 border-transparent
                             [background:linear-gradient(transparent,transparent)_padding-box,linear-gradient(90deg,#a855f7,#8b5cf6,#22d3ee)_border-box] -z-10"
                />
                {/* glow doux derrière */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -inset-2 rounded-full blur-xl bg-fuchsia-500/20 -z-20"
                />
              </span>
              …
            </span>
          </h1>

          <p className="max-w-xl text-sm md:text-base opacity-80">
            Because if the cover does not impress you, what else can?
          </p>

          <div className="pt-1">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5
                         bg-gradient-to-r from-fuchsia-600 to-indigo-500 text-white
                         shadow-[0_12px_40px_-12px_rgba(168,85,247,0.6)]"
            >
              See my work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ====== APP ====== */
export default function App() {
  // Thème: init depuis localStorage ou prefers-color-scheme, puis persiste
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative text-neutral-900 dark:text-neutral-100 scroll-smooth 
                    bg-white dark:bg-[#0a0a0a] text-[17px] md:text-[18px]">
      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-20 
                         border-b border-black/10 dark:border-white/10 
                         bg-white/60 dark:bg-black/40 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
          <a href="#home" className="font-semibold tracking-tight">{PROFILE.name}</a>
          <button
            onClick={() => setDark((d) => !d)}
            className="inline-flex items-center gap-2 rounded-full 
                       border border-black/15 dark:border-white/15 
                       px-3 py-1.5 text-sm 
                       bg-black/5 dark:bg-white/5 backdrop-blur"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />} Theme
          </button>
        </div>
      </header>

      <BackgroundFX />
      <BrandBadge />

      <main className="snap-y snap-proximity relative z-10">
        {/* HERO */}
        <HeroBanner />

        {/* ABOUT */}
        <SnapSection id="home">
          <motion.div className="max-w-4xl">
            <Reveal dir="up">
              <div className="mt-2 rounded-3xl 
                              border border-black/10 dark:border-white/10 
                              bg-black/5 dark:bg-white/5 backdrop-blur px-7 py-6">
                <p className="text-base md:text-lg leading-relaxed opacity-95">
                  {PROFILE.bioLong}
                </p>
              </div>
            </Reveal>

            <motion.div
              className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.2 }}
            >
              {[{ k: "Projects", v: String(PROJECTS.length) },
                { k: "Focus", v: "Design assets" },
                { k: "Status", v: "Open to work" }].map((s) => (
                <motion.div key={s.k} variants={item}
                  className="rounded-2xl 
                             border border-black/10 dark:border-white/10 
                             px-6 py-5 flex items-center justify-between 
                             bg-gradient-to-br from-black/5 via-black/0 to-black/5
                             dark:from-white/5 dark:via-white/0 dark:to-white/5 backdrop-blur">
                  <span className="text-[11px] uppercase tracking-wide opacity-70">{s.k}</span>
                  <span className="text-lg font-semibold">{s.v}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </SnapSection>

        {/* SKILLS */}
        <SnapSection id="skills">
          <Reveal>
            <SectionTitle>Skills</SectionTitle>

            <motion.div
              className="relative overflow-hidden rounded-3xl
                         border border-black/10 dark:border-white/10
                         bg-black/5 dark:bg-white/5 backdrop-blur p-6 md:p-10 min-h-[60vh]"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* glow discret haut-gauche */}
              <span
                aria-hidden
                className="pointer-events-none absolute -left-28 -top-28 w-[380px] h-[380px] rounded-full
                           blur-3xl bg-gradient-to-br from-fuchsia-500/18 via-violet-500/12 to-transparent"
              />
              {/* gros glow bas-droit */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-24 -bottom-24 w-[560px] h-[560px] rounded-full
                           blur-3xl bg-gradient-to-tr from-sky-500/0 via-cyan-500/14 to-emerald-500/22"
              />
              {/* trame de micro-points */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.06]
                           [background-image:radial-gradient(currentColor_1px,transparent_1px)]
                           [background-size:14px_14px]"
              />

              {/* grille de tuiles */}
              <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-7">
                {SKILLS.map((s) => (
                  <motion.div key={s.t} variants={item}>
                    <SkillTile {...s} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Reveal>
        </SnapSection>

        {/* EXPERIENCE */}
        <SnapSection id="experience">
          <SectionTitle>Experience</SectionTitle>
          <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur p-6 md:p-10 min-h-[60vh]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
              {EXPERIENCES.map((e) => (
                <div key={e.title}>
                  <ExperienceTile {...e} />
                </div>
              ))}
            </div>
          </div>
        </SnapSection>

        {/* PROJECTS */}
        <SnapSection id="projects">
          <SectionTitle>Projects</SectionTitle>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((p) => (
              <div key={p.id}>
                <ProjectCard p={p} />
              </div>
            ))}
          </div>
        </SnapSection>

        {/* CONTACT */}
        <SnapSection id="contact">
          <Reveal>
            <SectionTitle>Contact</SectionTitle>
            <div className="rounded-2xl 
                            border border-black/10 dark:border-white/10 
                            bg-black/5 dark:bg-white/5 backdrop-blur p-5 max-w-xl">
              <div className="space-y-3 text-sm">
                <div>
                  <span className="opacity-80">Email:</span>{" "}
                  <a className="underline decoration-fuchsia-500 underline-offset-4" href={`mailto:${PROFILE.links.email}`}>
                    {PROFILE.links.email}
                  </a>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a href={`mailto:${PROFILE.links.email}`} className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm bg-gradient-to-r from-fuchsia-600 to-sky-500 text-white">
                    <Mail className="w-4 h-4" /> Mail me
                  </a>
                  <a href={PROFILE.links.github} target="_blank" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm 
                    bg-black/5 dark:bg-white/10 border border-black/15 dark:border-white/20">
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                  <a href={PROFILE.links.linkedin} target="_blank" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm 
                    bg-black/5 dark:bg-white/10 border border-black/15 dark:border-white/20">
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </a>
                </div>
              </div>
            </div>
            <p className="text-xs opacity-70 mt-6">
              © {new Date().getFullYear()} {PROFILE.name}. Built with React + Tailwind.
            </p>
          </Reveal>
        </SnapSection>
      </main>

      {/* Back to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 rounded-full 
                     border border-black/15 dark:border-white/15 
                     bg-black/5 dark:bg-white/10 backdrop-blur px-3 py-3 shadow hover:border-fuchsia-500/60"
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
