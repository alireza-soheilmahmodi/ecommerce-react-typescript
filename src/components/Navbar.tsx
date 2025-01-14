import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { Category } from "@/forms/ManageProductForm/CategoriesSection";

const NavBar = () => {
  const { data: categories } = useQuery("fetchCategories", () =>
    apiClient.fetchAllCategories()
  );

  if (!categories) return <></>;

  return (
    <div className="flex w-full mt-5">
      <NavigationMenu dir="rtl">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>مردانه</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="flex flex-col text-nowrap p-4 w-[400px]">
                {(categories as Category[])
                  .filter((category) => category.name.includes("مردانه"))
                  .map((category) => (
                    <Link
                      className="text-gray-600 p-4  hover:text-black w-fit"
                      to={`/search?category=${category.id}`}
                    >
                      {category.name}
                    </Link>
                  ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>زنانه</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="flex flex-col  text-nowrap p-4 w-[400px]">
                {(categories as Category[])
                  .filter((category) => category.name.includes("زنانه"))
                  .map((category) => (
                    <Link
                      className="text-gray-600 p-4  hover:text-black"
                      to={`/search?category=${category.id}`}
                    >
                      {category.name}
                    </Link>
                  ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>بچگانه</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="flex flex-col text-nowrap p-4 w-[400px]">
                {(categories as Category[])
                  .filter((category) => category.name.includes("بچگانه"))
                  .map((category) => (
                    <Link
                      className="text-gray-600 p-4  hover:text-black"
                      to={`/search?category=${category.id}`}
                    >
                      {category.name}
                    </Link>
                  ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavBar;
