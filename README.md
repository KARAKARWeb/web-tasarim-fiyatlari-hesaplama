# Web Tasarım Fiyatları

**[Web Tasarım](https://karakar.web.tr)** projeleri için anlık fiyat hesaplama aracı. Kurumsal site, e-ticaret ve özel projelerin tahmini maliyetini saniyeler içinde görün.

![Web Tasarım Fiyatları](https://karakar.web.tr/wp-content/uploads/2026/01/logo.webp)

<meta name="google-site-verification" content="Bv-C21pj43DbEpRqGWt23R45BkQBaRFIv7dwl85y584" />

---

## Özellikler

- **Anlık hesaplama** — Proje türü, sayfa sayısı ve ek özellikler seçilir seçilmez toplam fiyat güncellenir
- **Ayarlanabilir fiyatlar** — Tüm birim fiyatlar, KDV ve çarpanlar Ayarlar sayfasından düzenlenir (veritabanı yok, tarayıcıda saklanır)
- **Teklif çıktısı** — Hesaplanan teklifi yazdır veya PDF olarak kaydet
- **Mobil uyumlu** — Tüm cihazlarda düzgün çalışan, dokunmaya uygun arayüz
- **Sade teknoloji** — Sadece HTML, CSS ve JavaScript; kurulum veya sunucu gerektirmez

## Proje türleri

| Tür | Açıklama |
|-----|----------|
| Kurumsal | Kurumsal web sitesi |
| E-Ticaret | E-ticaret sitesi |
| Landing | Tek sayfa / landing |
| Blog | Blog ve içerik sitesi |
| Özel | Özel proje |

Sayfa sayısına göre çarpanlar (toplu indirim), ek özellikler (çok dilli, CMS, form, ödeme entegrasyonu vb.) ve ek hizmetler (SEO, hosting, bakım, SSL, içerik girişi) hesaplamaya dahil edilir.

## Kullanım

1. **Hesapla** sayfasında proje türünü ve sayfa sayısını seçin.
2. İhtiyaca göre **Ek özellikler** ve **Ek hizmetler** işaretleyin.
3. Sağdaki **Fiyat özeti** anlık güncellenir.
4. **Teklif Yazdır / PDF** ile çıktı alın.

Fiyatları değiştirmek için **Ayarlar** sayfasını kullanın; kayıtlar tarayıcıda (localStorage) tutulur.

## Dosya yapısı

```
karakarweb/
├── index.html          # Ana hesaplama sayfası
├── ayarlar.html        # Fiyat ve genel ayarlar
├── css/
│   ├── main.css        # Ortak stiller, header, footer, alt çubuk
│   ├── calculator.css  # Hesaplama sayfası
│   └── settings.css    # Ayarlar sayfası
├── js/
│   ├── config.js       # Varsayılan fiyat listesi
│   ├── calculator.js   # Hesaplama mantığı
│   ├── settings.js     # Ayarları kaydetme / yükleme
│   └── ui.js           # Toast bildirimi
└── README.md
```

## Teknolojiler

- HTML5 · CSS3 · JavaScript (ES5+)
- Veritabanı yok — ayarlar **localStorage** ile saklanır
- [Web Tasarım](https://karakar.web.tr) — KARAKAR Web

## İletişim

| | |
|---|---|
| **Web** | [karakar.web.tr](https://karakar.web.tr) |
| **E-posta** | info@karakar.web.tr |
| **Telefon / WhatsApp** | 0545 181 4040 |

---

**Geliştiren:** [KARAKAR Web](https://karakar.web.tr) · [Web Tasarım](https://karakar.web.tr)
