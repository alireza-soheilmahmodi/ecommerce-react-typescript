import { Link } from "react-router-dom";
import SignOutButton from "../SignOutButton";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <div className=" bg-blue-500">
      <div className=" flex container mx-auto items-center justify-between">
        <div className="flex">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive
                ? "text-white p-5 bg-blue-800 hover:bg-blue-800"
                : "text-white p-5 hover:bg-blue-800"
            }
          >
            داشبورد
          </NavLink>
          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              isActive
                ? "text-white p-5 bg-blue-800 hover:bg-blue-800"
                : "text-white p-5 hover:bg-blue-800"
            }
          >
            محصولات
          </NavLink>
          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              isActive
                ? "text-white p-5 bg-blue-800 hover:bg-blue-800"
                : "text-white p-5 hover:bg-blue-800"
            }
          >
            سفارشات
          </NavLink>
          <NavLink
            to="/admin/customers"
            className={({ isActive }) =>
              isActive
                ? "text-white p-5 bg-blue-800 hover:bg-blue-800"
                : "text-white p-5 hover:bg-blue-800"
            }
          >
            مشتریان
          </NavLink>
          <NavLink
            to="/admin/reviews"
            className={({ isActive }) =>
              isActive
                ? "text-white p-5 bg-blue-800 hover:bg-blue-800"
                : "text-white p-5 hover:bg-blue-800"
            }
          >
            نظرات
          </NavLink>
          <NavLink
            to="/admin/slider"
            className={({ isActive }) =>
              isActive
                ? "text-white p-5 bg-blue-800 hover:bg-blue-800"
                : "text-white p-5 hover:bg-blue-800"
            }
          >
            اسلایدر
          </NavLink>
        </div>
        <div className="flex gap-1">
          <Button className="bg-white text-black hover:bg-gray-200" asChild>
            <Link to="/">صفحه اصلی</Link>
          </Button>

          <SignOutButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
