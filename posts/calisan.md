# SPSS ile Çoklu Doğrusal Regresyon Analizi
## Çalışan Performansı Araştırması

**Araştırma sorusu:** Çalışanların performans puanları; deneyim yılı, hizmet içi eğitim saati, iş doyumu, yönetici desteği, iş yükü ve devamsızlık günü değişkenleri tarafından anlamlı biçimde yordanmakta mıdır?

> **Veri seti:** N = 50 çalışan | Bağımlı değişken: `performans_puani` | Bağımsız değişken sayısı: 6

---

## Adım 1 — Veriyi SPSS'e Aktarma

1. SPSS'i açın → **File > Open > Data**
2. Sağ alttaki dosya türü menüsünden **Excel (*.xlsx, *.xls)** seçin
3. `regresyon_calisan_performans_veri_seti.xlsx` dosyasını seçip **Open** tıklayın
4. Açılan **Opening Excel Data Source** penceresinde:
   - **Read variable names from first row of data** seçeneğinin işaretli olduğundan emin olun.
   - **OK** butonuna tıklayın.

**Kontrol edin:** Variable View'da şu değişkenlerin tanımlı olması gerekir:

| Değişken | Tür | Rol |
|---|---|---|
| `performans_puani` | Sayısal | Bağımlı |
| `deneyim_yili` | Sayısal | Bağımsız |
| `hizmet_ici_egitim_saati` | Sayısal | Bağımsız |
| `is_doyumu` | Sayısal | Bağımsız |
| `yonetici_destegi` | Sayısal | Bağımsız |
| `is_yuku` | Sayısal | Bağımsız |
| `devamsizlik_gunu` | Sayısal | Bağımsız |

> `calisan_id` ve `birim` sütunları analize dahil edilmeyecek.

---

## Adım 2 — Betimsel İstatistikler (Ön Kontrol)

Analize geçmeden önce verinize genel bir bakış atın:

```
Analyze → Descriptive Statistics → Descriptives
```

Tüm sayısal değişkenleri ekleyin → **Options** butonundan:
- [x] Mean
- [x] Std. Deviation
- [x] Minimum / Maximum

**OK** → Aşağıdaki tabloya benzer sonuçlar görürsünüz:

| Değişken | N | Ortalama | Std. Sapma | Min | Max |
|---|---|---|---|---|---|
| performans_puani | 50 | 76.06 | 13.81 | 49.9 | 100.0 |
| deneyim_yili | 50 | 11.92 | 6.82 | 1 | 22 |
| hizmet_ici_egitim_saati | 50 | — | — | — | — |
| is_doyumu | 50 | — | — | — | — |
| yonetici_destegi | 50 | — | — | — | — |
| is_yuku | 50 | — | — | — | — |
| devamsizlik_gunu | 50 | 7.11 | 2.91 | 0.0 | 12.5 |

---

## Adım 3 — Regresyon Analizini Çalıştırma

**Menü yolu:**

```
Analyze → Regression → Linear
```

Açılan **Linear Regression** penceresinde:

| Alan | Yapılacak İşlem |
|---|---|
| **Dependent** | `performans_puani` kutusuna taşıyın |
| **Independent(s)** | `deneyim_yili`, `hizmet_ici_egitim_saati`, `is_doyumu`, `yonetici_destegi`, `is_yuku`, `devamsizlik_gunu` kutusuna taşıyın |
| **Method** | `Enter` olarak bırakın (tüm değişkenleri tek blokta dahil eder) |

---

## Adım 4 — Statistics Ayarları

**Statistics** butonuna tıklayın:

- [x] **Estimates** — B katsayıları ve p değerleri
- [x] **Confidence intervals** — %95 güven aralığı
- [x] **Model fit** — R², F istatistiği
- [x] **R squared change** — R² değişimi
- [x] **Descriptives** — korelasyon matrisi dahil edilir
- [x] **Collinearity diagnostics** — VIF değerleri için **zorunlu**
- [x] **Durbin-Watson** — artıkların otokorelasyonu

**Continue**

---

## Adım 5 — Artık Grafikleri (Plots)

**Plots** butonuna tıklayın:

- **Y:** `*ZRESID` (standardize artıklar)
- **X:** `*ZPRED` (tahmin edilen değerler)
- [x] **Histogram** — artıkların dağılımı
- [x] **Normal probability plot** — normallik kontrolü

**Continue**

---

## Adım 6 — Analizi Çalıştırın

**OK** → Output penceresi açılır.

---

## Adım 7 — Çıktıları Okuma ve Yorumlama

### 7.1 Model Özeti (Model Summary)

Output'ta **Model Summary** tablosunu bulun:

