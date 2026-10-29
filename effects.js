(() => {
  "use strict";

  const navToggle = document.querySelector(".nav-toggle");
  const primaryNav = document.getElementById("primary-nav");

  if (navToggle && primaryNav) {
    const closeNavigation = () => {
      navToggle.setAttribute("aria-expanded", "false");
      primaryNav.classList.remove("is-open");
      document.body.classList.remove("nav-open");
    };

    navToggle.addEventListener("click", () => {
      const willOpen = navToggle.getAttribute("aria-expanded") !== "true";
      navToggle.setAttribute("aria-expanded", String(willOpen));
      primaryNav.classList.toggle("is-open", willOpen);
      document.body.classList.toggle("nav-open", willOpen);
    });

    primaryNav.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        closeNavigation();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && primaryNav.classList.contains("is-open")) {
        closeNavigation();
        navToggle.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.matchMedia("(min-width: 52.01rem)").matches) {
        closeNavigation();
      }
    });
  }

  document.querySelectorAll("[data-tabs]").forEach((tabGroup) => {
    const tabs = Array.from(tabGroup.querySelectorAll('[role="tab"]'));
    const panels = Array.from(tabGroup.querySelectorAll('[role="tabpanel"]'));

    const activateTab = (tab, moveFocus = true) => {
      tabs.forEach((candidate) => {
        const selected = candidate === tab;
        candidate.setAttribute("aria-selected", String(selected));
        candidate.tabIndex = selected ? 0 : -1;
      });

      panels.forEach((panel) => {
        panel.hidden = panel.id !== tab.getAttribute("aria-controls");
      });

      if (moveFocus) {
        tab.focus();
      }
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activateTab(tab, false));

      tab.addEventListener("keydown", (event) => {
        let nextIndex;

        if (event.key === "ArrowRight") {
          nextIndex = (index + 1) % tabs.length;
        } else if (event.key === "ArrowLeft") {
          nextIndex = (index - 1 + tabs.length) % tabs.length;
        } else if (event.key === "Home") {
          nextIndex = 0;
        } else if (event.key === "End") {
          nextIndex = tabs.length - 1;
        } else {
          return;
        }

        event.preventDefault();
        activateTab(tabs[nextIndex]);
      });
    });
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

    const readValue = (input) => {
      const parsed = Number.parseFloat(input.value);
      return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
    };

    const updateCalculator = () => {
      const people = readValue(teamSize);
      const hours = readValue(weeklyHours);
      const rate = readValue(blendedRate);
      const share = readValue(savedShare) / 100;
      const yearlyHours = people * hours * 48;
      const yearlyCost = yearlyHours * rate;
      const estimatedHoursSaved = yearlyHours * share;
      const estimatedValueSaved = yearlyCost * share;

      savedShareValue.value = `${Math.round(share * 100)}%`;
      savedShareValue.textContent = `${Math.round(share * 100)}%`;
      formula.textContent = `${number.format(people)} Ã— ${number.format(hours)} Ã— ${currency.format(rate)} Ã— 48 weeks`;
      annualHours.textContent = number.format(yearlyHours);
      annualCost.textContent = currency.format(yearlyCost);
      hoursSaved.textContent = number.format(estimatedHoursSaved);
      valueSaved.textContent = currency.format(estimatedValueSaved);
    };

    calculator.addEventListener("input", updateCalculator);
    calculator.addEventListener("change", updateCalculator);
    updateCalculator();
  }

  const year = document.getElementById("current-year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
})();
