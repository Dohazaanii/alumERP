export type Customer = {
  id: string;
  name: string;
  phone: string;
  address: string;
};

export type Order = {
  id: string;
  customerId: string;
  date: string;
  status: 'Pending' | 'In Production' | 'Completed' | 'Cancelled';
  total: number;
  lines: {
    product: string;
    quantity: number;
    price: number;
  }[];
};

export type StockItem = {
  id: string;
  name: string;
  type: 'Profilé' | 'Vitrage' | 'Quincaillerie' | 'Accessoire';
  quantity: number;
  unit: 'm' | 'm²' | 'pièce' | 'kit';
  threshold: number;
};

export type Invoice = {
  id: string;
  orderId: string;
  date: string;
  pdfUrl: string;
};

export const customers: Customer[] = [
  { id: 'CLI001', name: 'Batimat SARL', phone: '01 23 45 67 89', address: '123 Rue de la République, 75001 Paris' },
  { id: 'CLI002', name: 'RénovPlus', phone: '04 98 76 54 32', address: '45 Avenue des Champs-Élysées, 75008 Paris' },
  { id: 'CLI003', name: 'Constructo SA', phone: '05 55 55 55 55', address: '78 Boulevard Saint-Germain, 75005 Paris' },
  { id: 'CLI004', name: 'Habitat Modern', phone: '02 11 22 33 44', address: '90 Rue de Rivoli, 75004 Paris' },
  { id: 'CLI005', name: 'Fenêtres & Co', phone: '03 99 88 77 66', address: '11 Avenue de l\'Opéra, 75002 Paris' },
];

export const orders: Order[] = [
  {
    id: 'CMD001',
    customerId: 'CLI001',
    date: '2023-10-26',
    status: 'Completed',
    total: 15200.00,
    lines: [
      { product: 'Fenêtre Coulissante 2 Vantaux', quantity: 10, price: 1200 },
      { product: 'Porte-fenêtre', quantity: 4, price: 800 },
    ],
  },
  {
    id: 'CMD002',
    customerId: 'CLI002',
    date: '2023-11-05',
    status: 'In Production',
    total: 8500.00,
    lines: [
      { product: 'Baie Vitrée Fixe', quantity: 5, price: 1700 },
    ],
  },
  {
    id: 'CMD003',
    customerId: 'CLI003',
    date: '2023-11-12',
    status: 'Pending',
    total: 23000.00,
    lines: [
      { product: 'Mur Rideau', quantity: 1, price: 18000 },
      { product: 'Porte d\'entrée', quantity: 2, price: 2500 },
    ],
  },
    {
    id: 'CMD004',
    customerId: 'CLI004',
    date: '2023-11-15',
    status: 'Completed',
    total: 4500.00,
    lines: [
      { product: 'Fenêtre à la française', quantity: 5, price: 900 },
    ],
  },
  {
    id: 'CMD005',
    customerId: 'CLI001',
    date: '2023-11-20',
    status: 'In Production',
    total: 19800.00,
    lines: [
      { product: 'Véranda', quantity: 1, price: 15000 },
      { product: 'Porte de garage', quantity: 1, price: 4800 },
    ],
  },
];

export const stock: StockItem[] = [
  { id: 'STK001', name: 'Profilé Aluminium 6m - Blanc', type: 'Profilé', quantity: 85, unit: 'pièce', threshold: 50 },
  { id: 'STK002', name: 'Profilé Aluminium 6m - Gris Anthracite', type: 'Profilé', quantity: 42, unit: 'pièce', threshold: 50 },
  { id: 'STK003', name: 'Double Vitrage 4/16/4', type: 'Vitrage', quantity: 120, unit: 'm²', threshold: 100 },
  { id: 'STK004', name: 'Poignée de fenêtre - Modèle A', type: 'Quincaillerie', quantity: 250, unit: 'pièce', threshold: 200 },
  { id: 'STK005', name: 'Serrure 3 points', type: 'Quincaillerie', quantity: 75, unit: 'pièce', threshold: 60 },
  { id: 'STK006', name: 'Kit Joint d\'étanchéité', type: 'Accessoire', quantity: 35, unit: 'kit', threshold: 40 },
];

export const invoices: Invoice[] = [
    { id: 'FAC001', orderId: 'CMD001', date: '2023-10-30', pdfUrl: '/invoices/fac001.pdf' },
    { id: 'FAC002', orderId: 'CMD004', date: '2023-11-18', pdfUrl: '/invoices/fac002.pdf' },
];

export const getCustomerNameById = (id: string) => {
    return customers.find(c => c.id === id)?.name || 'Unknown Client';
}
