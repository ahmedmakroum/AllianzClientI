import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, MapPin, Edit2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dateOfBirth: user?.dateOfBirth || '',
    address: user?.address || '',
    emergencyContact: user?.emergencyContact || '',
    bloodType: user?.bloodType || '',
    allergies: user?.allergies || '',
    medications: user?.medications || '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update user profile
    setIsEditing(false);
  };
  
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>
        <p className="text-gray-600">View and manage your personal information</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 bg-blue-600 h-32 relative"></div>
        
        <div className="px-4 py-5 sm:px-6 -mt-16 sm:flex sm:items-end">
          <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100 border-4 border-white flex items-center justify-center">
            <User className="h-12 w-12 text-gray-400" />
          </div>
          
          <div className="mt-4 sm:mt-0 sm:ml-4 flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                  {user?.name}
                </h2>
                <p className="text-sm text-gray-500">
                  Employee ID: {user?.id || 'EMP-12345'}
                </p>
              </div>
              
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <Edit2 className="h-4 w-4 mr-1" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-4 sm:p-6 border-t border-gray-200">
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                    Personal Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                    Medical Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700">
                        Emergency Contact
                      </label>
                      <input
                        type="text"
                        name="emergencyContact"
                        id="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700">
                        Blood Type
                      </label>
                      <select
                        name="bloodType"
                        id="bloodType"
                        value={formData.bloodType}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      >
                        <option value="">Select Blood Type</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">
                        Allergies
                      </label>
                      <textarea
                        name="allergies"
                        id="allergies"
                        rows={3}
                        value={formData.allergies}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="List any allergies"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="medications" className="block text-sm font-medium text-gray-700">
                        Current Medications
                      </label>
                      <textarea
                        name="medications"
                        id="medications"
                        rows={3}
                        value={formData.medications}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="List any current medications"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                  Personal Information
                </h3>
                
                <dl className="space-y-3">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-gray-400">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="ml-3 text-sm">
                      <dt className="text-gray-500">Full Name</dt>
                      <dd className="font-medium text-gray-900">John Doe</dd>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-gray-400">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div className="ml-3 text-sm">
                      <dt className="text-gray-500">Email</dt>
                      <dd className="font-medium text-gray-900">john.doe@example.com</dd>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-gray-400">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div className="ml-3 text-sm">
                      <dt className="text-gray-500">Phone</dt>
                      <dd className="font-medium text-gray-900">+1 (555) 123-4567</dd>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-gray-400">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div className="ml-3 text-sm">
                      <dt className="text-gray-500">Date of Birth</dt>
                      <dd className="font-medium text-gray-900">January 15, 1980</dd>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-gray-400">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div className="ml-3 text-sm">
                      <dt className="text-gray-500">Address</dt>
                      <dd className="font-medium text-gray-900">123 Main St, Anytown, CA 12345</dd>
                    </div>
                  </div>
                </dl>
              </div>
              
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                  Medical Information
                </h3>
                
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Emergency Contact</dt>
                    <dd className="mt-1 text-sm text-gray-900">Jane Doe - +1 (555) 987-6543</dd>
                  </div>
                  
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Blood Type</dt>
                    <dd className="mt-1 text-sm text-gray-900">O+</dd>
                  </div>
                  
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Allergies</dt>
                    <dd className="mt-1 text-sm text-gray-900">Penicillin, Peanuts</dd>
                  </div>
                  
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Current Medications</dt>
                    <dd className="mt-1 text-sm text-gray-900">Lisinopril 10mg, Atorvastatin 20mg</dd>
                  </div>
                </dl>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;