import MTExportDataContent from "./MTExportDataContent";
import { MTExportDataContextProvider } from "./MTExportDataContext";


export default function MTExportData() {
  return (
    <MTExportDataContextProvider>
      <MTExportDataContent />
    </MTExportDataContextProvider>
  );
}
