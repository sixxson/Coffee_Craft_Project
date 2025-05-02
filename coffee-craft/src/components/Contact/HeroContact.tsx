import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";

export default function HeroContact() {
  return (
    <section>
      <div className="container lg:px-16 md:px-8 px-4 my-5 space-y-10 ">
        <div className="grid md:grid-cols-3 grid-cols-1 ">
          <div className="col-span-1 grid grid-rows-2">
            <img src="/contact/3-1.png" alt="" className="w-full row-span-1" />
            <div className="dark:bg-[#44444C] bg-slate-200 flex flex-col justify-center items-center gap-2 row-span-1">
              <Phone size={90} stroke="#cbd5e1" fill="#cbd5e1" />
              <h1 className="dark:text-[#935027] text-2xl lg:text-3xl font-bold">
                Gọi ngay
              </h1>
              <h2 className="dark:text-[#935027] text-xl font-bold">
                Hostline:
              </h2>
              <p className=" text-md lg:text-lg text-blue-500">0987654321</p>
            </div>
          </div>
          <div className="col-span-1 grid grid-rows-2 md:grid-rows-2">
            {/* Hình ảnh - Sẽ đảo lên trên khi màn hình nhỏ */}
            <img
              src="/contact/2-1.png"
              alt=""
              className="w-full row-span-1 md:order-2 order-1"
            />

            {/* Nội dung */}
            <div className="dark:bg-[#44444C] bg-slate-200 flex flex-col justify-center items-center gap-2 row-span-1 md:order-1 order-2">
              {/* Icon */}
              <MapPin size={90} stroke="#cbd5e1" />
              <h1 className="dark:text-[#935027] text-2xl lg:text-3xl font-bold">
                Địa chỉ
              </h1>
              <p className="text-md lg:text-lg text-blue-500">
                123 Quang Trung,
                <br /> Gò Vấp, TP.HCM
              </p>
            </div>
          </div>

          <div className="col-span-1 grid grid-rows-2">
            <img src="/contact/1-1.png" alt="" className="w-full" />
            <div className="dark:bg-[#44444C] bg-slate-200 flex flex-col justify-center items-center gap-2 row-span-1">
              {/* icon */}
              <Mail size={90} stroke="#cbd5e1" />
              <h1 className="dark:text-[#935027] text-2xl lg:text-3xl font-bold">
                Email
              </h1>
              <h2 className="dark:text-[#935027] text-xl font-bold">CSKH:</h2>
              <p className="text-md lg:text-lg text-blue-500">
                support@coffeecart.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
