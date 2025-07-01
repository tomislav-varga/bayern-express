import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/mongodb';
import ContactMessage from '@/models/ContactMessage';
import axios from 'axios';

interface ValidationError {
  name: string;
  errors: Record<string, { message: string }>;
}

// Function to verify reCAPTCHA token
async function verifyRecaptcha(token: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if secret key is configured
    if (!process.env.RECAPTCHA_SECRET_KEY) {
      console.error('RECAPTCHA_SECRET_KEY not configured');
      return { success: false, error: 'reCAPTCHA not properly configured' };
    }

    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: token
        },
        timeout: 5000 // 5 second timeout
      }
    );
    
    const { success, 'error-codes': errorCodes } = response.data;
    
    if (!success) {
      console.error('reCAPTCHA verification failed:', errorCodes);
      return { 
        success: false, 
        error: errorCodes?.includes('timeout-or-duplicate') 
          ? 'reCAPTCHA expired, please try again' 
          : 'reCAPTCHA verification failed'
      };
    }
    
    return { success: true };
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return { success: false, error: 'reCAPTCHA verification service unavailable' };
  }
}

export async function POST(request: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();
    
    // Parse the request body
    const body = await request.json();
    
    // Validate required fields
    const { name, email, phone, message, recaptchaToken } = body;
    
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { success: false, message: 'Alle Felder sind erforderlich' },
        { status: 400 }
      );
    }
    
    // Verify reCAPTCHA (if configured and token provided)
    const isRecaptchaConfigured = Boolean(process.env.RECAPTCHA_SECRET_KEY);
    
    if (isRecaptchaConfigured) {
      if (!recaptchaToken) {
        return NextResponse.json(
          { success: false, message: 'reCAPTCHA-Verifizierung erforderlich' },
          { status: 400 }
        );
      }

      const recaptchaResult = await verifyRecaptcha(recaptchaToken);
      
      if (!recaptchaResult.success) {
        return NextResponse.json(
          { 
            success: false, 
            message: recaptchaResult.error || 'reCAPTCHA-Verifizierung fehlgeschlagen' 
          },
          { status: 400 }
        );
      }
    } else {
      console.warn('reCAPTCHA not configured - proceeding without verification');
    }
    
    // Create a new contact message
    const contactMessage = await ContactMessage.create({
      name,
      email,
      phone,
      message
    });
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Nachricht erfolgreich gesendet',
        data: contactMessage
      },
      { status: 201 }
    );
    
  } catch (error: unknown) {
    console.error('Error in contact API:', error);
    
    // Check for validation errors
    if (
      error && 
      typeof error === 'object' && 
      'name' in error && 
      error.name === 'ValidationError' &&
      'errors' in error
    ) {
      const validationError = error as ValidationError;
      const validationErrors = Object.values(validationError.errors).map(err => err.message);
      
      return NextResponse.json(
        { success: false, message: 'Validierungsfehler', errors: validationErrors },
        { status: 400 }
      );
    }
    
    // Check for MongoDB connection errors
    if (
      error && 
      typeof error === 'object' && 
      (
        ('name' in error && (error.name === 'MongooseError' || error.name === 'MongoError')) ||
        ('message' in error && typeof error.message === 'string' && error.message.includes('MongoDB'))
      )
    ) {
      return NextResponse.json(
        { success: false, message: 'Datenbank-Verbindungsfehler. Bitte versuchen Sie es später erneut.' },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { success: false, message: 'Interner Serverfehler' },
      { status: 500 }
    );
  }
}
