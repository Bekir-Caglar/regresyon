# İHA Fotogrametrisi Yatay Konum Doğruluğu Analizi (SPSS Çözüm Rehberi)

Bu rapor, İHA fotogrametrisi çıktılarındaki yatay hata miktarını (yatay_rmse_cm) etkileyen faktörlerin **Çoklu Doğrusal Regresyon (Multiple Linear Regression)** analizi ile SPSS üzerinden nasıl inceleneceğini adım adım açıklamaktadır.

---

## 1. Araştırma Sorusu ve Hipotezler

**Soru:** Uçuş yüksekliği, YKN sayısı, GSD, bindirme oranı, rüzgâr hızı ve kamera kalibrasyon hatası; yatay RMSE değerini anlamlı biçimde yordamakta mıdır?

* **H0:** Bağımsız değişkenlerin yatay RMSE üzerinde anlamlı bir etkisi yoktur.
* **H1:** Bağımsız değişkenlerden en az birinin yatay RMSE üzerinde anlamlı bir etkisi vardır.

---

## 2. SPSS Adım Adım Analiz Süreci

### Adım 1: Veri Aktarımı (Data Import)
1.  **File > Open > Data** yolunu izleyin.
2.  Dosya türünü `.csv` seçerek veri setini açın.
3.  **Variable View** sekmesinden değişkenlerin "Measure" kısmının **Scale** olduğundan emin olun.

### Adım 2: Regresyon Menüsüne Giriş
1.  Üst menüden **Analyze > Regression > Linear...** yolunu izleyin.

### Adım 3: Değişkenlerin Tanımlanması
1.  **Dependent (Bağımlı Değişken):** `yatay_rmse_cm` değişkenini bu kutuya atın.
2.  **Independent(s) (Bağımsız Değişkenler):** Aşağıdaki değişkenleri bu kutuya ekleyin:
    * `ucus_yuksekligi_m`
    * `yer_kontrol_noktasi_sayisi`
    * `gsd_cm`
    * `bindirme_orani_yuzde`
    * `ruzgar_hizi_ms`
    * `kamera_kalibrasyon_hatasi_px`
3.  **Method:** `Enter` (Varsayılan) olarak kalsın.

### Adım 4: İstatistiksel Ayarlar
1.  **Statistics** butonuna tıklayın:
    * **Estimates** ve **Model fit** (Zaten seçilidir).
    * **Collinearity diagnostics** (Çoklu doğrusal bağlantı sorunu/VIF değerleri için seçilmeli).
    * **Continue** diyerek kapatın.
2.  Ana ekranda **OK** butonuna basarak analizi başlatın.

---

## 3. Bulguların Yorumlanması (SPSS Output Interpretation)

### A. Model Özeti (Model Summary)
* **R Square (R²):** 0.648.
* **Yorum:** Bağımsız değişkenler, yatay RMSE değerindeki değişimin **%64.8'ini** açıklamaktadır. Bu, fotogrametrik bir model için oldukça güçlü bir değerdir.

### B. ANOVA (Model Anlamlılığı)
* **Sig. (p):** .000.
* **Yorum:** p < 0.05 olduğu için kurulan model istatistiksel olarak anlamlıdır. Bağımsız değişkenler toplu halde bağımlı değişkeni anlamlı şekilde yordamaktadır.

### C. Katsayılar (Coefficients)
Analiz sonucunda elde edilen katsayıların (Unstandardized B) yorumu:

| Değişken | B Katsayısı | Sig. (p) | Yorum |
| :--- | :--- | :--- | :--- |
| **Uçuş Yüksekliği** | 0.050 | **.017** | Anlamlı. Yükseklik arttıkça hata artmaktadır. |
| **YKN Sayısı** | -0.206 | **.000** | Anlamlı. YKN sayısı arttıkça RMSE düşmektedir (Negatif ilişki). |
| **GSD** | -0.355 | .708 | **Anlamsız.** Uçuş yüksekliği ile çok güçlü bağlandığı için modelde tek başına etkisiz görünmektedir. |
| **Bindirme Oranı** | -0.068 | **.002** | Anlamlı. Bindirme arttıkça hata miktarı düşmektedir. |
| **Rüzgâr Hızı** | 0.437 | **.000** | Anlamlı. Rüzgar hızı arttıkça fotogrametrik hassasiyet azalmaktadır. |
| **Kamera Hatası** | 1.624 | **.006** | Anlamlı. Kalibrasyon hatasındaki her 1 px artış, RMSE'yi 1.62 cm artırmaktadır. |

---

## 4. Mühendislik Değerlendirmesi ve Sonuç

1.  **YKN Stratejisi:** Analiz, yer kontrol noktası sayısının doğruluğu artıran en kritik "insan kontrolündeki" faktör olduğunu doğrulamaktadır.
2.  **Çevresel Faktörler:** Rüzgâr hızının yüksek katsayısı (0.437), İHA'nın stabilizasyon sorunlarının yatay konum hassasiyetini doğrudan bozduğunu göstermektedir. Proje planlamasında hava durumu kritik eşiktir.
3.  **Donanım Etkisi:** Kamera kalibrasyon hatasının katsayısı (1.624) oldukça yüksektir. Bu, yazılımsal düzeltmelerden ziyade kameranın geometrik kalibrasyonunun doğruluğun temel taşı olduğunu kanıtlar.
4.  **Uçuş Planlaması:** Bindirme oranındaki artışın negatif katsayısı (-0.068), daha fazla görsel bağ (tie points) oluşmasının blok dengelemesini güçlendirdiğini göstermektedir.

**Özet:** Model anlamlıdır ve GSD dışındaki tüm faktörler yatay konum doğruluğu üzerinde belirleyici rol oynamaktadır.