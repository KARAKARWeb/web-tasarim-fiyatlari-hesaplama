/**
 * Web Tasarım Fiyatları - Ayarlar sayfası
 * Geliştiren: KARAKAR Web
 */
(function () {
  const STORAGE_KEY = 'karakar_fiyat_ayarlari';

  function getSaved() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (_) {}
    return null;
  }

  function getData() {
    return getSaved() || JSON.parse(JSON.stringify(KARAKAR_DEFAULTS));
  }

  function saveData(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (_) {
      return false;
    }
  }

  function fillProjectTypes(data) {
    const container = document.getElementById('projectTypesSettings');
    if (!container) return;
    const types = data.projectTypes || KARAKAR_DEFAULTS.projectTypes;
    container.innerHTML = '';
    Object.keys(types).forEach(key => {
      const t = types[key];
      const div = document.createElement('div');
      div.className = 'settings-row';
      div.innerHTML = `
        <label for="pt_${key}">${t.label}</label>
        <input type="number" id="pt_${key}" data-key="${key}" data-field="pricePerPage" min="0" value="${t.pricePerPage}">
      `;
      container.appendChild(div);
    });
  }

  function fillPageMultipliers(data) {
    const container = document.getElementById('pageMultipliersSettings');
    if (!container) return;
    const list = data.pageRangeMultipliers || KARAKAR_DEFAULTS.pageRangeMultipliers;
    container.innerHTML = list.map((item, i) => `
      <div class="settings-row" data-index="${i}">
        <label>${item.label}</label>
        <input type="number" data-index="${i}" data-field="multiplier" min="0" max="2" step="0.01" value="${item.multiplier}" placeholder="1">
      </div>
    `).join('');
  }

  function fillExtraFeatures(data) {
    const container = document.getElementById('extraFeaturesSettings');
    if (!container) return;
    const features = data.extraFeatures || KARAKAR_DEFAULTS.extraFeatures;
    container.innerHTML = '';
    Object.keys(features).forEach(key => {
      const f = features[key];
      const div = document.createElement('div');
      div.className = 'settings-row';
      div.innerHTML = `
        <label for="ef_${key}">${f.label}</label>
        <input type="number" id="ef_${key}" data-key="${key}" data-field="price" min="0" value="${f.price}">
      `;
      container.appendChild(div);
    });
  }

  function fillExtraServices(data) {
    const container = document.getElementById('extraServicesSettings');
    if (!container) return;
    const services = data.extraServices || KARAKAR_DEFAULTS.extraServices;
    container.innerHTML = '';
    Object.keys(services).forEach(key => {
      const s = services[key];
      const div = document.createElement('div');
      div.className = 'settings-row';
      div.innerHTML = `
        <label for="es_${key}">${s.label}</label>
        <input type="number" id="es_${key}" data-key="${key}" data-field="price" min="0" value="${s.price}">
      `;
      container.appendChild(div);
    });
  }

  function collectFormData() {
    const data = getData();

    data.currencySymbol = (document.getElementById('currencySymbol') && document.getElementById('currencySymbol').value) || '₺';
    data.taxRate = parseFloat(document.getElementById('taxRate').value) || 0;
    data.minProjectPrice = parseInt(document.getElementById('minProjectPrice').value, 10) || 0;

    document.querySelectorAll('#projectTypesSettings input[type="number"]').forEach(input => {
      const key = input.dataset.key;
      const field = input.dataset.field;
      if (data.projectTypes[key]) data.projectTypes[key][field] = parseInt(input.value, 10) || 0;
    });

    const multList = data.pageRangeMultipliers || KARAKAR_DEFAULTS.pageRangeMultipliers;
    document.querySelectorAll('#pageMultipliersSettings input[type="number"]').forEach(input => {
      const i = parseInt(input.dataset.index, 10);
      if (multList[i]) multList[i].multiplier = parseFloat(input.value) || 1;
    });
    data.pageRangeMultipliers = multList;

    document.querySelectorAll('#extraFeaturesSettings input[type="number"]').forEach(input => {
      const key = input.dataset.key;
      if (data.extraFeatures[key]) data.extraFeatures[key].price = parseInt(input.value, 10) || 0;
    });

    document.querySelectorAll('#extraServicesSettings input[type="number"]').forEach(input => {
      const key = input.dataset.key;
      if (data.extraServices[key]) data.extraServices[key].price = parseInt(input.value, 10) || 0;
    });

    return data;
  }

  function loadForm() {
    const data = getData();
    document.getElementById('currencySymbol').value = data.currencySymbol || '₺';
    document.getElementById('taxRate').value = data.taxRate != null ? data.taxRate : 18;
    document.getElementById('minProjectPrice').value = data.minProjectPrice != null ? data.minProjectPrice : 1500;
    fillProjectTypes(data);
    fillPageMultipliers(data);
    fillExtraFeatures(data);
    fillExtraServices(data);
  }

  function init() {
    loadForm();

    document.getElementById('btnSave').addEventListener('click', function () {
      const data = collectFormData();
      if (saveData(data)) {
        if (window.KARAKAR_UI && window.KARAKAR_UI.toast) {
          window.KARAKAR_UI.toast('Ayarlar kaydedildi.');
        } else {
          alert('Ayarlar kaydedildi.');
        }
      } else {
        alert('Kaydetme başarısız.');
      }
    });

    document.getElementById('btnReset').addEventListener('click', function () {
      if (confirm('Tüm ayarlar varsayılan değerlere dönecek. Emin misiniz?')) {
        localStorage.removeItem(STORAGE_KEY);
        loadForm();
        if (window.KARAKAR_UI && window.KARAKAR_UI.toast) {
          window.KARAKAR_UI.toast('Varsayılan ayarlar yüklendi.');
        } else {
          alert('Varsayılan ayarlar yüklendi.');
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
