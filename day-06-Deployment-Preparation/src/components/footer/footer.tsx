"use client"
import { TwitterIcon } from 'lucide-react';
import React from 'react'
import TwitterSvg from '../svg/twitterSvg';
import FacebookSvg from '../svg/facebookSvg';
import Youtube from '../svg/youtube';
import InstagramSvg from '../svg/instagramSvg';
import LocationSvg from '../svg/locationSvg';
import Image from 'next/image';
import { usePathname } from 'next/navigation';


function Footer() {
  const path = usePathname()
  return (
    <footer className="bg-black">
      {!(path === '/checkout')? 
      <div>
        <div className="flex md:flex-row  flex-col  items-center md:items-baseline md:gap-3 lg:gap-0  justify-between px-14">
          <div className="flex lg:flex-nowrap flex-wrap gap-x-28 md:gap-x-24 gap-y-14 items-baseline   lg:gap-28 justify-center py-24">
            <div className="text-[10px] flex flex-col items-center sm:items-start gap-8 text-[#FFFFFF] font-[400]">
              <h2>Find A Store</h2>
              <ul className="items-center sm:items-start flex flex-col  gap-5">
                <li>Become A Member</li>
                <li>Sign Up for Email</li>
                <li>Send Us Feedback</li>
                <li>Student Discounts</li>
              </ul>
            </div>
            <div className="text-[10px] flex flex-col items-center sm:items-start gap-8 text-[#FFFFFF] font-[400]">
              <h2>Get Help</h2>
              <ul className="items-center text-[#7E7E7E] sm:items-start flex flex-col  gap-5">
                <li>Order Status</li>
                <li>Delivery</li>
                <li>Returns</li>
                <li>Payment Options</li>
                <li>Contact Us On Nike.com Inquiries</li>
                <li>Contact Us On All Other Inquiries</li>
              </ul>
            </div>
            <div className="text-[10px] flex flex-col items-center sm:items-start gap-8 text-[#FFFFFF] font-[400]">
              <h2>About Nike</h2>
              <ul className="items-center text-[#7E7E7E] sm:items-start flex flex-col  gap-5">
                <li>News</li>
                <li>Careers</li>
                <li>Investors</li>
                <li>Sustainability</li>
              </ul>
            </div>
          </div>
          <div className="flex gap-4 pb-16">
            <TwitterSvg />
            <FacebookSvg />
            <Youtube />
            <InstagramSvg />
          </div>
        </div>
        <div className="flex flex-wrap sm:flex-nowrap  items-center sm:justify-between px-8 md:px-14 pb-8">
          <div className="text-[12px font-[400] gap-7 text-center sm:text-start flex  flex-wrap sm:flex-nowrap justify-center sm:justify-start items-center text-white">
            <div className="flex gap-2 items-center">
              <span>
                <LocationSvg />
              </span>
              <p className="text-[11px]">India</p>
            </div>
            <div className="text-[#7E7E7E] text-[11px] ">
              © 2023 Nike, Inc. All Rights Reserved
            </div>
          </div>

          <div className="text-[#7E7E7E]  hidden text-[11px] sm:flex items-center gap-7">
            <div>Guides</div>
            <div>Terms of Sale</div>
            <div>Terms of Use</div>
            <div>Nike Privacy Policy</div>
          </div>
        </div>
      </div>
      :
      <div className="flex  lg:flex-row flex-col items-center  gap-5 lg:gap-2 justify-between py-5">
        <div className="flex flex-wrap sm:flex-nowrap  items-center  px-8 md:px-5 ">
          <div className="text-[9px] font-[400] gap-5 text-center sm:text-start flex  flex-wrap sm:flex-nowrap justify-center sm:justify-start items-center text-white">
            <div className="flex gap-2 items-center">
              <span>
                <LocationSvg />
              </span>
              <p className="text-[9px]">India</p>
            </div>
            <div className="text-[#7E7E7E] text-[11px] ">
              ©&nbsp;2023&nbsp;Nike,&nbsp;Inc.&nbsp;All&nbsp;Rights&nbsp;Reserved
            </div>
          </div>

          <div className="text-[#7E7E7E]  hidden text-[9px] sm:flex items-center gap-7">
            <div>Guides</div>
            <div>Terms&nbsp;of&nbsp;Sale</div>
            <div>Terms&nbsp;of&nbsp;Use</div>
            <div>Nike&nbsp;Privacy&nbsp;Policy</div>
          </div>
        </div>
        <div className="flex flex-wrap lg:flex-nowrap justify-center lg:justify-start  gap-3 lg:pe-6  items-center">
          <div>
            <Image src="/payment1.jpg" alt="payment" width={45} height={45} />
          </div>
          <div>
            <Image src="/payment2.jpg" alt="payment" width={45} height={45} />
          </div>
          <div>
            <Image src="/payment3.jpg" alt="payment" width={45} height={45} />
          </div>
          <div>
            <Image src="/payment5.jpg" alt="payment" width={45} height={45} />
          </div>
          <div>
            <Image src="/payment6.jpg" alt="payment" width={45} height={45} />
          </div>
          <div>
            <Image src="/payment.jpg" alt="payment" width={45} height={45} />
          </div>
          <div>
            <Image src="/payment10.png" alt="payment" width={45} height={45} />
          </div>
          <div>
            <Image src="/payment11.jpg" alt="payment" width={45} height={45} />
          </div>
          <div>
            <Image src="/payment12.jpg" alt="payment" width={45} height={45} />
          </div>
          <div>
            <Image src="/payment14.jpg" alt="payment" width={45} height={45} />
          </div>
        </div>
      </div>
}
    </footer>
  );
}

export default Footer