import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { Product as ProductType } from "./admin/Products";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { priceFormatter } from "@/utils";
import { Button } from "@/components/ui/button";
import { CiHeart } from "react-icons/ci";
import { FaMinus, FaTruck } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import AddReview from "@/forms/ReviewForm/AddReview";
import { useState } from "react";
import Review from "@/components/Review";
import { IoIosStar } from "react-icons/io";
import useCartStore from "@/store/cartStore";
import { useAppContext } from "@/contexts/AppContext";

const Product = () => {
  const { productId } = useParams();
  const [showAddReview, setShowAddReview] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const cart = useCartStore((state) => state.cart);
  const { showToast } = useAppContext();

  const { data: product, isLoading } = useQuery<ProductType>(
    ["fetchProductById", productId],
    () => apiClient.fetchProductById(productId as string),
    { enabled: !!productId }
  );

  if (isLoading) return <>در حال بارگذاری...</>;

  if (!product) {
    return <>محصول موردنظر یافت نشد</>;
  }

  const imageUrl = product?.imageUrl.split(",");
  const existProduct = cart.find((item) => item.id === product?.id);

  return (
    <div className="space-y-6">
      <div>
        <h6 className="flex gap-1 text-gray-600">
          {product.categories.map((category, index) => (
            <span key={category.id}>
              {category.name}
              {index === product.categories.length - 1 ? "" : "/"}
            </span>
          ))}
        </h6>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div className="flex" dir="ltr">
          <Carousel className="w-full">
            <CarouselContent>
              {imageUrl?.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <img
                          src={image}
                          alt={`${index}`}
                          className="rounded-md w-full h-full object-cover"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="flex flex-col justify-between gap-5">
          <div>
            <span className="flex items-center gap-1">
              {product.Review &&
                product.Review.length > 0 &&
                product.Review.reduce(
                  (accumulator, currentValue) =>
                    accumulator + currentValue.rating,
                  0
                ) / product.Review.length}
              {product.Review && product.Review.length > 0 && (
                <span className="flex items-center text-gray-500 gap-1">
                  <IoIosStar className="text-yellow-500" />(
                  {product.Review.length} امتیاز )
                </span>
              )}
            </span>
            <h2 className=" text-2xl">{product.name}</h2>
          </div>

          <p className="text-3xl">
            {priceFormatter(String(product.price))}
            <span className="text-lg font-bold">تومان</span>
          </p>
          <div>
            <p className="flex items-center gap-2 text-gray-600">
              <FaTruck /> آماده ارسال
            </p>
            <p className="flex items-center gap-2 text-gray-600">
              <IoShieldCheckmarkOutline /> گارانتی اصالت و سلامت فیزیکی کالا
            </p>
          </div>
          <div className="flex gap-4">
            {existProduct ? (
              <div className="flex justify-center items-center w-2/3 text-lg">
                <Button
                  onClick={() => {
                    addToCart({ ...product, Review: undefined });
                    showToast({
                      message: "محصول به سبد خرید اضافه شد",
                      type: "SUCCESS",
                    });
                  }}
                  disabled={product.stock <= existProduct.quantity}
                >
                  <FaPlus />
                </Button>
                <span className="px-4">{existProduct.quantity}</span>
                <Button
                  onClick={() => {
                    decreaseQuantity(product.id);
                  }}
                >
                  <FaMinus />
                </Button>
              </div>
            ) : (
              <Button
                className="w-2/3 rounded-none p-8 text-lg"
                onClick={() => {
                  addToCart({ ...product, Review: undefined });
                  showToast({
                    message: "محصول به سبد خرید اضافه شد",
                    type: "SUCCESS",
                  });
                }}
                disabled={product.stock === 0}
              >
                {product.stock !== 0 ? "افزودن به سبد خرید" : "موجود نیست"}
              </Button>
            )}

            <Button className="rounded-none p-8 bg-white text-black hover:bg-black hover:text-white">
              <CiHeart className="scale-[300%]" />
            </Button>
          </div>
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl">توضیحات</h2>
        <p>{product.description}</p>
      </div>
      <hr />
      <div className="flex flex-col gap-4">
        <Button
          className="w-fit px-10 py-2"
          onClick={() => setShowAddReview(!showAddReview)}
        >
          ثبت نظر
        </Button>
        {showAddReview && <AddReview productId={product.id} />}
      </div>
      {product.Review && product.Review.length > 0 && (
        <h5 className="text-xl">نظرات</h5>
      )}
      {product.Review &&
        product.Review.map((review, index) => (
          <div key={index}>
            <Review
              rate={review.rating}
              comment={review.comment}
              firstName={review.user.firstName}
              lastName={review.user.lastName}
            />
            {index + 1 !== product.Review?.length && <hr className="mt-3" />}
          </div>
        ))}
      <hr />
    </div>
  );
};

export default Product;
