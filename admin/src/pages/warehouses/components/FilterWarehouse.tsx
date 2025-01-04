import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useFilterWarehousesRequest } from "@/api/AdminsApi";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import WarehouseType from "@/pages/warehouses/types";

function FilterWarehouse() {
  const [stateName, setStateName] = useState<string>("");
  const { response, isLoading, isError } =
    useFilterWarehousesRequest(stateName);
  const inputRef = useRef<HTMLInputElement>(null);
  const [filteredWarehouses, setFilterdWarehouses] = useState<WarehouseType[]>(
    [],
  );
  useEffect(() => {
    if (response) {
      setFilterdWarehouses(response.warehouses);
    }
  }, [response]);
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Skeleton className="w-full px-4 h-[50px] " />
      </div>
    );
  }

  return (
    <div className="w-full flex-col flex gap-2 justify-start">
      <div className="flex gap-1 w-full  flex-wrap">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search for warehouses by statename..."
          className="w-full sm:w-11/12"
        />
        <Button
          onClick={() => {
            setStateName(inputRef.current?.value.toLowerCase().trim() ?? "");
            setFilterdWarehouses([]);
          }}
        >
          Search
        </Button>
      </div>
      {isError && (
        <div className="text-center text-red-500">No warehouses found!!</div>
      )}
      <br />
      <hr />
      {filteredWarehouses.length != 0 && (
        <h1 className="text-2xl font-semibold ">Filtered warehouses</h1>
      )}
      {filteredWarehouses.length != 0 && (
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {filteredWarehouses.map((warehouse: WarehouseType) => (
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
                    src={warehouse.profile_img.profile_img_url}
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
                    <strong>Manager name:</strong> {warehouse.manager.name}
                  </p>
                  <p>Manager profile</p>
                  <img
                    src={warehouse.profile_img.profile_img_url}
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
                <Button variant="outline" size="sm" className="w-full">
                  Edit
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterWarehouse;
