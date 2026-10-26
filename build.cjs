const fs=require('fs');
fs.mkdirSync('dist/admin',{recursive:true});fs.mkdirSync('dist/assets',{recursive:true});
for(const f of ['index.html','style.css','polish.css','experience.css','experience.js','services.html','gallery.html','about.html','contact.html','services.json','site.js','data.js'])fs.copyFileSync(f,'dist/'+f);
for(const f of ['index.html','admin.css','admin.js','calendar.js','upgrade.css'])fs.copyFileSync('admin/'+f,'dist/admin/'+f);
for(const f of fs.readdirSync('assets').filter(f=>/\.(webp|woff2|svg|txt)$/.test(f)))fs.copyFileSync('assets/'+f,'dist/assets/'+f);
fs.writeFileSync('dist/.nojekyll','');fs.writeFileSync('dist/robots.txt','User-agent: *\nDisallow: /\n');
console.log('Built static website and management demo in dist/');

if(process.argv.includes('--pages')){fs.cpSync('dist','docs',{recursive:true});console.log('Updated docs/ for GitHub Pages.');}
