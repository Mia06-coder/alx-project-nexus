// useApplications.ts
import { ApplicationsContext } from "@/context/ApplicationContext";
import { useContext } from "react";

export function useApplications() {
  const context = useContext(ApplicationsContext);
  if (!context) {
    throw new Error(
      "useApplications must be used within an ApplicationsProvider"
    );
  }
  return context;
}
