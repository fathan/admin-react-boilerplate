import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CarType = {
  id: string;
  name: string;
  color: string;
}

type SampleState = {
  cars: CarType[];
  status: boolean;
  addCar: (car: CarType) => void;
  removeCar: (id: string) => void;
  setCars: (cars: CarType[]) => void;
  setStatus: (status: boolean) => void;
};

export const useSampleStore = create<SampleState>()(
  persist(
    (set) => ({
      cars: [],
      status: false,

      addCar: (car: CarType) => set((state) => ({ cars: [...state.cars, car] })),

      removeCar: (id: string) =>
        set((state) => ({ cars: state.cars.filter((c) => c.id !== id) })),

      setCars: (cars: CarType[]) => set({ cars }),

      setStatus: (status: boolean) => set({ status }),
    }),
    {
      name: 'sample-storage', // key localStorage
    }
  )
);