import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, User, Mail, Phone, Trash2, Calendar, MapPin, CreditCard } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import AddAdherentModal from './AddAdherentModal';

interface Adherent {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  dateNaissance: string;
  dateAdhesion: string;
  adresse: string;
  rib: string;
  statut: string;
  numeroAdherent: string;
}

const mockAdherents: Adherent[] = [
  {
    id: '1',
    nom: 'Dubois',
    prenom: 'Marie',
    email: 'marie.dubois@example.com',
    telephone: '06 12 34 56 78',
    dateNaissance: '15/05/1985',
    dateAdhesion: '15/01/2023',
    adresse: '25 rue de la Paix, 75008 Paris',
    rib: 'FR76 3000 4000 0300 0000 1234 567',
    statut: 'Actif',
    numeroAdherent: 'ADH-10034'
  },
  {
    id: '2',
    nom: 'Martin',
    prenom: 'Jean',
    email: 'jean.martin@example.com',
    telephone: '07 23 45 67 89',
    dateNaissance: '22/11/1978',
    dateAdhesion: '03/05/2024',
    adresse: '5 avenue des Lilas, 69006 Lyon',
    rib: 'FR76 3000 4000 0300 0000 5678 901',
    statut: 'Actif',
    numeroAdherent: 'ADH-10842'
  },
  {
    id: '3',
    nom: 'Lambert',
    prenom: 'Sophie',
    email: 'sophie.lambert@example.com',
    telephone: '06 98 76 54 32',
    dateNaissance: '08/03/1990',
    dateAdhesion: '22/11/2022',
    adresse: '12 boulevard Victor Hugo, 33000 Bordeaux',
    rib: 'FR76 3000 4000 0300 0000 8765 432',
    statut: 'Inactif',
    numeroAdherent: 'ADH-09375'
  },
  {
    id: '4',
    nom: 'Petit',
    prenom: 'Thomas',
    email: 'thomas.petit@example.com',
    telephone: '07 65 43 21 09',
    dateNaissance: '30/09/1982',
    dateAdhesion: '08/07/2024',
    adresse: '42 rue du Commerce, 44000 Nantes',
    rib: 'FR76 3000 4000 0300 0000 4321 098',
    statut: 'En attente',
    numeroAdherent: 'ADH-11205'
  }
];

const AdherentsPage: React.FC = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [adherents, setAdherents] = useState<Adherent[]>(mockAdherents);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Refresh the adherents list if needed (e.g., after adding a new one)
  useEffect(() => {
    if (location.state?.refresh) {
      // In a real app, this would fetch updated data from the API
      console.log('Refreshing adherents list');
    }
  }, [location.state]);

  const filteredAdherents = adherents.filter(adherent => {
    const matchesSearch = 
      adherent.nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
      adherent.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      adherent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      adherent.numeroAdherent.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || adherent.statut.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'actif':
        return 'bg-green-100 text-green-800';
      case 'inactif':
        return 'bg-red-100 text-red-800';
      case 'en attente':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDeleteAdherent = (id: string) => {
    // In a real app, this would be an API call
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet adhérent ?')) {
      setAdherents(adherents.filter(adherent => adherent.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Liste des Adhérents</h1>
          <p className="text-gray-600">Consultez et gérez les informations des adhérents</p>
        </div>
        
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="mt-3 sm:mt-0 flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          <Plus className="h-4 w-4 mr-1" />
          Nouvel Adhérent
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
              className="block w-full rounded-md border-gray-300 pl-10 focus:border-green-500 focus:ring-green-500 sm:text-sm"
              placeholder="Rechercher par nom, email ou numéro..."
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full rounded-md border-gray-300 pl-10 pr-10 focus:border-green-500 focus:ring-green-500 sm:text-sm"
            >
              <option value="all">Tous les statuts</option>
              <option value="actif">Actif</option>
              <option value="inactif">Inactif</option>
              <option value="en attente">En attente</option>
            </select>
          </div>
        </div>
      </div>
      
      {filteredAdherents.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-100 mb-4">
            <User className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">Aucun adhérent trouvé</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || statusFilter !== 'all' 
              ? 'Essayez de modifier vos critères de recherche' 
              : 'Vous n\'avez pas encore d\'adhérents enregistrés'}
          </p>
          {!searchTerm && statusFilter === 'all' && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="mt-4 inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700"
            >
              <Plus className="h-4 w-4 mr-1" />
              Ajouter un Adhérent
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <ul className="divide-y divide-gray-200">
            {filteredAdherents.map((adherent) => (
              <li key={adherent.id} className="hover:bg-gray-50">
                <div className="px-4 py-5 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold text-lg">
                        {adherent.prenom.charAt(0)}{adherent.nom.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          {adherent.prenom} {adherent.nom}
                        </h3>
                        <p className="text-sm text-gray-500">
                          N° Adhérent: {adherent.numeroAdherent} | Adhésion: {adherent.dateAdhesion}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(adherent.statut)}`}>
                        {adherent.statut}
                      </span>
                      <button 
                        onClick={() => handleDeleteAdherent(adherent.id)}
                        className="text-red-500 hover:text-red-700"
                        title="Supprimer l'adhérent"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{adherent.email}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{adherent.telephone}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        <span>Né(e) le: {adherent.dateNaissance}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-start text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                        <span>{adherent.adresse}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <CreditCard className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="font-mono">{adherent.rib}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <a 
                      href={`/adherents/${adherent.id}`}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Voir la fiche complète
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {isAddModalOpen && (
        <AddAdherentModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AdherentsPage;