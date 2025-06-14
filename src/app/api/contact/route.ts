import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/mongodb';
import ContactMessage from '@/models/ContactMessage';
import axios from 'axios';

interface ValidationError {
  name: string;
  errors: Record<string, { message: string }>;
}

// Function to verify reCAPTCHA token
async function verifyRecaptcha(token: string) {
  try {
    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: token
        }
      }
    );
    
    return response.data.success;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
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
    
    // Verify reCAPTCHA
    if (!recaptchaToken) {
      return NextResponse.json(
        { success: false, message: 'reCAPTCHA-Verifizierung erforderlich' },
        { status: 400 }
      );
    }
    
    const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
    
    if (!isRecaptchaValid) {
      return NextResponse.json(
        { success: false, message: 'reCAPTCHA-Verifizierung fehlgeschlagen' },
        { status: 400 }
      );
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
