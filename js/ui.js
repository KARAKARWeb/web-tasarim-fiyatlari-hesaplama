/**
 * Web Tasarım Fiyatları - Ortak UI (toast vb.)
 * Geliştiren: KARAKAR Web
 */
window.KARAKAR_UI = {
  toast: function (message) {
    let el = document.getElementById('karakar-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'karakar-toast';
      el.className = 'toast';
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add('show');
    setTimeout(function () {
      el.classList.remove('show');
    }, 2500);
  }
};
