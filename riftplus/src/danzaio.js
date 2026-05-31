import {
	hanbotSuite,
	lsSuite,
	platformCards,
	venSuite,
	yasuoSuite,
} from "./danzaio-data.js?v=1779229574674";

const app = document.querySelector("#app");
const pageKind = location.pathname.includes("/yasuo/")
	? "yasuo"
	: location.pathname.includes("/ven/")
		? "ven"
		: location.pathname.includes("/ls/")
			? "ls"
			: location.pathname.includes("/hanbot/")
				? "hanbot"
				: "home";
const assetPrefix = pageKind === "home" ? "./" : "../";
const rootPrefix = pageKind === "home" ? "./" : "../";
const requestEndpoint = window.RIFTPLUS_REQUEST_ENDPOINT || "";
let activeLanguage = localStorage.getItem("riftplusLanguage") || "en";

const assetUrl = (path) =>
	path.startsWith("http") ? path : `${assetPrefix}${path.replace(/^\.\//, "")}`;

const iconBadge = () => `
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M12 3 4.8 8.5l2.8 10.6H16.4L19.2 8.5 12 3Zm0 4.8 3.5 2.7-1.3 5.2H9.8L8.5 10.5 12 7.8Z"></path>
  </svg>
`;

const renderMajorHeader = (title, icon, body) => `
  <div class="major-section-header danzaio-section-header">
    <img class="major-section-header__icon" src="${assetUrl(icon)}" alt="" aria-hidden="true" />
    <h2 class="major-section-header__title">
      <span class="major-section-header__line"></span>
      <span class="major-section-header__diamond" aria-hidden="true"></span>
      <span class="major-section-header__text">${title}</span>
      <span class="major-section-header__diamond" aria-hidden="true"></span>
      <span class="major-section-header__line"></span>
    </h2>
    <p class="danzaio-section-header__body">${body}</p>
  </div>
`;

const renderFeatureCard = (card, index) => `
  <article class="danzaio-feature-card" style="--reveal-delay:${index * 80}ms;">
    <p class="danzaio-feature-card__kicker">${card.kicker}</p>
    <h3>${card.title}</h3>
    <p>${card.body}</p>
  </article>
`;

const renderFactCard = (entry, index) => `
  <article class="danzaio-update-card" style="--reveal-delay:${index * 100}ms;">
    <div class="danzaio-update-card__meta">
      <span>${entry.version}</span>
      <span>${entry.date}</span>
      <span>${entry.type}</span>
    </div>
    <h3>${entry.title}</h3>
    <ul>${entry.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}</ul>
  </article>
`;

const renderChampionActions = (card, suite) => `
  <div class="champion-actions">
    <button class="pill pill--dark" type="button" data-request="bug" data-platform="${suite.name}" data-champion="${card.name}">${suite.bugAction || "Report bug"}</button>
    <button class="pill pill--cyan" type="button" data-request="feature" data-platform="${suite.name}" data-champion="${card.name}">${suite.featureAction || "Request feature"}</button>
  </div>
`;

const titleCase = (text = "") =>
	String(text)
		.toLowerCase()
		.replace(/\b\w/g, (letter) => letter.toUpperCase())
		.replace(/\bQ\b/g, "Q")
		.replace(/\bW\b/g, "W")
		.replace(/\bE\b/g, "E")
		.replace(/\bR\b/g, "R")
		.replace(/\bEq\b/g, "EQ")
		.replace(/\bHP\b/gi, "HP")
		.replace(/\bAa\b/g, "AA")
		.replace(/\bms\b/gi, "ms");

const cleanFeatureText = (text = "") =>
	titleCase(
		String(text)
			.replace(/\s*\((?:Toggle|Slider|Selector|Keybind|Color|Input)[^)]*\)/gi, "")
			.replace(/\s*\/\s*default\s+[^)]*/gi, "")
			.replace(/\bAddMenu\b/g, "settings")
			.replace(/\bsource\b/gi, "original")
			.replace(/\bextracted controls\b/gi, "options")
			.replace(/\s+\/\s+/g, " · ")
			.replace(/\bmenu\b/gi, "settings")
			.replace(/\bsettings settings\b/gi, "settings")
			.replace(/\bPER-ENEMY\b/gi, "Per enemy")
			.replace(/\bANTI-GAPCLOSE\b/gi, "Anti-gapclose")
			.replace(/\bLASTHIT\b/gi, "Last hit")
			.replace(/\bKILLSTEAL\b/gi, "Kill secure")
			.replace(/\bWINDWALL\b/gi, "Wind Wall")
			.replace(/\bKEY BINDINGS\b/gi, "Hotkeys")
			.replace(/\bDRAWING SETTINGS\b/gi, "On-screen info")
			.replace(/\bFLEE SETTINGS\b/gi, "Escape tools")
			.replace(/\bSAFETY GATES\b/gi, "Safety checks")
			.replace(/\bCOMBO SETTINGS\b/gi, "Combo")
			.replace(/\bHARASS SETTINGS\b/gi, "Harass")
			.replace(/\bLANE\/JUNGLE\/LASTHIT\b/gi, "Lane, jungle, and last hit"),
	).trim();

