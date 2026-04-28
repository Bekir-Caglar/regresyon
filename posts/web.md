# SPSS ile Çoklu Doğrusal Regresyon Analizi
## Web Sayfası Yüklenme Süresi Araştırması

**Araştırma sorusu:** Web sayfalarının yüklenme süresi; sayfa boyutu, görsel sayısı, JavaScript dosya sayısı, sunucu yanıt süresi, eş zamanlı istek sayısı ve önbellekleme kullanımı tarafından anlamlı biçimde yordanmakta mıdır?

**Regresyon modeli:**
```
yuklenme_suresi_sn = sayfa_boyutu_mb + gorsel_sayisi + javascript_dosya_sayisi
                   + sunucu_yanit_suresi_ms + eszamanli_istek_sayisi + onbellekleme
```

> **Veri seti:** N = 60 web sayfası | Bağımlı değişken: `yuklenme_suresi_sn` | Bağımsız değişken sayısı: 6  
> **Not:** `onbellekleme` ikili (0 = kullanılmıyor, 1 = kullanılıyor) bir değişkendir. SPSS bu değişkeni doğrudan regresyona alabilir; ek kodlama gerekmez.

---

## Adım 1 — Veriyi SPSS'e Aktarma

1. SPSS'i açın → **File > Open > Data**
2. Dosya türünü **Excel (*.xlsx, *.xls)** olarak seçin
3. `regresyon_bilgisayar_bilimleri_web_performans_veri_seti.xlsx` dosyasını seçip **Open** tıklayın
4. Açılan **Opening Excel Data Source** penceresinde:
   - **OK** butonuna tıklayın.
   - Delimiter: **Comma**

**Variable View'da şu değişkenlerin tanımlı olması gerekir:**

| Değişken | Tür | Ölçek | Rol |
|---|---|---|---|
| `yuklenme_suresi_sn` | Sayısal (float) | Sürekli | Bağımlı |
| `sayfa_boyutu_mb` | Sayısal (float) | Sürekli | Bağımsız |
| `gorsel_sayisi` | Sayısal (int) | Sürekli | Bağımsız |
| `javascript_dosya_sayisi` | Sayısal (int) | Sürekli | Bağımsız |
| `sunucu_yanit_suresi_ms` | Sayısal (int) | Sürekli | Bağımsız |
| `eszamanli_istek_sayisi` | Sayısal (int) | Sürekli | Bağımsız |
| `onbellekleme` | Sayısal (int) | Nominal / İkili | Bağımsız |

> `id` sütunu tanımlayıcıdır, analize **dahil edilmez**.

---

## Adım 2 — Betimsel İstatistikler (Ön Kontrol)

```
Analyze → Descriptive Statistics → Descriptives
```

Tüm sayısal değişkenleri ekleyin → **Options:**
- [x] Mean
- [x] Std. Deviation
- [x] Minimum / Maximum

**OK** → Referans değerler:

| Değişken | Ortalama | Std. Sapma | Min | Max |
|---|---|---|---|---|
| yuklenme_suresi_sn | 5.43 sn | 1.70 | 1.80 | 8.95 |
| sayfa_boyutu_mb | 4.14 MB | 2.13 | 0.88 | 7.99 |
| gorsel_sayisi | — | — | — | — |
| javascript_dosya_sayisi | — | — | — | — |
| sunucu_yanit_suresi_ms | — | — | — | — |
| eszamanli_istek_sayisi | — | — | — | — |
| onbellekleme | 0.50 | 0.50 | 0 | 1 |

> `onbellekleme` ortalaması = 0.50 → örneklemin tam olarak yarısı önbellek kullanıyor.

---

## Adım 3 — Korelasyon Matrisi (İlişki Ön İncelemesi)

```
Analyze → Correlate → Bivariate
```

Tüm değişkenleri ekleyin →
- [x] Pearson
- [x] Two-tailed
- [x] Flag significant correlations

**OK** → Beklenen korelasyon yönleri:

| Değişken | r ile yuklenme_suresi | Yön |
|---|---|---|
| sayfa_boyutu_mb | .846 | Pozitif — sayfa büyüdükçe yüklenme yavaşlar |
| gorsel_sayisi | .730 | Pozitif |
| javascript_dosya_sayisi | .552 | Pozitif |
| sunucu_yanit_suresi_ms | .313 | Pozitif |
| eszamanli_istek_sayisi | .784 | Pozitif |
| onbellekleme | -.038 | Negatif (tek başına zayıf; modelde güçlü) |

