import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Github, Linkedin, Mail, Moon, Sun, ExternalLink, Code2, Star, ArrowUp
} from "lucide-react";

/* ====== CONFIG LOGO (depuis /public) ====== */
const LOGO_PATH = `${import.meta.env.BASE_URL}maxpayn-logo.png.png`;
 // /public/maxpayn-logo.png
const PSEUDO = "Maxpayn";

/* ====== DATA ====== */
const PROFILE = {
  name: "Maxpayn",
  title: "Passionate student",
  bioLong:
    "I'm Paolo Quetel, a design-minded student focused on creating clean visuals and performant UIs. I enjoy bridging design and code — from crafting assets to shipping small, polished web experiences. Im lover of sport (practice a lot football and gym) and of nature (like hiking or trekking)",
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
  { t: "Java", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", c: "from-amber-400 to-orange-500" },
  { t: "Nginx", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg", c: "from-emerald-400 to-teal-500" },
  { t: "UI/UX", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", c: "from-pink-400 to-fuchsia-500" },
  { t: "Figma", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", c: "from-purple-400 to-violet-500" },
  { t: "TailwindCSS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg", c: "from-sky-400 to-cyan-500" },
  { t: "Framer Motion", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", c: "from-indigo-400 to-violet-500" },
  { t: "Git", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", c: "from-rose-400 to-red-500" },
  { t: "Linux", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", c: "from-lime-400 to-emerald-500" },
];

const EXPERIENCES = [
  { year: "2025", title: "Portfolio v1", desc: "Design + déploiement (Vercel), dark/light, animations.", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", c: "from-slate-200 to-slate-400" },
  { year: "2024", title: "Assets graphique — Lightzino", desc: "Création d’assets & déclinaisons visuelles.", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", c: "from-pink-400 to-fuchsia-500" },
  { year: "2023", title: "MOMA — Undergraduate", desc: "Parcours étudiant, bases dev & design.", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg", c: "from-sky-400 to-cyan-500" },
];

/* ====== HELPERS ====== */
const ease = [0.22, 1, 0.36, 1];
const fadeUp = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
  viewport: { once: true, amount: 0.3 },
};

/* ====== FX BACKGROUND ====== */
function BackgroundFX() {
  return (
    <>
      <div className="pointer-events-none fixed -top-24 -left-24 h-[42rem] w-[42rem] rounded-full bg-gradient-to-br from-fuchsia-500/25 via-violet-500/20 to-sky-500/10 blur-3xl" />
      <div className="pointer-events-none fixed -bottom-24 -right-24 h-[40rem] w-[40rem] rounded-full bg-gradient-to-tr from-sky-500/25 via-cyan-400/15 to-fuchsia-500/10 blur-3xl" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.06] mix-blend-soft-light [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:14px_14px]" />
    </>
  );
}

/* ====== SMALL COMPONENTS ====== */
const Pill = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-white/15 px-2.5 py-1 text-xs font-medium bg-white/5 backdrop-blur">
    {children}
  </span>
);

function SectionTitle({ children }) {
  return (
    <h2 className="text-2xl font-semibold mb-6 inline-block">
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-sky-400">
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
        <div className="h-px w-full mb-10 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        {children}
      </div>
    </section>
  );
}

/* ====== BADGES ====== */
function SkillBadge({ t, url, c }) {
  return (
    <div className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur px-3 py-2.5 flex items-center gap-3 hover:-translate-y-0.5 transition">
      <span className={`absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r ${c} opacity-15`} />
      <img src={url} alt={t} className="w-6 h-6 object-contain opacity-90" />
      <span className="text-sm font-medium">{t}</span>
    </div>
  );
}

function ExperienceItem({ title, desc, year, url, c }) {
  return (
    <div className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4 md:p-5">
      <span className={`absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r ${c} opacity-10`} />
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={url} alt={title} className="w-8 h-8 object-contain opacity-90" />
          <div>
            <div className="text-sm font-semibold">{title}</div>
            <p className="text-xs opacity-85 mt-0.5">{desc}</p>
          </div>
        </div>
        <Pill>{year}</Pill>
      </div>
    </div>
  );
}

function ProjectCard({ p }) {
  return (
    <motion.a
      href={p.link}
      target="_blank"
      rel="noreferrer"
      className="group block rounded-2xl p-[1px] bg-gradient-to-r from-fuchsia-500/60 via-violet-500/40 to-sky-500/60 hover:shadow-[0_18px_60px_-20px_rgba(147,51,234,0.45)] transition"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, ease } }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -4 }}
    >
      <div className="rounded-2xl border border-white/10 bg-zinc-900/60 backdrop-blur p-5">
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
      </div>
    </motion.a>
  );
}

/* ====== BRAND BADGE (gros logo + pseudo vert) ====== */
function BrandBadge() {
  return (
    <div className="hidden lg:flex fixed left-10 top-1/2 -translate-y-1/2 z-30">
      <div className="flex flex-col items-center">
        <div className="relative p-[4px] rounded-[28px]
                        bg-gradient-to-br from-fuchsia-500/70 via-violet-500/40 to-sky-500/60
                        shadow-[0_25px_80px_-20px_rgba(147,51,234,0.55)]">
          <div className="rounded-[24px] border border-white/15 bg-white/5 backdrop-blur p-6">
            {/* on affiche l'image en background-image => visible à coup sûr */}
            <div
              className="w-56 h-56 rounded-2xl ring-1 ring-white/10
                         shadow-[0_12px_40px_-16px_rgba(34,197,94,0.55)]
                         bg-center bg-no-repeat bg-contain"
              style={{ backgroundImage: `url("${LOGO_PATH}")` }}
              aria-label="Maxpayn logo"
            />
          </div>
        </div>

        <div className="mt-4 text-2xl font-extrabold tracking-wide drop-shadow
                        bg-gradient-to-r from-emerald-400 to-lime-500 bg-clip-text text-transparent">
          Maxpayn
        </div>
      </div>
    </div>
  );
}


/* ====== APP ====== */
export default function App() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative text-neutral-900 dark:text-neutral-100 scroll-smooth bg-[#0a0a0a]">
      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-20 border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
          <a href="#home" className="font-semibold tracking-tight">{PROFILE.name}</a>
          <button
            onClick={() => setDark((d) => !d)}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-sm hover:border-fuchsia-500/60 bg-white/5 backdrop-blur"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />} Theme
          </button>
        </div>
      </header>

      <BackgroundFX />
      <BrandBadge />

      <main className="snap-y snap-proximity">
        {/* HERO */}
        <SnapSection id="home">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease } }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs mb-5 bg-white/5 backdrop-blur">
              <Star className="w-3 h-3 text-accent" /> Portfolio
            </div>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-sky-400">
                {PROFILE.name}
              </span>
            </h1>
            <p className="mt-2 text-lg opacity-90">{PROFILE.title}</p>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur px-5 py-4">
              <p className="text-sm leading-relaxed opacity-95">{PROFILE.bioLong}</p>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
              {[{ k: "Projects", v: String(PROJECTS.length) }, { k: "Focus", v: "Design assets" }, { k: "Status", v: "Open to work" }].map((s) => (
                <div key={s.k} className="rounded-2xl border border-white/10 px-4 py-3 flex items-center justify-between bg-gradient-to-br from-white/5 via-white/0 to-white/5 backdrop-blur">
                  <span className="text-[11px] uppercase tracking-wide opacity-70">{s.k}</span>
                  <span className="text-sm font-semibold">{s.v}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </SnapSection>

        {/* SKILLS */}
        <SnapSection id="skills">
          <motion.div {...fadeUp}>
            <SectionTitle>Skills</SectionTitle>
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 md:p-8 min-h-[42vh]">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
                {SKILLS.map((s) => <SkillBadge key={s.t} {...s} />)}
              </div>
            </div>
          </motion.div>
        </SnapSection>

        {/* EXPERIENCE */}
        <SnapSection id="experience">
          <motion.div {...fadeUp}>
            <SectionTitle>Experience</SectionTitle>
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 md:p-8 space-y-4">
              {EXPERIENCES.map((e) => <ExperienceItem key={e.title} {...e} />)}
            </div>
          </motion.div>
        </SnapSection>

        {/* PROJECTS */}
        <SnapSection id="projects">
          <motion.div {...fadeUp}>
            <SectionTitle>Projects</SectionTitle>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROJECTS.map((p) => <ProjectCard key={p.id} p={p} />)}
            </div>
          </motion.div>
        </SnapSection>

        {/* CONTACT */}
        <SnapSection id="contact">
          <motion.div {...fadeUp} className="max-w-xl">
            <SectionTitle>Contact</SectionTitle>
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5">
              <div className="space-y-3 text-sm">
                <div><span className="opacity-80">Email:</span>{" "}
                  <a className="underline decoration-fuchsia-400 underline-offset-4" href={`mailto:${PROFILE.links.email}`}>
                    {PROFILE.links.email}
                  </a>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a href={`mailto:${PROFILE.links.email}`} className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm bg-gradient-to-r from-fuchsia-600 to-sky-500 text-white">
                    <Mail className="w-4 h-4" /> Mail me
                  </a>
                  <a href={PROFILE.links.github} target="_blank" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm bg-white/10 border border-white/20 text-white">
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                  <a href={PROFILE.links.linkedin} target="_blank" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm bg-white/10 border border-white/20 text-white">
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </a>
                </div>
              </div>
            </div>

            <p className="text-xs opacity-70 mt-6">
              © {new Date().getFullYear()} {PROFILE.name}. Built with React + Tailwind.
            </p>
          </motion.div>
        </SnapSection>
      </main>

      {/* Back to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 rounded-full border border-white/15 bg-white/10 backdrop-blur px-3 py-3 shadow hover:border-fuchsia-500/60"
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
