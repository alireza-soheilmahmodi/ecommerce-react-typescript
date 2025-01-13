import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { FaPlus } from "react-icons/fa";
import { useMutation, useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import * as apiClient from "../../api-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CiCircleMore } from "react-icons/ci";
import { useAppContext } from "@/contexts/AppContext";

type Slide = {
  id: number;
  alt: string;
  link: string;
  imageUrl: string;
};

const Slides = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const { data: slides } = useQuery("fetchSlides", apiClient.fetchSlides, {
    onError: (error: Error) => {
      console.log(error);
    },
  });

  const { mutate, isLoading } = useMutation(apiClient.deleteSlider, {
    onSuccess: () => {
      showToast({ message: "اسلاید حذف شد", type: "SUCCESS" });
      setTimeout(() => navigate(0), 2000);
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  if (!slides) {
    return <>no slides</>;
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Button asChild>
          <Link to="add">
            اضافه کردن اسلاید
            <FaPlus />
          </Link>
        </Button>
      </div>
      <div>
        <Table>
          <TableBody>
            <TableRow className="border-b-2 text-center">
              <TableCell>alt</TableCell>
              <TableCell>link</TableCell>
              <TableCell>image</TableCell>
              <TableCell className="w-[50px]"></TableCell>
            </TableRow>
            {(slides as Slide[]).map((slider, index) => (
              <TableRow key={index} className="text-center">
                <TableCell>{slider.alt}</TableCell>
                <TableCell dir="ltr">{slider.link}</TableCell>
                <TableCell className="flex justify-center items-center">
                  <img
                    alt={slider.alt}
                    src={slider.imageUrl}
                    className="rounded-md w-[200px] h-full object-cover"
                  />
                </TableCell>

                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <CiCircleMore size={30} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="text-center">
                      <DropdownMenuItem className="p-0">
                        <Button
                          className="w-full bg-red-500"
                          onClick={() => mutate(slider.id)}
                          disabled={isLoading}
                        >
                          حذف
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Slides;
