Конвертатор котрый конвертирует картинки из png и jpeg(из папки sourсe) в webp и avif(и их кладет в папку destination)  и формирует картинки в x1 x2

Для конвертации запускаем команду: node index img result  // где img - папка с  исходными картинкми, result - папка сконвертированными избражениями

{
  "name": "image-converter",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node index.js ./input ./output" // исходные картинки будут в папке /input, оптимизированные в папке /output
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "commander": "^12.1.0",
    "sharp": "^0.33.4"
  }
}
