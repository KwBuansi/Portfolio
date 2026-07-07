const featuredProjects = {
  jitvis: {
    title: "Google V8 JITVis",
    trace: "JITVis Dashboard — Active Engine Trace",
    description:
      "Helped V8 compiler engineers spot where compilations diverge — replacing unreadable IR hairballs with D3.js heatmaps, dual views, and minigraphs informed by expert interviews at Google.",
    tags: ["JavaScript", "D3.js", "Graph Visualization", "UX Research"],
    ctaText: "Read Article →",
    ctaHref: "jitvis-blog.html",
    external: false,
    preview: {
      type: "image",
      src: "images/jitvis-blog/heatmap.png",
      alt: "JITVis heatmap comparing mutant compiler traces across optimization phases",
    },
  },
  unixShell: {
    title: "Unix Shell Architecture",
    trace: "shell_exec — POSIX Token Pipeline",
    description:
      "Shipped a POSIX-compliant shell in C with pipelines, I/O redirection, background jobs, and signal handling — so multi-stage commands run reliably via fork, exec, and wait.",
    tags: ["C Programming", "Systems Architecture", "Memory Management"],
    ctaText: "View Repository →",
    ctaHref:
      "https://github.com/KwBuansi/Old-Projects/tree/main/systems/unix-shell",
    external: true,
    secondaryCta: {
      text: "Read Article →",
      href: "unix-shell-blog.html",
      external: false,
    },
  },
  starbucks: {
    title: "Starbucks DataViz (D3.js)",
    trace: "radial_chart.render — Regional Traffic Stream",
    description:
      "Surfaced cyclical Starbucks order patterns across 24 hours and four U.S. regions — with a keyboard-accessible D3.js radial chart, live filters, and hour-level breakdown panels.",
    tags: ["Python", "D3.js", "Data Science", "Accessibility"],
    ctaText: "View Repository →",
    ctaHref: "https://github.com/KwBuansi/CSC-362-Final-Project",
    external: true,
    secondaryCta: {
      text: "Read Article →",
      href: "starbucks-blog.html",
      external: false,
    },
    preview: {
      type: "iframe",
      src: "demos/starbucks-mini/index.html",
      title: "Starbucks radial chart interactive preview",
    },
  },
  studentHub: {
    title: "Agile Student Hub",
    trace: "student_hub.api — Sprint Deployment Active",
    description:
      "Led a four-person Scrum team as Product Owner to ship a campus hub for course reviews, professor ratings, and club discovery — live on Vercel with React and Supabase.",
    tags: ["React", "Supabase", "Full-Stack", "Agile Scrum"],
    ctaText: "View Repository →",
    ctaHref: "https://github.com/N-Pacis/Student-Hub.git",
    external: true,
    secondaryCta: {
      text: "Read Article →",
      href: "student-hub-blog.html",
      external: false,
    },
    preview: {
      type: "image",
      src: "images/previews/student-hub.png",
      alt: "Student Hub dashboard showing club events and organization listings",
      background: "#000000",
    },
  },
};

const featuredStageTabs = document.querySelectorAll(".featured-stage-tab");
const featuredStagePanel = document.getElementById("featured-stage-panel");

function renderTrace(trace) {
  const separator = " — ";
  const splitIndex = trace.indexOf(separator);

  if (splitIndex === -1) {
    return `<span class="stage-window-trace-text">${trace}</span>`;
  }

  const command = trace.slice(0, splitIndex);
  const status = trace.slice(splitIndex + separator.length);

  return `
    <span class="stage-window-trace-cmd">${command}</span>
    <span class="stage-window-trace-sep" aria-hidden="true">/</span>
    <span class="stage-window-trace-status">
      <span class="stage-window-trace-live" aria-hidden="true"></span>
      ${status}
    </span>
  `;
}

function renderPreview(preview) {
  if (!preview) return "";

  if (preview.type === "iframe") {
    return `
    <div class="stage-window-preview">
      <iframe
        src="${preview.src}"
        title="${preview.title}"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin"
      ></iframe>
    </div>
  `;
  }

  if (preview.type === "image") {
    const bgStyle = preview.background
      ? ` style="background: ${preview.background};"`
      : "";

    return `
    <div class="stage-window-preview stage-window-preview--image"${bgStyle}>
      <img src="${preview.src}" alt="${preview.alt}" loading="lazy" />
    </div>
  `;
  }

  return "";
}

function renderFeaturedProject(projectId) {
  const project = featuredProjects[projectId];
  if (!project || !featuredStagePanel) return;

  featuredStagePanel.classList.add("is-updating");
  const hasPreview = Boolean(project.preview);
  featuredStagePanel.classList.toggle(
    "featured-stage-window--with-preview",
    hasPreview,
  );
  const bodyClass = hasPreview
    ? "stage-window-body stage-window-body--with-preview"
    : "stage-window-body";

  window.setTimeout(() => {
    const metaBlock = `
        <div class="stage-window-meta">
          <h3 class="stage-window-title">${project.title}</h3>
          <p class="stage-window-description">${project.description}</p>
          <div class="stage-window-tags" aria-label="Technologies">
            ${project.tags
              .map((tag) => `<span class="stage-tag">${tag}</span>`)
              .join("")}
          </div>
          <div class="stage-window-cta-row">
            <a
              class="stage-window-cta"
              href="${project.ctaHref}"
              ${project.external ? 'target="_blank" rel="noopener noreferrer"' : ""}
            >${project.ctaText}</a>
            ${
              project.secondaryCta
                ? `<a
              class="stage-window-cta stage-window-cta--secondary"
              href="${project.secondaryCta.href}"
              ${project.secondaryCta.external ? 'target="_blank" rel="noopener noreferrer"' : ""}
            >${project.secondaryCta.text}</a>`
                : ""
            }
          </div>
        </div>`;

    featuredStagePanel.innerHTML = `
      <div class="stage-window-chrome" aria-hidden="true">
        <span></span><span></span><span></span>
      </div>
      <div class="stage-window-bar">
        <span class="stage-window-trace">${renderTrace(project.trace)}</span>
      </div>
      <div class="${bodyClass}">
        ${renderPreview(project.preview)}
        ${metaBlock}
      </div>
    `;

    featuredStagePanel.classList.remove("is-updating");
  }, 120);
}

function setActiveFeaturedTab(tab) {
  featuredStageTabs.forEach((item) => {
    const isActive = item === tab;
    item.classList.toggle("active", isActive);
    item.setAttribute("aria-selected", String(isActive));
  });

  if (featuredStagePanel) {
    featuredStagePanel.setAttribute("aria-labelledby", tab.id);
  }

  renderFeaturedProject(tab.dataset.project);
}

featuredStageTabs.forEach((tab) => {
  tab.addEventListener("click", () => setActiveFeaturedTab(tab));
});

const defaultTab =
  document.querySelector('.featured-stage-tab[data-project="jitvis"]') ||
  featuredStageTabs[0];

if (defaultTab) {
  setActiveFeaturedTab(defaultTab);
}
