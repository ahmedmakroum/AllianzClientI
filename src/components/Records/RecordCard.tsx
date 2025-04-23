import React from 'react';
import { FileText, Calendar, User, Download } from 'lucide-react';
import { MedicalRecord } from '../../types';
import { formatDate } from '../../utils/formatters';

interface RecordCardProps {
  record: MedicalRecord;
}

const RecordCard: React.FC<RecordCardProps> = ({ record }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
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

  // Translate status to French
  const getTranslatedStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'Terminé';
      case 'scheduled':
        return 'Planifié';
      case 'pending':
        return 'En attente';
      case 'canceled':
        return 'Annulé';
      default:
        return status;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-base font-medium text-gray-900 line-clamp-1">
                {record.title}
              </h3>
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <span>ID: {record.recordId}</span>
                <span>•</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(record.status)}`}>
                  {getTranslatedStatus(record.status)}
                </span>
              </div>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-500" title="Télécharger">
            <Download className="h-5 w-5" />
          </button>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center text-gray-500">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formatDate(record.date)}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <User className="h-4 w-4 mr-1" />
            <span>{record.doctor}</span>
          </div>
        </div>
        
        {record.description && (
          <div className="mt-3 text-sm text-gray-600 line-clamp-2">
            {record.description}
          </div>
        )}
        
        <div className="mt-4 flex justify-end">
          <a
            href={`/records/${record.id}`}
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            Voir détails
          </a>
        </div>
      </div>
    </div>
  );
};

export default RecordCard;