const lsGroupTitle = (group = {}) => {
	const title = String(group.title || "");
	const compact = title.toLowerCase();
	if (/prediction/.test(compact)) return "Prediction";
	if (/key bindings/.test(compact)) return "Hotkeys";
	if (/weapon pair/.test(compact)) return "Weapon pairing";
	if (/weapon swap|rotation engine|post-severum|special combos/.test(compact)) return "Weapon swaps";
	if (/windwall|wind wall/.test(compact)) return "Wind Wall matchups";
	if (/moonlight|\br\b/.test(compact)) return "Ultimate";
	if (/harass/.test(compact)) return "Harass";
	if (/combo/.test(compact)) return "Combo";
	if (/lane|jungle|lasthit|last hit/.test(compact)) return "Farm and clear";
	if (/killsteal|kill secure/.test(compact)) return "Kill secure";
	if (/anti-gapclose|interrupt|anti-melee/.test(compact)) return "Anti-engage";
	if (/flee|escape/.test(compact)) return "Escape";
	if (/safety/.test(compact)) return "Safety checks";
	if (/draw/.test(compact)) return "On-screen info";
	if (/per-enemy/.test(compact)) return "Enemy rules";
	if (/q\s*-|q /.test(compact)) return "Q choices";
	if (/w\s*-|w /.test(compact)) return "W choices";
	if (/e\s*-|e /.test(compact)) return "E choices";
	return cleanFeatureText(title);
};

const lsFeatureLine = (feature = "") => cleanFeatureText(feature)
	.replace(/Use /g, "Use ")
	.replace(/Global Hitchance/g, "Hit chance")
	.replace(/Semi-Manual/g, "Manual")
	.replace(/Semi /g, "Manual ")
	.replace(/Per-Weapon/g, "Per weapon")
	.replace(/Aa-Gate/g, "AA timing")
	.replace(/Low-Ammo/g, "Low ammo")
	.replace(/Forbid Dash-Follow Logic/g, "Avoid unsafe dash follow-up")
	.replace(/Never Use/g, "Avoid")
	.replace(/Allow Blind/g, "Allow blind")
	.replace(/If Not Killable/g, "when it is not lethal")
	.replace(/Auto Only If Killable/g, "only when lethal")
	.replace(/Manual Q/g, "Manual Q")
	.replace(/Manual R/g, "Manual R");

const lsDisplayGroups = (featureGroups = []) => {
	const merged = new Map();
	featureGroups.forEach((group) => {
		const title = lsGroupTitle(group);
		if (!merged.has(title)) merged.set(title, []);
		merged.get(title).push(...(group.items || []));
	});
	return Array.from(merged, ([title, items]) => ({ title, items })).slice(0, 10);
};

const renderFeatureGroups = (card, suite) => {
	if (!card.featureGroups) return "";
	const groups = suite.key === "ls" ? lsDisplayGroups(card.featureGroups) : card.featureGroups;

	return `
    <div class="champion-feature-groups">
      ${groups
				.map(
					(group) => `
        <details class="champion-feature-group">
          <summary>${suite.key === "ls" ? group.title : cleanFeatureText(group.title)} <span>${group.items.length}</span></summary>
          <ul>${group.items
						.slice(0, suite.key === "ls" ? 8 : group.items.length)
						.map((feature) => `<li>${suite.key === "ls" ? lsFeatureLine(feature) : feature}</li>`)
						.join("")}</ul>
        </details>
      `,
				)
				.join("")}
    </div>
  `;
};

