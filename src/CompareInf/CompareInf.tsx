import CompareInfContent from "./CompareInfContent";
import { CompareInfContextProvider } from "./CompareInfContext";


export default function CompareInf() {
  return (
    <CompareInfContextProvider>
      <CompareInfContent />
    </CompareInfContextProvider>
  );
}
