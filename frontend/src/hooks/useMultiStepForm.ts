import { useState } from "react";

export const useMultiStepForm = (steps: React.ReactElement[]) => {
  const [currStepIndex, setCurrStepIndex] = useState<number>(0);

  function next() {
    setCurrStepIndex((prevStep) => {
      return prevStep < steps.length - 1 ? prevStep + 1 : prevStep;
    });
  }

  function back() {
    setCurrStepIndex((prevStep) => {
      return prevStep <= 0 ? prevStep : prevStep - 1;
    });
  }

  function goTo(index: number) {
    setCurrStepIndex(index);
  }

  return {
    currStepIndex,
    step: steps[currStepIndex],
    steps,
    isFirstStep: currStepIndex === 0,
    isLastStep: currStepIndex === steps.length - 1,
    next,
    back,
    goTo,
  };
};
