import NewPageContent from "./NewPageContent";
import { NewPageContextProvider } from "./NewPageContext";


export default function NewPage() {
  return (
    <NewPageContextProvider>
      <NewPageContent />
    </NewPageContextProvider>
  );
}
