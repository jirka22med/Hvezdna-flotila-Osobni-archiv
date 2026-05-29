/**
 * ═══════════════════════════════════════════════════
 *  VÍCE ADMIRÁL JIŘÍK – OSOBNÍ FLOTILA
 *  script.js · Přepínání stránek a navigace
 *  Autor: Admirál Claude.AI · 2026
 * ═══════════════════════════════════════════════════
 */

'use strict';

/* ─── PŘEPÍNÁNÍ STRÁNEK ─── */

/**
 * switchPage – aktivuje zvolenou stránku a příslušné nav tlačítko.
 * @param {string} pageId  – ID elementu stránky (např. 'page-schools')
 * @param {HTMLElement} clickedBtn – tlačítko, které bylo stisknuto
 */
function switchPage(pageId, clickedBtn) {
  /* 1. Skryjeme všechny stránky */
  const allPages = document.querySelectorAll('.page');
  allPages.forEach(function(page) {
    page.classList.remove('active');
  });

  /* 2. Deaktivujeme všechna nav tlačítka */
  const allNavBtns = document.querySelectorAll('.nav-btn');
  allNavBtns.forEach(function(btn) {
    btn.classList.remove('active');
  });

  /* 3. Aktivujeme cílovou stránku */
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
  }

  /* 4. Aktivujeme příslušné nav tlačítko */
  if (clickedBtn) {
    clickedBtn.classList.add('active');
  }

  /* 5. Scroll na začátek stránky */
  window.scrollTo({ top: 0, behavior: 'smooth' });

  /* 6. Uložíme aktivní stránku do sessionStorage (volitelné) */
  try {
    sessionStorage.setItem('activePage', pageId);
  } catch (e) {
    /* sessionStorage nedostupný – ignorujeme */
  }
}


/* ─── OBNOVENÍ STRÁNKY PO RELOAD ─── */

/**
 * Po načtení stránky obnovíme naposledy aktivní tab
 * (pokud je uložen v sessionStorage).
 */
document.addEventListener('DOMContentLoaded', function() {
  let savedPage = null;

  try {
    savedPage = sessionStorage.getItem('activePage');
  } catch (e) {
    /* sessionStorage nedostupný */
  }

  if (savedPage && document.getElementById(savedPage)) {
    /* Najdeme odpovídající nav tlačítko a přepneme */
    const matchingBtn = document.querySelector('[data-page="' + savedPage + '"]');
    switchPage(savedPage, matchingBtn);
  }
  /* Jinak zůstane výchozí stránka (page-schools) aktivní z HTML */
});


/* ─── KLÁVESOVÉ ZKRATKY (bonusová funkce) ─── */

/**
 * Přepínání stránek klávesami 1, 2, 3 na klávesnici.
 * Praktické pro rychlou navigaci na můstku.
 */
document.addEventListener('keydown', function(event) {
  /* Ignorujeme, pokud je focus v textovém poli */
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName)) {
    return;
  }

  const keyMap = {
    '1': { pageId: 'page-schools',     btnIndex: 0 },
    '2': { pageId: 'page-pc',          btnIndex: 1 },
    '3': { pageId: 'page-dedication',  btnIndex: 2 }
  };

  const target = keyMap[event.key];
  if (target) {
    const navBtns = document.querySelectorAll('.nav-btn');
    const btn = navBtns[target.btnIndex] || null;
    switchPage(target.pageId, btn);
  }
});


/* ═══════════════════════════════════════════════════
 *  JAK PŘIDAT NOVOU STRÁNKU – NÁVOD PRO VÍCE ADMIRÁLA JIŘÍKA
 * ═══════════════════════════════════════════════════
 *
 *  1. V index.html přidej nové nav tlačítko do <nav class="main-nav">:
 *
 *     <button class="nav-btn" data-page="page-nova" onclick="switchPage('page-nova', this)">
 *       <span class="nav-icon">🚀</span>
 *       <span class="nav-label">Nová sekce</span>
 *     </button>
 *
 *  2. V index.html přidej nový <main> blok (před </body>):
 *
 *     <main class="page" id="page-nova">
 *       <div class="page-header">
 *         <h1 class="page-title">Název nové sekce</h1>
 *         <p class="page-subtitle">Popis sekce</p>
 *       </div>
 *       <!-- Obsah sekce -->
 *     </main>
 *
 *  3. V script.js přidej klávesovou zkratku (volitelně):
 *
 *     '4': { pageId: 'page-nova', btnIndex: 3 },
 *
 *  4. Ve style.css žádné změny nejsou nutné – vše je připraveno.
 *     Pro specifický styl nové sekce přidej CSS třídy podle vzoru.
 *
 *  Warp 9.99 – mise splněna. 🖖
 * ═══════════════════════════════════════════════════
 */
