# AI снимки

`generate-images.mjs` поставя истинската мебел от каталога в топла, слънчева стая (OpenAI image edits).
Върви в GitHub Action `marketing-images.yml` с repo secret `OPENAI_API_KEY`; пуска се при промяна в `marketing/ai/` или в `build-data.mjs` на реклама.
Готовите снимки отиват в `marketing/ads/<реклама>/ai/<id>.png`. За нова версия на снимка изтрий файла и пусни отново.
