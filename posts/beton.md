# SPSS ile Çoklu Doğrusal Regresyon Analizi
## Beton Basınç Dayanımı Araştırması — İnşaat Mühendisliği Laboratuvarı

**Araştırma sorusu:** Beton basınç dayanımı; çimento miktarı, su/çimento oranı, kür süresi, agrega boyutu, slump değeri ve sıkıştırma kalitesi tarafından anlamlı biçimde yordanmakta mıdır?

**Regresyon modeli:**
```
basinc_dayanimi_mpa = cimento_kg_m3 + su_cimento_orani + kur_suresi_gun
                    + agrega_boyutu_mm + slump_cm + sikistirma_kalitesi
```

> **Veri seti:** N = 60 beton numunesi | Bağımlı değişken: `basinc_dayanimi_mpa` | Bağımsız değişken sayısı: 6  
> **Not:** `sikistirma_kalitesi` 2–5 arası sıralı (ordinal) bir puandır. SPSS'te sayısal değişken olarak regresyona doğrudan alınabilir; eşit aralık varsayımı gözetilerek yorumlanmalıdır.

---

## Adım 1 — Veriyi SPSS'e Aktarma

1. SPSS'i açın → **File > Open > Data**
2. Dosya türünü **CSV (*.csv)** olarak seçin
3. `regresyon_insaat_beton_dayanimi_veri_seti.csv` dosyasını seçip **Open** tıklayın
4. Açılan **Text Import Wizard** penceresinde:
   - *Delimited* işaretli olsun
   - *First line includes variable names:* **Yes**
   - Delimiter: **Comma**
5. **Finish** → veri görünümü açılır

**Variable View'da kontrol edilmesi gereken değişkenler:**

| Değişken | Tür | Birim | Rol |
|---|---|---|---|
| `basinc_dayanimi_mpa` | Sayısal (float) | MPa | Bağımlı |
| `cimento_kg_m3` | Sayısal (float) | kg/m³ | Bağımsız |
| `su_cimento_orani` | Sayısal (float) | Oran (0–1) | Bağımsız |
| `kur_suresi_gun` | Sayısal (int) | Gün | Bağımsız |
| `agrega_boyutu_mm` | Sayısal (int) | mm | Bağımsız |
| `slump_cm` | Sayısal (float) | cm | Bağımsız |
| `sikistirma_kalitesi` | Sayısal (int) | 2–5 puan | Bağımsız |

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
| basinc_dayanimi_mpa | 34.42 MPa | 9.96 | 15.0 | 62.5 |
| cimento_kg_m3 | 376.72 kg/m³ | 54.51 | 280.5 | 459.7 |
| su_cimento_orani | — | — | — | — |
| kur_suresi_gun | — | — | — | — |
| agrega_boyutu_mm | — | — | — | — |
| slump_cm | — | — | — | — |
| sikistirma_kalitesi | 3.42 | 1.00 | 2 | 5 |

> Basınç dayanımı geniş bir aralıkta dağılmaktadır (15.0–62.5 MPa); bu, karışım ve uygulama değişkenlerinin beton kalitesini güçlü biçimde farklılaştırdığına işaret etmektedir.

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

| Değişken | r (bağımlı ile) | Yorum |
|---|---|---|
| cimento_kg_m3 | +.280 | Çimento arttıkça dayanım artar |
| su_cimento_orani | -.460 | Su/çimento arttıkça dayanım azalır — negatif ilişki beklenen yöndedir |
| kur_suresi_gun | +**.633** | En güçlü tekil korelasyon; uzun kür daha yüksek dayanım sağlar |
| agrega_boyutu_mm | -.015 | Tek başına zayıf ilişki |
| slump_cm | -.428 | Akıcılık arttıkça dayanım düşer |
| sikistirma_kalitesi | +.320 | Daha iyi sıkıştırma daha yüksek dayanım |

---

## Adım 4 — Regresyon Analizini Çalıştırma

```
Analyze → Regression → Linear
```

| Alan | Yapılacak İşlem |
|---|---|
| **Dependent** | `basinc_dayanimi_mpa` |
| **Independent(s)** | `cimento_kg_m3`, `su_cimento_orani`, `kur_suresi_gun`, `agrega_boyutu_mm`, `slump_cm`, `sikistirma_kalitesi` |
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
| **.946** | **.895** | **.884** | **2.430** |

**Yorumlama:**

- **R = .946** → Bağımsız değişkenler ile basınç dayanımı arasında çok güçlü doğrusal ilişki vardır.
- **R² = .895** → Model, basınç dayanımındaki varyansın **%89.5'ini** açıklamaktadır.
- **Adjusted R² = .884** → Değişken sayısına göre düzeltilmiş değer. R²'ye yakın olması modelin gereksiz değişken içermediğine işaret eder.
- **Durbin-Watson = 2.430** → 1.5–2.5 aralığının üst sınırına yakın ama hâlâ kabul edilebilir aralıkta; artıklar arasında **otokorelasyon yoktur** ✓

---

### 7.2 ANOVA Tablosu

