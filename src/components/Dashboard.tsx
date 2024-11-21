import React from 'react';
import { Activity, Users, CreditCard, TrendingUp } from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, trend }: any) => (
  <div className="bg-white rounded-xl p-6 shadow-lg">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-purple-100 rounded-lg">
          <Icon className="text-purple-600" size={24} />
        </div>
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
      <div className={`text-sm ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
        {trend > 0 ? '+' : ''}{trend}%
      </div>
    </div>
  </div>
);

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
        <div className="flex space-x-2">
          <select className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm">
            <option>7 derniers jours</option>
            <option>30 derniers jours</option>
            <option>Cette année</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          title="Clients actifs"
          value="1,234"
          trend={12}
        />
        <StatCard
          icon={CreditCard}
          title="Revenu mensuel"
          value="5,678€"
          trend={8}
        />
        <StatCard
          icon={Activity}
          title="Taux de renouvellement"
          value="89%"
          trend={-2}
        />
        <StatCard
          icon={TrendingUp}
          title="Croissance"
          value="23%"
          trend={15}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Abonnements à renouveler
          </h2>
          {/* Liste des abonnements à renouveler */}
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Activité récente
          </h2>
          {/* Liste des activités récentes */}
        </div>
      </div>
    </div>
  );
};