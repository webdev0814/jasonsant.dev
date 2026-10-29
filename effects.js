(() => {
  "use strict";

  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  const themeButton = document.querySelector(".theme-toggle");
  const themeMeta = document.querySelector('meta[name="theme-color"]');

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
    }

    if (themeMeta) {
      themeMeta.setAttribute("content", current === "dark" ? "#0f171a" : "#f7f6f2");
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

  const caseStudies = Array.from(document.querySelectorAll(".case-study"));

  caseStudies.forEach((caseStudy, index) => {
    const template = document.getElementById(`case-diagram-${index + 1}`);
    const caseFlow = caseStudy.querySelector(".case-flow");

    if (template && caseFlow) {
      caseStudy.insertBefore(template.content.cloneNode(true), caseFlow);
    }
  });

  const updateDiagramViews = () => {
    const mobile = window.matchMedia("(max-width: 759px)").matches;

    document.querySelectorAll(".case-diagram svg").forEach((diagram) => {
      diagram.setAttribute("viewBox", mobile ? "0 0 360 620" : "0 0 960 240");
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
        const active = panel.id === selectedTab.getAttribute("aria-controls");
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

    commitTabChange(tabs.find((tab) => tab.getAttribute("aria-selected") === "true") || tabs[0]);
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
        Math.max(Number.isFinite(minimum) ? minimum : 0, value)
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
      formula.textContent = `${number.format(people)} × ${number.format(hours)} × ${currency.format(rate)} × 48 = ${costText}`;
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
      ...document.querySelectorAll(".diagram-connectors"),
      ...document.querySelectorAll(".credential-group")
    ].slice(0, 12);

    if (revealTargets.length) {
      root.classList.add("reveal-ready");

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.18,
        rootMargin: "0px 0px -12% 0px"
      });

      revealTargets.forEach((target) => observer.observe(target));
    }
  }

  const currentYear = document.getElementById("current-year");
  if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
  }
})();
