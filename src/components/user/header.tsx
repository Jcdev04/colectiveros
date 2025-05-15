import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className="bg-white shadow-sd py-4 z-10">
      <div className="container mx-auto flex items-center justify-between">
        <img src="./holamundo" alt="imagen" />
        <Button variant="outline" className="text-gray-700 hover:bg-gray-100">
          Registrarse
        </Button>
      </div>
    </header>
  );
};

export default Header;
