# Grean Energy - Netlify Deployment Guide

This document provides comprehensive instructions for deploying the Grean Energy application to Netlify.

## 📋 Prerequisites

- Node.js 18+ installed locally
- Git repository with your code
- Netlify account
- Environment variables configured

## 🚀 Quick Deployment

### Option 1: Deploy from Git Repository

1. **Connect Repository to Netlify**
   - Log in to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Choose your Git provider (GitHub, GitLab, Bitbucket)
   - Select the Grean Energy repository

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: `18`

3. **Set Environment Variables**
   - Go to Site settings > Environment variables
   - Add the required variables (see Environment Variables section below)

4. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically build and deploy your site

### Option 2: Manual Deploy

1. **Build Locally**
   ```bash
   npm install
   npm run build
   ```

2. **Deploy to Netlify**
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli
   
   # Login to Netlify
   netlify login
   
   # Deploy
   netlify deploy --prod --dir=.next
   ```

## 🔧 Configuration Details

### Environment Variables

Set these in Netlify Dashboard > Site settings > Environment variables:

**Required:**
- `NEXT_PUBLIC_SPLINE_SCENE`: Your Spline 3D scene URL
- `NODE_ENV`: `production`

**Optional:**
- `NEXT_PUBLIC_GA_TRACKING_ID`: Google Analytics ID
- `NEXT_PUBLIC_API_BASE_URL`: API base URL
- `NEXT_PUBLIC_ENABLE_DEBUG`: `false` for production

### Build Configuration

The `netlify.toml` file includes:
- Build command and publish directory
- Next.js plugin configuration
- Redirect rules for SPA routing
- Security headers
- Caching rules for static assets

### Next.js Configuration

The `next.config.mjs` includes:
- Netlify-optimized output settings
- Image optimization disabled for compatibility
- Webpack configurations for assets
- Performance optimizations

## 🔍 Verification Steps

After deployment, verify:

1. **Site loads correctly**
   - Visit your Netlify site URL
   - Check that all pages load without errors

2. **3D Scene loads**
   - Verify the Spline 3D scene renders properly
   - Check browser console for any errors

3. **Audio works**
   - Test sound effects and audio features
   - Verify audio files are properly cached

4. **Responsive design**
   - Test on mobile and desktop
   - Verify touch gestures work on mobile

5. **Performance**
   - Run Lighthouse audit
   - Check Core Web Vitals

## 🐛 Troubleshooting

### Common Issues

**Build Fails:**
- Check Node.js version (should be 18+)
- Verify all dependencies are installed
- Check for TypeScript errors

**3D Scene Not Loading:**
- Verify `NEXT_PUBLIC_SPLINE_SCENE` environment variable
- Check Content Security Policy headers
- Ensure Spline domain is whitelisted

**Audio Not Working:**
- Check audio file paths in public/sounds/
- Verify MIME types are correct
- Check browser audio permissions

**Slow Loading:**
- Verify caching headers are applied
- Check image optimization settings
- Monitor bundle size

### Debug Commands

```bash
# Check build locally
npm run build

# Type check
npm run type-check

# Lint code
npm run lint

# Clean build artifacts
npm run clean

# Test Netlify build locally
netlify dev
```

## 📊 Performance Optimization

### Implemented Optimizations

1. **Caching Strategy**
   - Static assets: 1 year cache
   - Images: 1 day cache
   - Audio files: 1 day cache

2. **Security Headers**
   - CSP for XSS protection
   - Frame options for clickjacking protection
   - Content type sniffing protection

3. **Build Optimizations**
   - Tree shaking enabled
   - CSS optimization
   - Compression enabled

### Monitoring

- Use Netlify Analytics for traffic insights
- Monitor Core Web Vitals in Google Search Console
- Set up error tracking (Sentry, LogRocket, etc.)

## 🔄 Continuous Deployment

### Automatic Deployments

Netlify automatically deploys when:
- Code is pushed to the main branch
- Pull requests are created (deploy previews)
- Environment variables are updated

### Deploy Previews

- Every pull request gets a unique preview URL
- Test changes before merging to main
- Share previews with stakeholders

### Branch Deploys

- Configure branch deploys for staging environments
- Test features in isolation
- Maintain multiple environments

## 📞 Support

If you encounter issues:

1. Check Netlify build logs
2. Review browser console errors
3. Verify environment variables
4. Test build locally first
5. Contact support with specific error messages

## 🔗 Useful Links

- [Netlify Documentation](https://docs.netlify.com/)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [@netlify/plugin-nextjs](https://github.com/netlify/netlify-plugin-nextjs)
- [Netlify CLI](https://cli.netlify.com/)
