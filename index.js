import { Command } from "commander";
import sharp from "sharp";
import  fs  from "node:fs";
import path from 'node:path';
import process from "node:process";


const program = new Command();

const processImages = async(source, destination) => {  // async тк библиотека sharp рабоатет асинхронно

  console.log('source папка', source)
  console.log('destination папка', destination)
  

  if(!fs.existsSync(source) ){  // если нет папки source
    console.log('папки source не существует')
    return; // выход из метода jj
  }

  if(!fs.existsSync(destination)){ 
    fs.mkdirSync(destination);  //  создаем папку destination
  }

    const files = fs.readdirSync(source).filter(file => file.toLocaleLowerCase().endsWith('png') || file.toLocaleLowerCase().endsWith('jpeg') || file.toLocaleLowerCase().endsWith('jpg'));        // получаем массив файлов (из папки source) с расширением png, jpg, jpeg

    console.log('files ', files) // ['card-filter.png', 'flower16.jpg']

    for(const file of files){
      const filePath = path.join(source, file); // img/card-filter.png
    
      const fileName = path.parse(file).name; // название файла card-filter
     
      const fileExt = path.parse(file).ext.toLocaleLowerCase(); // расширение файла, приводим в нижний регистр
     
      const output2x = path.join(destination, `${fileName}@2x${fileExt}`);  // в папку destination кладем файл ${fileName}@2x${fileExt}
      const output1x = path.join(destination, `${fileName}@1x${fileExt}`); 

      if(fileExt === '.jpg' || fileExt === '.jpeg'){
        // quality: 100 т.е. картинки будут 100% го качества:
        await sharp(filePath).jpeg({ quality: 100 }).toFile(output2x);  // используем бибилотеку sharp,  файл из пути filePath кладем в output2x
        await sharp(filePath).resize({ width: Math.round((await sharp(output2x).metadata()).width / 2)}).jpeg({ quality: 100 }).toFile(output1x); // sharp(output2x).metadata() - вернет размер файла
      }

      if(fileExt === '.png'){
        await sharp(filePath).png({ compressionLevel: 0 }).toFile(output2x);  // используем бибилотеку sharp,  файл из пути filePath кладем в output2x
        await sharp(filePath).resize({ width: Math.round((await sharp(output2x).metadata()).width / 2)}).png({ compressionLevel: 0 }).toFile(output1x); // sharp(output2x).metadata() - вернет размер файла
      }

      
      await sharp(output2x).webp({ quality: 100 }).toFile(path.join(destination, `${fileName}@2x.webp`));
      await sharp(output2x).avif({ quality: 100 }).toFile(path.join(destination, `${fileName}@2x.avif`));

      await sharp(output1x).webp({ quality: 100 }).toFile(path.join(destination, `${fileName}@1x.webp`));
      await sharp(output1x).avif({ quality: 100 }).toFile(path.join(destination, `${fileName}@1x.avif`));
    }

    console.log('Обработка файлов завершена');

};



program
  .name('image-converter')
  .version('0.0.1')
  .description('CLI-программа для конвертации изображений')
  .argument('<source>', 'Папка с исходными изобажениями')
  .argument('<destination>', 'Папка с оптимизированными изобажениями')
  .action((source, destination) => {
    processImages(source, destination)
  });



program.parse(process.argv)