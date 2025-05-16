export interface Car {
  id: number;
  model: string;
  brand: string;
  price: number;
  image: string;
  description: string;
  specifications: {
    fuelType: string;
    transmission: string;
    seats: number;
    features: string[];
  };
}
