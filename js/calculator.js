/**
 * Web Tasarım Fiyatları - Hesaplama mantığı
 * Geliştiren: KARAKAR Web
 */
(function () {
  const STORAGE_KEY = 'karakar_fiyat_ayarlari';

  function getSettings() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (_) {}
    return null;
  }

  function getConfig() {
    const saved = getSettings();
    if (saved) return saved;
    return KARAKAR_DEFAULTS;
  }

  function getMultiplierForPages(config, pages) {
    const list = config.pageRangeMultipliers || KARAKAR_DEFAULTS.pageRangeMultipliers;
    for (let i = 0; i < list.length; i++) {
      if (pages >= list[i].min && pages <= list[i].max) return list[i].multiplier;
    }
    return 1;
  }

  function getProjectTypePrice(config, typeKey) {
    const types = config.projectTypes || KARAKAR_DEFAULTS.projectTypes;
    const t = types[typeKey];
    return t ? t.pricePerPage : 0;
  }

  function renderProjectTypes(config) {
    const container = document.getElementById('projectTypeOptions');
    if (!container) return;
    const types = config.projectTypes || KARAKAR_DEFAULTS.projectTypes;
    const keys = Object.keys(types);
    container.innerHTML = keys.map(key => {
      const t = types[key];
      return `
        <label class="project-type-option">
          <input type="radio" name="projectType" value="${key}" ${key === 'kurumsal' ? 'checked' : ''}>
          <span class="option-card">${t.label}</span>
        </label>
      `;
    }).join('');
  }

  function renderExtraFeatures(config) {
    const container = document.getElementById('extraFeaturesList');
    if (!container) return;
    const features = config.extraFeatures || KARAKAR_DEFAULTS.extraFeatures;
    const keys = Object.keys(features);
    container.innerHTML = keys.map(key => {
      const f = features[key];
      const priceStr = f.price === 0 ? 'Dahil' : formatMoney(f.price, config);
      return `
        <div class="feature-item">
          <input type="checkbox" id="feat_${key}" data-key="${key}" data-price="${f.price}">
          <label for="feat_${key}">${f.label}</label>
          <span class="feature-price">${priceStr}</span>
        </div>
      `;
    }).join('');
  }

  function renderExtraServices(config) {
    const container = document.getElementById('extraServicesList');
    if (!container) return;
    const services = config.extraServices || KARAKAR_DEFAULTS.extraServices;
    const keys = Object.keys(services);
    container.innerHTML = keys.map(key => {
      const s = services[key];
      return `
        <div class="service-item">
          <input type="checkbox" id="serv_${key}" data-key="${key}" data-price="${s.price}">
          <label for="serv_${key}">${s.label}</label>
          <span class="service-price">${formatMoney(s.price, config)}</span>
        </div>
      `;
    }).join('');
  }

  function formatMoney(value, config) {
    const sym = (config && config.currencySymbol) ? config.currencySymbol : '₺';
    return sym + ' ' + Number(value).toLocaleString('tr-TR');
  }

  function recalc() {
    const config = getConfig();
    const taxRate = Number(config.taxRate) || 0;
    const minPrice = Number(config.minProjectPrice) || 0;

    const projectType = document.querySelector('input[name="projectType"]:checked');
    const typeKey = projectType ? projectType.value : 'kurumsal';
    const pages = parseInt(document.getElementById('pageCount').value, 10) || 1;
    const contentPages = parseInt(document.getElementById('contentPages').value, 10) || 0;

    const pricePerPage = getProjectTypePrice(config, typeKey);
    const multiplier = getMultiplierForPages(config, pages);
    let designTotal = pricePerPage * pages * multiplier;

    let extraTotal = 0;
    document.querySelectorAll('#extraFeaturesList input[type="checkbox"]:checked').forEach(cb => {
      extraTotal += Number(cb.dataset.price) || 0;
    });
    document.querySelectorAll('#extraServicesList input[type="checkbox"]:checked').forEach(cb => {
      extraTotal += Number(cb.dataset.price) || 0;
    });

    const contentPrice = (config.extraServices && config.extraServices.icerikGiris)
      ? config.extraServices.icerikGiris.price * contentPages
      : 0;
    extraTotal += contentPrice;

    const subtotal = designTotal + extraTotal;
    const taxAmount = subtotal * (taxRate / 100);
    let total = subtotal + taxAmount;
    if (minPrice > 0 && total < minPrice) total = minPrice;

    const summaryRows = document.getElementById('summaryRows');
    if (summaryRows) {
      summaryRows.innerHTML = `
        <div class="summary-rows">
          <div class="summary-row">Tasarım (${pages} sayfa)</div>
          <div class="summary-row">${formatMoney(designTotal, config)}</div>
          <div class="summary-row">Ek özellikler & hizmetler</div>
          <div class="summary-row">${formatMoney(extraTotal, config)}</div>
          <div class="summary-row subtotal">Ara toplam</div>
          <div class="summary-row subtotal">${formatMoney(subtotal, config)}</div>
          <div class="summary-row">KDV (%${taxRate})</div>
          <div class="summary-row">${formatMoney(taxAmount, config)}</div>
          <div class="summary-row total">Toplam</div>
          <div class="summary-row total">${formatMoney(total, config)}</div>
        </div>
      `;
    }
  }

  function bindEvents() {
    const pageCount = document.getElementById('pageCount');
    const pageCountValue = document.getElementById('pageCountValue');
    if (pageCount && pageCountValue) {
      pageCount.addEventListener('input', function () {
        pageCountValue.textContent = this.value;
        recalc();
      });
    }

    document.querySelectorAll('input[name="projectType"]').forEach(radio => {
      radio.addEventListener('change', recalc);
    });
    document.getElementById('contentPages').addEventListener('input', recalc);
    document.getElementById('contentPages').addEventListener('change', recalc);

    document.getElementById('extraFeaturesList').addEventListener('change', recalc);
    document.getElementById('extraServicesList').addEventListener('change', recalc);

    document.getElementById('btnPrint').addEventListener('click', function () {
      window.print();
    });
  }

  function init() {
    const config = getConfig();
    renderProjectTypes(config);
    renderExtraFeatures(config);
    renderExtraServices(config);
    document.getElementById('pageCountValue').textContent = document.getElementById('pageCount').value;
    bindEvents();
    recalc();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
