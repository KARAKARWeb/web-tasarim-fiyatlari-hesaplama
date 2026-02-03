/**
 * Web Tasarım Fiyatları - Varsayılan fiyat ayarları
 * Geliştiren: KARAKAR Web
 */
const KARAKAR_DEFAULTS = {
  currency: 'TRY',
  currencySymbol: '₺',
  taxRate: 18,
  minProjectPrice: 1500,

  projectTypes: {
    kurumsal: { label: 'Kurumsal Web Sitesi', pricePerPage: 800 },
    eticaret: { label: 'E-Ticaret Sitesi', pricePerPage: 1200 },
    landing: { label: 'Landing / Tek Sayfa', pricePerPage: 2500 },
    blog: { label: 'Blog / İçerik Sitesi', pricePerPage: 600 },
    ozel: { label: 'Özel Proje', pricePerPage: 1000 }
  },

  pageRangeMultipliers: [
    { min: 1, max: 5, multiplier: 1, label: '1-5 sayfa' },
    { min: 6, max: 10, multiplier: 0.95, label: '6-10 sayfa' },
    { min: 11, max: 20, multiplier: 0.90, label: '11-20 sayfa' },
    { min: 21, max: 50, multiplier: 0.85, label: '21-50 sayfa' },
    { min: 51, max: 999, multiplier: 0.80, label: '51+ sayfa' }
  ],

  extraFeatures: {
    cokDilli: { label: 'Çok Dilli Site', price: 1500 },
    adminPanel: { label: 'Yönetim Paneli (CMS)', price: 2000 },
    formEntegrasyon: { label: 'Form / İletişim Entegrasyonu', price: 500 },
    odemeEntegrasyon: { label: 'Ödeme Sistemi Entegrasyonu', price: 2500 },
    apiEntegrasyon: { label: 'API Entegrasyonu', price: 1500 },
    responsive: { label: 'Mobil Uyumlu Tasarım', price: 0 },
    hizliYukleme: { label: 'Hızlı Yükleme Optimizasyonu', price: 800 }
  },

  extraServices: {
    seo: { label: 'SEO Paketi (Aylık)', price: 500 },
    hosting: { label: 'Hosting (Yıllık)', price: 600 },
    bakim: { label: 'Bakım & Güncelleme (Aylık)', price: 400 },
    ssl: { label: 'SSL Sertifikası', price: 0 },
    icerikGiris: { label: 'İçerik Girişi (Sayfa Başı)', price: 100 }
  }
};
