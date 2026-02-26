import BaseDivider from "@/components/shared/atoms/BaseDivider";
import { useSampleStore } from "@/stores/sampleStore";
import { Button } from "@chakra-ui/react";
import { v4 as uuid } from 'uuid';

const DocStateManagementPersistant = () => {
  const cars = useSampleStore((state) => state.cars);
  const addCar = useSampleStore((state) => state.addCar);
  const removeCar = useSampleStore((state) => state.removeCar);

  const handleAdd = () => {
    addCar({ id: uuid(), name: 'Ferrari', color: 'Red' });
  };

  const handleRemove = (id: string) => {
    removeCar(id);
  };

  return (
    <div>
      <Button colorPalette={'blue'} onClick={handleAdd}>
        Add Car
      </Button>

      <ul className="mt-10">
        {cars.map((car) => (
          <li key={car.id} className="flex flex-row gap-3 items-center">
            {car.name} - {car.color}{" "}
            
            <BaseDivider
              orientation="vertical"
              thickness={1}
              colorClass="bg-gray-300"
              height="20px"
              className="mx-2"
            />

            <Button
              colorPalette={'red'}
              size={'2xs'}
              onClick={() => handleRemove(car.id)}
            >
              Remove
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocStateManagementPersistant;