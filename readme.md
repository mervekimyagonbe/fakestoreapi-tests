# FakeStore API Automation Tests

Bu projede FakeStore API kullanılarak Cypress ile otomatik API testleri yazılmıştır.

## Test Kapsamı
- GET / POST / PUT / DELETE HTTP metodları
- Header kontrolü (User-Agent, Content-Type)
- Query parameter kullanımı (limit)
- Rastgele veri kullanımı
- Response body doğrulama
- Status code kontrolü
- Response time (performans) testi

Toplam 17 adet otomatik test bulunmaktadır.

## Cypress Test Sonucu

Aşağıda Cypress testlerinin başarılı şekilde çalıştığını gösteren ekran görüntüsü yer almaktadır:

![Cypress Test Result](screenshots/fsa.png)

## Çalıştırma
```bash
npm install
npx cypress open