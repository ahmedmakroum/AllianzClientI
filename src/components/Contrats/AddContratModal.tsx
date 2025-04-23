import React, { useState } from 'react';
import { X, Calendar, FileText, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// AddContratModal component props interface
interface AddContratModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddContratModal: React.FC<AddContratModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    numeroContrat: '',
    numeroPolice: '',
    dateContrat: '',
    typeContrat: 'individuel',
    dateExpiration: '',
    idAdherent: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  if (!isOpen) return null;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      // This would typically be a service call to save the contract data
      console.log('Contract data to save:', formData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Close the modal and navigate back to contracts page
      onClose();
      // Optionally refresh the contracts list or navigate back
      navigate('/contrats', { state: { refresh: true }});
    } catch (err) {
      setError('Échec de la création du contrat. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Ajouter un Nouveau Contrat</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="numeroContrat" className="block text-sm font-medium text-gray-700">
                  Numéro de Contrat *
                </label>
                <input
                  type="text"
                  id="numeroContrat"
                  name="numeroContrat"
                  value={formData.numeroContrat}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="ex. CNT-2025-1234"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="numeroPolice" className="block text-sm font-medium text-gray-700">
                  Numéro de Police *
                </label>
                <input
                  type="text"
                  id="numeroPolice"
                  name="numeroPolice"
                  value={formData.numeroPolice}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="ex. POL-12345"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="dateContrat" className="block text-sm font-medium text-gray-700">
                    Date du Contrat *
                  </label>
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="dateContrat"
                      name="dateContrat"
                      value={formData.dateContrat}
                      onChange={handleChange}
                      className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="dateExpiration" className="block text-sm font-medium text-gray-700">
                    Date d'Expiration *
                  </label>
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="dateExpiration"
                      name="dateExpiration"
                      value={formData.dateExpiration}
                      onChange={handleChange}
                      className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="typeContrat" className="block text-sm font-medium text-gray-700">
                  Type de Contrat *
                </label>
                <select
                  id="typeContrat"
                  name="typeContrat"
                  value={formData.typeContrat}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                >
                  <option value="individuel">Individuel</option>
                  <option value="groupe">Groupe</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="idAdherent" className="block text-sm font-medium text-gray-700">
                  ID Adhérent *
                </label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Users className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="idAdherent"
                    name="idAdherent"
                    value={formData.idAdherent}
                    onChange={handleChange}
                    className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="ex. ADH-10034"
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isSubmitting ? 'Enregistrement...' : 'Enregistrer le Contrat'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddContratModal;