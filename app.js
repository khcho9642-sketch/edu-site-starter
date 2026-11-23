(() => {
  "use strict";

  const data = window.GUIDE_DATA;
  const STORAGE_KEY = "dev-setup-guide-progress-v2";
  let state = loadState();
  let toastTimer;

  const content = document.querySelector("#guide-content");
  const sideNav = document.querySelector("#sideNav");
  const routeList = document.querySelector("#routeList");
  const mobileNav = document.querySelector("#mobileNav");
  const checklistItems = document.querySelector("#checklistItems");

  renderNavigation();
  renderSections();
  renderFinalChecklist();
  bindInteractions();
  updateProgressUI();
  observeSections();

  function loadState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return {
        sections: parsed.sections || {},
        checklist: parsed.checklist || {}
      };
    } catch {
      return { sections: {}, checklist: {} };
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // The guide still works when local storage is unavailable.
    }
  }

  function renderNavigation() {
    routeList.innerHTML = data.sections.map((section, index) => `
      <li data-section-state="${section.id}">
        <a href="#${section.id}">
          <span class="route-number">${String(index + 1).padStart(2, "0")}</span>
          <span class="route-label">${escapeHtml(section.shortTitle)}</span>
        </a>
      </li>
    `).join("");

    sideNav.innerHTML = data.sections.map((section, index) => `
      <li data-section-state="${section.id}">
        <a href="#${section.id}">
          <span class="nav-number">${String(index + 1).padStart(2, "0")}</span>
          <span>${escapeHtml(section.shortTitle)}</span>
          <span class="nav-check" aria-hidden="true">✓</span>
        </a>
      </li>
    `).join("");

    mobileNav.innerHTML = data.sections.map((section, index) => `
      <option value="${section.id}">${index + 1}. ${escapeHtml(section.title)}</option>
    `).join("");
  }

  function renderSections() {
    content.innerHTML = data.sections.map((section, index) => `
      <article class="guide-section" id="${section.id}" data-search="${escapeAttribute(sectionSearchText(section))}">
        <header class="guide-section-header">
          <span class="section-number">${String(index + 1).padStart(2, "0")}</span>
          <div>
            <h2>${escapeHtml(section.title)}</h2>
            <p>${escapeHtml(section.summary)}</p>
          </div>
          <label class="section-complete">
            <input type="checkbox" data-section-complete="${section.id}" ${state.sections[section.id] ? "checked" : ""} />
            <span>이 단계 완료</span>
          </label>
        </header>
        ${section.blocks.map(renderBlock).join("")}
      </article>
    `).join("");
  }

  function renderBlock(block) {
    switch (block.type) {
      case "heading":
        return `<h3 class="guide-block subheading">${escapeHtml(block.title)}</h3>`;
      case "text":
        return `<p class="guide-block body-copy">${block.html}</p>`;
      case "steps":
        return `
          <div class="guide-block steps">
            ${block.items.map((item) => `
              <section class="step-card">
                <h3>${escapeHtml(item.title)}</h3>
                <p>${item.html}</p>
              </section>
            `).join("")}
          </div>
        `;
      case "code": {
        const rawCode = block.code.join("\n");
        const displayed = block.code.map((line) => `<span class="prompt">$</span> ${escapeHtml(line)}`).join("\n");
        return `
          <div class="guide-block code-block">
            <div class="code-toolbar">
              <span>${escapeHtml(block.label)}</span>
              <button class="copy-button" type="button" data-copy="${escapeAttribute(rawCode)}">복사</button>
            </div>
            <pre><code>${displayed}</code></pre>
          </div>
        `;
      }
      case "note":
        return `
          <aside class="guide-block note ${block.tone === "warn" ? "warn" : ""}">
            <span class="note-icon" aria-hidden="true">${block.tone === "warn" ? "!" : "i"}</span>
            <div><strong>${escapeHtml(block.title)}</strong><p>${block.html}</p></div>
          </aside>
        `;
      case "figure":
        return `
          <figure class="guide-block guide-figure">
            <button class="figure-button" type="button" data-image="${escapeAttribute(block.src)}" data-caption="${escapeAttribute(block.caption)}">
              <img src="${escapeAttribute(block.src)}" alt="${escapeAttribute(block.alt)}" loading="lazy" />
            </button>
            <figcaption>${escapeHtml(block.caption)}</figcaption>
          </figure>
        `;
      case "links":
        return `
          <ul class="guide-block resource-list">
            ${block.items.map((item) => `
              <li><a href="${escapeAttribute(item.url)}" target="_blank" rel="noopener noreferrer"><span>${escapeHtml(item.label)}</span><span aria-hidden="true">새 탭</span></a></li>
            `).join("")}
          </ul>
        `;
      case "checklist":
        return `<ul class="guide-block inline-checklist">${block.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
      default:
        return "";
    }
  }

  function renderFinalChecklist() {
    checklistItems.innerHTML = data.finalChecklist.map((label, index) => `
      <label class="checklist-item">
        <input type="checkbox" data-checklist-index="${index}" ${state.checklist[index] ? "checked" : ""} />
        <span>${escapeHtml(label)}</span>
      </label>
    `).join("");
  }

  function bindInteractions() {
    document.addEventListener("change", (event) => {
      const sectionInput = event.target.closest("[data-section-complete]");
      if (sectionInput) {
        state.sections[sectionInput.dataset.sectionComplete] = sectionInput.checked;
        saveState();
        updateProgressUI();
        return;
      }

      const checklistInput = event.target.closest("[data-checklist-index]");
      if (checklistInput) {
        state.checklist[checklistInput.dataset.checklistIndex] = checklistInput.checked;
        saveState();
        updateReadiness();
      }
    });

    document.addEventListener("click", async (event) => {
      const copyButton = event.target.closest("[data-copy]");
      if (copyButton) {
        await copyText(copyButton.dataset.copy || "");
        copyButton.textContent = "복사됨";
        setTimeout(() => { copyButton.textContent = "복사"; }, 1400);
        showToast();
        return;
      }

      const imageButton = event.target.closest("[data-image]");
      if (imageButton) {
        openImageDialog(imageButton);
      }
    });

    mobileNav.addEventListener("change", () => {
      document.getElementById(mobileNav.value)?.scrollIntoView({ behavior: "smooth" });
    });

    document.querySelectorAll("[data-guide-search]").forEach((input) => input.addEventListener("input", (event) => {
      document.querySelectorAll("[data-guide-search]").forEach((other) => {
        if (other !== event.target) other.value = event.target.value;
      });
      filterGuide(event.target.value);
    }));

    document.querySelector("#resetProgress").addEventListener("click", () => {
      if (!window.confirm("이 브라우저에 저장된 진행 상태와 체크 항목을 모두 초기화할까요?")) return;
      state = { sections: {}, checklist: {} };
      saveState();
      document.querySelectorAll("[data-section-complete], [data-checklist-index]").forEach((input) => {
        input.checked = false;
      });
      updateProgressUI();
    });

    const dialog = document.querySelector("#imageDialog");
    document.querySelector("#closeDialog").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
  }

  function updateProgressUI() {
    const completed = data.sections.filter((section) => Boolean(state.sections[section.id])).length;
    const percent = Math.round((completed / data.sections.length) * 100);
    document.querySelector("#progressLabel").textContent = `${completed} / ${data.sections.length} 완료`;
    document.querySelector("#progressBar").style.width = `${percent}%`;

    document.querySelectorAll("[data-section-state]").forEach((item) => {
      item.classList.toggle("is-complete", Boolean(state.sections[item.dataset.sectionState]));
    });

    updateReadiness();
  }

  function updateReadiness() {
    const total = data.finalChecklist.length;
    const checked = data.finalChecklist.filter((_, index) => Boolean(state.checklist[index])).length;
    const percent = Math.round((checked / total) * 100);
    document.querySelector("#readinessIcon").textContent = `${percent}%`;

    const title = document.querySelector("#readinessTitle");
    const copy = document.querySelector("#readinessCopy");
    if (checked === total) {
      title.textContent = "프로젝트를 시작할 준비가 끝났습니다";
      copy.textContent = "이제 저장소의 README를 따라 로컬 실행과 배포를 진행하세요.";
    } else if (checked >= Math.ceil(total * 0.6)) {
      title.textContent = "거의 다 준비됐습니다";
      copy.textContent = `남은 ${total - checked}개 항목을 실제로 확인해 주세요.`;
    } else {
      title.textContent = "하나씩 준비해 보세요";
      copy.textContent = `${checked}개를 확인했습니다. 다음 항목을 이어서 진행하세요.`;
    }
  }

  function filterGuide(rawQuery) {
    const query = rawQuery.trim().toLocaleLowerCase("ko-KR");
    let visible = 0;
    document.querySelectorAll(".guide-section").forEach((section) => {
      const matches = !query || section.dataset.search.includes(query);
      section.hidden = !matches;
      if (matches) visible += 1;
    });

    const status = document.querySelector("#searchStatus");
    if (!query) {
      status.classList.remove("is-visible");
      status.textContent = "";
      return;
    }
    status.classList.add("is-visible");
    status.textContent = visible ? `“${rawQuery.trim()}” 관련 단계 ${visible}개를 표시합니다.` : `“${rawQuery.trim()}”와 일치하는 단계가 없습니다.`;
  }

  function observeSections() {
    const links = new Map(
      [...document.querySelectorAll(".side-nav a")].map((link) => [link.getAttribute("href").slice(1), link])
    );

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;

      links.forEach((link, id) => link.classList.toggle("is-active", id === visible.target.id));
      mobileNav.value = visible.target.id;
    }, { rootMargin: "-18% 0px -64% 0px", threshold: [0, 0.1, 0.35] });

    document.querySelectorAll(".guide-section").forEach((section) => observer.observe(section));
  }

  function openImageDialog(button) {
    const dialog = document.querySelector("#imageDialog");
    const sourceImage = button.querySelector("img");
    const image = document.querySelector("#dialogImage");
    image.src = button.dataset.image;
    image.alt = sourceImage?.alt || "확대된 안내 화면";
    document.querySelector("#dialogCaption").textContent = button.dataset.caption || "";
    dialog.showModal();
  }

  async function copyText(text) {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }

  function showToast() {
    const toast = document.querySelector("#copyToast");
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 1500);
  }

  function sectionSearchText(section) {
    const serialised = JSON.stringify(section.blocks);
    return stripHtml(`${section.title} ${section.summary} ${serialised}`).toLocaleLowerCase("ko-KR");
  }

  function stripHtml(value) {
    return value
      .replace(/<[^>]*>/g, " ")
      .replace(/&[a-z]+;/gi, " ")
      .replace(/[{}\[\]"_:,]/g, " ")
      .replace(/\\n/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function escapeAttribute(value) {
    return escapeHtml(value).replaceAll("`", "&#096;");
  }
})();