> Birebir korelasyonda zayıf görünen `onbellekleme`, diğer değişkenler kontrol altına alındığında modelde anlamlı hale gelmektedir — bu, regresyonun tekil korelasyona göre üstünlüğüdür.

---

## Adım 4 — Regresyon Analizini Çalıştırma

```
Analyze → Regression → Linear
```

| Alan | Yapılacak İşlem |
|---|---|
| **Dependent** | `yuklenme_suresi_sn` |
| **Independent(s)** | `sayfa_boyutu_mb`, `gorsel_sayisi`, `javascript_dosya_sayisi`, `sunucu_yanit_suresi_ms`, `eszamanli_istek_sayisi`, `onbellekleme` |
| **Method** | `Enter` (tüm değişkenleri tek blokta dahil et) |

---

## Adım 5 — Statistics Ayarları

**Statistics** butonuna tıklayın:

- [x] **Estimates** — B katsayıları ve p değerleri
- [x] **Confidence intervals** — %95 güven aralıkları
- [x] **Model fit** — R², F istatistiği
- [x] **R squared change**
- [x] **Descriptives**
- [x] **Collinearity diagnostics** — VIF için **zorunlu**
- [x] **Durbin-Watson** — otokorelasyon testi

**Continue**

---

## Adım 6 — Artık Grafikleri (Plots)

**Plots** butonuna tıklayın:

- **Y ekseni:** `*ZRESID`
- **X ekseni:** `*ZPRED`
- [x] **Histogram**
- [x] **Normal probability plot**

**Continue → OK**

---

## Adım 7 — Çıktıları Okuma ve Yorumlama

### 7.1 Model Özeti (Model Summary)

| R | R Square | Adjusted R Square | Durbin-Watson |
|---|---|---|---|
| **.970** | **.940** | **.933** | **1.847** |

**Yorumlama:**

- **R = .970** → Bağımsız değişkenler ile yüklenme süresi arasında çok güçlü bir doğrusal ilişki vardır.
- **R² = .940** → Model, yüklenme süresindeki varyansın **%94.0'ını** açıklamaktadır. Bu araştırma için olağanüstü yüksek bir açıklayıcılık oranıdır.
- **Adjusted R² = .933** → Değişken sayısına göre düzeltilmiş değer. R²'ye yakın olması modelde gereksiz değişken bulunmadığına işaret eder.
- **Durbin-Watson = 1.847** → 1.5–2.5 arasında olduğundan artıklar arasında **otokorelasyon yoktur** ✓

---

### 7.2 ANOVA Tablosu

| | Kareler Toplamı | df | Kareler Ort. | F | Sig. |
|---|---|---|---|---|---|
| Regresyon | — | 6 | — | **138.60** | **< .001** |
| Artık | — | 53 | — | | |
| Toplam | — | 59 | | | |

**Yorumlama:**

> F(6, 53) = 138.60, p < .001 → Kurulan model istatistiksel olarak anlamlıdır. Bağımsız değişkenler birlikte sayfa yüklenme süresini anlamlı biçimde yordamaktadır.

---

### 7.3 Katsayılar Tablosu (Coefficients)

| Değişken | B | Std. Hata | t | Sig. | Anlamlı? |
|---|---|---|---|---|---|
| Sabit | 0.551 | 0.222 | 2.479 | .016 | — |
| Sayfa Boyutu (MB) | **0.497** | 0.057 | 8.638 | **< .001** | ✓ Evet |
| Görsel Sayısı | 0.010 | 0.014 | 0.721 | .474 | ✗ Hayır |
| JavaScript Dosya Sayısı | **0.058** | 0.014 | 4.239 | **< .001** | ✓ Evet |
| Sunucu Yanıt Süresi (ms) | **0.002** | 0.000 | 9.005 | **< .001** | ✓ Evet |
| Eş Zamanlı İstek Sayısı | **0.014** | 0.005 | 3.008 | **.004** | ✓ Evet |
| Önbellekleme | **-0.640** | 0.119 | -5.363 | **< .001** | ✓ Evet |

**Her katsayının bireysel yorumu:**

