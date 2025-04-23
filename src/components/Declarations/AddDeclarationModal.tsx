import React, { useState, useEffect } from 'react';
import { X, Calendar, ClipboardCheck, Clock, User, FileText } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

// Modified interface to match the one in DeclarationsPage (without id)
export interface Declaration {
  numeroReference: string;
  numeroPolice: string;
  codeAdherent: string;
  dateMaladie: string;
  dateDossier: string;
  dateEtat: string;
  dateSaisie: string;
  heureSaisie: string;
  nomMaladie: string;
  numSinistre: string;
  numAdherent: string;
  statut: string;
}

interface AddDeclarationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd?: (declaration: Declaration) => void;
}

const AddDeclarationModal: React.FC<AddDeclarationModalProps> = ({ isOpen, onClose, onAdd }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Declaration>({
    numeroReference: '',
    numeroPolice: '',
    codeAdherent: '',
    dateMaladie: '',
    dateDossier: '',
    dateEtat: '',
    dateSaisie: new Date().toISOString().split('T')[0],
    heureSaisie: new Date().toTimeString().slice(0, 5),
    nomMaladie: '',
    numSinistre: '',
    numAdherent: '',
    statut: 'En attente'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // Check authentication on mount and when user changes
  useEffect(() => {
    if (!user && isOpen) {
      setError('Vous devez être connecté pour soumettre une déclaration');
    } else {
      setError('');
    }
  }, [user, isOpen]);
  
  if (!isOpen) return null;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is logged in and redirect if not logged in
    if (!user) {
      setError('Vous devez être connecté pour soumettre une déclaration');
      // Store form data in session storage before redirecting
      sessionStorage.setItem('pendingDeclarationData', JSON.stringify(formData));
      // Redirect to login page with return path
      navigate('/login', { state: { from: '/declarations', pendingAction: 'declaration' } });
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    try {
      // This would typically be a service call to save the declaration data
      console.log('Declaration data to save:', formData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Call the success callback if provided, passing the declaration data
      if (onAdd) {
        onAdd(formData);
      }
      
      // Close the modal after successful submission
      onClose();
    } catch (err) {
      console.error('Error submitting declaration:', err);
      setError('Échec de la création de la déclaration. Veuillez réessayer.');
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
            <h3 className="text-lg font-medium text-gray-900">Nouvelle Déclaration de Maladie</h3>
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
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="numeroReference" className="block text-sm font-medium text-gray-700">
                  Numéro de Référence *
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="numeroReference"
                    name="numeroReference"
                    value={formData.numeroReference}
                    onChange={handleChange}
                    className="focus:ring-amber-500 focus:border-amber-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="ex. REF-2025-1234"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="numeroPolice" className="block text-sm font-medium text-gray-700">
                  Numéro de Police *
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="numeroPolice"
                    name="numeroPolice"
                    value={formData.numeroPolice}
                    onChange={handleChange}
                    className="focus:ring-amber-500 focus:border-amber-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="ex. POL-6789"
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="numAdherent" className="block text-sm font-medium text-gray-700">
                  Numéro Adhérent *
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="numAdherent"
                    name="numAdherent"
                    value={formData.numAdherent}
                    onChange={handleChange}
                    className="focus:ring-amber-500 focus:border-amber-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="ex. ADH-10034"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="codeAdherent" className="block text-sm font-medium text-gray-700">
                  Code Adhérent *
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="codeAdherent"
                    name="codeAdherent"
                    value={formData.codeAdherent}
                    onChange={handleChange}
                    className="focus:ring-amber-500 focus:border-amber-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="ex. CODE-1234"
                    required
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="nomMaladie" className="block text-sm font-medium text-gray-700">
                Nom de la Maladie *
              </label>
              <input
                type="text"
                id="nomMaladie"
                name="nomMaladie"
                value={formData.nomMaladie}
                onChange={handleChange}
                className="mt-1 focus:ring-amber-500 focus:border-amber-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="ex. Grippe, Entorse, etc."
                required
              />
            </div>

            <div>
              <label htmlFor="statut" className="block text-sm font-medium text-gray-700">
                Statut *
              </label>
              <select
                id="statut"
                name="statut"
                value={formData.statut}
                onChange={handleChange}
                className="mt-1 focus:ring-amber-500 focus:border-amber-500 block w-full sm:text-sm border-gray-300 rounded-md"
                required
              >
                <option value="">Sélectionner un statut</option>
                <option value="En attente">En attente</option>
                <option value="En cours">En cours</option>
                <option value="Terminé">Terminé</option>
                <option value="Rejeté">Rejeté</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="numSinistre" className="block text-sm font-medium text-gray-700">
                Numéro de Sinistre
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <ClipboardCheck className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="numSinistre"
                  name="numSinistre"
                  value={formData.numSinistre}
                  onChange={handleChange}
                  className="focus:ring-amber-500 focus:border-amber-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="ex. SIN-2025-4321"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="dateMaladie" className="block text-sm font-medium text-gray-700">
                  Date de la Maladie *
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="dateMaladie"
                    name="dateMaladie"
                    value={formData.dateMaladie}
                    onChange={handleChange}
                    className="focus:ring-amber-500 focus:border-amber-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="dateDossier" className="block text-sm font-medium text-gray-700">
                  Date du Dossier *
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="dateDossier"
                    name="dateDossier"
                    value={formData.dateDossier}
                    onChange={handleChange}
                    className="focus:ring-amber-500 focus:border-amber-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="dateEtat" className="block text-sm font-medium text-gray-700">
                  Date d'État
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="dateEtat"
                    name="dateEtat"
                    value={formData.dateEtat}
                    onChange={handleChange}
                    className="focus:ring-amber-500 focus:border-amber-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="dateSaisie" className="block text-sm font-medium text-gray-700">
                  Date de Saisie
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="dateSaisie"
                    name="dateSaisie"
                    value={formData.dateSaisie}
                    onChange={handleChange}
                    className="focus:ring-amber-500 focus:border-amber-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    readOnly
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="heureSaisie" className="block text-sm font-medium text-gray-700">
                Heure de Saisie
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="time"
                  id="heureSaisie"
                  name="heureSaisie"
                  value={formData.heureSaisie}
                  onChange={handleChange}
                  className="focus:ring-amber-500 focus:border-amber-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  readOnly
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                  isSubmitting ? 'bg-amber-400' : 'bg-amber-600 hover:bg-amber-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500`}
              >
                {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDeclarationModal;