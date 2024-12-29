import { useGetCustomerOrderDetailsRequest } from "@/api/CustomersApi";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Redirect from "../redirect/Redirect";
import { Card } from "@/components/ui/card";
import AppLogo from "@/components/AppLogo";
import { Separator } from "@/components/ui/separator";
import LeftSection from "./components/LeftSection";
import RightSection from "./components/RightSection";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { FileType } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const TrackingSummary = () => {
  const { trackingId } = useParams();
  const printRef = useRef(null);

  // Check if the trackingId is valid -- if not, redirect to the home page
  // Safety check
  if (!trackingId) {
    toast("Invalid tracking id", {
      icon: "🚨",
    });

    return <Navigate to="/" replace />;
  }

  const { orderDetails, isLoading } = useGetCustomerOrderDetailsRequest(
    trackingId as string
  );

  if (isLoading) {
    return <Redirect />;
  }

  if (!orderDetails) {
    toast("Order not found", { icon: "🚨" });
    return <Navigate to="/not-found" replace />;
  }

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element) {
      return;
    }

    const canvas = await html2canvas(element, {
      scale: 2,
    });
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();

    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("examplepdf.pdf");
  };

  return (
    <div className="min-h-screen bg-main p-4 flex flex-col gap-5 items-center justify-center">
      <Card
        ref={printRef}
        className="w-full max-w-4xl p-6 bg-main relative grid md:grid-cols-[300px_1fr] gap-6"
      >
        <div className="absolute top-4 right-4 scale-[0.8]">
          <AppLogo />
        </div>
        <LeftSection order={orderDetails.order} />
        <Separator className="md:hidden" />
        <RightSection orderDetails={orderDetails} />
      </Card>
      <div className="flex justify-end gap-2">
        <Button onClick={handleDownloadPdf} size="sm">
          <FileType className="w-4 h-4" />
          Generate Report
        </Button>
      </div>
    </div>
  );
};

export default TrackingSummary;