| R | R Square | Adjusted R Square | Durbin-Watson |
|---|---|---|---|
| **.945** | **.894** | **.879** | **2.036** |

**Yorumlama:**

- **R = .945** → Bağımsız değişkenler ile performans puanı arasında çok güçlü bir doğrusal ilişki vardır.
- **R² = .894** → Model, performans puanındaki varyansın **%89.4'ünü** açıklamaktadır. Bu son derece yüksek bir açıklayıcılık oranıdır.
- **Adjusted R² = .879** → Örneklem büyüklüğü ve değişken sayısına göre düzeltilmiş değer. R²'ye yakın olması modelin gereksiz değişken içermediğini gösterir.
- **Durbin-Watson = 2.036** → 1.5–2.5 aralığında olduğundan artıklar arasında otokorelasyon **yoktur** ✓

---

### 7.2 ANOVA Tablosu

Output'ta **ANOVA** tablosunu bulun:

| | Kareler Toplamı | df | Kareler Ortalaması | F | Sig. |
|---|---|---|---|---|---|
| Regresyon | — | 6 | — | **60.39** | **< .001** |
| Artık (Hata) | — | 43 | — | | |
| Toplam | — | 49 | | | |

**Yorumlama:**

> F(6, 43) = 60.39, p < .001 → Kurulan model istatistiksel olarak anlamlıdır. En az bir bağımsız değişken performans puanını anlamlı biçimde yordamaktadır.

---

### 7.3 Katsayılar Tablosu (Coefficients)

Output'ta **Coefficients** tablosunu bulun. Temel sütunlar:

| Değişken | B | Std. Hata | Beta (β) | t | Sig. | Anlamlı? |
|---|---|---|---|---|---|---|
| Sabit | 50.298 | 3.566 | — | 14.106 | < .001 | — |
| Deneyim Yılı | **0.754** | 0.111 | — | 6.800 | **< .001** | ✓ Evet |
| Hizmet İçi Eğitim | **0.414** | 0.067 | — | 6.182 | **< .001** | ✓ Evet |
| İş Doyumu | **5.126** | 0.467 | — | 10.964 | **< .001** | ✓ Evet |
| Yönetici Desteği | **4.424** | 0.582 | — | 7.602 | **< .001** | ✓ Evet |
| İş Yükü | **-5.415** | 0.527 | — | -10.282 | **< .001** | ✓ Evet |
| Devamsızlık Günü | **-0.611** | 0.254 | — | -2.405 | **.021** | ✓ Evet |

> **Önemli:** Bu veri setinde **tüm 6 değişken** p < .05 düzeyinde anlamlı yordayıcıdır.

**Sütunların anlamı:**

- **B (Unstandardized):** Diğer değişkenler sabit tutulduğunda, bu değişken 1 birim arttığında performans puanı kaç birim değişir.
- **Beta (β) (Standardized):** Farklı ölçek birimlerindeki değişkenlerin göreli etkisini karşılaştırmak için kullanılır. En büyük mutlak β = en güçlü yordayıcı.
- **Sig.:** p değeri. < .05 ise değişken anlamlı yordayıcıdır.

**Her katsayının bireysel yorumu:**

| Değişken | Yorum |
|---|---|
| Deneyim Yılı (+0.754) | Her 1 yıllık ek deneyim, performansı ~0.75 puan artırır |
| Hizmet İçi Eğitim (+0.414) | Her 1 saatlik ek eğitim, performansı ~0.41 puan artırır |
| İş Doyumu (+5.126) | İş doyumu 1 birim arttığında performans ~5.13 puan yükselir — en güçlü pozitif etki |
| Yönetici Desteği (+4.424) | Yönetici desteği 1 birim arttığında performans ~4.42 puan yükselir |
| İş Yükü (−5.415) | İş yükü 1 birim arttığında performans ~5.42 puan düşer — en güçlü negatif etki |
| Devamsızlık Günü (−0.611) | Her 1 günlük ek devamsızlık, performansı ~0.61 puan düşürür |

**Regresyon denklemi:**

```
Ŷ = 50.298 + 0.754(deneyim_yili) + 0.414(hizmet_ici_egitim_saati)
         + 5.126(is_doyumu) + 4.424(yonetici_destegi)
         − 5.415(is_yuku) − 0.611(devamsizlik_gunu)
```

---

### 7.4 Collinearity Statistics — VIF Değerleri

Katsayılar tablosunun en sağında yer alır:

