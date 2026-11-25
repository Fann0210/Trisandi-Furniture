document.addEventListener("DOMContentLoaded", () => {
  // Slider foto hero di beranda (bisa digeser, klik panah, atau klik titik)
  const heroSlides = document.getElementById("heroSlides");
  const heroPrev = document.getElementById("heroPrev");
  const heroNext = document.getElementById("heroNext");
  const heroDots = document.getElementById("heroDots");

  if (heroSlides && heroDots) {
    const slideCount = heroSlides.children.length;
    let activeIdx = 0;

    heroDots.innerHTML = Array.from(
      { length: slideCount },
      (_, i) =>
        `<button type="button" class="hero-dot ${i === 0 ? "active" : ""}" data-idx="${i}" aria-label="Foto ${i + 1}"></button>`,
    ).join("");

    const dotBtns = heroDots.querySelectorAll(".hero-dot");

    function updateDots(idx) {
      activeIdx = ((idx % slideCount) + slideCount) % slideCount;
      dotBtns.forEach((d, i) => d.classList.toggle("active", i === activeIdx));
    }

    function goSlide(idx) {
      updateDots(idx);
      heroSlides.scrollTo({
        left: activeIdx * heroSlides.clientWidth,
        behavior: "smooth",
      });
    }

    if (heroPrev)
      heroPrev.addEventListener("click", () => goSlide(activeIdx - 1));
    if (heroNext)
      heroNext.addEventListener("click", () => goSlide(activeIdx + 1));

    dotBtns.forEach((d) => {
      d.addEventListener("click", () => goSlide(Number(d.dataset.idx)));
    });

    heroSlides.addEventListener("scroll", () => {
      if (!heroSlides.clientWidth) return;
      const current = Math.round(
        heroSlides.scrollLeft / heroSlides.clientWidth,
      );
      if (current !== activeIdx) updateDots(current);
    });
  }

  const page = document.body.dataset.page;

  const rupiah = (num) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);

  const sendWA = (text) => {
    window.open(
      `https://wa.me/${TF_CONFIG.waNumber}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener",
    );
  };

  // Toggle menu drawer di layar HP (bukan bottom bar)
  const menuToggle = document.getElementById("menuToggle");
  const mobileDrawer = document.getElementById("mobileDrawer");
  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener("click", () => {
      mobileDrawer.classList.toggle("open");
    });
  }

  // Halaman 1: Beranda
  if (page === "home") {
    const grid = document.getElementById("homeCategoryGrid");
    if (grid && typeof CATEGORIES !== "undefined") {
      grid.innerHTML = CATEGORIES.map(
        (c) => `
        <article class="card">
          <img src="${c.img}" alt="${c.title}" loading="lazy" />
          <div class="card-body">
            <h3>${c.title}</h3>
            <p>${c.desc}</p>
            <div class="card-footer-btn">
              <a href="proyek.html?cat=${c.id}" class="btn btn-outline">Lihat Proyek</a>
            </div>
          </div>
        </article>
      `,
      ).join("");
    }
  }

  // Halaman 2: Proyek & Inspirasi (Multi-Foto Geser di Modal Detail)
  if (page === "proyek") {
    const proyekGrid = document.getElementById("proyekGrid");
    const lookbookGrid = document.getElementById("lookbookGrid");
    const searchInput = document.getElementById("proyekSearch");
    const catSelect = document.getElementById("proyekCategory");
    const resetBtn = document.getElementById("proyekReset");
    const modal = document.getElementById("detailModal");
    const modalBody = document.getElementById("modalBody");
    const modalClose = document.getElementById("modalClose");
    const modalBg = document.getElementById("modalBg");

    const params = new URLSearchParams(window.location.search);
    const initialCat = params.get("cat") || "all";
    if (catSelect && initialCat) {
      catSelect.value = initialCat;
    }

    function getProjectPhotos(item) {
      if (Array.isArray(item.imgs) && item.imgs.length > 0) return item.imgs;
      if (item.img) return [item.img];
      return [];
    }

    function openProjectModal(item) {
      if (!item || !modal || !modalBody) return;
      const photos = getProjectPhotos(item);
      const total = photos.length;
      let currentIdx = 0;

      modalBody.innerHTML = `
        <div class="lightbox-stage">
          <div class="modal-slides" id="projModalSlides">
            ${photos
              .map(
                (src, i) => `
              <div class="modal-slide">
                <img src="${src}" alt="${item.title} - Foto ${i + 1}" />
              </div>
            `,
              )
              .join("")}
          </div>
          ${
            total > 1
              ? `
            <button type="button" class="lightbox-btn prev" id="projPrev" aria-label="Foto Sebelumnya">&lsaquo;</button>
            <button type="button" class="lightbox-btn next" id="projNext" aria-label="Foto Berikutnya">&rsaquo;</button>
          `
              : ""
          }
        </div>
        <div class="modal-content">
          <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; margin-bottom:0.35rem;">
            <span class="tag" style="margin-bottom:0;">${item.catLabel}</span>
            <small id="projPhotoCounter" style="color:var(--muted); font-weight:700;">Foto 1 / ${total}</small>
          </div>
          <h3 style="margin:0.35rem 0;">${item.title}</h3>
          <p style="color:var(--muted); margin-bottom:0.75rem;">${item.desc}</p>
          <p style="font-size:0.88rem; margin-bottom:0.85rem;">
            <strong>Material:</strong> ${item.mat}<br/>
            <strong>Ukuran:</strong> ${item.size}<br/>
            <strong>Lokasi:</strong> ${item.loc}
          </p>
          ${
            total > 1
              ? `
            <div class="lightbox-thumbs" style="margin-bottom:1rem;">
              ${photos
                .map(
                  (src, i) => `
                <img
                  src="${src}"
                  alt="Thumbnail ${i + 1}"
                  class="lightbox-thumb proj-thumb ${i === 0 ? "active" : ""}"
                  data-pidx="${i}"
                />
              `,
                )
                .join("")}
            </div>
          `
              : ""
          }
          <button type="button" class="btn btn-primary btn-full" id="modalAskBtn">Konsultasi Model Ini via WA</button>
        </div>
      `;

      modal.classList.add("open");

      const slidesEl = document.getElementById("projModalSlides");
      const counterEl = document.getElementById("projPhotoCounter");
      const thumbEls = modalBody.querySelectorAll(".proj-thumb");

      function syncProjectSlide(idx) {
        currentIdx = ((idx % total) + total) % total;
        if (counterEl)
          counterEl.textContent = `Foto ${currentIdx + 1} / ${total}`;
        thumbEls.forEach((th, i) =>
          th.classList.toggle("active", i === currentIdx),
        );
      }

      function goProjectSlide(idx) {
        syncProjectSlide(idx);
        if (slidesEl) {
          slidesEl.scrollTo({
            left: currentIdx * slidesEl.clientWidth,
            behavior: "smooth",
          });
        }
      }

      document.getElementById("projPrev")?.addEventListener("click", (ev) => {
        ev.stopPropagation();
        goProjectSlide(currentIdx - 1);
      });

      document.getElementById("projNext")?.addEventListener("click", (ev) => {
        ev.stopPropagation();
        goProjectSlide(currentIdx + 1);
      });

      thumbEls.forEach((th) => {
        th.addEventListener("click", (ev) => {
          ev.stopPropagation();
          goProjectSlide(Number(th.dataset.pidx));
        });
      });

      slidesEl?.addEventListener("scroll", () => {
        if (!slidesEl.clientWidth) return;
        const scrolledIdx = Math.round(
          slidesEl.scrollLeft / slidesEl.clientWidth,
        );
        if (scrolledIdx !== currentIdx) syncProjectSlide(scrolledIdx);
      });

      document.getElementById("modalAskBtn")?.addEventListener("click", () => {
        sendWA(
          `Halo Trisandi Furniture, saya mau tanya estimasi custom model "${item.title}" (${item.catLabel}).`,
        );
      });
    }

    function bindProjectButtons() {
      document.querySelectorAll(".btn-spec, .proj-card-img").forEach((el) => {
        el.addEventListener("click", () => {
          const item = PROJECTS.find((x) => x.id === Number(el.dataset.id));
          if (item) openProjectModal(item);
        });
      });

      document.querySelectorAll(".btn-wa").forEach((b) => {
        b.addEventListener("click", () => {
          const item = PROJECTS.find((x) => x.id === Number(b.dataset.id));
          if (!item) return;
          sendWA(
            `Halo Trisandi Furniture, saya tertarik model "${item.title}" (${item.catLabel}). Boleh info estimasi harganya?`,
          );
        });
      });
    }

    function drawProjects() {
      if (!proyekGrid || typeof PROJECTS === "undefined") return;
      const q = (searchInput ? searchInput.value : "").trim().toLowerCase();
      const cat = catSelect ? catSelect.value : "all";
      const list = PROJECTS.filter((p) => {
        const matchCat = cat === "all" || p.cat === cat;
        const matchText =
          !q ||
          p.title.toLowerCase().includes(q) ||
          p.mat.toLowerCase().includes(q) ||
          p.loc.toLowerCase().includes(q) ||
          p.catLabel.toLowerCase().includes(q);
        return matchCat && matchText;
      });

      proyekGrid.innerHTML = list.length
        ? list
            .map((p) => {
              const photos = getProjectPhotos(p);
              return `
          <article class="card">
            <div class="img-wrap proj-card-img" data-id="${p.id}" style="cursor:pointer;">
              <img src="${photos[0] || ""}" alt="${p.title}" loading="lazy" />
              <span class="photo-count-badge">${photos.length > 1 ? `${photos.length} Foto &bull; ` : ""}Lihat Detail</span>
            </div>
            <div class="card-body">
              <span class="tag" style="margin-bottom:0.35rem;">${p.catLabel}</span>
              <h3>${p.title}</h3>
              <p><strong>Material:</strong> ${p.mat}<br/><strong>Lokasi:</strong> ${p.loc}</p>
              <div class="card-footer-btn">
                <button type="button" class="btn btn-outline btn-spec" data-id="${p.id}">Detail</button>
                <button type="button" class="btn btn-primary btn-wa" data-id="${p.id}">Tanya WA</button>
              </div>
            </div>
          </article>
        `;
            })
            .join("")
        : `<p style="color:var(--muted);">Belum ada proyek yang cocok dengan pencarian atau kategori tersebut.</p>`;

      bindProjectButtons();
    }

    if (searchInput) searchInput.addEventListener("input", drawProjects);
    if (catSelect) catSelect.addEventListener("change", drawProjects);
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        if (searchInput) searchInput.value = "";
        if (catSelect) catSelect.value = "all";
        drawProjects();
      });
    }

    drawProjects();

    if (lookbookGrid && typeof LOOKBOOKS !== "undefined") {
      lookbookGrid.innerHTML = LOOKBOOKS.map(
        (l) => `
        <article class="card">
          <img src="${l.img}" alt="${l.title}" loading="lazy" />
          <div class="card-body">
            <span class="tag" style="margin-bottom:0.35rem;">${l.tag}</span>
            <h3>${l.title}</h3>
            <p>${l.desc}</p>
          </div>
        </article>
      `,
      ).join("");
    }

    function closeM() {
      if (modal) modal.classList.remove("open");
    }
    if (modalClose) modalClose.addEventListener("click", closeM);
    if (modalBg) modalBg.addEventListener("click", closeM);
  }

  // Halaman 3: Kalkulator & Form WA
  if (page === "estimasi") {
    const selItem = document.getElementById("calcItem");
    const selTier = document.getElementById("calcTier");
    const inpLen = document.getElementById("calcLength");
    const inpUnit = document.getElementById("calcUnits");
    const chkLed = document.getElementById("calcLed");
    const rateTxt = document.getElementById("calcRateText");
    const totalTxt = document.getElementById("calcTotalText");
    const descTxt = document.getElementById("calcDescText");
    const metersTxt = document.getElementById("calcMetersText");
    const dpTxt = document.getElementById("calcDpText");
    const sendCalcBtn = document.getElementById("sendCalcWa");
    const detailForm = document.getElementById("waDetailForm");

    if (selItem && typeof PRICING_RATES !== "undefined") {
      selItem.innerHTML = PRICING_RATES.map(
        (r) => `<option value="${r.id}">${r.label}</option>`,
      ).join("");
    }

    function runCalc() {
      if (
        !selItem ||
        !selTier ||
        !inpLen ||
        !inpUnit ||
        typeof PRICING_RATES === "undefined"
      ) {
        return null;
      }
      const item =
        PRICING_RATES.find((r) => r.id === selItem.value) || PRICING_RATES[0];
      const tier = selTier.value;
      const tarif = item.rates[tier];
      const panjang = Math.max(0.5, Number(inpLen.value) || 0.5);
      const unit = Math.max(1, Math.floor(Number(inpUnit.value) || 1));
      const totalMeter = panjang * unit;
      const ledBiaya =
        chkLed && chkLed.checked ? TF_CONFIG.ledPerUnit * unit : 0;
      const total = totalMeter * tarif + ledBiaya;
      const dp = Math.round(total * 0.3);

      if (rateTxt) rateTxt.textContent = `Tarif: ${rupiah(tarif)} / m'`;
      if (totalTxt) totalTxt.textContent = rupiah(total);
      if (descTxt) {
        descTxt.textContent = `${item.label} • ${TIER_NAMES[tier]}${chkLed && chkLed.checked ? " + LED Strip" : ""}`;
      }
      if (metersTxt) metersTxt.textContent = `${totalMeter.toFixed(1)} m'`;
      if (dpTxt) dpTxt.textContent = rupiah(dp);

      return {
        item: item.label,
        tier: TIER_NAMES[tier],
        panjang,
        unit,
        totalMeter,
        led: Boolean(chkLed && chkLed.checked),
        total,
      };
    }

    [selItem, selTier, inpLen, inpUnit, chkLed].forEach((el) => {
      if (!el) return;
      el.addEventListener("input", runCalc);
      el.addEventListener("change", runCalc);
    });

    if (sendCalcBtn) {
      sendCalcBtn.addEventListener("click", () => {
        const d = runCalc();
        if (!d) return;
        sendWA(
          [
            "Halo *Trisandi Furniture*, hasil simulasi kalkulator meter lari:",
            `• Item: ${d.item}`,
            `• Paket: ${d.tier}`,
            `• Ukuran: ${d.unit} unit x ${d.panjang} m' (${d.totalMeter.toFixed(1)} m')`,
            `• LED Strip: ${d.led ? "Ya" : "Tidak"}`,
            `• Estimasi Kasar: ${rupiah(d.total)}`,
          ].join("\n"),
        );
      });
    }

    if (detailForm) {
      detailForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const nama = document.getElementById("namaKlien")?.value.trim() || "";
        const kota = document.getElementById("kotaKlien")?.value.trim() || "";
        const butuh = document.getElementById("jenisKebutuhan")?.value || "";
        const uk =
          document.getElementById("ukuranKlien")?.value.trim() ||
          "Belum diukur";
        const note =
          document.getElementById("catatanKlien")?.value.trim() || "-";

        sendWA(
          [
            "Halo *Trisandi Furniture*, saya ingin konsultasi custom:",
            `• Nama: ${nama}`,
            `• Kota/Lokasi: ${kota}`,
            `• Kebutuhan: ${butuh}`,
            `• Ukuran: ${uk}`,
            `• Catatan: ${note}`,
          ].join("\n"),
        );
      });
    }

    runCalc();
  }

  // Halaman 4: Testimoni & Pengiriman (Multi-Foto + Lightbox Perbesar)
  if (page === "testimoni") {
    const testiGrid = document.getElementById("testiGrid");
    const tipsGrid = document.getElementById("tipsGrid");
    const tTabs = document.querySelectorAll("#testiTabs .tab-btn");
    const tModal = document.getElementById("testiModal");
    const tModalBody = document.getElementById("testiModalBody");
    const tModalClose = document.getElementById("testiModalClose");
    const tModalBg = document.getElementById("testiModalBg");

    let activePhotos = [];
    let activePhotoIdx = 0;

    function getPhotos(item) {
      if (Array.isArray(item.imgs) && item.imgs.length > 0) return item.imgs;
      if (item.img) return [item.img];
      return [];
    }

    function renderLightboxFrame(item) {
      if (!tModalBody) return;
      const total = activePhotos.length;
      const currentSrc = activePhotos[activePhotoIdx] || activePhotos[0] || "";

      tModalBody.innerHTML = `
        <div class="lightbox-stage">
          <img src="${currentSrc}" alt="${item.name} - Foto ${activePhotoIdx + 1}" />
          ${
            total > 1
              ? `
            <button type="button" class="lightbox-btn prev" id="lbPrev" aria-label="Foto Sebelumnya">&lsaquo;</button>
            <button type="button" class="lightbox-btn next" id="lbNext" aria-label="Foto Berikutnya">&rsaquo;</button>
          `
              : ""
          }
        </div>
        <div class="modal-content">
          <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; margin-bottom:0.45rem;">
            <span class="tag" style="margin-bottom:0;">${item.typeLabel}</span>
            <small style="color:var(--muted); font-weight:700;">Foto ${activePhotoIdx + 1} / ${total}</small>
          </div>
          <p style="font-style:italic; color:var(--text); margin-bottom:0.65rem;">"${item.quote}"</p>
          <p style="font-size:0.86rem; color:var(--muted);">
            <strong style="color:var(--text);">${item.name}</strong> &bull; ${item.loc}
          </p>
          ${
            total > 1
              ? `
            <div class="lightbox-thumbs">
              ${activePhotos
                .map(
                  (src, i) => `
                <img
                  src="${src}"
                  alt="Thumbnail ${i + 1}"
                  class="lightbox-thumb ${i === activePhotoIdx ? "active" : ""}"
                  data-tidx="${i}"
                />
              `,
                )
                .join("")}
            </div>
          `
              : ""
          }
        </div>
      `;

      document.getElementById("lbPrev")?.addEventListener("click", (ev) => {
        ev.stopPropagation();
        activePhotoIdx = (activePhotoIdx - 1 + total) % total;
        renderLightboxFrame(item);
      });

      document.getElementById("lbNext")?.addEventListener("click", (ev) => {
        ev.stopPropagation();
        activePhotoIdx = (activePhotoIdx + 1) % total;
        renderLightboxFrame(item);
      });

      document.querySelectorAll(".lightbox-thumb").forEach((th) => {
        th.addEventListener("click", (ev) => {
          ev.stopPropagation();
          activePhotoIdx = Number(th.dataset.tidx);
          renderLightboxFrame(item);
        });
      });
    }

    function openTestiLightbox(item, startIdx = 0) {
      if (!tModal) return;
      activePhotos = getPhotos(item);
      activePhotoIdx = startIdx;
      renderLightboxFrame(item);
      tModal.classList.add("open");
    }

    function drawTesti(filter) {
      if (!testiGrid || typeof TESTIMONIALS === "undefined") return;
      const list =
        filter === "all"
          ? TESTIMONIALS
          : TESTIMONIALS.filter((t) => t.type === filter);

      testiGrid.innerHTML = list
        .map((t, idx) => {
          const photos = getPhotos(t);
          const itemId = t.id ?? idx;
          return `
            <article class="card testi-card" data-tid="${itemId}">
              <div class="img-wrap">
                <img src="${photos[0] || ""}" alt="${t.name}" loading="lazy" />
                <span class="pill-badge ${t.type}">${t.typeLabel}</span>
                <span class="photo-count-badge">${photos.length > 1 ? `${photos.length} Foto &bull; ` : ""}Klik Perbesar</span>
              </div>
              <div class="card-body">
                <p style="font-style:italic; color:var(--text);">"${t.quote}"</p>
                <div style="margin-top:auto; font-size:0.84rem; color:var(--muted);">
                  <strong style="color:var(--text);">${t.name}</strong> &bull; ${t.loc}
                </div>
              </div>
            </article>
          `;
        })
        .join("");

      document.querySelectorAll(".testi-card").forEach((card) => {
        card.addEventListener("click", () => {
          const item = TESTIMONIALS.find(
            (x, i) => String(x.id ?? i) === String(card.dataset.tid),
          );
          if (item) openTestiLightbox(item, 0);
        });
      });
    }

    function closeTestiModal() {
      if (tModal) tModal.classList.remove("open");
    }
    if (tModalClose) tModalClose.addEventListener("click", closeTestiModal);
    if (tModalBg) tModalBg.addEventListener("click", closeTestiModal);

    tTabs.forEach((btn) => {
      btn.addEventListener("click", () => {
        tTabs.forEach((x) => x.classList.remove("active"));
        btn.classList.add("active");
        drawTesti(btn.dataset.tfilter);
      });
    });

    drawTesti("all");

    if (tipsGrid && typeof TIPS !== "undefined") {
      tipsGrid.innerHTML = TIPS.map(
        (tip) => `
        <article class="card">
          <img src="${tip.img}" alt="${tip.title}" loading="lazy" />
          <div class="card-body">
            <span class="tag" style="margin-bottom:0.35rem;">${tip.tag}</span>
            <h3>${tip.title}</h3>
            <p>${tip.desc}</p>
          </div>
        </article>
      `,
      ).join("");
    }
  }
});
