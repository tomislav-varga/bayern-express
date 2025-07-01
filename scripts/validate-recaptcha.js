#!/usr/bin/env node

/**
 * reCAPTCHA Configuration Validator
 * 
 * This script checks if reCAPTCHA is properly configured for production.
 * Run with: node scripts/validate-recaptcha.js
 */

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env' });

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function validateRecaptchaConfig() {
  log('🔍 Validating reCAPTCHA Configuration...', 'blue');
  log('');

  let isValid = true;
  const issues = [];

  // Check environment files
  const envPath = path.join(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) {
    issues.push('❌ .env file not found');
    isValid = false;
  } else {
    log('✅ .env file found', 'green');
  }

  // Check environment variables
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!siteKey) {
    issues.push('❌ NEXT_PUBLIC_RECAPTCHA_SITE_KEY not set');
    isValid = false;
  } else if (siteKey.includes('your_site_key_here') || siteKey.length < 10) {
    issues.push('❌ NEXT_PUBLIC_RECAPTCHA_SITE_KEY appears to be placeholder value');
    isValid = false;
  } else {
    log('✅ Site key configured', 'green');
  }

  if (!secretKey) {
    issues.push('❌ RECAPTCHA_SECRET_KEY not set');
    isValid = false;
  } else if (secretKey.includes('your_secret_key_here') || secretKey.length < 10) {
    issues.push('❌ RECAPTCHA_SECRET_KEY appears to be placeholder value');
    isValid = false;
  } else {
    log('✅ Secret key configured', 'green');
  }

  // Check key format (basic validation)
  if (siteKey && !siteKey.startsWith('6L')) {
    issues.push('⚠️  Site key format unusual (should start with "6L")');
  }

  if (secretKey && !secretKey.startsWith('6L')) {
    issues.push('⚠️  Secret key format unusual (should start with "6L")');
  }

  // Check MongoDB URI
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    issues.push('❌ MONGODB_URI not set');
    isValid = false;
  } else if (mongoUri.includes('your_mongodb_connection_string_here')) {
    issues.push('❌ MONGODB_URI appears to be placeholder value');
    isValid = false;
  } else {
    log('✅ MongoDB URI configured', 'green');
  }

  log('');
  
  if (isValid) {
    log('🎉 reCAPTCHA configuration appears to be valid!', 'green');
    log('');
    log('Next steps:', 'blue');
    log('1. Test the form in development: npm run dev');
    log('2. Build for production: npm run build');
    log('3. Deploy to your hosting platform');
    log('4. Test on your production domain');
  } else {
    log('❌ Configuration issues found:', 'red');
    log('');
    issues.forEach(issue => log(issue, 'red'));
    log('');
    log('Please fix these issues and run the validator again.', 'yellow');
    log('');
    log('For setup instructions, see: RECAPTCHA_PRODUCTION_SETUP.md', 'blue');
  }

  return isValid;
}

// Run validation
const isValid = validateRecaptchaConfig();
process.exit(isValid ? 0 : 1);
