import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/Container";
import { CopyToClipboard } from "@/components/CopyToClipboard";
import { Figure } from "@/components/Figure";
import { ViewCounter } from "@/components/ViewCounter";
import { SIMVLA } from "@/lib/simvla";

export const metadata: Metadata = {
  title: "SimVLA",
  description: SIMVLA.tagline,
};

function getTable(id: string) {
  const t = SIMVLA.tables.find((x) => x.id === id);
  if (!t) throw new Error(`Missing table: ${id}`);
  return t;
}

function TableBlock({
  id,
  number,
}: {
  id: string;
  number: number;
}) {
  const t = getTable(id);
  return (
    <div className="space-y-3">
      <div className="max-w-3xl mb-8">
        <h4 className="mt-4 text-base font-semibold text-slate-900">
          {t.title}
        </h4>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">
          {t.description}
        </p>
      </div>
      <Figure
        src={t.src}
        alt={t.alt}
        width={t.width}
        height={t.height}
        caption={t.caption}
        maxWidthPx={800}
      />
    </div>
  );
}

function SectionTitle({
  id,
  title,
  subtitle,
}: {
  id?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div id={id} className="scroll-mt-24">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-2 max-w-3xl text-base text-slate-600">{subtitle}</p>
      ) : null}
    </div>
  );
}

function Button({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "blue";
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20";
  let styles = "";
  if (variant === "primary") {
    styles = "bg-slate-900 text-white hover:bg-slate-800";
  } else if (variant === "blue") {
    styles = "bg-[#3b82f6] text-white hover:bg-[#2563eb]";
  } else {
    styles = "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50";
  }

  // Check if it's an external link (http/https)
  const isExternal = /^https?:\/\//.test(href);
  const extraProps = isExternal
    ? { target: "_blank", rel: "noreferrer" }
    : {};

  return (
    <a href={href} className={`${base} ${styles}`} {...extraProps}>
      {children}
    </a>
  );
}

function Icon({ name, className }: { name: string; className?: string }) {
  switch (name) {
    case "document-text":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={className}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </svg>
      );
    case "chart-bar":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={className}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
          />
        </svg>
      );
    case "database":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={className}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
          />
        </svg>
      );
    case "lightning-bolt":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={className}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
          />
        </svg>
      );
    case "cube":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={className}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
          />
        </svg>
      );
    default:
      return null;
  }
}

