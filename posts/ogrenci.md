
# SPSS ile Çoklu Doğrusal Regresyon Analizi

**Araştırma sorusu:** Öğrencilerin haftalık çalışma saati, derse devam oranı, önceki dönem notu, motivasyon düzeyi ve sınav kaygısı; final notunu anlamlı biçimde yordar mı?

---

## 1. Veriyi SPSS'e Aktarma

1. SPSS'i açın → **File > Open > Data**
2. Dosya türünü **CSV** olarak seçin
3. `regresyon_ogrenci_basari_veri_seti.csv` dosyasını seçin
4. Açılan sihirbazda:
   - *Delimiter:* **Comma** (virgül)
   - *Variable names included at top of file:* **işaretli** olsun
5. **Finish** → veri açılır

> Değişkenlerin doğru tanındığını kontrol edin:  
> `final_notu`, `calisma_saati`, `devam_orani`, `onceki_not`, `motivasyon`, `sinav_kaygisi`

---

## 2. Regresyon Analizini Çalıştırma

**Menü yolu:**

```
Analyze → Regression → Linear
```

Açılan pencerede:

| Alan | Seçilecek Değişken |
|---|---|
| **Dependent** | `final_notu` |
| **Independent(s)** | `calisma_saati`, `devam_orani`, `onceki_not`, `motivasyon`, `sinav_kaygisi` |
| **Method** | `Enter` (hepsini aynı anda dahil et) |

---

## 3. İstatistik Seçenekleri (Statistics butonu)

**Statistics** butonuna tıklayın ve şunları işaretleyin:

- [x] **Estimates** (katsayılar)
- [x] **Model fit** (R², F testi)
- [x] **R squared change**
- [x] **Descriptives** (ortalama, std. sapma)
- [x] **Collinearity diagnostics** → VIF değerleri için **zorunlu**
- [x] **Durbin-Watson** → otokorelasyon testi için

**Continue** → **OK**

---

## 4. Artık (Residual) Grafikleri — Plots butonu

**Plots** butonuna tıklayın:

- **Y ekseni:** `*ZRESID` (standardize artıklar)
- **X ekseni:** `*ZPRED` (tahmin edilen değerler)
- [x] **Histogram** — normallik için
- [x] **Normal probability plot (P-P plot)** — normallik için

**Continue**

---

## 5. Kaydet ve Çalıştır

**OK** → Analiz çalışır, sonuçlar **Output** penceresinde görünür.

---

## 6. Çıktıları Okuma

### 6.1 Model Özeti Tablosu (Model Summary)

| Sütun | Ne anlama gelir? |
|---|---|
| **R** | Çoklu korelasyon katsayısı (.923 → çok güçlü) |
| **R Square** | Açıklanan varyans oranı (.852 → %85.2) |
| **Adjusted R Square** | Örneklem büyüklüğüne göre düzeltilmiş R² (.838) |
| **Durbin-Watson** | 1.5–2.5 arasındaysa otokorelasyon yok (bizim: 1.883 ✓) |

> **Yorumlama:** Model, final notundaki varyansın %85.2'sini açıklamaktadır.

---

### 6.2 ANOVA Tablosu

| Sütun | Değer | Anlam |
|---|---|---|
| **F** | 61.99 | Test istatistiği |
| **Sig.** | .000 | p < .001 → model anlamlı ✓ |

> **Yorumlama:** F(5, 54) = 61.99, p < .001 → Kurulan model istatistiksel olarak anlamlıdır.

---

### 6.3 Katsayılar Tablosu (Coefficients)

| Değişken | B | Std. Hata | Beta (β) | t | Sig. | Anlamlı mı? |
|---|---|---|---|---|---|---|
| Sabit | 7.064 | 9.666 | — | 0.731 | .468 | — |
| Çalışma Saati | **1.521** | 0.443 | **.539** | 3.431 | **.001** | ✓ Evet |
| Devam Oranı | **0.229** | 0.103 | **.230** | 2.215 | **.031** | ✓ Evet |
| Önceki Not | **0.397** | 0.111 | **.313** | 3.557 | **.001** | ✓ Evet |
| Motivasyon | 0.298 | 1.565 | .019 | 0.190 | .850 | ✗ Hayır |
| Sınav Kaygısı | -1.885 | 1.234 | -.115 | -1.527 | .132 | ✗ Hayır |

