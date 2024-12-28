import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGetWarehousesRequest } from "@/api/AdminsApi";
import Redirect from "@/pages/redirect/Redirect";
import CreateWarehouseModal from "@/components/CreateWarehouseModal";
import WarehouseType from "./types";

export default function Warehouse() {
  const { response, isLoading } = useGetWarehousesRequest();
  const [iscreatingWarehouse, setIsCreatingWarehouse] = useState(false);

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
            console.log("dg");
          }}
        >
          Add New Warehouse
        </Button>
      </div>
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {response.warehouses.map((warehouse: WarehouseType) => (
          <Card key={warehouse._id} className="flex flex-col">
            <CardHeader className="flex-grow">
              <CardTitle>{warehouse.name}</CardTitle>
              <CardDescription>
                {warehouse.address}, {warehouse.city}, {warehouse.state} -{" "}
                {warehouse.pincode}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video relative mb-4">
                <img
                  src="https://lh3.googleusercontent.com/Rb4xxWc_kQyy7rYlg7ijtS9BI3jgc2saJlQDrU0j7r53xSsX5UWE5_MRGTHTx6lJ22VyphV4dsK2n4lHXj4e=-rw"
                  alt={warehouse.name}
                  className="absolute inset-0 w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Email:</strong> {warehouse.email}
                </p>
                <p>
                  <strong>Phone:</strong> {warehouse.phone}
                </p>
                <p>
                  <strong>Manager ID:</strong> {warehouse.manager_id}
                </p>
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
              <Button variant="outline" size="sm" className="w-full">
                Edit
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {iscreatingWarehouse && (
        <CreateWarehouseModal
          isOpen={iscreatingWarehouse}
          onClose={setIsCreatingWarehouse}
        ></CreateWarehouseModal>
      )}
    </div>
  );
}
