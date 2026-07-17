import {
  Heart,
  Calendar,
  MapPin,
  Terminal,
  ExternalLink,
  Shield,
  ArrowRight,
  Star,
} from "lucide-react";

// ─── Timeline Data ───────────────────────────────────────────────
interface Milestone {
  date: string;
  title: string;
  description: string;
  icon: "star" | "heart" | "shield" | "terminal" | "calendar" | "map";
}

const milestones: Milestone[] = [
  {
    date: "September 15, 2001",
    title: "Born in Oklahoma",
    description:
      "Born in Oklahoma, adopted into a challenging household that would shape years of struggle and survival. Oklahoma would become a place she'd have to escape to survive.",
    icon: "star",
  },
  {
    date: "2020",
    title: "Graduated High School & Tech",
    description:
      "Graduated Stillwater High School with a 4.0 GPA and completed Meridian Tech's vocational program — also with a 4.0 GPA. Despite the academic excellence, the ACT didn't reflect her capabilities due to cognitive processing differences.",
    icon: "star",
  },
  {
    date: "2023 — 2024",
    title: "Escape from Oklahoma",
    description:
      "Drove 1,700 miles in 3 days to escape Oklahoma for Washington state. Nearly died in a car accident in Montana during the escape. Left behind an abusive situation and a system that had failed her repeatedly.",
    icon: "map",
  },
  {
    date: "February 2025",
    title: "Started HRT",
    description:
      "Began estrogen-based hormone replacement therapy. A pivotal moment in her medical transition — the start of becoming the woman she always knew she was.",
    icon: "heart",
  },
  {
    date: "January 30, 2026",
    title: "Legal Name Change",
    description:
      "Legally changed her name from Johnathan Spiva to Natalie Spiva. The court signed off, making her identity official in the eyes of the law.",
    icon: "shield",
  },
  {
    date: "February 2025",
    title: "Came Out as Transgender",
    description:
      "Came out as a transgender woman — the moment she stopped hiding and started living openly as herself. Started going by Natalie publicly.",
    icon: "heart",
  },
  {
    date: "May 19, 2026",
    title: "ID Updated — Female Marker",
    description:
      "Received updated identification with her chosen name (Natalie) and female gender marker. A moment of validation after years of paperwork, appointments, and persistence.",
    icon: "shield",
  },
  {
    date: "2026",
    title: "Co-Lead @ AcreetionOS",
    description:
      "Co-leads AcreetionOS — an Arch LTS-based Linux distribution. Builds ISOs, installers, and repos. Runs the infrastructure that keeps the project alive. 99.9% uptime or bust. 'If it's not Arch LTS, it's garbage.'",
    icon: "terminal",
  },
  {
    date: "Fall 2026",
    title: "Starting Spokane Community College",
    description:
      "After dropping out of OSU years prior because 'the system wasn't built for her,' Natalie is returning to education at Spokane Community College — on her own terms this time.",
    icon: "calendar",
  },
];

function getMilestoneIcon(icon: Milestone["icon"]) {
  switch (icon) {
    case "star":
      return <Star className="w-5 h-5" />;
    case "heart":
      return <Heart className="w-5 h-5" />;
    case "shield":
      return <Shield className="w-5 h-5" />;
    case "terminal":
      return <Terminal className="w-5 h-5" />;
    case "calendar":
      return <Calendar className="w-5 h-5" />;
    case "map":
      return <MapPin className="w-5 h-5" />;
  }
}

function getMilestoneColor(icon: Milestone["icon"]) {
  switch (icon) {
    case "star":
      return "bg-amber-500/20 text-amber-400 border-amber-500/50";
    case "heart":
      return "bg-pink-500/20 text-pink-400 border-pink-500/50";
    case "shield":
      return "bg-blue-500/20 text-blue-400 border-blue-500/50";
    case "terminal":
      return "bg-emerald-500/20 text-emerald-400 border-emerald-500/50";
    case "calendar":
      return "bg-purple-500/20 text-purple-400 border-purple-500/50";
    case "map":
      return "bg-orange-500/20 text-orange-400 border-orange-500/50";
  }
}

