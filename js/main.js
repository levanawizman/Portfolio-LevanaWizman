/* Données d'exemple (fallback si content.json n'est pas chargé) */
const defaultData = {
  identite: {
    nom: "Nom Prénom",
    titre: "Portfolio – BTS SIO SLAM – Année 2025-2026",
    date: "Novembre 2025",
    photoUrl: "https://via.placeholder.com/220x220.png?text=Photo",
    logoEcoleUrl: "https://via.placeholder.com/140x80.png?text=Ecole",
    logoEntrepriseUrl: "https://via.placeholder.com/140x80.png?text=Entreprise",
  },
  liens: {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    email: "prenom.nom@email.com",
  },
  introduction: {
    phrase:
      "Étudiant(e) en BTS SIO option SLAM en alternance, passionné(e) par le développement et l’apprentissage continu.",
    situation: "BTS SIO SLAM (2025–2026), alternance chez 2C Démarches",
    objectifPro:
      "Devenir développeur(se) full‑stack et évoluer vers l’architecture logicielle.",
  },
  apropos: {
    parcours:
      "Parcours scolaire (lycée, premières expériences techniques et projets).",
    pourquoiBts: "Approche concrète, professionnalisante et alternance.",
    pourquoiSlam: "Attirance pour la logique et la création d’applications.",
    anneeEtranger: "Année à l’étranger (humanitaire) – missions, apprentissages.",
    objectifs: "Poursuite d’études et montée en compétences full‑stack.",
  },
  competences: {
    langages: ["JavaScript (ES6+)", "TypeScript", "PHP", "Java", "Python", "SQL"],
    outils: ["Git", "GitHub", "VS Code", "Docker (bases)", "Postman", "Figma"],
    bdd: ["MySQL", "PostgreSQL (bases)", "SQLite"],
    methodes: ["Scrum (bases)", "Kanban", "UML"],
    enCours: ["React", "Symfony", "Tailwind CSS"],
  },
  experience: [
    {
      entreprise: "2C Démarches",
      periode: "2025–2026",
      missions: [
        "Développement et maintenance de fonctionnalités web",
        "Support aux équipes sur des scripts et automatisations",
        "Participation aux revues de code et à la documentation",
      ],
      outils: ["Git/GitHub", "React (bases)", "PHP/Symfony (bases)", "MySQL", "Trello"],
      apprentissages: [
        "Montée en compétence sur un codebase existant",
        "Organisation du travail en alternance",
        "Bonnes pratiques de versionnement",
      ],
    },
  ],
  projets: [
    {
      titre: "Site vitrine React",
      contexte: "Projet d’initiation front-end",
      objectif: "Créer un site vitrine simple",
      role: "Développeur front",
      technos: ["React", "Vite", "CSS Modules"],
      imageUrl: "https://via.placeholder.com/640x360.png?text=Projet+React",
      lecons:
        "Gestion d’état, composants, props, déploiement sur GitHub Pages",
    },
  ],
  veille: [
    {
      titre: "Git & GitHub",
      problematique:
        "Comment structurer une bonne pratique de versionnement en équipe ?",
      outils: "Git, GitHub Issues/Projects, GitHub Actions (bases)",
      exemplePerso: "Workflow feature branches + pull requests.",
      conclusion:
        "Mieux collaborer, tracer l’historique et automatiser des vérifications.",
    },
    {
      titre: "IA pour les développeurs",
      problematique:
        "Comment gagner en productivité sans perdre la compréhension ?",
      outils: "Assistants IA, Copilot, générateurs de tests",
      exemplePerso: "Audit de code et génération de tests unitaires.",
      conclusion:
        "Accélérer les tâches répétitives tout en restant maître du code.",
    },
  ],
  annexes: {
    cvUrl: "",
    veillePdfUrls: [],
    projetGitHubUrls: ["https://github.com/"],
    certificats: [],
  },
};

const $ = (id) => document.getElementById(id);

function setText(id, value) {
  const node = $(id);
  if (node && typeof value === "string" && value.trim()) node.textContent = value;
}

function setImage(id, src) {
  const node = $(id);
  if (node && src) {
    node.src = src;
  }
}

function setLink(id, href, label) {
  const node = $(id);
  if (!node) return;
  if (href && href.trim() && href !== "#") {
    node.href = href;
    if (label) node.textContent = label;
  } else {
    node.removeAttribute("href");
  }
}

function create(tag, attrs = {}, children = []) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") el.className = v;
    else if (k === "html") el.innerHTML = v;
    else if (v !== undefined && v !== null) el.setAttribute(k, v);
  }
  for (const child of children) {
    if (typeof child === "string") el.appendChild(document.createTextNode(child));
    else if (child) el.appendChild(child);
  }
  return el;
}

