import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateManagerModal from "@/pages/managers/components/CreateManagerModal";
import Redirect from "@/pages/redirect/Redirect";
import { useState } from "react";
import { useGetManagersRequest } from "@/api/AdminsApi";
import { ManagerType } from "@/pages/managers/types/index";
import UpdateManagerWorkStatus from "./components/UpdateManagerWorkStatus";
export default function Warehouse() {
  const { response, isLoading } = useGetManagersRequest();
  const [isCreatingManager, setIsCreatingManager] = useState(false);
  const [isUpdatingManager, setIsUpdatingManager] = useState(false);
  const [editingManagerEmail, setIsEditingManagerEmail] = useState<string>("");
  const [editingManagerStatus, setIsEditingManagerStatus] =
    useState<string>("");
  if (isLoading) {
    return <Redirect />;
  }

  return (
    <div className={`space-y-4 p-4 `}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Managers</h1>
        <Button
          onClick={() => {
            setIsCreatingManager(true);
          }}
        >
          <Plus /> Add New Manager
        </Button>
      </div>
      <h1 className="text-2xl font-semibold ">All Managers</h1>
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {response.managers.map((manager: ManagerType) => (
          <Card key={manager._id} className="flex flex-col">
            <CardHeader className="flex-grow">
              <CardTitle>{manager.name}</CardTitle>
              <CardDescription className="capitalize">
                {manager.address}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video relative mb-4">
                <img
                  src={manager.profile_img.profile_img_url}
                  alt={manager.name}
                  className="absolute inset-0 w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="space-y-2 ">
                <p>
                  <strong>DOB:</strong>
                  {manager.dob}
                </p>
                <p>
                  <strong>City:</strong>
                  {manager.city}
                </p>

                <p>
                  <strong>Pincode:</strong>
                  {manager.pincode}
                </p>
                <p className="capitalize">
                  <strong>State:</strong>
                  {manager.state}
                </p>
                <p className="lg:text-sm">
                  <strong>Email:</strong> <a href="mailto:">{manager.email}</a>
                </p>
                <p>
                  <strong>Phone:</strong> <a href="tel:">{manager.phone}</a>
                </p>
                <p>
                  <strong>Salary (in INR):</strong>
                  {manager.salary}
                </p>
                <p>
                  <strong>Status:</strong>
                  {manager.work_status === "working" ? (
                    <p className="text-green-700 font-semibold text-md ">
                      Working
                    </p>
                  ) : manager.work_status === "terminated" ? (
                    <p className="text-red-600 font-semibold text-md ">Terminated</p>
                  ) : (
                    <p className="text-yellow-600 text-md font-semibold ">Resigned</p>
                  )}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => {
                  setIsUpdatingManager(true);
                  setIsEditingManagerEmail(manager.email);
                  setIsEditingManagerStatus(manager.work_status);
                }}
                variant="outline"
                size="sm"
                className="w-full"
              >
                Update working status
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {isCreatingManager && (
        <CreateManagerModal
          isOpen={isCreatingManager}
          onClose={setIsCreatingManager}
        ></CreateManagerModal>
      )}
      {isUpdatingManager && (
        <UpdateManagerWorkStatus
          status={editingManagerStatus}
          email={editingManagerEmail}
          isOpen={isUpdatingManager}
          onClose={setIsUpdatingManager}
        />
      )}
    </div>
  );
}
