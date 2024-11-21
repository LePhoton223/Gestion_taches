import { create } from 'zustand';
import { Client, Subscription } from '../types';
import { faker } from '@faker-js/faker';

interface Store {
  clients: Client[];
  addClient: (client: Client) => void;
  updateClient: (id: string, client: Partial<Client>) => void;
  addSubscription: (clientId: string, subscription: Subscription) => void;
  updateSubscription: (clientId: string, subscriptionId: string, subscription: Partial<Subscription>) => void;
}

// Generate mock data
const generateMockClients = (count: number): Client[] => {
  return Array.from({ length: count }, () => ({
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

export const useStore = create<Store>((set) => ({
  clients: generateMockClients(10),
  addClient: (client) =>
    set((state) => ({ clients: [...state.clients, client] })),
  updateClient: (id, updatedClient) =>
    set((state) => ({
      clients: state.clients.map((client) =>
        client.id === id ? { ...client, ...updatedClient } : client
      )
    })),
  addSubscription: (clientId, subscription) =>
    set((state) => ({
      clients: state.clients.map((client) =>
        client.id === clientId
          ? { ...client, subscriptions: [...client.subscriptions, subscription] }
          : client
      )
    })),
  updateSubscription: (clientId, subscriptionId, updatedSubscription) =>
    set((state) => ({
      clients: state.clients.map((client) =>
        client.id === clientId
          ? {
              ...client,
              subscriptions: client.subscriptions.map((sub) =>
                sub.id === subscriptionId ? { ...sub, ...updatedSubscription } : sub
              )
            }
          : client
      )
    }))
}));