const localizeSuite = (suite) => {
	if (!suite.locales) return suite;
	const locale = suite.locales[activeLanguage] || suite.locales.en || {};
	const localized = { ...suite, ...locale };
	if (locale.champions) {
		localized.champions = locale.champions.map((card, index) => ({
			...(suite.champions[index] || {}),
			...card,
		}));
	}
	return localized;
};

const renderLanguagePicker = (suite) => {
	if (!suite.locales) return "";

	return `
    <div class="language-picker" aria-label="Language selector">
      ${Object.entries(suite.locales)
				.map(
					([key, locale]) => `
        <button class="language-picker__button${key === activeLanguage ? " is-active" : ""}" type="button" data-language="${key}">${locale.languageLabel}</button>
      `,
				)
				.join("")}
    </div>
  `;
};

const rosterRole = (card, suite) =>
	suite.key === "ls" && /menu sections/i.test(card.role || "")
		? "Fight, farm, safety, and visuals"
		: card.role;

const rosterDescription = (card, suite) =>
	suite.key === "ls" &&
	/menu|source|extracted|controls/i.test(card.description || "")
		? `${card.name} setup focused on cleaner fights, faster tuning, safer reactions, and information that stays useful in game.`
		: card.description;

const renderRosterCard = (card, index, suite, compact = false) => `
  <article class="danzaio-roster-card${compact ? " danzaio-roster-card--catalog" : ""}" style="--reveal-delay:${index * (compact ? 40 : 85)}ms;">
    <div class="danzaio-roster-card__image" style="background-image:url('${assetUrl(card.image)}'); background-position:${card.position};"></div>
    <div class="danzaio-roster-card__body">
      <div class="danzaio-roster-card__topline">
        <span class="danzaio-roster-card__label">${card.label}</span>
        <span class="danzaio-roster-card__badge">${iconBadge()}</span>
      </div>
      <h3>${card.name}</h3>
      <h4>${rosterRole(card, suite)}</h4>
      <p>${rosterDescription(card, suite)}</p>
      ${card.features ? `<ul class="champion-feature-list">${card.features.map((feature) => `<li>${suite.key === "ls" ? cleanFeatureText(feature) : feature}</li>`).join("")}</ul>` : ""}
      ${renderFeatureGroups(card, suite)}
      ${renderChampionActions(card, suite)}
    </div>
  </article>
`;

function renderShellHeader(active) {
	return `
    <header class="riotbar riotbar--danzaio">
      <div class="riotbar__inner">
        <a class="riotbar__brand riotbar__brand--danzaio" href="${rootPrefix}">
          <span class="riotbar__brand-mark" aria-hidden="true"></span>
          <span>Rift+</span>
        </a>
        <nav class="riotbar__nav" aria-label="Rift+ navigation">
          <a href="${rootPrefix}">PLATFORMS</a>
          <a href="${rootPrefix}ven/" class="${active === "ven" ? "" : "dim"}">VEN</a>
          <a href="${rootPrefix}ls/" class="${active === "ls" ? "" : "dim"}">LS</a>
          <a href="${rootPrefix}hanbot/" class="${active === "hanbot" ? "" : "dim"}">HANBOT</a>
          <a href="${rootPrefix}yasuo/" class="${active === "yasuo" ? "" : "dim"}">YASUO</a>
          ${active !== "home" ? '<a href="#all-champions">CHAMPIONS</a><a href="#requests">REQUESTS</a>' : ""}
        </nav>
        <div class="riotbar__actions">
          <a class="pill pill--dark" href="https://t.me/DanzAIO" target="_blank" rel="noreferrer">TELEGRAM</a>
          <a class="pill pill--cyan" href="https://dsc.gg/danzaio" target="_blank" rel="noreferrer">DISCORD</a>
        </div>
      </div>
    </header>
  `;
}

function renderHome() {
	app.innerHTML = `
    ${renderShellHeader("home")}
    <main class="page danzaio-shell">
      <section class="platform-landing">
        <div class="platform-landing__backdrop" aria-hidden="true"></div>
        <div class="platform-landing__inner section-animate is-visible">
          <p class="danzaio-kicker">DanZAIO suite</p>
          <h1>Choose your platform.</h1>
          <p class="platform-landing__lede">Pick the suite you play on and jump straight into champion support, real features, and requests.</p>
          <div class="platform-grid">
            ${platformCards
							.map(
								(platform) => `
              <a class="platform-card platform-card--${platform.key}" href="${platform.href}">
                <div class="platform-card__image" style="background-image:url('${assetUrl(platform.image)}');"></div>
                <div class="platform-card__shade"></div>
                <div class="platform-card__body">
                  <p>${platform.kicker}</p>
                  <h2>${platform.title}</h2>
                  <span>${platform.body}</span>
                  <div class="platform-card__stats">${platform.stats.map((stat) => `<b>${stat}</b>`).join("")}</div>
                </div>
              </a>
            `,
							)
							.join("")}
          </div>
        </div>
      </section>
    </main>
  `;
}

