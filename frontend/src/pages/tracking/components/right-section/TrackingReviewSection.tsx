import { Button } from "@/components/ui/button";

const TrackingReviewSection = () => {
  return (
    <div>
      <p className="text-sm mb-6">How was your delivery experience?</p>
      <div className="flex gap-7">
        {["Bad", "OK", "Fine", "Good", "Best"].map((rating) => (
          <Button
            key={rating}
            size={"icon"}
            variant={"ghost"}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center p-4 bg-slate-100 border hover:scale-110 transition-all duration-100">
              <span className="scale-150">
                {rating === "Bad" && "😞"}
                {rating === "OK" && "😐"}
                {rating === "Fine" && "🙂"}
                {rating === "Good" && "😊"}
                {rating === "Best" && "😃"}
              </span>
            </div>
            <span className="text-xs">{rating}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TrackingReviewSection;
