import React, { Fragment } from "react";
import { Separator } from "./separator";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { ChevronLeft, ChevronRight, Loader2, Rocket } from "lucide-react";
import { useMultiStepFormContext } from "@/context/MultiStepFormContext";
import { CardContent } from "./card";

type MultiStepFormProps = {
  className?: string;
  formHeader: React.ReactNode;
};

const MultiStepForm = ({ className, formHeader }: MultiStepFormProps) => {
  const { controls } = useMultiStepFormContext();
  const { steps, step, goTo, currStepIndex } = controls;
  const stepsLength = steps.length;

  const handleGoto = (index: number) => {
    if (index < currStepIndex) {
      goTo(index);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-6 p-5 relative",
        className,
      )}
    >
      <div className="flex flex-col gap-3 items-center justify-center w-full sticky z-10 -top-[1px] bg-white">
        {formHeader}
        <div className="flex items-center justify-center w-full gap-2">
          {Array.from({ length: stepsLength }).map((_, index) => (
            <Fragment key={index}>
              <div
                className={cn(
                  "flex items-center justify-center size-10 rounded-full font-semibold select-none",
                  index === currStepIndex
                    ? "bg-black text-zinc-100"
                    : "bg-zinc-200 text-zinc-800",
                  index < currStepIndex ? "bg-black/70 text-zinc-100" : "",
                  index <= currStepIndex ? "cursor-pointer" : "",
                )}
                onClick={() => handleGoto(index)}
              >
                {index < currStepIndex ? (
                  <span>✓</span>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              {index < stepsLength - 1 && (
                <Separator
                  className={cn(
                    "flex-1 transition-all",
                    index < currStepIndex ? "bg-black/40 animate-line" : "",
                  )}
                />
              )}
            </Fragment>
          ))}
        </div>
        <Separator className="shadow-md" />
      </div>

      <div className="flex flex-col justify-start w-full">
        <CardContent className="px-2">{step}</CardContent>
      </div>
    </div>
  );
};

type MultiStepFormButtonsProps = {
  isFirstStep: boolean;
  isLastStep: boolean;
  back: () => void;
  next: () => void;
  isLoading?: boolean;
};

const MultiStepFormButtons = ({
  back,
  isFirstStep,
  isLastStep,
  isLoading,
}: MultiStepFormButtonsProps) => {
  return (
    <div className="flex items-center justify-between w-full mt-7">
      <Button
        type="button"
        variant={"link"}
        onClick={back}
        disabled={isFirstStep}
      >
        <ChevronLeft />
        Back
      </Button>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="animate-spin" /> Please wait
          </span>
        ) : isLastStep ? (
          <span className="flex items-center gap-2">
            <Rocket /> Submit
          </span>
        ) : (
          <span className="flex items-center gap-2">
            Next <ChevronRight />
          </span>
        )}
      </Button>
    </div>
  );
};

export { MultiStepForm, MultiStepFormButtons };
