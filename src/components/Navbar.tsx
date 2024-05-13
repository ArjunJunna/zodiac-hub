import MobileNavbar from "./client-components/MobileNavbar";
import {DesktopNavbar} from "./server-components/DesktopNavbar";

function Navbar() {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  );
}

export default Navbar;
