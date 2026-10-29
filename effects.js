(() => {
  "use strict";

  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  const mobileDiagramQuery = window.matchMedia("(max-width: 759px)");
  const themeButton = document.querySelector(".theme-toggle");
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

  const readSavedTheme = () => {
    try {
      const saved = localStorage.getItem("jasonsant-theme");
      return saved === "light" || saved === "dark" ? saved : null;
    } catch (_) {
      return null;
    }
  };

  const displayedTheme = () => {
    if (root.dataset.theme === "light" || root.dataset.theme === "dark") {
      return root.dataset.theme;
    }

    return systemTheme.matches ? "dark" : "light";
  };

  const updateThemeControl = () => {
    const current = displayedTheme();
    const next = current === "dark" ? "light" : "dark";

    if (themeButton) {
      themeButton.setAttribute("aria-label", `Switch to ${next} theme`);
      themeButton.setAttribute("title", `Switch to ${next} theme`);
    }

    if (themeMeta) {
      themeMeta.setAttribute(
        "content",
        current === "dark" ? "#0f171a" : "#f7f6f2"
      );
    }
  };

  if (themeButton) {
    themeButton.addEventListener("click", () => {
      const next = displayedTheme() === "dark" ? "light" : "dark";
      root.dataset.theme = next;

      try {
        localStorage.setItem("jasonsant-theme", next);
      } catch (_) {}

      updateThemeControl();
    });

    const handleSystemTheme = () => {
      if (!readSavedTheme()) {
        updateThemeControl();
      }
    };

    if (typeof systemTheme.addEventListener === "function") {
      systemTheme.addEventListener("change", handleSystemTheme);
    } else if (typeof systemTheme.addListener === "function") {
      systemTheme.addListener(handleSystemTheme);
    }

    updateThemeControl();
  }

  const createSvgElement = (name, attributes = {}) => {
    const element = document.createElementNS(SVG_NAMESPACE, name);

    Object.entries(attributes).forEach(([attribute, value]) => {
      element.setAttribute(attribute, String(value));
    });

    return element;
  };

  const createHeroArchitecture = () => {
    const container = document.querySelector(".decision-spine");

    if (!container || container.querySelector(".hero-architecture")) {
      return;
    }

    const svg = createSvgElement("svg", {
      class: "hero-architecture",
      viewBox: "0 0 70 520",
      preserveAspectRatio: "none",
      "aria-hidden": "true",
      focusable: "false"
    });

    const trace = createSvgElement("path", {
      class: "hero-spine-trace",
      d: "M22 34V130H50V226H22V322H53V418H22V494",
      pathLength: "1"
    });

    const branches = [
      "M22 34H66",
      "M50 130H66",
      "M22 226H66",
      "M53 322H66",
      "M22 418H66"
    ];

    svg.append(trace);

    branches.forEach((pathData) => {
      svg.append(
        createSvgElement("path", {
          class: "hero-spine-branch",
          d: pathData,
          pathLength: "1"
        })
      );
    });

    [
      [22, 34, true],
      [50, 130, false],
      [22, 226, false],
      [53, 322, false],
      [22, 418, false]
    ].forEach(([cx, cy, decision]) => {
      svg.append(
        createSvgElement("circle", {
          class: `hero-spine-node${decision ? " is-decision" : ""}`,
          cx,
          cy,
          r: decision ? 5 : 4
        })
      );
    });

    container.prepend(svg);
  };

  createHeroArchitecture();

  const compactMobileDiagram = (svg) => {
    const mobileGroup = svg.querySelector(".diagram-mobile");
    const connectors = mobileGroup?.querySelector(".diagram-connectors");
    const nodes = mobileGroup
      ? Array.from(mobileGroup.querySelectorAll(".diagram-node"))
      : [];

    if (!mobileGroup || !connectors || !nodes.length) {
      return;
    }

    const existingPaths = Array.from(
      connectors.querySelectorAll(":scope > path")
    );
    const firstDirectedPath = existingPaths.find((path) =>
      path.hasAttribute("marker-end")
    );
    const markerEnd = firstDirectedPath?.getAttribute("marker-end") || "";
    const recoveryPath = connectors.querySelector(".accent-path");

    existingPaths.forEach((path) => {
      if (path !== recoveryPath) {
        path.remove();
      }
    });

    nodes.forEach((node, index) => {
      const y = 12 + index * 70;
      const rect = node.querySelector("rect");
      const textLines = Array.from(node.querySelectorAll("text"));

      if (rect) {
        rect.setAttribute("x", "35");
        rect.setAttribute("y", String(y));
        rect.setAttribute("width", "290");
        rect.setAttribute("height", "46");
      }

      textLines.forEach((textLine, lineIndex) => {
        const lineOffset =
          (lineIndex - (textLines.length - 1) / 2) * 14;

        textLine.setAttribute("x", "180");
        textLine.setAttribute("y", String(y + 27 + lineOffset));
      });

      if (index < nodes.length - 1) {
        const connector = document.createElementNS(SVG_NAMESPACE, "path");

        connector.setAttribute(
          "d",
          `M180 ${y + 46}V${12 + (index + 1) * 70}`
        );

        if (markerEnd) {
          connector.setAttribute("marker-end", markerEnd);
        }

        connectors.insertBefore(connector, recoveryPath);
      }
    });

    if (recoveryPath && nodes.length > 2) {
      const lastCenter = 12 + (nodes.length - 1) * 70 + 23;
      const secondCenter = 12 + 70 + 23;

      recoveryPath.setAttribute(
        "d",
        `M35 ${lastCenter}H14V${secondCenter}H35`
      );

      if (markerEnd) {
        recoveryPath.setAttribute("marker-end", markerEnd);
      }
    }
  };

  const caseStudies = Array.from(document.querySelectorAll(".case-study"));

  caseStudies.forEach((caseStudy, index) => {
    const template = document.getElementById(`case-diagram-${index + 1}`);
    const caseFlow = caseStudy.querySelector(".case-flow");

    if (!template || !caseFlow) {
      return;
    }

    caseStudy.insertBefore(template.content.cloneNode(true), caseFlow);

    const diagram = caseStudy.querySelector(".case-diagram svg");

    if (diagram) {
      compactMobileDiagram(diagram);
    }
  });

  const updateDiagramViews = () => {
    const mobile = mobileDiagramQuery.matches;

    document.querySelectorAll(".case-diagram svg").forEach((diagram) => {
      diagram.setAttribute(
        "viewBox",
        mobile ? "0 0 360 420" : "0 0 960 240"
      );
    });
  };

  updateDiagramViews();

  let diagramResizeFrame = 0;

  window.addEventListener("resize", () => {
    cancelAnimationFrame(diagramResizeFrame);
    diagramResizeFrame = requestAnimationFrame(updateDiagramViews);
  });

  const mobileMenu = document.querySelector(".mobile-menu");

  if (mobileMenu) {
    mobileMenu.addEventListener("click", (event) => {
      if (event.target.closest("nav a")) {
        mobileMenu.removeAttribute("open");
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && mobileMenu.open) {
        mobileMenu.open = false;

        const summary = mobileMenu.querySelector("summary");

        if (summary) {
          summary.focus();
        }
      }
    });
  }

  document.querySelectorAll("[data-tabs]").forEach((tabGroup) => {
    const tabs = Array.from(tabGroup.querySelectorAll('[role="tab"]'));
    const panels = Array.from(tabGroup.querySelectorAll('[role="tabpanel"]'));

    if (tabs.length !== 4 || panels.length !== 4) {
      return;
    }

    const commitTabChange = (selectedTab) => {
      tabs.forEach((tab) => {
        const selected = tab === selectedTab;
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
      });

      panels.forEach((panel) => {
        const active =
          panel.id === selectedTab.getAttribute("aria-controls");

        panel.hidden = !active;
        panel.classList.toggle("is-active", active);
      });
    };

    const activateTab = (selectedTab, moveFocus) => {
      const update = () => commitTabChange(selectedTab);

      if (document.startViewTransition && !reducedMotion.matches) {
        document.startViewTransition(update);
      } else {
        update();
      }

      if (moveFocus) {
        selectedTab.focus();
      }
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activateTab(tab, false));

      tab.addEventListener("keydown", (event) => {
        let nextIndex;

        switch (event.key) {
          case "ArrowRight":
            nextIndex = (index + 1) % tabs.length;
            break;
          case "ArrowLeft":
            nextIndex = (index - 1 + tabs.length) % tabs.length;
            break;
          case "Home":
            nextIndex = 0;
            break;
          case "End":
            nextIndex = tabs.length - 1;
            break;
          default:
            return;
        }

        event.preventDefault();
        activateTab(tabs[nextIndex], true);
      });
    });

    const initiallySelected =
      tabs.find(
        (tab) => tab.getAttribute("aria-selected") === "true"
      ) || tabs[0];

    commitTabChange(initiallySelected);
    tabGroup.classList.add("tabs-ready");
  });

  const calculator = document.getElementById("roi-calculator");

  if (calculator) {
    const teamSize = document.getElementById("team-size");
    const weeklyHours = document.getElementById("weekly-hours");
    const blendedRate = document.getElementById("blended-rate");
    const savedShare = document.getElementById("saved-share");
    const savedShareValue = document.getElementById("saved-share-value");
    const formula = document.getElementById("formula");
    const annualCost = document.getElementById("annual-cost");
    const annualHours = document.getElementById("annual-hours");
    const hoursSaved = document.getElementById("hours-saved");
    const valueSaved = document.getElementById("value-saved");

    const currency = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    });

    const number = new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 1
    });

    const safeValue = (input, fallback = 0) => {
      const value = Number.parseFloat(input.value);
      const minimum = Number.parseFloat(input.min);
      const maximum = Number.parseFloat(input.max);

      if (!Number.isFinite(value)) {
        return fallback;
      }

      return Math.min(
        Number.isFinite(maximum) ? maximum : value,
        Math.max(
          Number.isFinite(minimum) ? minimum : 0,
          value
        )
      );
    };

    const updateCalculator = () => {
      const people = safeValue(teamSize);
      const hours = safeValue(weeklyHours);
      const rate = safeValue(blendedRate);
      const percentage = safeValue(savedShare);
      const share = percentage / 100;

      const yearlyHours = people * hours * 48;
      const yearlyCost = yearlyHours * rate;
      const estimatedHoursSaved = yearlyHours * share;
      const estimatedValueSaved = yearlyCost * share;

      const costText = currency.format(yearlyCost);
      const shareText = `${number.format(percentage)}%`;

      savedShareValue.value = shareText;
      savedShareValue.textContent = shareText;
      formula.textContent =
        `${number.format(people)} × ` +
        `${number.format(hours)} × ` +
        `${currency.format(rate)} × 48 = ${costText}`;
      annualCost.value = costText;
      annualCost.textContent = costText;
      annualHours.textContent = number.format(yearlyHours);
      hoursSaved.textContent = number.format(estimatedHoursSaved);
      valueSaved.textContent = currency.format(estimatedValueSaved);
    };

    calculator.addEventListener("input", updateCalculator);
    calculator.addEventListener("change", updateCalculator);
    updateCalculator();
  }

  if (!reducedMotion.matches) {
    root.classList.add("motion-ready");
  }

  if ("IntersectionObserver" in window && !reducedMotion.matches) {
    const revealTargets = [
      ...document.querySelectorAll(".case-diagram"),
      ...document.querySelectorAll(".credential-group")
    ];

    if (revealTargets.length) {
      root.classList.add("reveal-ready");

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-revealed");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.18,
          rootMargin: "0px 0px -12% 0px"
        }
      );

      revealTargets.forEach((target) => observer.observe(target));
    }
  }

  const currentYear = document.getElementById("current-year");

  if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
  }
})();
