const fs=require('fs'),path=require('path'),http=require('http');
const deps=path.resolve(__dirname,'../tools/renderer/node_modules');
const {chromium}=require(path.join(deps,'playwright'));
const sharp=require(path.join(deps,'sharp'));
const root=path.resolve(__dirname,'..'),three=path.join(deps,'three');
const server=http.createServer((req,res)=>{
 let url=decodeURIComponent(req.url.split('?')[0]);
 const file=url.startsWith('/three/')?path.join(three,url.slice(7)):url==='/render'?path.join(root,'scripts/render-three-sequence-scene.html'):path.join(root,'public',url);
 if(!fs.existsSync(file)){res.writeHead(404);res.end();return}
 res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.html')?'text/html':file.endsWith('.png')?'image/png':'application/octet-stream');fs.createReadStream(file).pipe(res);
});
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const port=server.address().port;
 const browser=await chromium.launch({...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{}),headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const page=await browser.newPage();page.on('pageerror',e=>console.error(e));
 const manifest={count:144,width:1200,height:1200,mobileWidth:600,format:'webp',scenes:['core','archive']};
 for(const scene of (process.argv.length>2?process.argv.slice(2):manifest.scenes)){
  await page.goto(`http://127.0.0.1:${port}/render?scene=${scene}`);await page.waitForFunction(()=>window.sceneReady);
  const dir=path.join(root,'public/sequences',scene);fs.mkdirSync(path.join(dir,'mobile'),{recursive:true});
  for(let i=0;i<manifest.count;i++){
   const url=await page.evaluate(p=>window.drawFrame(p),i/(manifest.count-1));const buffer=Buffer.from(url.split(',')[1],'base64');const name=String(i).padStart(3,'0')+'.webp';
   fs.writeFileSync(path.join(dir,name),buffer);await sharp(buffer).resize(600).webp({quality:80}).toFile(path.join(dir,'mobile',name));
   if(i===0)await sharp(buffer).png().toFile(path.join(__dirname,scene+'-preview.png'));
   if(i%24===0)console.log(scene,i+'/'+manifest.count);
  }
 }
 fs.writeFileSync(path.join(root,'public/sequences/manifest.json'),JSON.stringify(manifest,null,2));
 await browser.close();server.close();console.log('144 distinct frames per scene, desktop and mobile completed.');
})().catch(e=>{console.error(e);server.close();process.exit(1)});
