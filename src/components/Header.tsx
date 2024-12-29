import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Button } from "./ui/button";
import { useAppContext } from "@/contexts/AppContext";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-1">
          <span>
            <AiOutlineShoppingCart size={30} />
          </span>
          {isLoggedIn === true ? (
            <></>
          ) : (
            <span className="mr-4">
              <Button className="bg-gray-700" asChild>
                <Link to="/sign-in">وارد شوید</Link>
              </Button>
            </span>
          )}
        </div>
        <div className="flex border-b border-b-gray-800 flex-1 justify-center items-center p-4">
          <h1 className="text-5xl">
            <Link to="/">ShikPush</Link>
          </h1>
        </div>
        <div className="flex flex-1 justify-end">
          <div className="relative w-1/2">
            <CiSearch className="absolute right-2 top-[32%]" />
            <Input placeholder="جستجو محصولات..." className="pr-8" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