function renderSuite(suite) {
	const sourceSuite = suite;
	suite = localizeSuite(suite);

	if (suite.locked) {
		return renderLockedSuite(suite);
	}

	app.innerHTML = `
    ${renderShellHeader(suite.key)}
    <main class="page danzaio-shell suite-page suite-page--${suite.key}">
      <section class="danzaio-hero danzaio-hero--${suite.key}" id="overview">
        <div class="danzaio-hero__backdrop" style="background-image:linear-gradient(90deg, rgba(8, 10, 13, 0.92) 0%, rgba(8, 10, 13, 0.72) 42%, rgba(8, 10, 13, 0.22) 64%, rgba(8, 10, 13, 0.76) 100%), url('${assetUrl(suite.heroImage)}');" aria-hidden="true"></div>
        <div class="danzaio-hero__texture" aria-hidden="true"></div>
        <div class="danzaio-hero__inner">
          <div class="danzaio-hero__copy section-animate is-visible">
            <p class="danzaio-kicker">${suite.platformLabel}</p>
            <h1>${suite.headline}</h1>
            <p class="danzaio-hero__lede">${suite.lede}</p>
            ${renderLanguagePicker(sourceSuite)}
            <div class="danzaio-hero__actions">
              <a class="pill pill--cyan" href="#all-champions">${suite.primaryAction || "FULL LINEUP"}</a>
              <button class="pill pill--dark" type="button" data-request="new-champion" data-platform="${suite.name}">${suite.secondaryAction || "REQUEST NEW CHAMPION"}</button>
            </div>
            <div class="danzaio-hero__stats">
              ${suite.stats.map((stat) => `<article class="danzaio-stat"><p>${stat.label}</p><h2>${stat.value}</h2><span>${stat.note}</span></article>`).join("")}
            </div>
          </div>
          <div class="danzaio-hero__panel section-animate is-visible">
            <div class="danzaio-hero__panel-image" style="background-image:linear-gradient(180deg, rgba(10, 10, 12, 0.08), rgba(10, 10, 12, 0.76)), url('${assetUrl(suite.panelImage)}');"></div>
            <div class="danzaio-hero__panel-overlay"></div>
            <div class="danzaio-hero__panel-content">
              <div class="danzaio-terminal">${suite.signals.map((signal) => `<span>${signal}</span>`).join("")}</div>
              <div class="danzaio-hero__panel-copy"><p>${suite.name}</p><h2>${suite.panelTitle || `${suite.stats[0].value} champions. Clean menus. Fast setup.`}</h2><span>${suite.panelBody || suite.lede}</span></div>
            </div>
          </div>
        </div>
      </section>

      <section class="danzaio-signal-strip section-animate is-visible">
        <div class="danzaio-signal-strip__inner">
          ${suite.supportLinks.map((link) => (link.action ? `<button type="button" data-request="${link.action}" data-platform="${suite.name}" ${link.champion ? `data-champion="${link.champion}"` : ""}>${link.text}</button>` : `<a href="${link.href}" ${link.href.startsWith("http") ? 'target="_blank" rel="noreferrer"' : ""}>${link.text}</a>`)).join("")}
        </div>
      </section>

      <section class="danzaio-section section-animate" id="systems">
        ${renderMajorHeader(suite.systemsTitle || "What players get", "assets/icons/content-type-latest.png", suite.systemsBody || "Champion-specific control, clean menus, and a lineup that stays easy to pick from.")}
        <div class="danzaio-feature-grid">${suite.features.map(renderFeatureCard).join("")}</div>
      </section>

      <section class="danzaio-section danzaio-section--catalog section-animate" id="all-champions">
        ${renderMajorHeader(suite.championTitle || "Choose your champion", "assets/icons/content-type-champion.png", suite.championBody || `Every supported ${suite.name} champion in one clean lineup.`)}
        <div class="danzaio-roster-grid danzaio-roster-grid--catalog">${suite.champions.map((card, index) => renderRosterCard(card, index, suite, true)).join("")}</div>
      </section>

      <section class="danzaio-section danzaio-section--updates section-animate" id="updates">
        ${renderMajorHeader(suite.updatesTitle || "Built around the way you play", "assets/icons/content-type-faction.png", suite.updatesBody || "Pick your champion, tune the essentials, and tell us what should feel better next.")}
        <div class="danzaio-updates-grid">${suite.facts.map(renderFactCard).join("")}</div>
      </section>

      <section class="danzaio-cta section-animate" id="requests">
        <div class="danzaio-cta__inner">
          <p class="danzaio-kicker">${suite.name} // ${suite.requestsLabel || "requests"}</p>
          <h2>${suite.requestTitle || "Missing a champion or feature? Tell us what you want improved."}</h2>
          <div class="danzaio-cta__actions">
            <button class="pill pill--cyan" type="button" data-request="new-champion" data-platform="${suite.name}">${suite.secondaryAction || "REQUEST NEW CHAMPION"}</button>
            <a class="pill pill--dark" href="https://dsc.gg/danzaio" target="_blank" rel="noreferrer">${suite.discordAction || "JOIN DISCORD"}</a>
          </div>
        </div>
      </section>
    </main>
    ${renderRequestModal()}
  `;

	setupRequestForms();
	setupLanguagePicker(sourceSuite);
}

