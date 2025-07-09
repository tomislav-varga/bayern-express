# reCAPTCHA Production Setup Checklist

## Prerequisites
- [ ] Google account
- [ ] Production domain ready
- [ ] Hosting environment with environment variables support

## Setup Steps

### 1. Configure reCAPTCHA in Google Console
- [ ] Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
- [ ] Create new site or update existing one
- [ ] Set label: "Bayern Express Production"
- [ ] Choose reCAPTCHA v2 ("I'm not a robot" checkbox)
- [ ] Add production domains:
  - [ ] `your-domain.com`
  - [ ] `www.your-domain.com`
  - [ ] `localhost` (for development)
- [ ] Accept Terms of Service
- [ ] Copy Site Key and Secret Key

### 2. Environment Variables
- [ ] Update `.env` with actual keys:
  ```
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lc...your_actual_site_key
  RECAPTCHA_SECRET_KEY=6Lc...your_actual_secret_key
  MONGODB_URI=your_mongodb_connection_string
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
  ```

### 3. Deployment Environment
- [ ] Set environment variables in your hosting platform:
  - **Vercel**: Project Settings → Environment Variables
  - **Netlify**: Site Settings → Environment Variables
  - **Railway**: Variables tab
  - **AWS/DigitalOcean**: Configure in deployment settings

### 4. Testing
- [ ] Test in development environment
- [ ] Test form submission with reCAPTCHA
- [ ] Test form submission without reCAPTCHA (should show warning)
- [ ] Test in production environment
- [ ] Verify reCAPTCHA works on all domains
- [ ] Check browser console for errors

### 5. Security Best Practices
- [ ] Never commit secret keys to git
- [ ] Use different keys for development and production
- [ ] Monitor reCAPTCHA usage in Google Console
- [ ] Set up alerts for unusual activity

## Environment Variables Required

### Frontend (NEXT_PUBLIC_* are exposed to browser)
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`: Your reCAPTCHA site key

### Backend (Server-side only)
- `RECAPTCHA_SECRET_KEY`: Your reCAPTCHA secret key
- `MONGODB_URI`: Your MongoDB connection string

## Troubleshooting

### Common Issues
1. **"reCAPTCHA not configured" warning**
   - Check if `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is set
   - Ensure environment variables are properly loaded

2. **reCAPTCHA verification failed**
   - Verify `RECAPTCHA_SECRET_KEY` is correct
   - Check if domain is added to reCAPTCHA site settings
   - Ensure no extra spaces in environment variables

3. **Form submits without reCAPTCHA**
   - Check browser console for JavaScript errors
   - Verify site key is correct
   - Check if domain is whitelisted

### Debug Steps
1. Check environment variables in browser (only NEXT_PUBLIC_* should be visible)
2. Check server logs for reCAPTCHA verification errors
3. Test with different browsers
4. Verify network requests in browser dev tools

## Production Deployment Commands

```bash
# Build the application
npm run build

# Start production server
npm run start

# Or deploy to your hosting platform
# Vercel: vercel --prod
# Netlify: netlify deploy --prod
```

## Monitoring
- Monitor reCAPTCHA usage in [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
- Set up logging for failed reCAPTCHA attempts
- Monitor form submission success rates
