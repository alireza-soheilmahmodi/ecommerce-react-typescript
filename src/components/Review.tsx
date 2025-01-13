type Props = {
  rate: number;
  comment?: string;
  firstName: string;
  lastName: string;
};

const Review = ({ rate, comment, firstName, lastName }: Props) => {
  return (
    <div className="flex">
      <div
        className={`flex justify-center items-center text-xl h-fit ${
          rate > 3 ? "bg-green-500 text-white" : "bg-red-500 text-white"
        } px-3 py-2`}
      >
        {rate}
      </div>
      <div className="flex flex-col w-full mr-4">
        <p className="text-gray-700 text-sm mt-2">
          {firstName} {lastName}
        </p>

        <p className="mt-8">{comment}</p>
      </div>
    </div>
  );
};

export default Review;