| Değişken | Tolerance | VIF | Yorum |
|---|---|---|---|
| Deneyim Yılı | — | **3.95** | ✓ Kabul edilebilir |
| Hizmet İçi Eğitim | — | **3.94** | ✓ Kabul edilebilir |
| İş Doyumu | — | **4.68** | ✓ Kabul edilebilir |
| Yönetici Desteği | — | **5.69** | ✓ Kabul edilebilir |
| İş Yükü | — | **5.34** | ✓ Kabul edilebilir |
| Devamsızlık Günü | — | **7.44** | ✓ Kabul edilebilir |

> **Kural:** VIF < 10 → çoklu doğrusallık sorunu **yoktur**.  
> Bu veri setinde tüm VIF değerleri 10'un altında olup çoklu doğrusallık varsayımı karşılanmaktadır ✓

---

### 7.5 Normallik Kontrolü

**Histogram:** Artıklar yaklaşık çan eğrisi şeklinde dağılmalıdır.

**P-P Plot:** Noktalar köşegen çizgiye (beklenen-gözlenen) yakın olmalıdır.

**Shapiro-Wilk testi** için artıkları kaydedin ve test edin:

```
Analyze → Regression → Linear → Save → Unstandardized Residuals
```

Ardından:

```
Analyze → Descriptive Statistics → Explore
→ Residuals değişkenini Dependent listesine ekleyin
→ Plots → Normality plots with tests
```

**Bulgular:** W = .963, p = .116 → p > .05 → **Artıklar normal dağılımlıdır** ✓

---

### 7.6 Varsayımlar Özet Tablosu

| Varsayım | Test | Sonuç | Durum |
|---|---|---|---|
| Normallik | Shapiro-Wilk W = .963, p = .116 | p > .05 | ✓ Sağlanıyor |
| Otokorelasyon | Durbin-Watson = 2.036 | 1.5–2.5 arası | ✓ Sağlanıyor |
| Çoklu doğrusallık | Maks. VIF = 7.44 | < 10 | ✓ Sağlanıyor |
| Doğrusallık | Scatter plot (ZRESID × ZPRED) | Rastgele dağılım | ✓ Kontrol edin |

---

## Adım 8 — Sonuçların APA Formatında Raporlanması

Çalışanların performans puanını yordayan faktörleri belirlemek amacıyla çoklu doğrusal regresyon analizi uygulanmıştır. Analiz sonucunda kurulan modelin istatistiksel olarak anlamlı olduğu görülmüştür, F(6, 43) = 60.39, p < .001. Model, performans puanındaki toplam varyansın %89.4'ünü açıklamaktadır (R² = .894, düzeltilmiş R² = .879).

Katsayılar incelendiğinde; iş yükünün (B = −5.415, p < .001), iş doyumunun (B = 5.126, p < .001), yönetici desteğinin (B = 4.424, p < .001), deneyim yılının (B = 0.754, p < .001), hizmet içi eğitim saatinin (B = 0.414, p < .001) ve devamsızlık gününün (B = −0.611, p = .021) performans puanını anlamlı biçimde yordadığı saptanmıştır. VIF değerlerinin tamamının 10'un altında olması çoklu doğrusallık sorunu bulunmadığına işaret etmektedir. Artıkların Shapiro-Wilk testi normallik varsayımını karşıladığını göstermiştir (W = .963, p = .116). Durbin-Watson değeri (2.036) otokorelasyon olmadığını ortaya koymaktadır.

---

## Sık Yapılan Hatalar

| Hata | Doğrusu |
|---|---|
| `birim` değişkenini analize dahil etmek | `birim` kategorik (string) bir değişkendir, doğrudan regresyona girmez; kukla (dummy) kodlama gerektirir |
| Method olarak `Stepwise` seçmek | Teorik temelli araştırmalarda `Enter` yöntemi tercih edilir |
| Sig. = .000 görünce "tam sıfır" sanmak | Bu ifade p < .001 anlamına gelir |
| VIF sütununu görmemek | Statistics > Collinearity diagnostics kutucuğunu işaretlemeyi unutmayın |
| Adjusted R²'yi ihmal etmek | Değişken sayısı arttıkça R² şişer; düzeltilmiş değer daha güvenilirdir |

---

## Hızlı Başvuru — Menü Yolları

| İşlem | SPSS Menüsü |
|---|---|
| Veri içe aktarma | File > Open > Data |
| Betimsel istatistik | Analyze > Descriptive Statistics > Descriptives |
| Regresyon analizi | Analyze > Regression > Linear |
| Normallik testi | Analyze > Descriptive Statistics > Explore |
| Artıkları kaydetme | Linear Regression > Save > Unstandardized Residuals |

---

*Hazırlayan: Claude (Anthropic) | Veri: regresyon_calisan_performans_veri_seti.xlsx | N = 50*