function renderCompetences(root, data) {
  root.innerHTML = "";
  const mapping = [
    ["Langages", data.langages],
    ["Outils", data.outils],
    ["Bases de données", data.bdd],
    ["Méthodes", data.methodes],
    ["En cours d’apprentissage", data.enCours],
  ];
  for (const [title, list] of mapping) {
    if (!list || !list.length) continue;
    const ul = create(
      "ul",
      {},
      list.map((item) => create("li", {}, [item]))
    );
    const tile = create("div", { class: "tile" }, [
      create("h3", {}, [title]),
      ul,
    ]);
    root.appendChild(tile);
  }
}

function renderExperience(root, items) {
  root.innerHTML = "";
  if (!Array.isArray(items)) return;
  for (const exp of items) {
    const missions = (exp.missions || []).map((m) => create("li", {}, [m]));
    const outils = (exp.outils || []).map((m) => create("li", {}, [m]));
    const apprentissages = (exp.apprentissages || []).map((m) =>
      create("li", {}, [m])
    );
    const node = create("article", { class: "exp-item" }, [
      create("h3", {}, [exp.entreprise || "Entreprise"]),
      create("p", { class: "meta" }, [exp.periode || "Période"]),
      missions.length
        ? create("div", {}, [create("strong", {}, ["Missions"]), create("ul", {}, missions)])
        : null,
      outils.length
        ? create("div", {}, [create("strong", {}, ["Outils"]), create("ul", {}, outils)])
        : null,
      apprentissages.length
        ? create("div", {}, [create("strong", {}, ["Ce que j’ai appris"]), create("ul", {}, apprentissages)])
        : null,
    ]);
    root.appendChild(node);
  }
}

function renderProjets(root, items) {
  root.innerHTML = "";
  if (!Array.isArray(items)) return;
  for (const prj of items) {
    const tags = (prj.technos || []).map((t) => create("span", { class: "tag" }, [t]));
    const node = create("div", { class: "card" }, [
      prj.imageUrl ? create("img", { src: prj.imageUrl, alt: prj.titre || "Projet" }) : null,
      create("div", { class: "content" }, [
        create("h3", {}, [prj.titre || "Projet"]),
        prj.contexte ? create("p", {}, ["Contexte: ", prj.contexte]) : null,
        prj.objectif ? create("p", {}, ["Objectif: ", prj.objectif]) : null,
        prj.role ? create("p", {}, ["Rôle: ", prj.role]) : null,
        tags.length ? create("div", { class: "tags" }, tags) : null,
        prj.lecons ? create("p", {}, ["Apprentissages: ", prj.lecons]) : null,
      ]),
    ]);
    root.appendChild(node);
  }
}

function renderVeille(root, items) {
  root.innerHTML = "";
  if (!Array.isArray(items)) return;
  for (const v of items) {
    const node = create("article", { class: "veille-item" }, [
      create("h3", {}, [v.titre || "Veille"]),
      v.problematique || v.problematique === ""
        ? create("p", {}, ["Problématique: ", v.problematique || ""]) : null,
      v.outils || v.outils === ""
        ? create("p", {}, ["Outils: ", v.outils || ""]) : null,
      v.exemplePerso || v.exemplePerso === ""
        ? create("p", {}, ["Exemple perso: ", v.exemplePerso || ""]) : null,
      v.conclusion || v.conclusion === ""
        ? create("p", {}, ["Conclusion: ", v.conclusion || ""]) : null,
    ]);
    root.appendChild(node);
  }
}

function renderAnnexes(root, annexes) {
  root.innerHTML = "";
  if (!annexes) return;
  const { cvUrl, veillePdfUrls, projetGitHubUrls, certificats } = annexes;
  if (cvUrl) {
    root.appendChild(
      create("li", {}, [create("a", { href: cvUrl, target: "_blank", rel: "noopener" }, ["CV"])])
    );
  }
  if (Array.isArray(veillePdfUrls) && veillePdfUrls.length) {
    root.appendChild(create("li", {}, ["Veilles (PDF):"]));
    for (const url of veillePdfUrls) {
      root.appendChild(
        create("li", {}, [create("a", { href: url, target: "_blank", rel: "noopener" }, [url])])
      );
    }
  }
  if (Array.isArray(projetGitHubUrls) && projetGitHubUrls.length) {
    root.appendChild(create("li", {}, ["Projets GitHub:"]));
    for (const url of projetGitHubUrls) {
      root.appendChild(
        create("li", {}, [create("a", { href: url, target: "_blank", rel: "noopener" }, [url])])
      );
    }
  }
  if (Array.isArray(certificats) && certificats.length) {
    root.appendChild(create("li", {}, ["Certificats:"]));
    for (const c of certificats) {
      const label = typeof c === "string" ? c : c.titre || "Certificat";
      const href = typeof c === "string" ? null : c.url;
      root.appendChild(
        create("li", {}, [
          href ? create("a", { href, target: "_blank", rel: "noopener" }, [label]) : label,
        ])
      );
    }
  }
}