export default function SimvlaPage() {
  return (
    <div className="min-h-dvh bg-[#faf8f2]">
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-[#faf8f2]/80 backdrop-blur">
        <Container className="py-3">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/home"
              className="text-3xl font-semibold tracking-tight text-slate-900"
            >
              Frontier Robotics
            </Link>

            <nav className="hidden items-center gap-6 text-lg text-slate-600 md:flex">
              <a className="hover:text-slate-900" href="#overview">
                Overview
              </a>
              <a className="hover:text-slate-900" href="#architecture">
                Architecture
              </a>
              <a className="hover:text-slate-900" href="#training">
                Training
              </a>
              <a className="hover:text-slate-900" href="#evaluation">
                Evaluation
              </a>
              <a className="hover:text-slate-900" href="#citation">
                Citation
              </a>
            </nav>
          </div>
        </Container>
      </header>

      <main>
        <section className="pt-12 pb-0">
          <Container>
            <div className="mx-auto text-center">
              <h1 className="mt-4 text-balance font-serif text-4xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
                {SIMVLA.title}
              </h1>
              <p className="mt-4 text-pretty text-base text-slate-700 sm:text-lg">
                {SIMVLA.authors}
              </p>

              <p className="mx-auto mt-6 max-w-3xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg">
                {SIMVLA.tagline}
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button href="https://github.com/LUOyk1999/SimVLA" variant="primary">
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  Code
                </Button>
                <Button href="#citation" variant="secondary">
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                  Citation
                </Button>
                <div className="flex items-center gap-2">
                  <ViewCounter slug="simvla" />
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-12 sm:py-16" id="overview">
          <Container>
            <SectionTitle
              title="Overview"
              subtitle="A concise summary of the motivation, contributions, and key takeaways."
            />
            <div className="mt-6 space-y-6">
              <p className="whitespace-pre-line text-base leading-relaxed text-slate-700">
                {SIMVLA.abstract}
              </p>

              <div>
                <h3 className="mb-4 text-base font-semibold text-slate-900">
                  Main contributions
                </h3>
                <div className="grid gap-6 sm:grid-cols-3">
                  {SIMVLA.contributions.map((item) => (
                    <div
                      key={item.title}
                      className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
                    >
                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-50">
                          <Icon
                            name={item.icon}
                            className={`h-6 w-6 ${
                              item.color === "indigo"
                                ? "text-indigo-600"
                                : item.color === "emerald"
                                  ? "text-emerald-600"
                                  : "text-amber-600"
                            }`}
                          />
                        </div>
                        <h4 className="text-base font-bold text-slate-900">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-sm leading-relaxed text-slate-600">
                        {item.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section
          className="border-y border-slate-200/70 bg-white/70 py-12 sm:py-16"
          id="architecture"
        >
          <Container>
            <SectionTitle
              title="Model architecture"
              subtitle="A minimal “VLM encoder + lightweight action head” design, with perception and control strictly decoupled."
            />
            <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:items-start">
              <div className="rounded-2xl border border-slate-200 bg-white px-5 py-[16px] shadow-sm">
                <h3 className="text-base font-semibold text-slate-900">
                  Design principle
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  SimVLA keeps the architecture intentionally minimal to serve as
                  a clean baseline. The vision-language backbone is executed
                  once per control step, and the action head handles the
                  denoising iterations efficiently.
                </p>

                <h3 className="mt-3 text-base font-semibold text-slate-900">
                  Implementation notes
                </h3>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
                  <li>
                    Perception and control are decoupled: a standard VLM encoder
                    produces fused vision-language tokens.
                  </li>
                  <li>
                    A lightweight action transformer performs flow-matching
                    denoising to generate continuous action chunks.
                  </li>
                  <li>
                    The modular design makes it straightforward to swap
                    backbones while keeping the action head comparable.
                  </li>
                </ul>
              </div>

              <div>
                <Figure {...SIMVLA.figures.architecture} />
              </div>
            </div>
          </Container>
        </section>

        <section className="py-12 sm:py-16" id="training">
          <Container>
            <SectionTitle
              title="Training and inference recipe"
              subtitle="Standardizing critical training dynamics for fair comparison."
            />
            <div className="mt-8 space-y-10">
              <div className="space-y-8">
                <p className="max-w-4xl text-base leading-relaxed text-slate-700">
                  {SIMVLA.trainingRecipe.intro}
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {SIMVLA.trainingRecipe.points.map((point) => (
                  <div
                    key={point.title}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                          point.color === "blue"
                            ? "bg-blue-600"
                            : point.color === "emerald"
                              ? "bg-emerald-600"
                              : point.color === "amber"
                                ? "bg-amber-600"
                                : "bg-fuchsia-600"
                        }`}
                      >
                        <Icon name={point.icon} className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="text-base font-bold text-slate-900">
                        {point.title}
                      </h4>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-600">
                      {point.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section
          className="border-y border-slate-200/70 bg-white/70 py-12 sm:py-16"
          id="evaluation"
        >
          <Container>
            <SectionTitle
              title="Evaluation"
              subtitle="Experimental results organized to match the paper (simulation → robot benchmarks → real robot)."
            />

            <div className="mt-8 space-y-10">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Simulation results
                  </h3>
                  <p className="max-w-3xl text-sm leading-relaxed text-slate-600">
                    LIBERO benchmark performance and LIBERO-PRO robustness.
                    Click any table to open the full-size image.
                  </p>
                </div>
                <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
                  <TableBlock id="table2" number={2} />
                  <TableBlock id="table3" number={3} />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Robot benchmark results
                  </h3>
                  <p className="max-w-3xl text-sm leading-relaxed text-slate-600">
                    Results on WidowX and Google Robot tasks.
                  </p>
                </div>
                <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
                  <TableBlock id="table4" number={4} />
                  <TableBlock id="table5" number={5} />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Real-robot results
                  </h3>
                  <p className="max-w-3xl text-sm leading-relaxed text-slate-600">
                    Zero-shot evaluation on Galaxea R1 Lite, plus qualitative
                    deployment snapshots.
                  </p>
                </div>
                <div className="grid gap-4 lg:grid-cols-1 lg:items-start">
                  <div>
                    <h4 className="text-base font-semibold text-slate-900">
                      Qualitative examples
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {SIMVLA.figures.realRobotExamples.caption}
                    </p>
                  </div>
                  <Figure
                    {...SIMVLA.figures.realRobotExamples}
                    caption={undefined}
                    maxWidthPx={800}
                  />
                </div>
                <div className="grid gap-4 lg:grid-cols-1 lg:items-start">
                  <div>
                    <h4 className="text-base font-semibold text-slate-900">
                      Quantitative results
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {SIMVLA.figures.realRobotResults.caption}
                    </p>
                  </div>
                  <Figure
                    {...SIMVLA.figures.realRobotResults}
                    caption={undefined}
                    maxWidthPx={800}
                  />
                </div>
              </div>
              <div className="space-y-4 grid gap-8 lg:grid-cols-2 lg:items-start">
                <div className="lg:col-span-1">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-slate-900">
                      Ablation studies
                    </h3>
                    <p className="max-w-3xl text-sm leading-relaxed text-slate-600">
                      Analysis of key architectural decisions on the LIBERO benchmark.
                    </p>
                  </div>
                  <div className="grid gap-8">
                    <TableBlock id="table6" number={6} />
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 col-span-1">
                    <h4 className="mb-2 font-bold text-slate-900">
                      {SIMVLA.ablationStudies.title}
                    </h4>
                    <p className="mb-4 text-sm text-slate-700">
                      {SIMVLA.ablationStudies.intro}
                    </p>
                    <div className="space-y-4">
                      {SIMVLA.ablationStudies.points.map((point) => (
                        <div
                          key={point.title}
                          className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
                        >
                          <div className="mb-3 flex items-center gap-3">
                            <div
                              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                                point.color === "indigo"
                                  ? "bg-indigo-600"
                                  : point.color === "emerald"
                                    ? "bg-emerald-600"
                                    : "bg-amber-600"
                              }`}
                            >
                              <Icon
                                name={point.icon}
                                className="h-5 w-5 text-white"
                              />
                            </div>
                            <h5 className="text-sm font-bold text-slate-900">
                              {point.title}
                            </h5>
                          </div>
                          <p className="text-xs leading-relaxed text-slate-600">
                            {point.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-6">
                Performance & efficiency
              </h3>
              <div className="mt-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
                <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                  <div className="space-y-4">
                    <p className="text-base leading-relaxed text-slate-600">
                      We compare SimVLA against state-of-the-art baselines (OpenVLA, &pi;<sub>0</sub>) under a strictly matched evaluation setup.
                      SimVLA outperforms larger models while requiring significantly fewer resources.
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      {getTable("table1").description}
                    </p>
                  </div>
                  

                  <div>
                    <Figure
                      src={getTable("table1").src}
                      alt={getTable("table1").alt}
                      width={getTable("table1").width}
                      height={getTable("table1").height}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-12 sm:py-16" id="citation">
          <Container>
            <SectionTitle
              title="Citation"
              subtitle="BibTeX entry for this work."
            />

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-medium text-slate-700">BibTeX</p>
                <CopyToClipboard text={SIMVLA.bibtex} />
              </div>
              <pre className="mt-4 overflow-auto rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs leading-relaxed text-slate-800 sm:text-sm">
                <code>{SIMVLA.bibtex}</code>
              </pre>
            </div>
          </Container>
        </section>
      </main>

      <footer className="border-t border-slate-200 py-10">
        <Container>
          <p className="text-sm text-slate-600">
            The right of final interpretation is reserved by the
            <span className="font-bold"> Frontier Robotics </span> 
            development team.
          </p>
        </Container>
      </footer>
    </div>
  );
}

