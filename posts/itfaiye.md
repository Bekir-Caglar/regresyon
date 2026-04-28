# İtfaiye Müdahale Süresi Regresyon Analizi (SPSS Çözüm Rehberi)

Bu rehber, bir belediyenin itfaiye teşkilatı için olay yerine varış süresini (varis_suresi_dk) etkileyen faktörlerin **Çoklu Doğrusal Regresyon (Multiple Linear Regression)** yöntemiyle SPSS üzerinden nasıl analiz edileceğini açıklar.

---

## 1. Araştırma Sorusu ve Hipotezler

**Soru:** Uzaklık, trafik, çağrı yönlendirme, ekip çıkış süresi ve yol koşulları varış süresini ne derecede etkiler?

* **H0:** Bağımsız değişkenlerin varış süresi üzerinde anlamlı bir yordayıcı etkisi yoktur.
* **H1:** Bağımsız değişkenlerden en az biri varış süresini anlamlı şekilde etkiler.

---

## 2. SPSS Adım Adım Analiz Süreci

### Adım 1: Veriyi İçe Aktarma (Import Data)
1.  **File > Open > Data** yolunu izleyerek ilgili `.csv` dosyasını seçin.
2.  Veri setindeki değişkenlerin "Measure" tipinin **Scale** (Sayısal/Oran) olduğunu kontrol edin.

### Adım 2: Analiz Menüsünü Açma
1.  **Analyze > Regression > Linear...** menüsüne tıklayın.

### Adım 3: Değişkenleri Yerleştirme
1.  **Dependent (Bağımlı Değişken):** `varis_suresi_dk`
2.  **Independent(s) (Bağımsız Değişkenler):**
    * `istasyona_uzaklik_km`
    * `trafik_yogunlugu`
    * `cagri_yonlendirme_suresi_sn`
    * `ekip_cikis_suresi_dk`
    * `yol_karmasikligi`
    * `pik_saat`

### Adım 4: İstatistiksel Ayarlar (Statistics)
1.  Sağdaki **Statistics** butonuna tıklayın.
2.  **Model fit**, **Estimates** ve **Collinearity diagnostics** (Çoklu doğrusal bağlantı kontrolü için) seçeneklerini işaretleyip **Continue** deyin.
3.  **OK** butonuna basarak analizi çalıştırın.

---

## 3. Analiz Çıktılarının Yorumlanması

### Model Summary (Model Özeti)
* **R Square (.910):** Müdahale süresindeki değişimin **%91'i** bu modeldeki değişkenlerce açıklanır. Bu çok yüksek bir tahmin gücüdür.

### ANOVA (Model Anlamlılığı)
* **Sig. (.000):** Model bir bütün olarak anlamlıdır ($p < 0.05$).

### Coefficients (Katsayılar Tablosu)
| Değişken | Beta (B) | Sig. (p) | Yorum |
| :--- | :--- | :--- | :--- |
| **Uzaklık (km)** | 0.707 | **.000** | Mesafe arttıkça varış süresi anlamlı şekilde uzar. |
| **Trafik Yoğunluğu** | 0.598 | **.000** | Trafik arttıkça süre anlamlı şekilde artar. |
| **Ekip Çıkış Süresi** | 1.165 | **.000** | En kritik operasyonel faktördür. Hazırlık süresi arttıkça varış süresi doğrudan uzar. |
| **Pik Saat** | 1.944 | **.000** | Pik saatlerde olay yerine ulaşmak yaklaşık 2 dakika daha uzun sürer. |
| **Yol Karmaşıklığı** | 0.434 | **.002** | Yol yapısının zorluğu süreyi artırır. |
| **Çağrı Yönlendirme** | 0.007 | .258 | **Anlamsız.** Saniyeler bazındaki bu fark toplam süreyi istatistiksel olarak etkilememiştir. |

---

## 4. Yönetimsel Karar ve Öneriler

1.  **Ekip Performansı:** İstasyon içi "çıkış süresi" katsayısı (1.165) oldukça yüksektir. Bu süreyi düşürmek için istasyon içi eğitimlere ağırlık verilmelidir.
2.  **Trafik Önceliği:** Pik saat etkisinin (1.94 dk) yüksek olması, siren ve geçiş üstünlüğü denetimlerinin artırılması gerektiğini gösterir.
3.  **Hizmet Alanı:** Mesafenin etkisi çok büyük olduğu için, yeni istasyon konumlandırmaları en uzak noktalara göre optimize edilmelidir.