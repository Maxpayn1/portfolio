import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Moon, Sun, ExternalLink, Code2, Star } from "lucide-react";

/* ====== DATA ====== */
const PROFILE = {
  name: "Paolo Quetel",
  title: "Passionate student",
  bio: "Undergraduate student at MOMA.",
  links: {
    github: "https://github.com/paoloquetel",
    linkedin: "https://www.linkedin.com/in/paoloquetel",
    website: "",
    email: "paolo.quetel303005@gmail.com",
  },
};

const PROJECTS = [
  { id: 1, title: "Assets développement", type: "Professionnel", year: 2025, tech: ["Java"], description: "The desire to succeed in creating graphic assets for lightzino.", link: "#" },
  { id: 2, title: "Portfolio", type: "Scolaire", year: 2025, tech: ["Nginx"], description: "Simply the creation of my own Portfolio without skills in development.", link: "https://portfoliomaxpayne.vercel.app/" },
];

const SKILLS = ["Java", "Nginx", "UI/UX", "Figma", "TailwindCSS", "Framer Motion", "Git", "Linux"];

const EXPERIENCES = [
  { year: "2025", title: "Portfolio v1", desc: "Design + mise en ligne (Vercel), dark/light mode, animations." },
  { year: "2024", title: "Assets graphique (Lightzino)", desc: "Création d’assets & déclinaisons visuelles." },
  { year: "2023", title: "MOMA — Undergraduate", desc: "Parcours étudiant, bases dev & design." },
];

/* ====== UI ====== */
const Pill = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-subtle px-2.5 py-1 text-xs font-medium">
    {children}
  </span>
);

