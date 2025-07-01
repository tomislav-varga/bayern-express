#!/usr/bin/env node

/**
 * reCAPTCHA Debug Script
 * 
 * This script helps debug reCAPTCHA configuration issues
 */

import dotenv from 'dotenv';
import fetch from 'node-fetch';

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

async function debugRecaptcha() {
  log('🔍 Debugging reCAPTCHA Configuration...', 'blue');
  log('');

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  // Check keys format
  log('📋 Key Analysis:', 'blue');
  log(`Site Key: ${siteKey}`);
  log(`Secret Key: ${secretKey?.substring(0, 10)}...`);
  log('');

  // Analyze key patterns
  if (siteKey && secretKey) {
    const siteKeyPrefix = siteKey.substring(0, 8);
    const secretKeyPrefix = secretKey.substring(0, 8);
    
    log('🔍 Key Pattern Analysis:', 'blue');
    log(`Site Key Prefix: ${siteKeyPrefix}`);
    log(`Secret Key Prefix: ${secretKeyPrefix}`);
    
    if (siteKeyPrefix === secretKeyPrefix) {
      log('ℹ️  Both keys share the same prefix - this is normal for reCAPTCHA v2', 'blue');
      log('   Site and secret keys from the same reCAPTCHA site have matching prefixes.', 'blue');
    }
    
    // Check if keys start with reCAPTCHA pattern (should start with 6L)
    if (!siteKey.startsWith('6L')) {
      log('⚠️  Site key doesn\'t start with reCAPTCHA pattern (6L)', 'yellow');
    } else {
      log('✅ Site key has valid reCAPTCHA pattern', 'green');
    }
    
    if (!secretKey.startsWith('6L')) {
      log('⚠️  Secret key doesn\'t start with reCAPTCHA pattern (6L)', 'yellow');
    } else {
      log('✅ Secret key has valid reCAPTCHA pattern', 'green');
    }
    
    log('');
  }

  // Test a dummy verification to see the exact error
  log('🧪 Testing reCAPTCHA Verification (with dummy token)...', 'blue');
  
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: 'dummy-token-for-testing'
      })
    });
    
    const result = await response.json();
    
    log('📝 Google reCAPTCHA API Response:', 'blue');
    console.log(JSON.stringify(result, null, 2));
    
    if (result['error-codes']) {
      log('');
      log('❌ Error Codes Detected:', 'red');
      result['error-codes'].forEach(error => {
        log(`   - ${error}`, 'red');
        
        // Provide specific guidance for each error
        switch(error) {
          case 'invalid-input-secret':
            log('     → The secret key is invalid', 'yellow');
            break;
          case 'missing-input-secret':
            log('     → The secret key is missing', 'yellow');
            break;
          case 'invalid-keys':
            log('     → The key pair is invalid', 'yellow');
            break;
          case 'timeout-or-duplicate':
            log('     → The response is no longer valid (expected for dummy token)', 'green');
            break;
          case 'missing-input-response':
            log('     → The response parameter is missing (expected for dummy token)', 'green');
            break;
          case 'invalid-input-response':
            log('     → The response parameter is invalid (expected for dummy token)', 'green');
            break;
        }
      });
    } else {
      log('✅ No error codes - secret key is valid!', 'green');
    }
    
  } catch (error) {
    log('❌ Error testing reCAPTCHA:', 'red');
    console.error(error);
  }
  
  log('');
  log('💡 Next Steps:', 'blue');
  log('1. Check your reCAPTCHA admin console: https://www.google.com/recaptcha/admin');
  log('2. Verify you\'re using the correct key pair');
  log('3. Ensure the keys are for reCAPTCHA v2 (checkbox)');
  log('4. Add localhost to your domain list in reCAPTCHA settings');
  log('5. Consider creating new keys if current ones are problematic');
}

// Run debug
debugRecaptcha().catch(console.error);
