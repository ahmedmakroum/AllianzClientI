import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Download, FileText, Trash2, Calendar, User, FileClock, ClipboardCheck } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AddDeclarationModal from './AddDeclarationModal';

interface Declaration {
  id: string;
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

const mockDeclarations: Declaration[] = [
  {
    id: '1',
    numeroReference: 'REF-2025-1234',
    numeroPolice: 'POL-6789',
    codeAdherent: 'CODE-A123',
    dateMaladie: '2025-03-15',
    dateDossier: '2025-03-20',
    dateEtat: '2025-03-22',
    dateSaisie: '2025-03-22',
    heureSaisie: '10:30',
    nomMaladie: 'Grippe',
    numSinistre: 'SIN-2025-001',
    numAdherent: 'ADH-10034',
    statut: 'En cours'
  },
  {
    id: '2',
    numeroReference: 'REF-2025-5678',
    numeroPolice: 'POL-3421',
    codeAdherent: 'CODE-B456',
    dateMaladie: '2025-02-10',
    dateDossier: '2025-02-15',
    dateEtat: '2025-03-01',
    dateSaisie: '2025-02-15',
    heureSaisie: '14:15',
    nomMaladie: 'Entorse cheville',
    numSinistre: 'SIN-2025-002',
    numAdherent: 'ADH-10842',
    statut: 'Remboursé'
  },
  {
    id: '3',
    numeroReference: 'REF-2025-9012',
    numeroPolice: 'POL-7752',
    codeAdherent: 'CODE-C789',
    dateMaladie: '2025-04-05',
    dateDossier: '2025-04-06',
    dateEtat: '2025-04-10',
    dateSaisie: '2025-04-06',
    heureSaisie: '09:45',
    nomMaladie: 'Angine',
    numSinistre: 'SIN-2025-003',
    numAdherent: 'ADH-09375',
    statut: 'En attente'
  }
];

const DeclarationsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [declarations, setDeclarations] = useState<Declaration[]>(mockDeclarations);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: location.pathname } });
    }
  }, [user, navigate, location.pathname]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  const handleAddDeclaration = (newDeclaration: Omit<Declaration, 'id'>) => {
    const id = (declarations.length + 1).toString();
    setDeclarations([...declarations, { ...newDeclaration, id }]);
    setIsAddModalOpen(false);
  };

  const handleDeleteDeclaration = (id: string) => {
    setDeclarations(declarations.filter(declaration => declaration.id !== id));
  };

  const filteredDeclarations = declarations.filter(declaration => {
    const matchesSearch = declaration.numeroReference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      declaration.numAdherent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      declaration.nomMaladie.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = statusFilter === 'all' || declaration.statut === statusFilter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Déclarations</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} />
          Ajouter une déclaration
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher par numéro, adhérent ou maladie..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter size={18} className="text-gray-400" />
            </div>
            <select
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              value={statusFilter}
              onChange={handleFilterChange}
            >
              <option value="all">Tous les statuts</option>
              <option value="En cours">En cours</option>
              <option value="En attente">En attente</option>
              <option value="Remboursé">Remboursé</option>
              <option value="Rejeté">Rejeté</option>
            </select>
          </div>
          
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2">
            <Download size={18} />
            Exporter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Référence</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Police</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adhérent</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Maladie</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Maladie</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDeclarations.length > 0 ? (
                filteredDeclarations.map((declaration) => (
                  <tr key={declaration.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText size={18} className="text-blue-500 mr-2" />
                        <span className="text-sm font-medium text-gray-900">{declaration.numeroReference}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{declaration.numeroPolice}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User size={18} className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{declaration.numAdherent}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{declaration.nomMaladie}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar size={18} className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-500">{declaration.dateMaladie}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        declaration.statut === 'En cours' ? 'bg-yellow-100 text-yellow-800' :
                        declaration.statut === 'Remboursé' ? 'bg-green-100 text-green-800' :
                        declaration.statut === 'En attente' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {declaration.statut}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-indigo-600 hover:text-indigo-900">
                          <FileClock size={18} />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <ClipboardCheck size={18} />
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDeleteDeclaration(declaration.id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                    Aucune déclaration trouvée
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {isAddModalOpen && (
        <AddDeclarationModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddDeclaration}
        />
      )}
    </div>
  );
};

export default DeclarationsPage;