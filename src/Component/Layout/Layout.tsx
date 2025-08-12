import LayoutContent from "./LayoutContent";
import { LayoutContextProvider } from "./LayoutContext";


export default function Layout() {
  return (
    <LayoutContextProvider>
      <LayoutContent />
    </LayoutContextProvider>
  );
}
