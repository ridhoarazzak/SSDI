export enum LayerType {
  LAND_COVER = 'Land Cover & Vegetation',
  COFFEE = 'Coffee Plantation Audit',
  CUSTOM = 'Custom Analysis',
  NDVI = 'Vegetation Health (NDVI)',
  WATER = 'Water Resources',
  URBAN = 'Urban Development',
  SATELLITE = 'Satellite Imagery'
}

export interface GeoStats {
  date: string;
  value: number;
  label: string;
}

export interface AnalysisRegion {
  id: string;
  name: string;
  areaKm2: number;
  center: [number, number];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isLoading?: boolean;
}

export interface DashboardConfig {
  id: string;
  title: string;
  url: string;
  icon: string;
  layerType: LayerType;
  description: string;
}
