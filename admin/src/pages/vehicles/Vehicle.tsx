import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddVehicleModal from "@/pages/vehicles/components/AddVehicleModal";
import Redirect from "@/pages/redirect/Redirect";
import { useState } from "react";
import { useGetVehiclesRequest } from "@/api/AdminsApi";
import UpdateVehicleStatus from "@/pages/vehicles/components/UpdateVehicleStatus";
export default function Vehicle() {
  const { response, isLoading } = useGetVehiclesRequest();
  const [isAddingVehicle, setIsAddingVehicle] = useState(false);
  const [isEditingVehicleStatus, setIsEditingVehicleStatus] = useState(false);
  const [editVehicleData, setEditVehicleData] = useState<{
    number_plate: string;
    status: string;
  }>({
    number_plate: "",
    status: "",
  });

  if (isLoading) {
    return <Redirect />;
  }

  return (
    <div className={`space-y-4 p-4 `}>
      <div className="flex flex-col  sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Vehicles</h1>
        <Button
          onClick={() => {
            setIsAddingVehicle(true);
          }}
        >
          <Plus /> Add New Vehicle
        </Button>
      </div>
      <h1 className="text-2xl font-semibold ">All Vehicles</h1>
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {response.vehicles.map((vehicle: any) => (
          <Card key={vehicle._id} className="flex flex-col">
            <CardHeader className="flex-grow">
              <CardTitle>{vehicle.number_plate}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video relative mb-4">
                <img
                  src={vehicle.vehicle_img.vehicle_img_url}
                  alt={vehicle.number_plate}
                  className="absolute inset-0 w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="space-y-2 ">
                <p>
                  <strong>Capacity:</strong>
                  {vehicle.capacity}
                </p>
                <p>
                  <strong>Status:</strong>
                  {vehicle.curr_status === "available" ? (
                    <span className="text-green-500  font-semibold text-md px-2 py-1 rounded">
                      Available
                    </span>
                  ) : vehicle.curr_status === "in_use" ? (
                    <span className="text-yellow-500  font-semibold text-md px-2 py-1 rounded">
                      In Use
                    </span>
                  ) : vehicle.curr_status === "in_maintenance" ? (
                    <span className="text-blue-500 font-semibold text-md px-2 py-1 rounded">
                      In Maintenance
                    </span>
                  ) : (
                    <span className="text-red-500  font-semibold text-md px-2 py-1 rounded">
                      Not Available
                    </span>
                  )}
                </p>
                <p className="capitalize">
                  <strong>Model:</strong>
                  {vehicle.model}
                </p>
                <p className="lg:text-sm">
                  <strong>Type:</strong> {vehicle.type}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => {
                  setEditVehicleData({
                    number_plate: vehicle.number_plate,
                    status: vehicle.curr_status,
                  });
                  setIsEditingVehicleStatus(true);
                }}
                variant="outline"
                size="sm"
                className="w-full"
              >
                Update Vehicle status
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {isAddingVehicle && (
        <AddVehicleModal
          isOpen={isAddingVehicle}
          onClose={setIsAddingVehicle}
        ></AddVehicleModal>
      )}
      {isEditingVehicleStatus && (
        <UpdateVehicleStatus
          status={editVehicleData.status}
          number_plate={editVehicleData.number_plate}
          isOpen={isEditingVehicleStatus}
          onClose={setIsEditingVehicleStatus}
        />
      )}
    </div>
  );
}
