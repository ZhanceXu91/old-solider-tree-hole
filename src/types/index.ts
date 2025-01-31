export interface User {
  id: string;
  name: string;
  avatar: string;
  gender: 'male' | 'female';
  level: number;
  location: string;
  services: string[];
  tags: string[];
  online: boolean;
  voice?: {
    duration: number;
    url: string;
  }
}

export interface Service {
  id: string;
  name: string;
  icon: string;
  price: number;
} 