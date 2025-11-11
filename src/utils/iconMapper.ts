import { 
  faShoppingCart, 
  faCoffee, 
  faGasPump, 
  faTv, 
  faStore, 
  faCreditCard,
  faHome,
  faGamepad,
  faUtensils,
  faPlane,
  faWallet,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';

const colors = [
  '#1a1a2e',
  '#16213e',
  '#0f3460',
  '#533483',
  '#1e3d59',
  '#2c3e50',
  '#34495e',
  '#2d3436',
  '#636e72',
  '#8e44ad'
];

// Map transaction names to icons
const iconMap: Record<string, IconDefinition> = {
  'ikea': faHome,
  'rozetka': faShoppingCart,
  'starbucks': faCoffee,
  'shell': faGasPump,
  'netflix': faTv,
  'amazon': faShoppingCart,
  'walmart': faStore,
  'card top-up': faWallet,
  'default': faCreditCard
};

export function getIconForTransaction(name: string): IconDefinition {
  const lowerName = name.toLowerCase();
  for (const [key, icon] of Object.entries(iconMap)) {
    if (lowerName.includes(key)) {
      return icon;
    }
  }
  return iconMap.default;
}

export function getColorForTransaction(name: string, index: number): string {
  // Use a hash of the name to get a consistent color
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colorIndex = Math.abs(hash) % colors.length;
  return colors[colorIndex];
}

