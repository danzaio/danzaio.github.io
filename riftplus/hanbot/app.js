(function () {
  "use strict";

  const content = window.RIFTREBORN_CONTENT;

  if (!content) {
    throw new Error("RiftReborn content failed to load.");
  }

  const localeAliases = {
    en: "en-US",
    "en-us": "en-US",
    pt: "pt-BR",
    "pt-br": "pt-BR",
    zh: "zh-CN",
    "zh-cn": "zh-CN",
    "zh-hans": "zh-CN",
    de: "de-DE",
    "de-de": "de-DE",
    tr: "tr-TR",
    "tr-tr": "tr-TR",
    pl: "pl-PL",
    "pl-pl": "pl-PL",
  };

  const dom = {
    language: document.querySelector("[data-language]"),
    championSelectors: Array.from(document.querySelectorAll("[data-champion-select]")),
    heroArt: Array.from(document.querySelectorAll("[data-hero-art]")),
    profileStage: document.querySelector(".champion-stage"),
    profileArt: document.querySelector("[data-profile-art]"),
    release: document.querySelector(".champion-stage__release"),
    championName: document.querySelector("[data-champion-name]"),
    championEpithet: document.querySelector("[data-champion-epithet]"),
    championRole: document.querySelector("[data-champion-role]"),
    championIntro: document.querySelector("[data-champion-intro]"),
    controlCount: document.querySelector("[data-control-count]"),
    menuSource: document.querySelector("[data-menu-source]"),
    abilityTabs: document.querySelector("[data-ability-tabs]"),
    abilityPanel: document.querySelector(".ability-detail"),
    abilityKey: document.querySelector("[data-ability-key]"),
    abilityName: document.querySelector("[data-ability-name]"),
    abilitySummary: document.querySelector("[data-ability-summary]"),
    systemList: document.querySelector("[data-system-list]"),
    scrollProgress: document.querySelector("[data-scroll-progress]"),
  };

  const params = new URLSearchParams(window.location.search);
  const storedLocale = readStoredLocale();
  const requestedLocale = params.get("lang") || storedLocale || detectBrowserLocale();

  const state = {
    locale: normalizeLocale(requestedLocale),
    champion: content.champions[params.get("champion")] ? params.get("champion") : "samira",
    ability: content.abilityOrder.includes(params.get("ability")) ? params.get("ability") : "passive",
    transitionTimer: 0,
    scrollFrame: 0,
  };

  function normalizeLocale(locale) {
    if (!locale) return content.defaultLocale;
    const normalized = String(locale).toLowerCase();
    return localeAliases[normalized] || localeAliases[normalized.split("-")[0]] || content.defaultLocale;
  }

  function readStoredLocale() {
    try {
      return window.localStorage.getItem("riftrebornLocale");
    } catch (_error) {
      return null;
    }
  }

  function storeLocale(locale) {
    try {
      window.localStorage.setItem("riftrebornLocale", locale);
    } catch (_error) {
      // Localization still works when storage is unavailable.
    }
  }

  function detectBrowserLocale() {
    const locales = Array.isArray(navigator.languages) && navigator.languages.length
      ? navigator.languages
      : [navigator.language];

    for (const locale of locales) {
      const normalized = normalizeLocale(locale);
      if (normalized !== content.defaultLocale || String(locale).toLowerCase().startsWith("en")) {
        return normalized;
      }
    }

    return content.defaultLocale;
  }

  function translation() {
    return content.translations[state.locale] || content.translations[content.defaultLocale];
  }

  function updateMetadata(copy) {
    document.title = copy.metaTitle;
    setMeta("meta[name='description']", copy.metaDescription);
    setMeta("meta[property='og:title']", copy.metaTitle);
    setMeta("meta[property='og:description']", copy.metaDescription);
    setMeta("meta[name='twitter:title']", copy.metaTitle);
    setMeta("meta[name='twitter:description']", copy.metaDescription);
    setMeta("meta[property='og:locale']", state.locale.replace("-", "_"));
  }

  function setMeta(selector, value) {
    const element = document.querySelector(selector);
    if (element) element.setAttribute("content", value);
  }

  function applyTranslations() {
    const copy = translation();
    document.documentElement.lang = state.locale;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = copy[element.dataset.i18n];
      if (typeof value === "string") element.textContent = value;
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
      const value = copy[element.dataset.i18nAria];
      if (typeof value === "string") element.setAttribute("aria-label", value);
    });

    if (dom.language) {
      dom.language.value = state.locale;
      dom.language.setAttribute("aria-label", copy.languageLabel);
    }

    updateMetadata(copy);
  }

  function renderChampion(options) {
    const settings = options || {};
    const champion = content.champions[state.champion];
    const copy = translation().champions[state.champion];

    document.documentElement.dataset.champion = state.champion;

    dom.championSelectors.forEach((button) => {
      const selected = button.dataset.championSelect === state.champion;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));

      const label = button.querySelector("strong");
      const buttonCopy = translation().champions[button.dataset.championSelect];
      if (label && buttonCopy) label.textContent = buttonCopy.displayName;
    });

    dom.heroArt.forEach((image) => {
      image.classList.toggle("is-active", image.dataset.heroArt === state.champion);
    });

    if (settings.animate !== false && dom.profileStage) {
      window.clearTimeout(state.transitionTimer);
      dom.profileStage.classList.add("is-changing");
      state.transitionTimer = window.setTimeout(() => {
        dom.profileStage.classList.remove("is-changing");
      }, 420);
    }

    dom.profileArt.src = champion.image;
    dom.profileArt.alt = copy.alt;
    dom.release.textContent = `${champion.release} ${champion.order}`;
    dom.championName.textContent = copy.displayName;
    dom.championEpithet.textContent = copy.epithet;
    dom.championRole.textContent = champion.role;
    dom.championIntro.textContent = copy.intro;
    dom.controlCount.textContent = String(champion.controlCount);
    dom.menuSource.textContent = champion.menuSource;

    renderAbilityTabs();
    renderAbility();
  }

  function renderAbilityTabs() {
    const champion = content.champions[state.champion];
    const championCopy = translation().champions[state.champion];
    const fragment = document.createDocumentFragment();

    dom.abilityTabs.textContent = "";
    dom.abilityTabs.setAttribute("aria-label", translation().abilityNavigation);

    content.abilityOrder.forEach((abilityId, index) => {
      const ability = champion.abilities[abilityId];
      const selected = state.ability === abilityId;
      const button = document.createElement("button");
      button.type = "button";
      button.className = `ability-tab${selected ? " is-active" : ""}${ability.icon ? "" : " ability-tab--utility"}`;
      button.id = `ability-tab-${state.champion}-${abilityId}`;
      button.dataset.abilitySelect = abilityId;
      button.setAttribute("role", "tab");
      button.setAttribute("aria-selected", String(selected));
      button.setAttribute("aria-controls", "ability-panel");
      button.setAttribute("aria-label", `${ability.key}: ${championCopy.abilities[abilityId]}`);
      button.tabIndex = selected ? 0 : -1;

      if (ability.icon) {
        const image = document.createElement("img");
        image.src = ability.icon;
        image.alt = "";
        image.width = 38;
        image.height = 38;
        button.appendChild(image);

        const key = document.createElement("span");
        key.textContent = ability.key;
        button.appendChild(key);
      } else {
        const key = document.createElement("span");
        key.textContent = ability.key;
        button.appendChild(key);
      }

      button.addEventListener("click", () => selectAbility(abilityId, true));
      button.addEventListener("keydown", (event) => handleAbilityKey(event, index));
      fragment.appendChild(button);
    });

    dom.abilityTabs.appendChild(fragment);
  }

  function renderAbility() {
    const champion = content.champions[state.champion];
    const championCopy = translation().champions[state.champion];
    const ability = champion.abilities[state.ability];

    dom.abilityPanel.id = "ability-panel";
    dom.abilityPanel.setAttribute("aria-labelledby", `ability-tab-${state.champion}-${state.ability}`);
    dom.abilityKey.textContent = ability.key;
    dom.abilityName.textContent = championCopy.abilities[state.ability];
    dom.abilitySummary.textContent = championCopy.summaries[state.ability];

    const fragment = document.createDocumentFragment();
    ability.items.forEach((item) => {
      const row = document.createElement("li");
      row.textContent = item;
      fragment.appendChild(row);
    });
    dom.systemList.textContent = "";
    dom.systemList.appendChild(fragment);
  }

  function selectChampion(championId, updateUrl) {
    if (!content.champions[championId] || state.champion === championId) return;
    state.champion = championId;
    state.ability = "passive";
    renderChampion({ animate: true });
    if (updateUrl) writeUrlState();
  }

  function selectAbility(abilityId, updateUrl, focus) {
    if (!content.abilityOrder.includes(abilityId)) return;
    state.ability = abilityId;
    renderAbilityTabs();
    renderAbility();
    if (focus) document.querySelector(`[data-ability-select="${abilityId}"]`)?.focus();
    if (updateUrl) writeUrlState();
  }

  function handleAbilityKey(event, currentIndex) {
    let nextIndex = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (currentIndex + 1) % content.abilityOrder.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (currentIndex - 1 + content.abilityOrder.length) % content.abilityOrder.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = content.abilityOrder.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    selectAbility(content.abilityOrder[nextIndex], true, true);
  }

  function writeUrlState() {
    const url = new URL(window.location.href);
    url.searchParams.set("champion", state.champion);
    if (state.ability === "passive") url.searchParams.delete("ability");
    else url.searchParams.set("ability", state.ability);
    url.searchParams.set("lang", state.locale);
    window.history.replaceState({}, "", url);
  }

  function updateScrollProgress() {
    state.scrollFrame = 0;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
    if (dom.scrollProgress) dom.scrollProgress.style.transform = `scaleX(${progress})`;
  }

  function requestScrollProgress() {
    if (state.scrollFrame) return;
    state.scrollFrame = window.requestAnimationFrame(updateScrollProgress);
  }

  function observeSections() {
    if (!("IntersectionObserver" in window)) return;
    const links = Array.from(document.querySelectorAll(".client-nav a"));
    const linkById = new Map(links.map((link) => [link.getAttribute("href").slice(1), link]));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      links.forEach((link) => link.classList.toggle("is-active", link === linkById.get(visible.target.id)));
    }, { rootMargin: "-30% 0px -55%", threshold: [0, 0.15, 0.4] });

    linkById.forEach((_link, id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }

  dom.championSelectors.forEach((button) => {
    button.addEventListener("click", () => selectChampion(button.dataset.championSelect, true));
  });

  if (dom.language) {
    dom.language.addEventListener("change", (event) => {
      state.locale = normalizeLocale(event.target.value);
      storeLocale(state.locale);
      applyTranslations();
      renderChampion({ animate: false });
      writeUrlState();
    });
  }

  window.addEventListener("scroll", requestScrollProgress, { passive: true });
  window.addEventListener("resize", requestScrollProgress, { passive: true });

  applyTranslations();
  renderChampion({ animate: false });
  updateScrollProgress();
  observeSections();
})();
