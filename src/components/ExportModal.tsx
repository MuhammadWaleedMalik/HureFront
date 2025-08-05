import React from 'react';
import { Download, X, Users, Mail } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExportUsers: () => void;
  onExportLeads: () => void;
  usersCount: number;
  leadsCount: number;
}

const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  onExportUsers,
  onExportLeads,
  usersCount,
  leadsCount
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeInUp">
      <div className="glass-effect rounded-xl max-w-md w-full shadow-2xl animate-scaleIn">
        <div className="p-6 border-b border-white/20">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
              Export Data
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-all duration-300 hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <p className="text-gray-600 animate-fadeInUp">Choose what data you'd like to export:</p>
          
          <div className="space-y-3">
            <button
              onClick={() => {
                onExportUsers();
                onClose();
              }}
              className="w-full bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border border-blue-200 rounded-xl p-4 text-left transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-fadeInUp stagger-1"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Export Users</h3>
                    <p className="text-sm text-gray-600">All user data including emails and phone numbers</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-semibold text-blue-600">{usersCount}</span>
                  <p className="text-xs text-gray-500">users</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => {
                onExportLeads();
                onClose();
              }}
              className="w-full bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border border-green-200 rounded-xl p-4 text-left transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-fadeInUp stagger-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Export Leads</h3>
                    <p className="text-sm text-gray-600">All lead submissions and contact information</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-semibold text-green-600">{leadsCount}</span>
                  <p className="text-xs text-gray-500">leads</p>
                </div>
              </div>
            </button>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4 animate-fadeInUp stagger-3">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Exported files will be in CSV format and can be opened in Excel or Google Sheets.
            </p>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-white/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 text-gray-700 bg-gradient-to-r from-gray-100 to-slate-100 hover:from-gray-200 hover:to-slate-200 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;