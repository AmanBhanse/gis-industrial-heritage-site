# Deployment Guide

## Build & Optimization

### Development Build

```bash
npm run dev
```

- HMR (Hot Module Replacement) enabled
- Unminified code for debugging
- Faster build time (~100ms)

### Production Build

```bash
npm run build
```

**Output**:
```
dist/
├── index.html              (0.46 KB)
├── assets/
│   ├── index-[hash].css   (24.82 KB → 5.32 KB gzipped)
│   └── index-[hash].js    (367.39 KB → 111.42 KB gzipped)
```

**Optimizations Applied**:
- Minification (CSS & JS)
- Gzip compression
- Dead code elimination
- Chunk splitting (Vite default)
- Source map generation (optional)

### Preview Production Build

```bash
npm run preview
```

Local server preview of production build at `http://localhost:5173`

## Environment Configuration

### package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### vite.config.js

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser'
  }
})
```

## Deployment Platforms

### GitHub Pages

1. **Update package.json**:
```json
{
  "homepage": "https://yourusername.github.io/heritage-map"
}
```

2. **Build & Deploy**:
```bash
npm run build
# Commit dist/ folder or use gh-pages package
```

3. **Repository Settings**:
- Go to Settings → Pages
- Source: Deploy from branch (main or gh-pages)
- Select /dist folder

### Netlify

1. **Connect Repository**:
- Go to netlify.com
- Connect GitHub repository
- Select `heritage-map` folder

2. **Build Settings**:
- Build command: `npm run build`
- Publish directory: `dist`

3. **Environment Variables**:
- None required for this project

4. **Deploy**:
- Automatic on every push to main branch

### Vercel

1. **Install Vercel CLI**:
```bash
npm i -g vercel
```

2. **Deploy**:
```bash
vercel
```

3. **Configuration**:
- Framework: Vite
- Root Directory: `heritage-map`
- Build Command: `npm run build`
- Output Directory: `dist`

### Traditional Hosting (Apache, Nginx, etc.)

1. **Build**:
```bash
npm run build
```

2. **Upload `dist/` contents** to web server

3. **Configure routing** for SPA (Single Page App):

**Apache (.htaccess)**:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**Nginx (nginx.conf)**:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## Performance Metrics

### Bundle Analysis

```bash
# Generate build stats
npm run build -- --stats

# Analyze bundle (using rollup-plugin-visualizer)
npm install --save-dev rollup-plugin-visualizer
```

### Current Metrics
- **Total Size**: 367 KB (uncompressed)
- **Gzipped**: 111 KB
- **CSS**: 24.82 KB (5.32 KB gzipped)
- **JavaScript**: 367.39 KB (111.42 KB gzipped)
- **Build Time**: ~250ms
- **Modules**: 78 transformed

### Optimization Tips

1. **Code Splitting**:
   - Vite automatically chunks vendors
   - Use dynamic imports for large features

2. **Image Optimization**:
   - Use WebP format where possible
   - Optimize image sizes
   - Consider lazy loading

3. **CSS Optimization**:
   - CSS Modules already reduce scope
   - Consider Tailwind CSS for further reduction
   - Remove unused dependencies

## Continuous Integration/Deployment

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Security Considerations

1. **HTTPS Only**: Always use HTTPS in production
2. **CORS Headers**: Configure appropriately for API calls
3. **Content Security Policy**: Add CSP headers
4. **Dependencies**: Keep packages updated
   ```bash
   npm audit
   npm update
   ```

## Caching Strategy

### Service Worker (Optional)

For offline support, add service worker:

```javascript
// src/registerServiceWorker.js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
}
```

### Cache Headers

**Example Netlify configuration** (`netlify.toml`):

```toml
[[headers]]
  for = "/*"
  [headers.values]
    Cache-Control = "public, max-age=3600"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

## Domain Setup

### DNS Configuration

For custom domain (e.g., `heritage-map.example.com`):

**GitHub Pages**:
1. Create `CNAME` file with domain name
2. Update DNS records to point to GitHub Pages

**Netlify/Vercel**:
1. Add domain in platform settings
2. Update DNS records as instructed
3. Enable automatic HTTPS

## Monitoring & Analytics

### Google Analytics

Add to `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Error Tracking

Consider Sentry or similar for production error monitoring:

```bash
npm install @sentry/react
```

## Troubleshooting

### Build Issues

1. **Module not found**:
```bash
rm -rf node_modules package-lock.json
npm install
```

2. **Port already in use**:
```bash
npm run dev -- --port 3000
```

3. **Memory issues**:
```bash
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### Deployment Issues

1. **Blank page after deploy**:
   - Check routing configuration
   - Verify CSS/JS assets load correctly
   - Check browser console for errors

2. **Images not loading**:
   - Verify image URLs are correct
   - Check CORS settings
   - Ensure paths are relative, not absolute

3. **Performance issues**:
   - Check Network tab in DevTools
   - Enable gzip compression
   - Review bundle size
   - Optimize images

## Rollback Procedure

### GitHub Pages
```bash
git revert <commit-hash>
git push origin main
```

### Netlify
- Automatic rollback available in Deploy settings
- Or trigger redeploy of previous version

### Vercel
- Automatic previous version available
- One-click rollback in Deployments

## Maintenance

### Regular Tasks
- Update dependencies: `npm update`
- Audit security: `npm audit`
- Monitor build time
- Check error logs
- Review analytics

### Dependency Updates

```bash
# Check outdated packages
npm outdated

# Update all packages
npm update

# Update specific package
npm install package@latest

# Major version updates
npm install package@^X.0.0
```

## Production Checklist

- [ ] All tests passing
- [ ] Build completes without errors
- [ ] Bundle size acceptable
- [ ] No console errors/warnings
- [ ] Responsive design tested
- [ ] Cross-browser tested
- [ ] Performance acceptable
- [ ] SEO optimized (meta tags, etc.)
- [ ] Analytics configured
- [ ] HTTPS enabled
- [ ] Monitoring configured
- [ ] Backup/rollback plan ready

---

**Last Updated**: May 2026
**Version**: 1.0.0
