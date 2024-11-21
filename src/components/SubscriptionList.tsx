import React from 'react';
import { format } from 'date-fns';
import { Film, Tv, Calendar, DollarSign, AlertCircle } from 'lucide-react';
import { useSubscriptionStore } from '../store/subscriptionStore';

export const SubscriptionList: React.FC = () => {
  const clients = useSubscriptionStore((state) => state.clients);
  const allSubscriptions = clients.flatMap((client) =>
    client.subscriptions.map((sub) => ({
      ...sub,
      clientName: client.name,
      clientId: client.id
    }))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Abonnements</h2>
        <button className="btn btn-primary flex items-center space-x-2">
          <span>Nouvel abonnement</span>
        </button>
      </div>

      <div className="grid gap-4">
        {allSubscriptions.map((sub: any) => (
          <div
            key={sub.id}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${
                  sub.type === 'Netflix' ? 'bg-red-100' : 'bg-blue-100'
                }`}>
                  {sub.type === 'Netflix' ? (
                    <Film className={`${
                      sub.type === 'Netflix' ? 'text-red-600' : 'text-blue-600'
                    }`} size={24} />
                  ) : (
                    <Tv className="text-blue-600" size={24} />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {sub.type} - {sub.plan}
                  </h3>
                  <p className="text-sm text-gray-600">{sub.clientName}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar size={16} />
                  <span>{format(new Date(sub.endDate), 'dd/MM/yyyy')}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm font-medium text-gray-800">
                  <DollarSign size={16} className="text-green-600" />
                  <span>{sub.price}€/mois</span>
                </div>

                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(sub.status)}`}>
                  {sub.status}
                </span>

                {new Date(sub.endDate) < new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) && (
                  <div className="flex items-center space-x-1 text-amber-600">
                    <AlertCircle size={16} />
                    <span className="text-sm">Renouvellement proche</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};