function renderAll(data) {
  // Thème
  applyTheme(data.theme || {});

  // Couverture
  setText("nom", data.identite?.nom || "");
  setText("titre", data.identite?.titre || "");
  setText("date", data.identite?.date || "");
  setImage("photo", data.identite?.photoUrl);
  setImage("logoEcole", data.identite?.logoEcoleUrl);
  setImage("logoEntreprise", data.identite?.logoEntrepriseUrl);
  const cover = document.getElementById("couverture");
  const coverUrl = data?.theme?.coverImageUrl;
  if (cover && coverUrl) {
    cover.classList.add('has-image');
    cover.style.setProperty('--cover-image', `url(${coverUrl})`);
  } else if (cover) {
    cover.classList.remove('has-image');
    cover.style.removeProperty('--cover-image');
  }

  // Accueil
  setText("phrase", data.introduction?.phrase || "");
  setText("situation", data.introduction?.situation || "");
  setText("objectifPro", data.introduction?.objectifPro || "");

  // Liens
  setLink("githubLink", data.liens?.github, "GitHub");
  setLink("linkedinLink", data.liens?.linkedin, "LinkedIn");
  const email = data.liens?.email;
  if (email) {
    setLink("emailLink", `mailto:${email}`, email);
    const footerEmail = document.getElementById("footerEmail");
    if (footerEmail) {
      footerEmail.href = `mailto:${email}`;
      footerEmail.textContent = email;
    }
  }

  const footerName = document.getElementById("footerName");
  if (footerName && data.identite?.nom) footerName.textContent = data.identite.nom;
  const legal = document.getElementById("legalText");
  if (legal) {
    const year = new Date().getFullYear();
    const base = data.footer?.legal || `© ${year} ${data.identite?.nom || ''} | Portfolio BTS SIO SLAM`;
    legal.textContent = base.trim();
  }

  // À propos
  const aproposRoot = document.getElementById("aproposContent");
  aproposRoot.innerHTML = "";
  const blocks = [
    ["Parcours scolaire", data.apropos?.parcours],
    ["Pourquoi le BTS ?", data.apropos?.pourquoiBts],
    ["Pourquoi SLAM ?", data.apropos?.pourquoiSlam],
    ["Année à l’étranger", data.apropos?.anneeEtranger],
    ["Objectifs d’avenir", data.apropos?.objectifs],
  ];
  for (const [title, text] of blocks) {
    if (!text) continue;
    aproposRoot.appendChild(create("h3", {}, [title]));
    aproposRoot.appendChild(create("p", {}, [text]));
  }

  // Compétences
  renderCompetences(document.getElementById("competencesGrid"), data.competences || {});

  // Expérience
  renderExperience(document.getElementById("experienceList"), data.experience || []);

  // Projets
  renderProjets(document.getElementById("projetsList"), data.projets || []);

  // Veille
  renderVeille(document.getElementById("veilleList"), data.veille || []);

  // Annexes
  renderAnnexes(document.getElementById("annexesList"), data.annexes || {});
}

function applyTheme(theme) {
  try {
    const root = document.documentElement;
    const colors = theme.colors || {};
    if (colors.brand) root.style.setProperty('--brand', colors.brand);
    if (colors.brand2) root.style.setProperty('--brand-2', colors.brand2);
    if (colors.panel) root.style.setProperty('--panel', colors.panel);
    if (colors.card) root.style.setProperty('--card', colors.card);
    if (colors.text) root.style.setProperty('--text', colors.text);
    if (colors.muted) root.style.setProperty('--muted', colors.muted);
    if (colors.line) root.style.setProperty('--line', colors.line);
  } catch {}
}

async function tryLoadJson() {
  try {
    const res = await fetch("content.json", { cache: "no-cache" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    renderAll(data);
  } catch (err) {
    console.warn("content.json non chargé, utilisation des données d'exemple.", err);
    const note = document.getElementById("demoNotice");
    if (note) note.hidden = false;
    renderAll(defaultData);
  }
}

function setupActions() {
  const printBtn = document.getElementById("printBtn");
  if (printBtn) printBtn.addEventListener("click", () => window.print());

  const importBtn = document.getElementById("importJsonBtn");
  const fileInput = document.getElementById("jsonFileInput");
  if (importBtn && fileInput) {
    importBtn.addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", async () => {
      const file = fileInput.files?.[0];
      if (!file) return;
      try {
        const text = await file.text();
        const data = JSON.parse(text);
        renderAll(data);
        const note = document.getElementById("demoNotice");
        if (note) note.hidden = true;
      } catch (e) {
        alert("Fichier JSON invalide");
      } finally {
        fileInput.value = "";
      }
    });
  }
}