function setupLanguagePicker(suite) {
	if (!suite.locales) return;
	document.querySelectorAll("[data-language]").forEach((button) => {
		button.addEventListener("click", () => {
			activeLanguage = button.dataset.language || "en";
			localStorage.setItem("riftplusLanguage", activeLanguage);
			renderSuite(suite);
			setupRevealObservers();
		});
	});
}

function renderLockedSuite(suite) {
	app.innerHTML = `
    ${renderShellHeader(suite.key)}
    <main class="page danzaio-shell suite-page suite-page--${suite.key}">
      <section class="danzaio-hero danzaio-hero--${suite.key} locked-suite" id="overview">
        <div class="danzaio-hero__backdrop" style="background-image:linear-gradient(90deg, rgba(8, 10, 13, 0.92) 0%, rgba(8, 10, 13, 0.72) 42%, rgba(8, 10, 13, 0.22) 64%, rgba(8, 10, 13, 0.76) 100%), url('${assetUrl(suite.heroImage)}');" aria-hidden="true"></div>
        <div class="danzaio-hero__texture" aria-hidden="true"></div>
        <div class="danzaio-hero__inner">
          <div class="danzaio-hero__copy section-animate is-visible">
            <p class="danzaio-kicker">${suite.platformLabel}</p>
            <h1>${suite.headline}</h1>
            <p class="danzaio-hero__lede">${suite.lede}</p>
            <div class="danzaio-hero__actions">
              <a class="pill pill--cyan" href="${rootPrefix}ven/">VIEW VEN</a>
              <a class="pill pill--dark" href="https://dsc.gg/danzaio" target="_blank" rel="noreferrer">JOIN DISCORD</a>
            </div>
          </div>
          <div class="danzaio-hero__panel section-animate is-visible locked-suite__panel">
            <div class="danzaio-hero__panel-image" style="background-image:linear-gradient(180deg, rgba(10, 10, 12, 0.08), rgba(10, 10, 12, 0.84)), url('${assetUrl(suite.panelImage)}');"></div>
            <div class="danzaio-hero__panel-overlay"></div>
            <div class="danzaio-hero__panel-content">
              <div class="danzaio-terminal">${suite.signals.map((signal) => `<span>${signal}</span>`).join("")}</div>
              <div class="danzaio-hero__panel-copy"><p>To be announced</p><h2>Hanbot lineup is locked for now.</h2><span>Details will be revealed when the page is ready for players.</span></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  `;
}

function renderRequestModal() {
	return `
    <div class="request-modal" id="request-modal" aria-hidden="true">
      <div class="request-modal__overlay" data-close-modal></div>
      <div class="request-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="request-modal-title">
        <button class="request-modal__close" type="button" data-close-modal aria-label="Close request form">x</button>
        <p class="danzaio-kicker" id="request-modal-kicker">Player request</p>
        <h2 id="request-modal-title">Send request</h2>
        <form class="request-form" id="request-form">
          <input type="hidden" name="requestType" id="request-type" />
          <div class="request-form__grid" id="request-fields"></div>
          <label class="request-form__field request-form__field--full request-form__bot" aria-hidden="true"><span>Leave this empty</span><input name="website" autocomplete="off" tabindex="-1" /></label>
          <div class="request-form__actions"><button class="pill pill--cyan" type="submit">Submit request</button><button class="pill pill--dark" type="button" data-close-modal>Cancel</button></div>
          <p class="request-form__status" id="request-status" role="status"></p>
        </form>
      </div>
    </div>
  `;
}

const field = ({
	name,
	label,
	type = "text",
	value = "",
	placeholder = "",
	full = false,
	options = null,
	rows = 4,
}) => {
	if (options) {
		return `<label class="request-form__field${full ? " request-form__field--full" : ""}"><span>${label}</span><select name="${name}">${options.map((option) => `<option value="${option}" ${option === value ? "selected" : ""}>${option}</option>`).join("")}</select></label>`;
	}
	if (type === "textarea") {
		return `<label class="request-form__field${full ? " request-form__field--full" : ""}"><span>${label}</span><textarea name="${name}" rows="${rows}" placeholder="${placeholder}">${value}</textarea></label>`;
	}
	return `<label class="request-form__field${full ? " request-form__field--full" : ""}"><span>${label}</span><input name="${name}" type="${type}" value="${value}" placeholder="${placeholder}" /></label>`;
};

function fieldsFor(type, platform, champion) {
	if (type === "bug") {
		return [
			field({ name: "platform", label: "Platform", value: platform }),
			field({ name: "champion", label: "Champion", value: champion }),
			field({
				name: "contact",
				label: "Discord or Telegram",
				placeholder: "@name",
			}),
			field({
				name: "mode",
				label: "What were you using?",
				options: [
					"Combo",
					"Harass",
					"Clear",
					"Jungle",
					"Kill pressure",
					"Visuals",
					"Settings",
					"Other",
				],
			}),
			field({
				name: "summary",
				label: "What went wrong?",
				full: true,
				placeholder: "Example: E dashed under turret during combo",
			}),
			field({
				name: "expected",
				label: "What did you expect?",
				type: "textarea",
				full: true,
				rows: 3,
			}),
			field({
				name: "actual",
				label: "What happened instead?",
				type: "textarea",
				full: true,
				rows: 4,
			}),
			field({
				name: "steps",
				label: "What were you doing when it happened?",
				type: "textarea",
				full: true,
				rows: 4,
				placeholder:
					"Game mode, enemy champion, your combo, and anything that helps explain the moment.",
			}),
			field({
				name: "mediaUrl",
				label: "Video or screenshot URL",
				type: "url",
				full: true,
				placeholder: "YouTube, Streamable, Imgur, Discord CDN, etc.",
			}),
		].join("");
	}

	if (type === "feature") {
		return [
			field({ name: "platform", label: "Platform", value: platform }),
			field({ name: "champion", label: "Champion", value: champion }),
			field({
				name: "contact",
				label: "Discord or Telegram",
				placeholder: "@name",
			}),
			field({
				name: "priority",
				label: "How important is it?",
				options: ["Nice to have", "Important", "High impact"],
			}),
			field({
				name: "menuSection",
				label: "Where should it fit?",
				options: [
					"Combo",
					"Harass",
					"Clear",
					"Jungle",
					"Kill pressure",
					"Defensive",
					"Visuals",
					"Prediction",
					"Other",
				],
			}),
			field({
				name: "settingName",
				label: "Feature idea",
				placeholder: "Example: Safer E all-in toggle",
			}),
			field({
				name: "behavior",
				label: "What should it do in game?",
				type: "textarea",
				full: true,
				rows: 5,
				placeholder:
					"Describe the moment, what you want the feature to help with, and what it should avoid.",
			}),
			field({
				name: "hotkey",
				label: "Key, toggle, or automatic?",
				placeholder: "Optional",
			}),
			field({
				name: "notes",
				label: "Clip, example, or extra notes",
				type: "textarea",
				full: true,
				rows: 3,
			}),
		].join("");
	}

	return [
		field({ name: "platform", label: "Platform", value: platform }),
		field({
			name: "champion",
			label: "Champion wanted",
			placeholder: "Champion name",
		}),
		field({
			name: "contact",
			label: "Discord or Telegram",
			placeholder: "@name",
		}),
		field({
			name: "role",
			label: "Main role or playstyle",
			options: ["ADC", "Support", "Mid", "Jungle", "Top", "Flex"],
		}),
		field({
			name: "combo",
			label: "What should the combo feel like?",
			type: "textarea",
			full: true,
			rows: 4,
			placeholder:
				"Burst, poke, all-in, safe trading, reset play, engage, peel, or anything specific.",
		}),
		field({
			name: "harass",
			label: "How should poke or trading work?",
			type: "textarea",
			full: true,
			rows: 3,
			placeholder:
				"When you want it to trade, what it should avoid, and any mana or safety preferences.",
		}),
		field({
			name: "clear",
			label: "What should farming or jungle clear do?",
			type: "textarea",
			full: true,
			rows: 3,
			placeholder:
				"Lane clear, jungle clear, objective help, or last-hit preferences.",
		}),
		field({
			name: "killsteal",
			label: "How should it finish kills?",
			type: "textarea",
			full: true,
			rows: 3,
			placeholder:
				"Important spells, long-range finishers, execute moments, or safety limits.",
		}),
		field({
			name: "defensive",
			label: "What danger should it react to?",
			type: "textarea",
			full: true,
			rows: 3,
			placeholder:
				"Gapclosers, interrupts, shields, dodges, panic buttons, or ally saves.",
		}),
		field({
			name: "drawings",
			label: "What should it show on screen?",
			type: "textarea",
			full: true,
			rows: 3,
			placeholder:
				"Ranges, damage, status text, kill indicators, or anything you want visible.",
		}),
		field({
			name: "references",
			label: "Clips, examples, or links",
			type: "textarea",
			full: true,
			rows: 3,
			placeholder:
				"Gameplay clips, ideas, or other examples that show what you want.",
		}),
	].join("");
}

