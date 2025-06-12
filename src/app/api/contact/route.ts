import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/mongodb';
import ContactMessage from '@/models/ContactMessage';

export async function POST(request: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();
    
    // Parse the request body
    const body = await request.json();
    
    // Validate required fields
    const { name, email, phone, message } = body;
    
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { success: false, message: 'Alle Felder sind erforderlich' },
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
    
  } catch (error: any) {
    console.error('Error in contact API:', error);
    
    // Check for validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      
      return NextResponse.json(
        { success: false, message: 'Validierungsfehler', errors: validationErrors },
        { status: 400 }
      );
    }
    
    // Check for MongoDB connection errors
    if (error.name === 'MongooseError' || error.name === 'MongoError' || error.message.includes('MongoDB')) {
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