setupActions();
tryLoadJson();

// --- Mode pages (pagination) ---
let isPaged = false;
let sections = [];
let sectionIds = [];
let currentIndex = 0;

function initSections() {
  sections = Array.from(document.querySelectorAll('main .page'));
  sectionIds = sections.map((s) => s.id);
}

function setPaged(paged) {
  isPaged = !!paged;
  document.body.classList.toggle('paged', isPaged);
  const pager = document.getElementById('pager');
  if (pager) pager.hidden = !isPaged;
  const toggleBtn = document.getElementById('togglePagedBtn');
  if (toggleBtn) {
    toggleBtn.textContent = isPaged ? 'Mode défilement' : 'Mode pages';
    toggleBtn.setAttribute('aria-pressed', isPaged ? 'true' : 'false');
  }
  if (isPaged) {
    const hash = location.hash.replace('#', '');
    const idx = hash ? sectionIds.indexOf(hash) : currentIndex;
    goToIndex(idx >= 0 ? idx : 0, { updateHash: false });
  } else {
    sections.forEach((s) => s.classList.remove('active'));
  }
  try { localStorage.setItem('portfolio-paged', isPaged ? '1' : '0'); } catch {}
}

function goToIndex(idx, opts = {}) {
  if (!sections.length) return;
  const clamped = Math.max(0, Math.min(idx, sections.length - 1));
  currentIndex = clamped;
  sections.forEach((s, i) => s.classList.toggle('active', i === clamped));
  updateIndicator();
  updateNavActive();
  if (opts.updateHash !== false) {
    const id = sectionIds[clamped];
    if (id) history.replaceState(null, '', '#' + id);
  }
  window.scrollTo(0, 0);
}

function updateIndicator() {
  const indicator = document.getElementById('pageIndicator');
  if (indicator) indicator.textContent = `${currentIndex + 1} / ${sections.length}`;
  const prev = document.getElementById('prevBtn');
  const next = document.getElementById('nextBtn');
  if (prev) prev.disabled = currentIndex <= 0;
  if (next) next.disabled = currentIndex >= sections.length - 1;
}

function updateNavActive() {
  const links = document.querySelectorAll('.nav a');
  const currentId = isPaged ? sectionIds[currentIndex] : location.hash.replace('#', '');
  links.forEach((a) => {
    const href = a.getAttribute('href') || '';
    const id = href.startsWith('#') ? href.slice(1) : '';
    a.classList.toggle('active', !!id && id === currentId);
  });
}

function handleHashChange() {
  const hash = location.hash.replace('#', '');
  if (!hash) return;
  if (isPaged) {
    const idx = sectionIds.indexOf(hash);
    if (idx >= 0) goToIndex(idx, { updateHash: false });
  } else {
    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    updateNavActive();
  }
}

function setupPagingUI() {
  initSections();

  const toggleBtn = document.getElementById('togglePagedBtn');
  if (toggleBtn) toggleBtn.addEventListener('click', () => setPaged(!isPaged));

  const prev = document.getElementById('prevBtn');
  const next = document.getElementById('nextBtn');
  if (prev) prev.addEventListener('click', () => goToIndex(currentIndex - 1));
  if (next) next.addEventListener('click', () => goToIndex(currentIndex + 1));

  document.addEventListener('keydown', (e) => {
    if (!isPaged) return;
    if (e.key === 'ArrowLeft') goToIndex(currentIndex - 1);
    else if (e.key === 'ArrowRight') goToIndex(currentIndex + 1);
  });

  document.querySelectorAll('.nav a').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href') || '';
      if (!href.startsWith('#')) return;
      const id = href.slice(1);
      if (isPaged) {
        e.preventDefault();
        const idx = sectionIds.indexOf(id);
        if (idx >= 0) goToIndex(idx);
      }
    });
  });

  window.addEventListener('hashchange', handleHashChange);

  let startPaged = false;
  try { startPaged = localStorage.getItem('portfolio-paged') === '1'; } catch {}
  setPaged(startPaged);
  if (startPaged) {
    const hash = location.hash.replace('#', '');
    const idx = hash ? sectionIds.indexOf(hash) : 0;
    goToIndex(idx >= 0 ? idx : 0, { updateHash: false });
  }
  updateIndicator();
  updateNavActive();
}

setupPagingUI();


