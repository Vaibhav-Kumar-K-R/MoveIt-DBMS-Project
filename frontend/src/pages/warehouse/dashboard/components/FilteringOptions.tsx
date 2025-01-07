import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDownAZ } from "lucide-react";

const FilteringOptions = () => {
  return (
    <Select>
      <SelectTrigger className="flex items-center gap-2 w-[180px]">
        <SelectValue placeholder="Filter by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">
          <div className="flex items-center gap-3">
            <ArrowDownAZ className="size-4" />
            All
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default FilteringOptions;
