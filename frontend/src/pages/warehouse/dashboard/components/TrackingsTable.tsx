import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FilteringOptions from "./FilteringOptions";
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PageControls from "@/components/PageControls";

const TrackingsTable = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[1.3rem] font-semibold">Trackings List</h2>
            <p className="text-sm text-zinc-500">
              List of all the trackings that needs to be processed by the warehouse
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FilteringOptions />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table className="w-full">
          <TableCaption>
            List of all the trackings that needs to be processed by the warehouse
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Shipping ID</TableHead>
              <TableHead>Order Placed</TableHead>
              <TableHead>Accept</TableHead>
              <TableHead>Reject</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          </TableBody>
        </Table>
        <div className="mt-4 flex items-center justify-center">
          <PageControls
            currPage={1}
            totalPages={1}
            goToPage={() => {}}
            prevPage={() => {}}
            nextPage={() => {}}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default TrackingsTable;