| Değişken | Yorum |
|---|---|
| Sayfa Boyutu (+0.497) | 1 MB'lık artış, yüklenme süresini ~0.50 saniye uzatır — en güçlü pozitif etki |
| Görsel Sayısı (+0.010) | **Anlamlı değil** (p = .474); diğer değişkenler kontrol altındayken ek katkısı yok |
| JavaScript Dosya Sayısı (+0.058) | Her ek JS dosyası yüklenmeyi ~0.06 saniye uzatır |
| Sunucu Yanıt Süresi (+0.002) | Her 1 ms'lik artış yüklenme süresine ~0.002 sn ekler; küçük görünse de büyük ölçekte kritik |
| Eş Zamanlı İstek Sayısı (+0.014) | Her ek eş zamanlı istek ~0.014 sn gecikme yaratır |
| Önbellekleme (−0.640) | Önbellek **kullanıldığında** yüklenme süresi ortalama ~0.64 saniye **kısalır** |

**Regresyon denklemi:**

```
Ŷ = 0.551 + 0.497(sayfa_boyutu_mb) + 0.010(gorsel_sayisi)
         + 0.058(javascript_dosya_sayisi) + 0.002(sunucu_yanit_suresi_ms)
         + 0.014(eszamanli_istek_sayisi) − 0.640(onbellekleme)
```

> Görsel sayısı anlamlı olmadığından pratik uygulamada model denklemine dahil edilmeyebilir; ancak akademik raporda tüm değişkenler gösterilmelidir.

---

### 7.4 Collinearity Statistics — VIF Değerleri

Katsayılar tablosunun en sağ sütunlarında yer alır:

| Değişken | VIF | Yorum |
|---|---|---|
| Sayfa Boyutu | **22.06** | ⚠️ Yüksek (>10) |
| Görsel Sayısı | **30.24** | ⚠️ Yüksek (>10) |
| JavaScript Dosya Sayısı | **14.50** | ⚠️ Yüksek (>10) |
| Sunucu Yanıt Süresi | **4.44** | ✓ Kabul edilebilir |
| Eş Zamanlı İstek Sayısı | **33.85** | ⚠️ Yüksek (>10) |
| Önbellekleme | **2.15** | ✓ Kabul edilebilir |

> **Kural:** VIF > 10 → çoklu doğrusallık sorunu var.  
> Sayfa boyutu, görsel sayısı ve eş zamanlı istek sayısı birbirleriyle yüksek korelasyon içindedir — büyük sayfalar genellikle daha fazla görsel ve daha fazla istek barındırır. Bu durum görsel sayısının modelde anlamlı çıkmamasını da açıklıyor olabilir.  
> **Önemli not:** Çoklu doğrusallık, modelin genel tahmin gücünü (R²) bozmaz; ancak bireysel katsayı (B) yorumlarını güvenilmez kılabilir.

---

### 7.5 Normallik Kontrolü

Output'taki **Histogram** ve **P-P Plot** grafiklerini inceleyin:

- **Histogram:** Artıklar yaklaşık çan eğrisi oluşturmalı
- **P-P Plot:** Noktalar köşegen çizgisine yakın olmalı

**Shapiro-Wilk testi** için artıkları kaydedin:

```
Analyze → Regression → Linear → Save → Unstandardized Residuals
```

Ardından:
```
Analyze → Descriptive Statistics → Explore
→ RES_1 değişkenini Dependent listesine ekleyin
→ Plots → Normality plots with tests → Continue → OK
```

**Bu veri setinin beklenen bulguları:** W = .994, p = .992 → p > .05 → **Normallik varsayımı güçlü biçimde sağlanmaktadır** ✓

---

### 7.6 Varsayımlar Özet Tablosu

| Varsayım | Test | Sonuç | Durum |
|---|---|---|---|
| Normallik | Shapiro-Wilk W = .994, p = .992 | p > .05 | ✓ Sağlanıyor |
| Otokorelasyon | Durbin-Watson = 1.847 | 1.5–2.5 arası | ✓ Sağlanıyor |
| Çoklu doğrusallık | Maks. VIF = 33.85 | > 10 | ⚠️ Sorun var |
| Doğrusallık | ZRESID × ZPRED scatter | Rastgele dağılım bekle | ✓ Kontrol edin |
| Eş varyanslılık | ZRESID × ZPRED scatter | Huni şekli olmamalı | ✓ Kontrol edin |

---

