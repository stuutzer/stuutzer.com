"use client";

import { Fragment, useEffect, useState } from "react";
import styles from "./WatshisnameStuutzer.module.css";

type Page = "home" | "works";

const pages: { name: string; key: Page }[] = [
  { name: "Home", key: "home" },
  { name: "Works", key: "works" },
];

const works = [
  {
    key: 1,
    name: "MTGlossary",
    time: "November 2024",
    category: "Personal",
    imgSrc: "/mtglossary.webp",
    desc: "An recurring issue I noticed while playing Magic with my friends was that trying to look up definitions for technical jargon on cards often disrupted pace and bogged down the gameplay experience. To remedy this, I built MTGlossary with a simple interface that prioritizes visual clarity and ease-of-use.",
    roles: ["Interface Design", "Product Design", "Full-Stack Development"],
    url: "https://www.mtglossary.com/",
  },
  {
    key: 2,
    name: "Tawhiti Forestry",
    time: "March 2025",
    category: "Corporate",
    imgSrc: "/tawhiti.webp",
    desc: "I was in charge of graphic design and front-end development for Tawhiti Forestry’s company website as Front-End lead at DelUXe Digital Design. I took inspiration from Gordon Walters’ iconic koru graphics to reflect the company’s connection to Aotearoa while also illustrating the role that export industries have in bringing ideas and people together.",
    roles: [
      "Graphic Design",
      "Interface Design",
      "Project Management",
      "Front-End Development",
    ],
    url: "https://www.tawhiti.co.nz/",
  },
];

const footerLinks = [
  { key: 1, name: "GitHub", url: "https://github.com/stuutzer" },
  { key: 2, name: "LinkedIn", url: "https://www.linkedin.com/in/justin-teng-tu/" }
];

export default function WatshisnameStuutzer() {
  const [page, setPage] = useState<Page>("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1280) setIsMenuOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [page]);

  const margin = page === "works" ? 0 : 7.5;
  const pageName = page === "works" ? "Works" : "Home";

  return (
    <div className={styles.root}>
      <div className={styles.background} />
      <div className={styles.content}>
        <header className={styles.navMain}>
          <nav>
            <ul>
              {pages.map((p, idx) => (
                <li key={p.key}>
                  <button
                    onClick={() => setPage(p.key)}
                    className={
                      page === p.key
                        ? `${styles.navLink} ${styles.navCurrent}`
                        : styles.navLink
                    }
                    style={{ marginLeft: `${idx * margin}rem` }}
                  >
                    {p.name}
                  </button>
                </li>
              ))}
              <li>
                <p
                  className={`${styles.navLink}`}
                  style={{ marginLeft: `${pages.length * margin}rem` }}
                  onClick={() => alert("Don't contact me.")}
                >
                  Contact
                </p>
              </li>
            </ul>
          </nav>
        </header>

        <header className={styles.menuHeader}>
          <button
            className={styles.menuButton}
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            {isMenuOpen ? "back" : "menu"}
          </button>
          <p className={styles.menuPage}> / {pageName}</p>
        </header>

        {isMenuOpen && (
          <nav className={`${styles.menuOverlay} ${styles.fadeIn}`}>
            <ul style={{ display: "flex", flexDirection: "column", gap: "1.5rem", alignItems: "center" }}>
              {pages.map((p) => (
                <li key={p.key}>
                  <button
                    onClick={() => setPage(p.key)}
                    className={
                      page === p.key
                        ? `${styles.navLink} ${styles.navCurrent}`
                        : styles.navLink
                    }
                  >
                    {p.name}
                  </button>
                </li>
              ))}
              <li>
                <p
                  className={`${styles.navLink} ${styles.navDisabled}`}
                  onClick={() => alert("Don't contact me.")}
                >
                  Contact
                </p>
              </li>
            </ul>
          </nav>
        )}

        {page === "home" && (
          <main className={`${styles.hpMain} ${styles.fadeIn}`}>
            <div className={styles.hpTitle}>
              <h1 className={styles.hpName}>Justin Tu.</h1>
              <h3 className={styles.hpAlias}>(watshisname-stuutzer.)</h3>
            </div>
            <h2 className={styles.hpOccupation}>
              Front-End Developer. UX/UI Designer.
            </h2>
            <h2 className={styles.hpOccupationMobile}>Front-End/UX/UI.</h2>
            <p className={styles.hpText}>
              This is an archive of my old portfolio.
              Portfolio in a portfolio. <br />
              {/* MAN FUCK YOU I DON'T KNOW WHAT TO WRITE ON THE TAGLINE */}
            </p>
          </main>
        )}

        {page === "works" && (
          <main className={`${styles.wpMain} ${styles.fadeIn}`}>
            {works.map((work) => (
              <section key={work.key} className={styles.wpWork}>
                <div className={styles.wpWorkTop}>
                  <p className={styles.wpWorkNumber}>
                    {work.key}/{works.length}
                  </p>
                  <div>
                    <h2 className={styles.wpWorkName}>{work.name}</h2>
                    <h3 className={styles.wpWorkInfo}>
                      {work.time} / {work.category}
                    </h3>
                  </div>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={work.imgSrc}
                  alt={`Screenshot of ${work.name} website.`}
                  className={styles.wpWorkImg}
                />
                <div className={styles.wpWorkBottom}>
                  <p className={styles.wpWorkDesc}>{work.desc}</p>
                  <aside className={styles.wpWorkAside}>
                    <p className={styles.wpWorkResp}>
                      <span className={styles.wpWorkSpan}>
                        Project Responsibilities:
                      </span>
                      <br />
                      {work.roles.join(", ") + "."}
                    </p>
                    <a
                      href={work.url}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.wpWorkLink}
                    >
                      Visit Site
                    </a>
                  </aside>
                </div>
              </section>
            ))}
          </main>
        )}

        <footer className={styles.footer}>
          {footerLinks.map((link) => (
            <Fragment key={link.key}>
              <a
                href={link.url}
                className={styles.footerLink}
                target="_blank"
                rel="noreferrer"
              >
                {link.name}
              </a>
              {link.key < footerLinks.length && " | "}
            </Fragment>
          ))}
        </footer>
      </div>
    </div>
  );
}
