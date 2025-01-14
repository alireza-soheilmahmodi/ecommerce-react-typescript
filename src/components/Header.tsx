import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Button } from "./ui/button";
import { useAppContext } from "@/contexts/AppContext";
import SignOutButton from "./SignOutButton";
import { FormEvent, useState } from "react";

const Header = () => {
  const { isLoggedIn, isAdmin } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    navigate(`/search?query=${searchQuery}`);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-1">
          <span>
            <AiOutlineShoppingCart size={30} />
          </span>
          {isLoggedIn === true ? (
            <span className="mr-3">
              <SignOutButton />
              {isAdmin ? (
                <Button asChild className="mr-3">
                  <Link to="/admin">داشبورد ادمین</Link>
                </Button>
              ) : (
                ""
              )}
            </span>
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
            <form onSubmit={handleSearch}>
              <CiSearch className="absolute right-2 top-[32%]" />
              <Input
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجو محصولات..."
                className="pr-8"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
