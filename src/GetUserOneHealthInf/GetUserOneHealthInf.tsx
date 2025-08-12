import GetUserOneHealthInfContent from "./GetUserOneHealthInfContent";
import { GetUserOneHealthInfContextProvider } from "./GetUserOneHealthInfContext";


export default function GetUserOneHealthInf() {
  return (
    <GetUserOneHealthInfContextProvider>
      <GetUserOneHealthInfContent />
    </GetUserOneHealthInfContextProvider>
  );
}
