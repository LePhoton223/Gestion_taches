import React from 'react';
import { MoreVertical, Tv, Film, Calendar } from 'lucide-react';
import { Client } from '../types';
import { format } from 'date-fns';

interface ClientCardProps {
  client: Client;
  onSelect: (client: Client) => void;
}

export const ClientCard: React.FC<ClientCardProps> = ({ client, onSelect }) => {
  const activeSubscriptions = client.subscriptions.filter(
    (sub) => sub.status === 'active'
  );

  return (
    <div
      onClick={() => onSelect(client)}
      className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full -translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500" />
      
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{client.name}</h3>
          <p className="text-sm text-gray-600">{client.email}</p>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <MoreVertical size={20} className="text-gray-500" />
        </button>
      </div>

      <div className="space-y-3">
        {activeSubscriptions.map((sub) => (
          <div
            key={sub.id}
            className="flex items-center space-x-3 text-sm bg-white p-3 rounded-lg shadow-sm"
          >
            {sub.type === 'Netflix' ? (
              <Film className="text-red-500" size={20} />
            ) : (
              <Tv className="text-blue-500" size={20} />
            )}
            <div className="flex-1">
              <p className="font-medium text-gray-800">{sub.type} - {sub.plan}</p>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Calendar size={14} />
                <span>Expire le {format(sub.endDate, 'dd/MM/yyyy')}</span>
              </div>
            </div>
            <span className="text-purple-600 font-semibold">{sub.price}€</span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-sm">
        <span className="text-gray-600">
          {activeSubscriptions.length} abonnement(s) actif(s)
        </span>
        <span className="text-purple-600 font-medium">
          Voir détails →
        </span>
      </div>
    </div>
  );
};