import HeaderContent from "./HeaderContent";
import { HeaderContextProvider } from "./HeaderContext";


export default function Header() {
  return (
    <HeaderContextProvider>
      <HeaderContent />
    </HeaderContextProvider>
  );
}
