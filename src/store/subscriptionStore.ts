import { create } from 'zustand';
import { faker } from '@faker-js/faker';
import { Client, Subscription } from '../types';

interface SubscriptionStore {
  clients: Client[];
  addClient: (client: Client) => void;
  updateClient: (id: string, updates: Partial<Client>) => void;
  addSubscription: (clientId: string, subscription: Subscription) => void;
  updateSubscription: (clientId: string, subscriptionId: string, updates: Partial<Subscription>) => void;
}

const generateMockData = (): Client[] => {
  return Array.from({ length: 8 }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    subscriptions: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => ({
      id: faker.string.uuid(),
      type: faker.helpers.arrayElement(['Netflix', 'IPTV']),
      plan: faker.helpers.arrayElement(['Basic', 'Standard', 'Premium']),
      startDate: faker.date.past(),
      endDate: faker.date.future(),
      price: parseFloat(faker.commerce.price({ min: 9.99, max: 29.99 })),
      status: faker.helpers.arrayElement(['active', 'expired', 'pending'])
    }))
  }));
};

export const useSubscriptionStore = create<SubscriptionStore>((set) => ({
  clients: generateMockData(),
  addClient: (client) => set((state) => ({ 
    clients: [...state.clients, client] 
  })),
  updateClient: (id, updates) => set((state) => ({
    clients: state.clients.map((client) =>
      client.id === id ? { ...client, ...updates } : client
    )
  })),
  addSubscription: (clientId, subscription) => set((state) => ({
    clients: state.clients.map((client) =>
      client.id === clientId
        ? { ...client, subscriptions: [...client.subscriptions, subscription] }
        : client
    )
  })),
  updateSubscription: (clientId, subscriptionId, updates) => set((state) => ({
    clients: state.clients.map((client) =>
      client.id === clientId
        ? {
            ...client,
            subscriptions: client.subscriptions.map((sub) =>
              sub.id === subscriptionId ? { ...sub, ...updates } : sub
            )
          }
        : client
    )
  }))
}));