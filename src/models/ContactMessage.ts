import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for ContactMessage document
export interface IContactMessage extends Document {
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: Date;
}

// Define the schema for ContactMessage
const ContactMessageSchema = new Schema<IContactMessage>({
  name: {
    type: String,
    required: [true, 'Name ist erforderlich'],
    trim: true,
    maxlength: [100, 'Name darf nicht länger als 100 Zeichen sein']
  },
  email: {
    type: String,
    required: [true, 'E-Mail ist erforderlich'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Bitte geben Sie eine gültige E-Mail-Adresse ein']
  },
  phone: {
    type: String,
    required: [true, 'Telefonnummer ist erforderlich'],
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Nachricht ist erforderlich'],
    trim: true,
    maxlength: [1000, 'Nachricht darf nicht länger als 1000 Zeichen sein']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create and export the model
// Using mongoose.models to check if the model already exists (for Next.js hot reloading)
// Specify the collection name 'contactmessages' as the third parameter
export default mongoose.models.ContactMessage || 
  mongoose.model<IContactMessage>('ContactMessage', ContactMessageSchema, 'contactmessages');
