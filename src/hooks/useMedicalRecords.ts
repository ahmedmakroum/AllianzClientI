import { useState, useEffect } from 'react';
import { MedicalRecord } from '../types';
import { getAllRecords, getUserRecords } from '../services/recordsService';
import { useAuth } from '../contexts/AuthContext';

export const useMedicalRecords = (userId?: string) => {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  
  useEffect(() => {
    const fetchRecords = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        let fetchedRecords;
        
        if (user?.role === 'admin' || user?.role === 'hr') {
          // If admin or HR, get all records or filtered by userId if provided
          fetchedRecords = userId 
            ? await getUserRecords(userId) 
            : await getAllRecords();
        } else {
          // Regular employees can only see their own records
          fetchedRecords = await getUserRecords(user?.id || '');
        }
        
        setRecords(fetchedRecords);
      } catch (err) {
        setError('Failed to load medical records');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (user) {
      fetchRecords();
    }
  }, [user, userId]);
  
  return { records, isLoading, error };
};