import { MedicalRecord } from '../types';
import { mockRecords } from '../data/mockData';

// In a real application, these would make API calls to your backend
export const getAllRecords = async (): Promise<MedicalRecord[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockRecords;
};

export const getUserRecords = async (userId: string): Promise<MedicalRecord[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  // In a real app, we'd filter records by userId on the server
  return mockRecords.filter(record => record.userId === userId);
};

export const getRecordById = async (id: string): Promise<MedicalRecord | undefined> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockRecords.find(record => record.id === id);
};

export const createRecord = async (recordData: Partial<MedicalRecord>): Promise<MedicalRecord> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real app, this would be created on the server
  const newRecord: MedicalRecord = {
    id: `rec-${Date.now()}`,
    userId: 'user-1', // Would normally come from authenticated user
    title: recordData.title || '',
    doctor: recordData.doctor || '',
    date: recordData.date || new Date().toISOString(),
    status: recordData.status || 'pending',
    recordId: recordData.recordId || `REC-${Math.floor(100000 + Math.random() * 900000)}`,
    description: recordData.description || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  // Add to mock data for this session
  mockRecords.push(newRecord);
  
  return newRecord;
};

export const updateRecord = async (id: string, data: Partial<MedicalRecord>): Promise<MedicalRecord> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const recordIndex = mockRecords.findIndex(record => record.id === id);
  if (recordIndex === -1) {
    throw new Error('Record not found');
  }
  
  // Update the record
  mockRecords[recordIndex] = {
    ...mockRecords[recordIndex],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  
  return mockRecords[recordIndex];
};

export const deleteRecord = async (id: string): Promise<void> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const recordIndex = mockRecords.findIndex(record => record.id === id);
  if (recordIndex !== -1) {
    mockRecords.splice(recordIndex, 1);
  }
};