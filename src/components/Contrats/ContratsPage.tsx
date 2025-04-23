import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Download, FileText, Trash2, Calendar, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import AddContratModal from './AddContratModal';

interface Contrat {
  id: string;
  numero: string;
  numeroPolice: string;
  type: string;
  dateDebut: string;
  dateFin: string;
  statut: string;
  montant: number;
  idAdherent: string;
}

const mockContrats: Contrat[] = [
  {
    id: '1',
    numero: 'CNT-2025-1234',
    numeroPolice: 'POL-6789',
    type: 'Individuel',
    dateDebut: '01/01/2025',
    dateFin: '31/12/2025',
    statut: 'Actif',
    montant: 1200.00,
    idAdherent: 'ADH-10034'
  },
  {
    id: '2',
    numero: 'CNT-2025-5678',
    numeroPolice: 'POL-3421',
    type: 'Groupe',
    dateDebut: '15/02/2025',
    dateFin: '14/02/2026',
    statut: 'Actif',
    montant: 800.00,
    idAdherent: 'ADH-10842'
  },
  {
    id: '3',
    numero: 'CNT-2024-9876',
    numeroPolice: 'POL-7752',
    type: 'Individuel',
    dateDebut: '01/05/2024',
    dateFin: '30/04/2025',
    statut: 'À renouveler',
    montant: 350.00,
    idAdherent: 'ADH-09375'
  }
];

const ContratsPage: React.FC = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [contrats, setContrats] = useState<Contrat[]>(mockContrats);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Refresh the contracts list if needed (e.g., after adding a new one)
  useEffect(() => {
    if (location.state?.refresh) {
      // In a real app, this would fetch updated data from the API
      console.log('Refreshing contracts list');
    }
  }, [location.state]);

  const filteredContrats = contrats.filter(contrat => {
    const matchesSearch = 
      contrat.numero.toLowerCase().includes(searchTerm.toLowerCase()) || 
      contrat.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contrat.numeroPolice.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || contrat.statut.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'actif':
        return 'bg-green-100 text-green-800';
      case 'à renouveler':
        return 'bg-orange-100 text-orange-800';
      case 'expiré':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDeleteContrat = (id: string) => {
    // In a real app, this would be an API call
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce contrat ?')) {
      setContrats(contrats.filter(contrat => contrat.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Les Contrats</h1>
          <p className="text-gray-600">Consultez et gérez tous vos contrats d'assurance</p>
        </div>
        
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="mt-3 sm:mt-0 flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Plus className="h-4 w-4 mr-1" />
          Nouveau Contrat
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-md border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Rechercher des contrats..."
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full rounded-md border-gray-300 pl-10 pr-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="all">Tous les statuts</option>
              <option value="actif">Actif</option>
              <option value="à renouveler">À renouveler</option>
              <option value="expiré">Expiré</option>
            </select>
          </div>
        </div>
      </div>
      
      {filteredContrats.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 mb-4">
            <FileText className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">Aucun contrat trouvé</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || statusFilter !== 'all' 
              ? 'Essayez de modifier vos critères de recherche' 
              : 'Vous n\'avez pas encore de contrats enregistrés'}
          </p>
          {!searchTerm && statusFilter === 'all' && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="mt-4 inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-1" />
              Ajouter un Contrat
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <ul className="divide-y divide-gray-200">
            {filteredContrats.map((contrat) => (
              <li key={contrat.id} className="hover:bg-gray-50">
                <div className="px-4 py-5 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-blue-600">{contrat.numero}</h3>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Police: {contrat.numeroPolice} | Type: {contrat.type}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(contrat.statut)}`}>
                        {contrat.statut}
                      </span>
                      <button 
                        className="text-gray-400 hover:text-gray-500"
                        title="Télécharger le contrat"
                      >
                        <Download className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteContrat(contrat.id)}
                        className="text-red-500 hover:text-red-700"
                        title="Supprimer le contrat"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      <span>Validité: {contrat.dateDebut} - {contrat.dateFin}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="h-4 w-4 mr-2 text-gray-400" />
                      <span>ID Adhérent: {contrat.idAdherent}</span>
                    </div>
                    <div className="flex items-center text-sm font-medium text-gray-900 justify-end md:justify-start">
                      {contrat.montant.toFixed(2)} €/an
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <a href={`/contrats/${contrat.id}`} className="text-sm font-medium text-blue-600 hover:text-blue-500">
                      Voir les détails →
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {isAddModalOpen && (
        <AddContratModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ContratsPage;