function setupRevealObservers() {
	document
		.querySelectorAll(".section-animate, .major-section-header")
		.forEach((el) => el.classList.add("is-visible"));
}

function setupRequestForms() {
	const modal = document.querySelector("#request-modal");
	const form = document.querySelector("#request-form");
	const fields = document.querySelector("#request-fields");
	const status = document.querySelector("#request-status");
	const title = document.querySelector("#request-modal-title");
	const kicker = document.querySelector("#request-modal-kicker");
	const typeInput = document.querySelector("#request-type");
	if (!modal || !form) return;

	document.querySelectorAll("[data-request]").forEach((button) => {
		button.addEventListener("click", () => {
			const type = button.dataset.request;
			const platform = button.dataset.platform || "";
			const champion = button.dataset.champion || "";
			typeInput.value = type;
			fields.innerHTML = fieldsFor(type, platform, champion);
			status.textContent = "";
			kicker.textContent = `${platform || "Rift+"} request`;
			title.textContent =
				type === "bug"
					? `Report ${champion} bug`
					: type === "feature"
						? `Request ${champion} feature`
						: "Request new champion";
			modal.classList.add("is-open");
			modal.setAttribute("aria-hidden", "false");
			modal.querySelector("input, select, textarea")?.focus();
		});
	});

	modal.querySelectorAll("[data-close-modal]").forEach((button) =>
		button.addEventListener("click", () => {
			modal.classList.remove("is-open");
			modal.setAttribute("aria-hidden", "true");
		}),
	);

	form.addEventListener("submit", async (event) => {
		event.preventDefault();
		const payload = Object.fromEntries(new FormData(form).entries());
		if (payload.website) return;
		payload.createdAt = new Date().toISOString();
		payload.page = location.href;

		if (requestEndpoint) {
			await fetch(requestEndpoint, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});
		} else {
			const saved = JSON.parse(
				localStorage.getItem("riftplusRequests") || "[]",
			);
			saved.push(payload);
			localStorage.setItem("riftplusRequests", JSON.stringify(saved));
		}

		form.reset();
		status.textContent = "Request submitted. Thank you.";
	});
}

if (pageKind === "home") renderHome();
if (pageKind === "ven") renderSuite(venSuite);
if (pageKind === "ls") renderSuite(lsSuite);
if (pageKind === "hanbot") renderSuite(hanbotSuite);
if (pageKind === "yasuo") renderSuite(yasuoSuite);
setupRevealObservers();
