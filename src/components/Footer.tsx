import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <h5 className="text-xl">فروشگاه اینترنتی مد و لباس شیک پوش</h5>
      <p>
        ما در شیک پوش به ارائه‌ی پوشاک باکیفیت و متنوع برای تمامی سلیقه‌ها
        افتخار می‌کنیم. هدف ما ایجاد تجربه‌ای لذت‌بخش از خرید آنلاین است.
      </p>
      <p className="flex items-center gap-2">
        <FaPhone /> شماره تماس: 0000000000
      </p>
      <p className="flex items-center gap-2">
        <MdEmail /> ایمیل: aaaaa@aaaaaa.com
      </p>
    </div>
  );
};

export default Footer;