| | Kareler Toplamı | df | Kareler Ort. | F | Sig. |
|---|---|---|---|---|---|
| Regresyon | — | 6 | — | **75.64** | **< .001** |
| Artık | — | 53 | — | | |
| Toplam | — | 59 | | | |

**Yorumlama:**

> F(6, 53) = 75.64, p < .001 → Kurulan model istatistiksel olarak anlamlıdır. Bağımsız değişkenler birlikte beton basınç dayanımını anlamlı biçimde yordamaktadır.

---

### 7.3 Katsayılar Tablosu (Coefficients)

| Değişken | B | Std. Hata | t | Sig. | Anlamlı? |
|---|---|---|---|---|---|
| Sabit | 20.591 | 4.303 | 4.785 | **< .001** | — |
| Çimento Miktarı (kg/m³) | **+0.074** | 0.009 | 8.597 | **< .001** | ✓ Evet |
| Su/Çimento Oranı | **−60.789** | 4.981 | −12.205 | **< .001** | ✓ Evet |
| Kür Süresi (gün) | **+0.256** | 0.024 | 10.450 | **< .001** | ✓ Evet |
| Agrega Boyutu (mm) | +0.110 | 0.059 | 1.854 | .069 | ✗ Hayır |
| Slump Değeri (cm) | **−0.449** | 0.109 | −4.107 | **< .001** | ✓ Evet |
| Sıkıştırma Kalitesi | **+3.603** | 0.453 | 7.961 | **< .001** | ✓ Evet |

> Agrega boyutu p = .069 ile %5 anlamlılık düzeyinde eşiği geçememektedir. Ancak %10 anlamlılık kriteri benimsenseydi (p < .10) sınır düzeyde anlamlı sayılabilirdi. Bu bulgu raporlanmalı ve yorumlanmalıdır.

**Her katsayının bireysel yorumu:**

| Değişken | Yorum |
|---|---|
| Çimento Miktarı (+0.074) | Her 1 kg/m³ ek çimento, basınç dayanımını ~0.07 MPa artırır |
| Su/Çimento Oranı (−60.789) | Su/çimento oranı 0.1 birim artarsa dayanım ~6.08 MPa düşer — **en güçlü negatif etki** |
| Kür Süresi (+0.256) | Her 1 günlük ek kür, dayanımı ~0.26 MPa artırır |
| Agrega Boyutu (+0.110) | **Anlamlı değil** (p = .069); kontrol altındayken ek katkısı istatistiksel eşiği geçmiyor |
| Slump Değeri (−0.449) | Her 1 cm slump artışı, dayanımı ~0.45 MPa düşürür |
| Sıkıştırma Kalitesi (+3.603) | Sıkıştırma puanı 1 birim arttığında dayanım ~3.60 MPa yükselir |

**Regresyon denklemi:**

```
Ŷ = 20.591 + 0.074(cimento_kg_m3) − 60.789(su_cimento_orani)
          + 0.256(kur_suresi_gun) + 0.110(agrega_boyutu_mm)
          − 0.449(slump_cm) + 3.603(sikistirma_kalitesi)
```

---

### 7.4 Collinearity Statistics — VIF Değerleri

Katsayılar tablosunun en sağ sütunlarında yer alır:

| Değişken | VIF | Yorum |
|---|---|---|
| Çimento Miktarı | **38.47** | ⚠️ Yüksek (>10) |
| Su/Çimento Oranı | **30.19** | ⚠️ Yüksek (>10) |
| Kür Süresi | **3.57** | ✓ Kabul edilebilir |
| Agrega Boyutu | **8.05** | ✓ Kabul edilebilir |
| Slump Değeri | **8.68** | ✓ Kabul edilebilir |
| Sıkıştırma Kalitesi | **11.67** | ⚠️ Sınır yüksek (>10) |

> **Neden yüksek?** Beton karışım tasarımında çimento miktarı ve su/çimento oranı birbirleriyle yapısal olarak bağlantılıdır: çimento artarken genellikle su miktarı da ayarlanır. Bu fiziksel bağımlılık VIF'i şişirir.  
> **Pratik sonucu:** Modelin genel tahmin gücü (R² = .895) güvenilirdir. Ancak çimento miktarı ve su/çimento oranının bireysel B katsayıları kararsız olabilir — bu iki değişken aynı anda yorumlanırken dikkatli olunmalıdır.  
> **Agrega boyutunun anlamlı çıkmaması** kısmen bu çoklu doğrusallık ortamından kaynaklanıyor olabilir.

---

### 7.5 Normallik Kontrolü

Output'taki **Histogram** ve **P-P Plot** grafiklerini inceleyin:
- Histogram: artıklar çan eğrisi biçiminde dağılmalı
- P-P Plot: noktalar köşegen çizgisine yakın olmalı

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

**Bu veri setinin beklenen bulgular:** W = .983, p = .580 → p > .05 → **Normallik varsayımı sağlanmaktadır** ✓

---

### 7.6 Varsayımlar Özet Tablosu