// ─── Page ────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-trans-pink blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-trans-blue blur-[128px]" />
        </div>

        <div className="relative z-10 text-center max-w-3xl">
          {/* Trans flag accent bar */}
          <div className="h-1.5 w-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-trans-blue via-trans-pink to-white" />

          {/* Name */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight mb-4">
            <span className="text-trans-flag">Natalie Spiva</span>
          </h1>

          {/* Pronouns */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="px-4 py-1.5 rounded-full border border-trans-pink/40 text-trans-pink text-sm font-medium">
              she / her
            </span>
            <span className="px-4 py-1.5 rounded-full border border-trans-blue/40 text-trans-blue text-sm font-medium">
              &zwj;🏳️‍⚧️&zwj;
            </span>
          </div>

          {/* Tagline */}
          <p className="text-xl sm:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Trans woman. Co-Lead of{" "}
            <a
              href="https://acreetionos.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-trans-blue hover:underline"
            >
              AcreetionOS
            </a>
            . Survivor. Builder. &quot;Kiss my ass, I know who I am.&quot;
          </p>

          {/* CTA */}
          <a
            href="#timeline"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all text-sm font-medium"
          >
            Explore My Journey <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-slate-600 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 rounded-full bg-slate-400" />
          </div>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section className="py-20 px-4 border-t border-slate-800/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-center">
            <span className="text-trans-flag">About Me</span>
          </h2>

          <div className="space-y-5 text-lg text-slate-300 leading-relaxed">
            <p>
              I&apos;m Natalie. A trans woman from Oklahoma who survived an abusive
              childhood, a system that failed me, and a 1,700-mile escape to
              Washington state — where I nearly died in a car crash in Montana
              along the way.
            </p>
            <p>
              I&apos;m a Linux disaster lesbian, an Arch LTS supremacist, and the
              Co-Lead of{" "}
              <a
                href="https://acreetionos.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-trans-blue hover:underline font-medium"
              >
                AcreetionOS
              </a>{" "}
              — where I build the ISOs, installers, and repos that power our
              distribution. 99.9% uptime. If it&apos;s not Arch LTS, it&apos;s garbage.
            </p>
            <p>
              Diagnosed with BPD, CPTSD, Bipolar 1, Autism, DID, and
              Schizophrenia — but none of those define me. I&apos;m a &quot;genius
              autistic&quot; who struggles with ordinary tasks but operates at an
              extraordinary level technically. I am not broken. I am not
              less-than. I am built differently.
            </p>
            <p>
              I live in Spokane, Washington with my boyfriend Dylan and our
              cats. I&apos;m a Trans Republican who separates identity from politics.
              I believe in authenticity, resilience, community, and building
              things that matter.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section
        id="timeline"
        className="py-20 px-4 border-t border-slate-800/50"
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
            <span className="text-trans-flag">Transition Timeline</span>
          </h2>
          <p className="text-center text-slate-400 mb-12 max-w-xl mx-auto">
            The milestones of my journey — from survival to becoming who I was
            always meant to be.
          </p>

          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-[2px] timeline-line opacity-40" />

            <div className="space-y-12">
              {milestones.map((m, i) => (
                <div key={i} className="relative pl-14">
                  {/* Circle on timeline */}
                  <div
                    className={`absolute left-0 top-1 w-10 h-10 rounded-full border-2 flex items-center justify-center ${getMilestoneColor(m.icon)}`}
                  >
                    {getMilestoneIcon(m.icon)}
                  </div>

                  {/* Content */}
                  <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors">
                    <time className="text-xs font-mono text-trans-pink/80 mb-1.5 block">
                      {m.date}
                    </time>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {m.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PROJECTS ═══ */}
      <section className="py-20 px-4 border-t border-slate-800/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-center">
            <span className="text-trans-flag">What I Build</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* AcreetionOS */}
            <a
              href="https://acreetionos.org"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-slate-900/60 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all hover:-translate-y-0.5"
            >
              <Terminal className="w-8 h-8 text-trans-blue mb-4" />
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-trans-blue transition-colors">
                AcreetionOS
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Arch LTS-based Linux distribution. I build the ISOs, installers,
                and repos. 99.9% uptime. Co-Lead &amp; infrastructure.
              </p>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/spivanatalie64"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-slate-900/60 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all hover:-translate-y-0.5"
            >
              <ExternalLink className="w-8 h-8 text-trans-pink mb-4" />
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-trans-pink transition-colors">
                GitHub
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Open source projects, system tooling, and infrastructure code
                that powers everything I build.
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* ═══ SOCIAL / CLOSING ═══ */}
      <section className="py-20 px-4 border-t border-slate-800/50">
        <div className="max-w-2xl mx-auto text-center">
          <div className="h-1 w-16 mx-auto mb-8 rounded-full bg-gradient-to-r from-trans-blue via-trans-pink to-white" />

          <h2 className="text-3xl font-bold mb-4">
            <span className="text-trans-flag">Stay Connected</span>
          </h2>

          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            I&apos;m building things, surviving, and thriving. Come find me.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://acreetionos.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all text-sm font-medium"
            >
              <Terminal className="w-4 h-4" /> AcreetionOS
            </a>
            <a
              href="https://github.com/spivanatalie64"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all text-sm font-medium"
            >
              <ExternalLink className="w-4 h-4" /> GitHub
            </a>
            <a
              href="mailto:natalie@acreetionos.org"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all text-sm font-medium"
            >
              <Heart className="w-4 h-4" /> Email Me
            </a>
          </div>

          <p className="mt-12 text-slate-500 italic">
            &quot;I am not broken. I am not less-than. I am built differently.&quot;
            <br />
            <span className="text-xs text-slate-600 mt-1 block">
              &mdash; Natalie Spiva
            </span>
          </p>
        </div>
      </section>
    </main>
  );
}
