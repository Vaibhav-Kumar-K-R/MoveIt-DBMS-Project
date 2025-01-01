import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import FilterWarehouse from "@/components/FilterWarehouse";
import CreateWarehouseModal from "@/components/CreateWarehouseModal";
import UpdateWarehouseModal from "@/components/UpdateWarehouseModal";
import Redirect from "@/pages/redirect/Redirect";
import { useState } from "react";
import { useGetWarehousesRequest } from "@/api/AdminsApi";
import WarehouseType from "./types";

export default function Warehouse() {
  const { response, isLoading } = useGetWarehousesRequest();
  const [isCreatingWarehouse, setIsCreatingWarehouse] = useState(false);
  const [isEditingWarehouse, setIsEdittingWarehouse] = useState(false);
  const [editWarehouseEmail, setEditWarehouseEmail] = useState<string>("");
  const [editWarehouseStatus, setEditWarehouseStatus] = useState<string>("");
  


  if (isLoading) {
    return <Redirect />;
  }

  return (
    <div className={`space-y-4 p-4 `}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Warehouses</h1>
        <Button
          onClick={() => {
            setIsCreatingWarehouse(true);
          }}
        >
          Add New Warehouse
        </Button>
      </div>
      <FilterWarehouse />
      <h1 className="text-2xl font-semibold ">All warehouses</h1>
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {response.warehouses.map((warehouse: WarehouseType) => (
          <Card key={warehouse._id} className="flex flex-col">
            <CardHeader className="flex-grow">
              <CardTitle>{warehouse.name}</CardTitle>
              <CardDescription className="capitalize">
                {warehouse.address}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video relative mb-4">
                <img
                  src="https://placehold.co/600x400?text=Hello\nWorld"
                  alt={warehouse.name}
                  className="absolute inset-0 w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="space-y-2 ">
                <p>
                  <strong>City:</strong>{warehouse.city}
                </p>
                <p>
                  <strong>Pincode:</strong>{warehouse.pincode}
                </p>
                <p className="capitalize">
                  <strong>State:</strong>{warehouse.state}
                </p>
                <p className="lg:text-sm">
                  <strong>Email:</strong> <a href="mailto:">{warehouse.email}</a>
                </p>
                <p>
                  <strong>Phone:</strong> <a href="tel:">{warehouse.phone}</a>
                </p>
                <p>
                  <strong>Manager name:</strong> {warehouse.manager_id.name}
                </p>
                <p>
                  <strong>Manager contact number:</strong> {warehouse.manager_id.phone}
                </p>
                <p>Manager profile</p>
                <img
                  src={warehouse.manager_id.profile_img_url}
                  className="w-[100px] h-[100px]"
                  alt="profile"
                />

                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`capitalize ${warehouse.status === "open" ? "text-green-600" : "text-red-600"}`}
                  >
                    {warehouse.status}
                  </span>
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => {
                  setEditWarehouseEmail(warehouse.email);
                  setIsEdittingWarehouse(true);
                  setEditWarehouseStatus(warehouse.status);
                }}
                variant="outline"
                size="sm"
                className="w-full"
              >
                Update status
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {isCreatingWarehouse && (
        <CreateWarehouseModal
          isOpen={isCreatingWarehouse}
          onClose={setIsCreatingWarehouse}
        ></CreateWarehouseModal>
      )}
      {isEditingWarehouse && (
        <UpdateWarehouseModal
          status={editWarehouseStatus}
          email={editWarehouseEmail}
          isOpen={isEditingWarehouse}
          onClose={setIsEdittingWarehouse}
        />
      )}
    </div>
  );
}
