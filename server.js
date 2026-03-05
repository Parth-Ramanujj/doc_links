const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const BASE_DIR = __dirname;

const reportPath = path.join(BASE_DIR, 'scrape-report.json');
let urlToFileMap = {};

try {
    const reportRaw = fs.readFileSync(reportPath, 'utf8');
    const report = JSON.parse(reportRaw);
    for (const page of report.pages) {
        const urlObj = new URL(page.url);
        const pathname = urlObj.pathname;
        let localFile = page.filename;
        urlToFileMap[pathname] = localFile;
        // Also map with or without trailing slash
        if (pathname.endsWith('/')) {
            urlToFileMap[pathname.slice(0, -1) || '/'] = localFile;
        } else {
            urlToFileMap[pathname + '/'] = localFile;
        }
    }
} catch (e) {
    console.error('Error loading scrape-report.json:', e);
}

const server = http.createServer((req, res) => {
    try {
        const urlObj = new URL(req.url, `http://${req.headers.host}`);
        const pathname = urlObj.pathname;

        // PROXY: Route Next.js image optimizer requests to the original site
        if (pathname.startsWith('/_next/image')) {
            const originalUrl = `https://demo.doclinks.in${req.url}`;
            console.log(`Proxying Image: ${originalUrl}`);
            try {
                const proxyReq = https.request(new URL(originalUrl), {
                    headers: {
                        ...req.headers,
                        'host': 'demo.doclinks.in'
                    }
                }, (proxyRes) => {
                    console.log(`Proxy Response (Image) [${proxyRes.statusCode}]: ${originalUrl}`);
                    res.writeHead(proxyRes.statusCode, proxyRes.headers);
                    proxyRes.pipe(res);
                });
                proxyReq.on('error', (err) => {
                    console.error('Proxy Error (Image):', err);
                    res.writeHead(500);
                    res.end();
                });
                return proxyReq.end();
            } catch (err) {
                console.error('URL Parsing Error (Image):', err);
                res.writeHead(500);
                res.end();
                return;
            }
        }

        // Route static assets to the downloaded assets folder
        if (pathname.startsWith('/_next/static/chunks/')) {
            const file = path.basename(pathname);
            if (file.endsWith('.css')) {
                const cssPath = path.join(BASE_DIR, 'assets', 'css', file);
                if (fs.existsSync(cssPath)) {
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    return fs.createReadStream(cssPath).pipe(res);
                }
            } else if (file.endsWith('.js')) {
                const jsPath = path.join(BASE_DIR, 'assets', 'js', file);
                if (fs.existsSync(jsPath)) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    return fs.createReadStream(jsPath).pipe(res);
                }
            }

            // If asset not local, proxy it
            const originalUrl = `https://demo.doclinks.in${req.url}`;
            console.log(`Proxying Asset: ${originalUrl}`);
            const proxyReq = https.request(new URL(originalUrl), {
                headers: {
                    ...req.headers,
                    'host': 'demo.doclinks.in'
                }
            }, (proxyRes) => {
                console.log(`Proxy Response (Asset) [${proxyRes.statusCode}]: ${originalUrl}`);
                res.writeHead(proxyRes.statusCode, proxyRes.headers);
                proxyRes.pipe(res);
            });
            proxyReq.on('error', (err) => {
                console.error('Proxy Error (Asset):', err);
                res.writeHead(404);
                res.end();
            });
            return proxyReq.end();

        } else if (pathname === '/logo.png') {
            const logoPath = path.join(BASE_DIR, 'assets', 'images', 'logo.png');
            if (fs.existsSync(logoPath)) {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                return fs.createReadStream(logoPath).pipe(res);
            }
        } else if (pathname.startsWith('/assets/')) {
            const assetPath = path.join(BASE_DIR, pathname.replace(/^\//, ''));
            // simple check against directory traversal
            if (fs.existsSync(assetPath) && fs.statSync(assetPath).isFile() && !assetPath.includes('..')) {
                const ext = path.extname(assetPath);
                let contentType = 'text/plain';
                if (ext === '.css') contentType = 'text/css';
                else if (ext === '.js') contentType = 'application/javascript';
                else if (ext === '.png') contentType = 'image/png';
                else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
                else if (ext === '.svg') contentType = 'image/svg+xml';

                res.writeHead(200, { 'Content-Type': contentType });
                return fs.createReadStream(assetPath).pipe(res);
            }
        }

        // Route page requests based on scrape-report URL mappings
        if (urlToFileMap[pathname]) {
            const filePath = path.join(BASE_DIR, urlToFileMap[pathname]);
            if (fs.existsSync(filePath)) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                return fs.createReadStream(filePath).pipe(res);
            }
        }

        // Fallbacks based on typical scraper filename formatting
        let guessedFilename = '_' + pathname.substring(1).replace(/\//g, '_') + '.html';
        if (pathname === '/') guessedFilename = '_index.html';

        let guessedPath = path.join(BASE_DIR, guessedFilename);
        if (fs.existsSync(guessedPath)) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            return fs.createReadStream(guessedPath).pipe(res);
        }

        // Attempt exact file match if somehow requested directly
        let exactPath = path.join(BASE_DIR, pathname.replace(/^\//, ''));
        if (fs.existsSync(exactPath) && fs.statSync(exactPath).isFile() && exactPath.endsWith('.html') && !exactPath.includes('..')) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            return fs.createReadStream(exactPath).pipe(res);
        }

        // PROXY: For everything else, try proxying to the original site (icons, fonts, etc)
        const originalUrl = `https://demo.doclinks.in${req.url}`;
        console.log(`Proxying Final Fallback: ${originalUrl}`);
        const proxyReq = https.request(new URL(originalUrl), {
            headers: {
                ...req.headers,
                'host': 'demo.doclinks.in'
            }
        }, (proxyRes) => {
            console.log(`Proxy Response (Final) [${proxyRes.statusCode}]: ${originalUrl}`);
            if (proxyRes.statusCode === 200) {
                res.writeHead(proxyRes.statusCode, proxyRes.headers);
                proxyRes.pipe(res);
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end(`404 Not Found - Missing resource: ${pathname}`);
            }
        });
        proxyReq.on('error', (err) => {
            console.error('Proxy Error (Final):', err);
            res.writeHead(404);
            res.end();
        });
        proxyReq.end();

    } catch (e) {
        console.error(e);
        if (!res.headersSent) {
            res.writeHead(500);
            res.end('Internal Server Error');
        }
    }
});

server.listen(PORT, () => {
    console.log(`=================================================`);
    console.log(`Server started successfully on http://localhost:${PORT}`);
    console.log(`Mapped ${Object.keys(urlToFileMap).length} URLs from scrape-report.json`);
    console.log(`Listening for connections...`);
    console.log(`=================================================`);
});
