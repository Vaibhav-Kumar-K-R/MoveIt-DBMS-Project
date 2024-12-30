import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { createContext, ReactElement, useContext } from "react";

type MultiStepFormProviderProps = {
  children: React.ReactNode;
  stepsArray: ReactElement[];
};

type MultiStepFormContextType = {
  controls: {
    currStepIndex: number;
    step: ReactElement;
    steps: ReactElement[];
    isFirstStep: boolean;
    isLastStep: boolean;
    next: () => void;
    back: () => void;
    goTo: (index: number) => void;
  };
};

const MultiStepFormContext = createContext<
  MultiStepFormContextType | undefined
>(undefined);

const MultiStepFormContextProvider = ({
  children,
  stepsArray,
}: MultiStepFormProviderProps) => {
  const controls = useMultiStepForm(stepsArray);

  return (
    <MultiStepFormContext.Provider
      value={{
        controls,
      }}
    >
      {children}
    </MultiStepFormContext.Provider>
  );
};

export const useMultiStepFormContext = () => {
  const context = useContext(MultiStepFormContext);

  if (!context) {
    throw new Error(
      "useMultiStepFormContext must be used within a MultiStepFormContextProvider"
    );
  }

  return context;
};

export default MultiStepFormContextProvider;
