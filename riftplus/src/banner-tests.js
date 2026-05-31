const app = document.querySelector('#app');
const assetPrefix = location.pathname.includes('/tests/') ? '../../' : './';
const splash = (champion) => `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion}_0.jpg`;

const champions = [
  {
    key: 'zed',
    name: 'Zed',
    role: 'Shadow Kill Windows',
    label: 'DanZAIO // assassin',
    image: splash('Zed'),
    accent: '#9aa4b2',
    glow: 'rgba(107, 124, 150, 0.42)',
    pitch: 'Shadow routes, WEQ burst, lethal marks, and safer swaps stay readable during fast fights.',
    signals: ['WEQ pressure', 'Death Mark lethal', 'smart shadow swaps', 'safer all-in'],
  },
  {
    key: 'yasuo',
    name: 'Yasuo',
    role: 'Wind Combo Flow',
    label: 'DanZAIO // fighter',
    image: splash('Yasuo'),
    accent: '#78a7c4',
    glow: 'rgba(77, 151, 184, 0.42)',
    pitch: 'Steel Tempest rhythm, dash lanes, knockup follow-up, and Wind Wall timing need clean visual priority.',
    signals: ['Q stacks', 'dash lanes', 'knockup ready', 'Wind Wall timing'],
  },
];

const styles = [
  {
    key: 'duel',
    name: 'Duel Focus',
    note: 'big splash, hard left copy, compact signal stack',
  },
  {
    key: 'terminal',
    name: 'Combat Terminal',
    note: 'system panel, status rail, tactical readout',
  },
  {
    key: 'split',
    name: 'Split Blade',
    note: 'angled art slice, centered CTA, sharp gold frame',
  },
  {
    key: 'cinematic',
    name: 'Cinematic Wide',
    note: 'low text, full bleed image, high contrast overlay',
  },
  {
    key: 'loadout',
    name: 'Loadout Card',
    note: 'card grid, feature chips, request-first actions',
  },
];

const renderHeader = () => `
  <header class="riotbar riotbar--danzaio">
    <div class="riotbar__inner">
      <a class="riotbar__brand riotbar__brand--danzaio" href="${assetPrefix}">
        <span class="riotbar__brand-mark" aria-hidden="true"></span>
        <span>Rift+</span>
      </a>
      <nav class="riotbar__nav" aria-label="Test navigation">
        <a href="#zed">ZED</a>
        <a href="#yasuo">YASUO</a>
        <span class="dim">HIDDEN TEST PAGE</span>
      </nav>
      <div class="riotbar__actions">
        <a class="pill pill--dark" href="${assetPrefix}ven/">VEN</a>
        <a class="pill pill--cyan" href="${assetPrefix}hanbot/">HANBOT</a>
      </div>
    </div>
  </header>
`;

const renderBanner = (champion, style, index) => `
  <article class="banner-test banner-test--${style.key} section-animate is-visible" style="--champion-accent:${champion.accent}; --champion-glow:${champion.glow}; --reveal-delay:${index * 70}ms;">
    <div class="banner-test__art" style="background-image:url('${champion.image}');" aria-hidden="true"></div>
    <div class="banner-test__shade" aria-hidden="true"></div>
    <div class="banner-test__chrome" aria-hidden="true"></div>
    <div class="banner-test__content">
      <p class="danzaio-kicker">${champion.label} // ${style.name}</p>
      <h2>${champion.name}</h2>
      <h3>${champion.role}</h3>
      <p>${champion.pitch}</p>
      <div class="banner-test__chips">
        ${champion.signals.map((signal) => `<span>${signal}</span>`).join('')}
      </div>
    </div>
  </article>
`;

app.innerHTML = `
  ${renderHeader()}
  <main class="page danzaio-shell banner-test-page">
    <section class="banner-test-hero section-animate is-visible">
      <p class="danzaio-kicker">internal tests // noindex</p>
      <h1>Champion banner directions.</h1>
      <p>Five shared banner systems rendered for Zed and Yasuo. Same layouts, champion-specific art, tone, and signal chips.</p>
    </section>
    ${champions.map((champion) => `
      <section class="banner-test-section" id="${champion.key}">
        <div class="major-section-header danzaio-section-header is-visible">
          <img class="major-section-header__icon" src="${assetPrefix}assets/icons/content-type-champion.png" alt="" aria-hidden="true" />
          <h2 class="major-section-header__title">
            <span class="major-section-header__line"></span>
            <span class="major-section-header__diamond" aria-hidden="true"></span>
            <span class="major-section-header__text">${champion.name}</span>
            <span class="major-section-header__diamond" aria-hidden="true"></span>
            <span class="major-section-header__line"></span>
          </h2>
          <p class="danzaio-section-header__body">${champion.name} uses all five banner styles so visual differences stay comparable.</p>
        </div>
        <div class="banner-test-grid">
          ${styles.map((style, index) => renderBanner(champion, style, index)).join('')}
        </div>
      </section>
    `).join('')}
  </main>
`;