| Varsayım | Test | Sonuç | Durum |
|---|---|---|---|
| Normallik | Shapiro-Wilk W = .983, p = .580 | p > .05 | ✓ Sağlanıyor |
| Otokorelasyon | Durbin-Watson = 2.430 | 1.5–2.5 sınırında | ✓ Kabul edilebilir |
| Çoklu doğrusallık | VIF: çimento = 38.47, su/ç = 30.19 | > 10 | ⚠️ Sorun var |
| Doğrusallık | ZRESID × ZPRED scatter | Rastgele dağılım beklenir | ✓ Grafik kontrol edin |
| Eş varyanslılık | ZRESID × ZPRED scatter | Huni şekli olmamalı | ✓ Grafik kontrol edin |

---

## Adım 8 — Çoklu Doğrusallık Sorunuyla Başa Çıkma (İleri Adım)

Çimento miktarı ve su/çimento oranı fiziksel olarak birbirine bağlıdır. İki yaklaşım uygulanabilir:

**Seçenek 1 — Su/çimento oranını modelden çıkarma:**  
Beton teknolojisinde su/çimento oranı en kritik tasarım parametrelerinden biridir; ancak çimento miktarıyla yüksek ortak varyans taşıdığından biri modelde tutulup diğeri çıkarılabilir.

```
Analyze → Regression → Linear
→ su_cimento_orani değişkenini Independent listesinden çıkarın → OK
```

Ardından VIF değerlerinin düşüp düşmediğini, R² ve anlamlılık durumlarını karşılaştırın.

**Seçenek 2 — Merkeze alma (Centering):**  
Her değişkenden kendi ortalamasını çıkararak yeni değişkenler oluşturun. Bu işlem VIF değerlerini düşürür.

```
Transform → Compute Variable
→ Target Variable: cimento_centered
→ Numeric Expression: cimento_kg_m3 − 376.72
```

Aynı işlemi `su_cimento_orani` için de tekrarlayın, ardından bu yeni değişkenlerle regresyonu yeniden çalıştırın.

**Seçenek 3 — Agrega boyutunu yeniden değerlendirme:**  
Agrega boyutu (p = .069) sınır düzeyde anlamlıdır. Çoklu doğrusallık azaltıldıktan sonra bu değişken anlamlı hale gelebilir; yeniden test edilmesi önerilir.

---

## Adım 9 — Sonuçların APA Formatında Raporlanması

Beton basınç dayanımını etkileyen karışım ve uygulama faktörlerini belirlemek amacıyla altı bağımsız değişkenle (çimento miktarı, su/çimento oranı, kür süresi, agrega boyutu, slump değeri ve sıkıştırma kalitesi) çoklu doğrusal regresyon analizi uygulanmıştır. Analiz sonucunda kurulan modelin istatistiksel olarak anlamlı olduğu görülmüştür, F(6, 53) = 75.64, p < .001. Model, basınç dayanımındaki toplam varyansın %89.5'ini açıklamaktadır (R² = .895, düzeltilmiş R² = .884).

Katsayılar incelendiğinde; su/çimento oranının (B = −60.789, p < .001) en güçlü negatif yordayıcı olduğu, kür süresinin (B = 0.256, p < .001), çimento miktarının (B = 0.074, p < .001), sıkıştırma kalitesinin (B = 3.603, p < .001) ve slump değerinin (B = −0.449, p < .001) basınç dayanımını anlamlı biçimde yordadığı görülmüştür. Agrega boyutunun ise (B = 0.110, p = .069) %5 anlamlılık düzeyinde anlamlı bir yordayıcı olmadığı saptanmıştır. Çimento miktarı (VIF = 38.47) ve su/çimento oranında (VIF = 30.19) yüksek çoklu doğrusallık saptanmış olup bu bulgu karışım değişkenlerinin fiziksel bağımlılığından kaynaklanmaktadır. Artıkların Shapiro-Wilk testine göre normal dağıldığı görülmüştür (W = .983, p = .580). Durbin-Watson değeri (2.430) otokorelasyon bulunmadığına işaret etmektedir.

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
| `id` sütununu analize dahil etmek | Tanımlayıcıdır, Independent listesine eklenmez |
| Agrega boyutu p = .069 çıkınca "anlamsız" diye geçmek | p = .069, sınır düzeyde; çoklu doğrusallık baskılamış olabilir — ayrıca tartışılmalı |
| Su/çimento oranı B = −60.789 görünce şaşırmak | Oran değişkeni (0–1 arası) olduğundan katsayı büyük görünür; 0.1 birimlik artış = −6.08 MPa düşüş |
| VIF > 10 çıkınca modeli geçersiz saymak | Yüksek VIF genel model tahminini bozmaz; bireysel katsayı yorumlarını zorlaştırır |
| Durbin-Watson = 2.43'ü sorunlu görmek | 1.5–2.5 aralığında olduğundan kabul edilebilir; 2.5 üstü olsaydı sorun sayılırdı |

---

*Hazırlayan: Claude (Anthropic) | Veri: regresyon_insaat_beton_dayanimi_veri_seti.csv | N = 60*