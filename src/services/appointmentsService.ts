import { Appointment } from '../types';
import { mockAppointments } from '../data/mockData';

// In a real application, these would make API calls to your backend
export const getAllAppointments = async (): Promise<Appointment[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockAppointments;
};

export const getUserAppointments = async (userId: string): Promise<Appointment[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  // In a real app, we'd filter appointments by userId on the server
  return mockAppointments.filter(appointment => appointment.userId === userId);
};

export const getAppointmentById = async (id: string): Promise<Appointment | undefined> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockAppointments.find(appointment => appointment.id === id);
};

export const createAppointment = async (appointmentData: Partial<Appointment>): Promise<Appointment> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real app, this would be created on the server
  const newAppointment: Appointment = {
    id: `apt-${Date.now()}`,
    userId: 'user-1', // Would normally come from authenticated user
    type: appointmentData.type || '',
    date: appointmentData.date || new Date().toISOString(),
    time: appointmentData.time || '09:00',
    doctorName: appointmentData.doctorName || '',
    location: appointmentData.location || '',
    status: appointmentData.status || 'scheduled',
    notes: appointmentData.notes || '',
    createdAt: new Date().toISOString(),
  };
  
  // Add to mock data for this session
  mockAppointments.push(newAppointment);
  
  return newAppointment;
};

export const updateAppointment = async (id: string, data: Partial<Appointment>): Promise<Appointment> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const appointmentIndex = mockAppointments.findIndex(appointment => appointment.id === id);
  if (appointmentIndex === -1) {
    throw new Error('Appointment not found');
  }
  
  // Update the appointment
  mockAppointments[appointmentIndex] = {
    ...mockAppointments[appointmentIndex],
    ...data,
  };
  
  return mockAppointments[appointmentIndex];
};

export const deleteAppointment = async (id: string): Promise<void> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const appointmentIndex = mockAppointments.findIndex(appointment => appointment.id === id);
  if (appointmentIndex !== -1) {
    mockAppointments.splice(appointmentIndex, 1);
  }
};