**Sütunların anlamı:**

- **B:** Ham regresyon katsayısı. Diğer değişkenler sabit tutulduğunda, bu değişken 1 birim artarsa final notu ne kadar değişir.
- **Beta (β):** Standardize katsayı. Değişkenlerin göreli önem sıralaması için kullanılır. En büyük β = en güçlü yordayıcı.
- **Sig.:** p değeri. < .05 ise değişken anlamlı yordayıcıdır.

**Regresyon denklemi:**

```
Ŷ = 7.064 + 1.521(çalışma_saati) + 0.229(devam_oranı)
        + 0.397(önceki_not) + 0.298(motivasyon) − 1.885(sınav_kaygısı)
```

---

### 6.4 Collinearity Statistics (VIF)

Bu sütunlar Katsayılar tablosunun sağında yer alır.

| Değişken | VIF | Yorum |
|---|---|---|
| Çalışma Saati | 38.44 | ⚠️ Çok yüksek |
| Devam Oranı | 78.96 | ⚠️ Çok yüksek |
| Önceki Not | 73.53 | ⚠️ Çok yüksek |
| Motivasyon | 43.44 | ⚠️ Çok yüksek |
| Sınav Kaygısı | 15.10 | ⚠️ Yüksek |

> **Kural:** VIF > 10 → çoklu doğrusallık sorunu var demektir.  
> Tüm değişkenler birbirleriyle yüksek korelasyonlu olduğundan VIF değerleri şişmiştir. Bu durum, bazı değişkenlerin (motivasyon, sınav kaygısı) gerçek etkilerinin modelde baskılanmasına neden olabilir.

---

### 6.5 Normallik Kontrolü

**Histogram:** Artıklar çan eğrisine benzer dağılmalıdır.

**P-P Plot:** Noktalar köşegen çizgisine yakın olmalıdır.

**Shapiro-Wilk testi** için:
```
Analyze → Descriptive Statistics → Explore
→ Unstandardized Residuals → Plots → Normality plots with tests
```

> Bizim verimizde: W = .972, p = .191 → p > .05 → **normallik sağlanıyor ✓**

---

## 7. Sonuçların Raporlanması (APA Formatı)

Beş bağımsız değişken (çalışma saati, devam oranı, önceki not, motivasyon ve sınav kaygısı) ile final notu arasındaki ilişkiyi incelemek amacıyla çoklu doğrusal regresyon analizi yapılmıştır. Analiz sonuçları, kurulan modelin istatistiksel olarak anlamlı olduğunu ortaya koymaktadır, F(5, 54) = 61.99, p < .001. Model, final notundaki toplam varyansın %85.2'sini açıklamaktadır (R² = .852, düzeltilmiş R² = .838).

Katsayılar incelendiğinde; çalışma saatinin (β = .539, p = .001), önceki dönem notunun (β = .313, p = .001) ve devam oranının (β = .230, p = .031) final notunu anlamlı biçimde yordadığı görülmüştür. Motivasyon düzeyi (β = .019, p = .850) ve sınav kaygısının (β = -.115, p = .132) ise anlamlı bir yordayıcı olmadığı saptanmıştır. Tüm VIF değerlerinin 10'un üzerinde olması, çoklu doğrusallık açısından dikkat edilmesi gerektiğine işaret etmektedir.

---

## 8. Sık Yapılan Hatalar

| Hata | Doğrusu |
|---|---|
| Method olarak `Stepwise` seçmek | Teoriye dayalı analizde `Enter` kullanılır |
| VIF sütununu görmemek | Statistics > Collinearity diagnostics işaretlenmeli |
| Sig. = .000 görünce "sıfır" sanmak | .000, p < .001 anlamına gelir; tam sıfır değildir |
| Sadece R² ile yetinmek | Adjusted R²'ye ve F testine de bakılmalı |

---

*Hazırlayan: Claude (Anthropic) | Veri: regresyon_ogrenci_basari_veri_seti.csv | N = 60*
