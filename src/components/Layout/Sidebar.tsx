import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, FileText, Users, ClipboardCheck, User, Settings, HelpCircle, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import allianzLogo from '../../assets/logo allianz.png';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
          isActive
            ? 'bg-blue-100 text-blue-800'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

interface NavGroupProps {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const NavGroup: React.FC<NavGroupProps> = ({ label, icon, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="mb-1">
      <button
        className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          {icon}
          <span>{label}</span>
        </div>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="pl-10 pr-3 mt-1 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
};

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  
  return (
    <aside className="hidden md:flex md:flex-col w-64 border-r border-gray-200 bg-white">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center">
          <img 
            src={allianzLogo} 
            alt="Logo Allianz" 
            className="h-10 w-auto mr-2" 
          />
          <span className="text-lg font-semibold text-blue-800">Allianz</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-1">
          <NavItem to="/dashboard" icon={<Home className="h-5 w-5" />} label="Accueil" />
          
          <NavItem to="/contrats" icon={<FileText className="h-5 w-5" />} label="Gérer Les Contrats" />
          
          <NavItem to="/adherents" icon={<Users className="h-5 w-5" />} label="Gérer Liste des Adhérents" />
          
          <NavItem to="/declarations" icon={<ClipboardCheck className="h-5 w-5" />} label="Gérer Déclaration de Maladie" />
          
          <div className="pt-4 mt-4 border-t border-gray-200">
            <NavItem to="/profile" icon={<User className="h-5 w-5" />} label="Gérer Mon Profil" />
            
            <NavItem to="/aide" icon={<HelpCircle className="h-5 w-5" />} label="Gérer Aide & Support" />
            
            {isAdmin && (
              <NavItem to="/admin" icon={<Settings className="h-5 w-5" />} label="Gérer Administration" />
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;