function Section({ id, icon: Icon, title, children, className = "" }) {
  return (
    <section id={id} className={`scroll-mt-28 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-5 h-5 text-accent" />
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function ProjectCard({ p }) {
  return (
    <motion.a
      href={p.link}
      target="_blank"
      rel="noreferrer"
      className="group block rounded-2xl border border-subtle bg-white dark:bg-white/5 backdrop-blur-sm p-5 hover:border-accent/50 hover:shadow-[0_10px_30px_-12px_rgba(139,92,246,0.45)] transition"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      viewport={{ once: true }}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-accent/15">
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
    </motion.a>
  );
}

/* ====== APP ====== */
export default function App() {
  // Theme (light par défaut + persistance)
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return false;
  });
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div
      className={`
        min-h-screen
        text-neutral-900 dark:text-neutral-100
        bg-[#f9fafb]
        dark:bg-[radial-gradient(80%_60%_at_50%_-10%,rgba(139,92,246,0.15),transparent),linear-gradient(#0a0a0a,#0a0a0a)]
      `}
    >
      {/* NAV */}
      <header className="sticky top-0 z-20 border-b border-subtle bg-white/90 dark:bg-black/50 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
          <a href="#home" className="font-semibold tracking-tight">{PROFILE.name}</a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#projects" className="opacity-80 hover:opacity-100">Projects</a>
            <a href="#skills" className="opacity-80 hover:opacity-100">Skills</a>
            <a href="#contact" className="opacity-80 hover:opacity-100">Contact</a>
          </nav>
          <button
            onClick={() => setDark((d) => !d)}
            className="inline-flex items-center gap-2 rounded-full border border-subtle px-3 py-1.5 text-sm hover:border-accent/60 bg-white dark:bg-transparent"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />} Theme
          </button>
        </div>
      </header>

      {/* CONTAINER LARGE */}
      <main id="home" className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        {/* HERO EN 2 COLONNES */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Colonne gauche */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-subtle px-3 py-1 text-xs mb-4 bg-white dark:bg-white/5">
              <Star className="w-3 h-3 text-accent" /> Portfolio
            </div>

            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to fuchsia-500">
                {PROFILE.title}
              </span>
            </h1>

            {/* === STATS BAND === */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
              {[
                { k: "Projects", v: String(PROJECTS.length) },
                { k: "Focus", v: "Design assets" },
                { k: "Status", v: "Searching to work" },
              ].map((s) => (
                <div
                  key={s.k}
                  className="rounded-2xl border border-subtle bg-white dark:bg-white/5 px-4 py-3 flex items-center justify-between"
                >
                  <span className="text-[11px] uppercase tracking-wide opacity-60">{s.k}</span>
                  <span className="text-sm font-semibold">{s.v}</span>
                </div>
              ))}
            </div>

            <p className="mt-3 text-base opacity-90 max-w-prose">{PROFILE.bio}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={`mailto:${PROFILE.links.email}`} className="inline-flex items-center gap-2 rounded-full border border-subtle px-4 py-2 text-sm hover:border-accent/60 bg-white dark:bg-transparent">
                <Mail className="w-4 h-4" /> Speak to me there
              </a>
              <a href={PROFILE.links.github} target="_blank" className="inline-flex items-center gap-2 rounded-full border border-subtle px-4 py-2 text-sm hover:border-accent/60 bg-white dark:bg-transparent">
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a href={PROFILE.links.linkedin} target="_blank" className="inline-flex items-center gap-2 rounded-full border border-subtle px-4 py-2 text-sm hover:border-accent/60 bg-white dark:bg-transparent">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            </div>
          </motion.div>

          {/* Colonne droite — STICKY */}
          <motion.aside
            className="lg:col-span-5 lg:sticky top-24 rounded-3xl border border-subtle bg-white dark:bg-white/5 p-6"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-sm opacity-80 mb-3">About me</div>
            <ul className="space-y-2 text-sm">
              <li><span className="opacity-70">Name :</span> <span className="font-medium">{PROFILE.name}</span></li>
              <li><span className="opacity-70">Status :</span> <span className="font-medium">{PROFILE.title}</span></li>
              <li><span className="opacity-70">Mail :</span> <a className="underline" href={`mailto:${PROFILE.links.email}`}>{PROFILE.links.email}</a></li>
            </ul>
          </motion.aside>
        </div>

        {/* === SKILLS SECTION === */}
        <Section id="skills" icon={Code2} title="Skills" className="mt-12">
          <div className="rounded-2xl border border-subtle px-5 py-4 bg-white dark:bg-white/5">
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((s) => (
                <span key={s} className="text-sm rounded-full border border-subtle px-3 py-1.5 bg-white dark:bg-transparent">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Section>

        {/* === TIMELINE / EXPERIENCES === */}
        <section className="mt-10">
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="w-5 h-5 text-accent" />
            <h2 className="text-xl font-semibold">Experience</h2>
          </div>
          <div className="relative pl-5">
            <div className="absolute left-2 top-0 bottom-0 w-px bg-white/20 dark:bg-white/10" />
            <ul className="space-y-5">
              {EXPERIENCES.map((e, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[6px] top-1 block w-3 h-3 rounded-full bg-accent/80 ring-4 ring-accent/20" />
                  <div className="rounded-2xl border border-subtle bg-white dark:bg-white/5 px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm font-semibold">{e.title}</div>
                      <Pill>{e.year}</Pill>
                    </div>
                    <p className="mt-1 text-sm opacity-85">{e.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* PROJETS */}
        <Section id="projects" icon={Code2} title="Projets" className="mt-12">
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-8">
            {PROJECTS.map((p) => <ProjectCard key={p.id} p={p} />)}
          </div>
        </Section>

        {/* CTA */}
        <div className="mt-14 rounded-2xl border border-accent/30 bg-accent/10 p-5 flex items-center justify-between gap-4">
          <p className="text-sm">Want to collaborate on visuals or a frontend?</p>
          <a
            href={`mailto:${PROFILE.links.email}`}
            className="inline-flex items-center rounded-full border border-accent/50 px-4 py-2 text-sm hover:bg-accent/20"
          >
            Let&apos;s talk
          </a>
        </div>

        {/* CONTACT */}
        <Section id="contact" icon={Mail} title="Contact" className="mt-10">
          <div className="rounded-2xl border border-subtle p-5 bg-white dark:bg-white/5">
            <p className="text-sm opacity-90">
              Contact me :{" "}
              <a className="underline decoration-accent underline-offset-4" href={`mailto:${PROFILE.links.email}`}>
                {PROFILE.links.email}
              </a>
            </p>
          </div>
        </Section>

        <footer className="py-10 text-xs opacity-70">
          © {new Date().getFullYear()} {PROFILE.name}. Built with React + Tailwind.
        </footer>
      </main>
    </div>
  );
}
