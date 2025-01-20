import { useAppContext } from "@/contexts/AppContext";
import { useMutation, useQuery } from "react-query";
import * as apiClient from "../../api-client";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CiCircleMore } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { User } from "./Users";
import { Product } from "./Products";
import { Link } from "react-router-dom";

type Review = {
  id: number;
  user: User;
  product: Product;
  rating: number;
  comment: string;
};

const Reviews = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const { data: reviews, isLoading } = useQuery(
    "fetchReviews",
    apiClient.fetchReviews,
    {
      onError: (error: Error) => {
        showToast({ message: error.message, type: "ERROR" });
      },
    }
  );

  const { mutate, isLoading: isDeleting } = useMutation(
    apiClient.deleteReview,
    {
      onSuccess: () => {
        showToast({ message: "نظر حذف شد", type: "SUCCESS" });
        navigate(0);
      },
      onError: (error: Error) => {
        showToast({ message: error.message, type: "ERROR" });
      },
    }
  );

  if (isLoading) return <>در حال بارگذاری...</>;

  if (!reviews || reviews.length === 0) {
    return <span>نظری وجود ندارد</span>;
  }

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl">نظرات</h1>
      </div>
      <div className="mt-5">
        <Table>
          <TableBody>
            <TableRow className="border-b-2">
              <TableCell>نام و نام خانوادگی</TableCell>
              <TableCell>نام محصول</TableCell>
              <TableCell>امتیاز</TableCell>
              <TableCell>نظر</TableCell>
              <TableCell></TableCell>
            </TableRow>
            {(reviews as Review[]).map((review) => (
              <TableRow key={review.id}>
                <TableCell>{`${review.user.firstName} ${review.user.lastName}`}</TableCell>
                <TableCell>
                  <Link to={`/products/${review.product.id}`}>
                    {review.product.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      review.rating >= 4
                        ? "bg-green-500"
                        : review.rating === 3
                        ? "bg-orange-500"
                        : "bg-red-500"
                    }
                  >
                    {review.rating}
                  </Badge>
                </TableCell>
                <TableCell>{review.comment}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <CiCircleMore size={30} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="text-center">
                      <DropdownMenuItem className="p-0">
                        <Button
                          className="w-full bg-red-500"
                          onClick={() => mutate(review.id)}
                          disabled={isDeleting}
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

export default Reviews;