## Adım 8 — Çoklu Doğrusallık Sorunuyla Başa Çıkma (İleri Adım)

VIF > 10 çıkan değişkenler için aşağıdaki yaklaşımlar değerlendirilebilir:

**Seçenek 1 — Değişken çıkarma:** Görsel sayısı hem anlamlı değil (p = .474) hem de yüksek VIF (30.24) taşıyor. Bu değişkeni modelden çıkarıp analizi tekrar çalıştırın.

```
Analyze → Regression → Linear
→ gorsel_sayisi değişkenini Independent(s) listesinden çıkarın → OK
```

**Seçenek 2 — Yeni bileşik değişken oluşturma:** Sayfa boyutu, görsel sayısı ve istek sayısı bir "karmaşıklık skoru" altında birleştirilebilir.

```
Transform → Compute Variable
→ Target Variable: karmaklik_skoru
→ Numeric Expression: sayfa_boyutu_mb + gorsel_sayisi + eszamanli_istek_sayisi
```

**Seçenek 3 — Ridge Regresyon:** SPSS'te standart olarak bulunmaz; SPSS Syntax veya R/Python gerektirir.

---

## Adım 9 — Sonuçların APA Formatında Raporlanması

Web sayfalarının yüklenme süresini etkileyen teknik faktörleri belirlemek amacıyla altı bağımsız değişkenle (sayfa boyutu, görsel sayısı, JavaScript dosya sayısı, sunucu yanıt süresi, eş zamanlı istek sayısı ve önbellekleme) çoklu doğrusal regresyon analizi uygulanmıştır. Analiz sonucunda kurulan modelin istatistiksel olarak anlamlı olduğu görülmüştür, F(6, 53) = 138.60, p < .001. Model, yüklenme süresindeki toplam varyansın %94.0'ını açıklamaktadır (R² = .940, düzeltilmiş R² = .933).

Katsayılar incelendiğinde; sayfa boyutunun (B = 0.497, p < .001), sunucu yanıt süresinin (B = 0.002, p < .001), önbelleklemenin (B = −0.640, p < .001), JavaScript dosya sayısının (B = 0.058, p < .001) ve eş zamanlı istek sayısının (B = 0.014, p = .004) yüklenme süresini anlamlı biçimde yordadığı saptanmıştır. Görsel sayısının (B = 0.010, p = .474) ise diğer değişkenler kontrol altında tutulduğunda anlamlı bir yordayıcı olmadığı görülmüştür. Bazı değişkenlerde VIF değerlerinin 10'un üzerinde olması (maks. VIF = 33.85) çoklu doğrusallık açısından dikkat gerektirmektedir; bu durum görsel sayısının baskılı etkisini kısmen açıklıyor olabilir. Shapiro-Wilk testi artıkların normal dağılım sergilediğini göstermiştir (W = .994, p = .992). Durbin-Watson değeri (1.847) otokorelasyon bulunmadığına işaret etmektedir.

---

## Hızlı Başvuru — Menü Yolları

| İşlem | SPSS Menüsü |
|---|---|
| Veri içe aktarma | File > Open > Data |
| Betimsel istatistik | Analyze > Descriptive Statistics > Descriptives |
| Korelasyon matrisi | Analyze > Correlate > Bivariate |
| Regresyon analizi | Analyze > Regression > Linear |
| Artıkları kaydetme | Linear Regression > Save > Unstandardized Residuals |
| Normallik testi | Analyze > Descriptive Statistics > Explore |
| Yeni değişken oluşturma | Transform > Compute Variable |

---

## Sık Yapılan Hatalar

| Hata | Doğrusu |
|---|---|
| `id` sütununu analize dahil etmek | `id` tanımlayıcıdır, Independent listesine eklenmez |
| VIF > 10 görünce paniğe kapılmak | Yüksek VIF modelin tahmin gücünü bozmaz; bireysel katsayı yorumlarına dikkat edilmeli |
| Görsel sayısı p = .474 çıkınca veriyi sorgulamak | Çoklu doğrusallık nedeniyle etkisi diğer değişkenlerle örtüşmüş olabilir |
| Önbellekleme için yorumu ters okumak | B = −0.640 → önbellek **kullanıldığında** yüklenme **azalır** (negatif = iyi) |
| Sadece p değerine bakmak | B katsayısı, Beta ve güven aralığı birlikte değerlendirilmeli |

---
| N = 60*