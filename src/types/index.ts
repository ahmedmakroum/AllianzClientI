export interface User {
  id: string;
  name: string;
  email: string;
  role?: 'admin' | 'hr' | 'employee';
  phone?: string;
  dateOfBirth?: string;
  address?: string;
  emergencyContact?: string;
  bloodType?: string;
  allergies?: string;
  medications?: string;
  password?: string;
  createdAt: string;
}

export interface MedicalRecord {
  id: string;
  userId: string;
  recordId: string;
  title: string;
  date: string;
  doctor: string;
  status: string;
  description?: string;
  documentUrls?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Appointment {
  id: string;
  userId: string;
  type: string;
  date: string;
  time: string;
  doctorName: string;
  location: string;
  status: string;
  notes?: string;
  createdAt: string;
}