import React from 'react';
import { FileText, Users, ClipboardCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import allianzLogo from '../../assets/logo allianz.png';

const DashboardPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 text-center">
        <img 
          src={allianzLogo} 
          alt="Logo Allianz" 
          className="h-20 w-auto mx-auto mb-4" 
        />
        <h1 className="text-3xl font-bold text-blue-900">Bienvenue sur Allianz</h1>
        <p className="text-gray-600 mt-2">Gérez vos contrats et services d'assurance en toute simplicité</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        {/* Contrats Feature */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
          <div className="bg-blue-600 p-6 flex justify-center">
            <FileText className="h-16 w-16 text-white" />
          </div>
          <div className="p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Les Contrats</h3>
            <p className="text-gray-600 mb-4">Consultez et gérez tous vos contrats d'assurance</p>
            <Link 
              to="/contrats" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
            >
              Voir les Contrats
            </Link>
          </div>
        </div>

        {/* Adherents Feature */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
          <div className="bg-green-600 p-6 flex justify-center">
            <Users className="h-16 w-16 text-white" />
          </div>
          <div className="p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Liste des Adhérents</h3>
            <p className="text-gray-600 mb-4">Gérez les informations de tous vos adhérents</p>
            <Link 
              to="/adherents" 
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition duration-300"
            >
              Voir les Adhérents
            </Link>
          </div>
        </div>

        {/* Declarations Feature */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
          <div className="bg-amber-600 p-6 flex justify-center">
            <ClipboardCheck className="h-16 w-16 text-white" />
          </div>
          <div className="p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Déclaration de Maladie</h3>
            <p className="text-gray-600 mb-4">Déclarez et suivez vos dossiers de maladie</p>
            <Link 
              to="/declarations" 
              className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-700 transition duration-300"
            >
              Faire une Déclaration
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-gray-50 rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Dernières Actualités</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-medium text-gray-900">Nouveaux avantages pour les adhérents</h3>
            <p className="text-gray-600 text-sm">23 avril 2025</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-medium text-gray-900">Mise à jour des conditions générales</h3>
            <p className="text-gray-600 text-sm">15 avril 2025</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-medium text-gray-900">Nouveau service d'assistance 24/7</h3>
            <p className="text-gray-600 text-sm">5 avril 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;