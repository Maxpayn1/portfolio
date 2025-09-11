import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Globe, Filter, Moon, Sun, ExternalLink, Code2, Star } from "lucide-react";

const PROFILE = {
  name: "Paolo Quetel",
  title: "Passionate student",
  bio: "Undergraduate student at MOMA.",
  links: {
    github: "https://github.com/paoloquetel", // modifie si besoin
    linkedin: "https://www.linkedin.com/in/paoloquetel", // modifie si besoin
    website: "",
    email: "paolo.quetel303005@gmail.com",
  },
};

const PROJECTS = [
  {
    id: 1,
    title: "Assets développement",
    type: "Professionnel",
    year: 2024,
    tech: ["Java"],
    description: "The desire to succeed in creating graphic assets for lightzino.",
    link: "#",
  },
  {
    id: 2,
    title: "Portfolio",
    type: "Scolaire",
    year: 2025,
    tech: ["Nginx"],
    description: "Simply the creation of my own Portfolio without skills in development.",
    link: "https://portfoliomaxpayne.vercel.app/",
  },
];

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium opacity-90">
      {children}
    </span>
  );
}

function Section({ id, icon: Icon, title, children }) {
  return (
    <section id={id} className="scroll-mt-24 mt-10">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-5 h-5" />
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
      className="group block rounded-2xl border p-4 hover:shadow-md transition"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-base font-semibold flex items-center gap-2">
            <Code2 className="w-4 h-4 opacity-70" /> {p.title}
          </h3>
          <p className="mt-1 text-sm opacity-80">{p.description}</p>
        </div>
        <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100" />
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Badge>{p.type}</Badge>
        <Badge>{p.year}</Badge>
        {p.tech.map((t) => (
          <span key={t} className="text-xs opacity-70">{t}</span>
        ))}
      </div>
    </motion.a>
  );
}

export default function PortfolioApp() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return false; // 👉 Light par défaut
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const [query, setQuery] = useState("");
  const [type, setType] = useState("Tous");
  const types = ["Tous", "Scolaire", "Professionnel", "Perso"];

  const filtered = useMemo(() => {
    return PROJECTS.filter(
      (p) =>
        (type === "Tous" || p.type === type) &&
        (!query ||
          (p.title + " " + p.description + " " + p.tech.join(" "))
            .toLowerCase()
            .includes(query.toLowerCase()))
    );
  }, [query, type]);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-neutral-950 dark:text-white transition-colors">
      {/* NAV */}
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 dark:bg-neutral-950/70 border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <a href="#home" className="font-semibold">{PROFILE.name}</a>
          <nav className="hidden sm:flex items-center gap-4 text-sm">
            <a href="#projects" className="opacity-80 hover:opacity-100">Projets</a>
            <a href="#contact" className="opacity-80 hover:opacity-100">Contact</a>
          </nav>
          <button
            onClick={() => setDark((d) => !d)}
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {dark ? "Light" : "Dark"}
          </button>
        </div>
      </header>

      {/* HERO */}
      <main id="home" className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <motion.div className="mb-10" initial={{opacity:0, y:12}} animate={{opacity:1, y:0}}>
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs mb-3">
            <Star className="w-3 h-3" /> Portfolio
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight">{PROFILE.title}</h1>
          <p className="mt-3 text-sm opacity-90">{PROFILE.bio}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a href={`mailto:${PROFILE.links.email}`} className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm hover:shadow">
              <Mail className="w-4 h-4" /> Me contacter
            </a>
            <a href={PROFILE.links.github} target="_blank" className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm hover:shadow">
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a href={PROFILE.links.linkedin} target="_blank" className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm hover:shadow">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          </div>
        </motion.div>

        {/* Filtres */}
        <Section id="projects" icon={Code2} title="Projets">
          <div className="mb-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher titre, techno..."
              className="w-full rounded-xl border bg-transparent px-3 py-2 text-sm"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`rounded-full border px-3 py-1 text-xs ${type === t ? "bg-black text-white dark:bg-white dark:text-black" : "hover:shadow"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((p) => <ProjectCard key={p.id} p={p} />)}
            {filtered.length === 0 && <p className="opacity-70 text-sm">Aucun projet ne correspond à ta recherche.</p>}
          </div>
        </Section>

        {/* Contact */}
        <Section id="contact" icon={Mail} title="Contact">
          <div className="rounded-2xl border p-4">
            <p className="text-sm opacity-90">
              Contact me : <a className="underline" href={`mailto:${PROFILE.links.email}`}>{PROFILE.links.email}</a>
            </p>
          </div>
        </Section>

        <footer className="py-10 text-xs opacity-70 text-center">
          © {new Date().getFullYear()} {PROFILE.name}. Fait avec React + Tailwind.
        </footer>
      </main>
    </div>
  );
}
