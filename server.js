// SpeakLoop 本地静态服务（无需安装任何依赖，用系统 Node 直接运行）
// 用法: node server.js [端口]   默认端口 8899
const http = require('http'), fs = require('fs'), path = require('path'), os = require('os');
const root = __dirname;
const port = Number(process.argv[2]) || 8899;
const mime = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.webmanifest': 'application/manifest+json',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon'
};
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const file = path.join(root, path.normalize(p).replace(/^(\.\.[\/\\])+/, ''));
  fs.readFile(file, (e, d) => {
    if (e) { res.writeHead(404); res.end('Not Found'); return; }
    const ext = path.extname(file).toLowerCase();
    const headers = { 'Content-Type': mime[ext] || 'application/octet-stream' };
    if (ext === '.html') headers['Cache-Control'] = 'no-cache';
    res.writeHead(200, headers);
    res.end(d);
  });
}).listen(port, '0.0.0.0', () => {
  console.log('========================================');
  console.log('  SpeakLoop 服务已启动，请勿关闭本窗口');
  console.log('  本机访问: http://localhost:' + port);
  console.log('  手机(同一WiFi)访问以下地址:');
  const ifs = os.networkInterfaces();
  Object.keys(ifs).forEach(k => ifs[k].forEach(i => {
    if (i.family === 'IPv4' && !i.internal) console.log('  -> http://' + i.address + ':' + port + '   (' + k + ')');
  }));
  console.log('========================================');
});
