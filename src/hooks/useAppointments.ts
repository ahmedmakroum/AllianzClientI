import { useState, useEffect } from 'react';
import { Appointment } from '../types';
import { getAllAppointments, getUserAppointments } from '../services/appointmentsService';
import { useAuth } from '../contexts/AuthContext';

export const useAppointments = (userId?: string) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  
  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        let fetchedAppointments;
        
        if (user?.role === 'admin' || user?.role === 'hr') {
          // If admin or HR, get all appointments or filtered by userId if provided
          fetchedAppointments = userId 
            ? await getUserAppointments(userId) 
            : await getAllAppointments();
        } else {
          // Regular employees can only see their own appointments
          fetchedAppointments = await getUserAppointments(user?.id || '');
        }
        
        setAppointments(fetchedAppointments);
      } catch (err) {
        setError('Failed to load appointments');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (user) {
      fetchAppointments();
    }
  }, [user, userId]);
  
  return { appointments, isLoading, error };
};