import React from 'react';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { Appointment } from '../../types';
import { formatDate, formatTime } from '../../utils/formatters';

interface AppointmentCardProps {
  appointment: Appointment;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'canceled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isUpcoming = new Date(appointment.date) > new Date();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-medium text-gray-900">
                {appointment.type}
              </h3>
              <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(appointment.status)}`}>
                {appointment.status}
              </span>
            </div>
            <div className="flex items-center mt-1 text-sm text-gray-500">
              <User className="h-4 w-4 mr-1" />
              <span>Dr. {appointment.doctorName}</span>
            </div>
          </div>
          
          <div className="mt-2 sm:mt-0 flex items-center space-x-2">
            {isUpcoming && (
              <button className="text-xs px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                Reschedule
              </button>
            )}
            <a
              href={`/appointments/${appointment.id}`}
              className="text-xs px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              Details
            </a>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-gray-400" />
            <span>{formatDate(appointment.date)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-gray-400" />
            <span>{formatTime(appointment.time)}</span>
          </div>
          <div className="flex items-center sm:col-span-2">
            <MapPin className="h-4 w-4 mr-1 text-gray-400" />
            <span>{appointment.location}</span>
          </div>
        </div>
        
        {appointment.notes && (
          <div className="mt-3 text-sm text-gray-600">
            <p className="line-clamp-1">{appointment.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;