import ContactSearchSvg from '@/components/svg/contactSearchSvg';
import DislikeSvg from '@/components/svg/dislikeSvg';
import LikeSvg from '@/components/svg/likeSvg';
import { Button } from '@/components/ui/button';
import React from 'react'
import Image from 'next/image';


export default function ContactPage() {
  return (
    <div className='pb-20 pt-7'>
      <div className="flex flex-col items-center gap-5">
        <h2 className="text-[32px] font-[500] text-center">GET HELP</h2>
        <div className="relative w-[90vw] mx-auto  sm:w-[457px] h-[56px]">
          <input
            type="email"
            autoComplete="off"
            placeholder="What can we help you with?"
            className="text-[15px] border pe-12 ps-2 sm:px-5 rounded-[8px] w-full h-full "
          />
          <span className="absolute right-4 top-5">
            <ContactSearchSvg />
          </span>
        </div>
      </div>
      <div className="grid sm:grid-cols-12 px-10 gap-5 mt-16">
        <div className="sm:col-span-7 md:col-span-8 ">
          <div>
            <h3 className="font-[500] text-[28px]">
              WHAT PAYMENT OPTIONS CAN I USE ON NIKE ORDERS?
            </h3>
            <div>
              <p className="text-[15px] leading-[28px] mt-8">
                We want to make buying your favourite Nike shoes and gear online
                fast and easy, and we accept the following payment options:
              </p>
              <p className="text-[15px] leading-[28px] mt-5">
                Visa, Mastercard, Diners Club, Discover, American Express, Visa
                Electron, Maestro
              </p>
              <p className="text-[15px] leading-[28px] mt-5">
                If you enter your PAN information at checkout, you'll be able to
                pay for your order with PayTM or a local credit or debit card.
                <br />
                <br />
                Apple Pay
              </p>
              <p className="mt-5">
                <span className="underline font-[500]">Nike Members</span> can
                store multiple debit or credit cards in their profile for faster
                checkout. If you're not already a Member, join us today.
              </p>
            </div>
            <div className="flex gap-4 mt-4">
              <Button>JOIN US</Button>
              <Button>SHOP NIKE</Button>
            </div>
          </div>
          <div>
            <div className="font-[500] tex-[20px] mt-8">FAQs</div>
            <div className="text-[16px] mt-5">
              <h3 className="font-[700] ">
                Does my card need international purchases enabled?
              </h3>
              <p className="text-[15px] leading-[28px]">
                Yes, we recommend asking your bank to enable international
                purchases on your card. You will be notified at checkout if
                international purchases need to be enabled.
              </p>
              <h3 className="font-[700] mt-5 ">
                Can I pay for my order with multiple methods?
              </h3>
              <p className="text-[15px] leading-[28px]">
                No, payment for Nike orders can't be split between multiple
                payment methods.
              </p>
              <h3 className="font-[700] mt-5 ">
                Does my card need international purchases enabled?
              </h3>
              <p className="text-[15px] leading-[28px]">
                Yes, we recommend asking your bank to enable international
                purchases on your card. You will be notified at checkout if
                international purchases need to be enabled.
              </p>
              <h3 className="font-[700] mt-5 ">
                What payment method is accepted for SNKRS orders?
              </h3>
              <p className="text-[15px] leading-[28px]">
                You can use any accepted credit card to pay for your SNKRS
                order.
              </p>
              <h3 className="font-[700] mt-5 ">
                Why don't I see Apple Pay as an option?
              </h3>
              <p className="text-[15px] leading-[28px]">
                To see Apple Pay as an option in the Nike App or on Nike.com,
                you'll need to use a compatible Apple device running the latest
                OS, be signed in to your iCloud account and have a supported
                card in your Wallet. Additionally, you'll need to use Safari to
                use Apple Pay on Nike.com.
              </p>
              <div className="text-[15px] mt-5">
                <p>Was this answer helpful?</p>
              </div>
            </div>
          </div>
          <div className="col-span3 flex ">
            <LikeSvg />
            <DislikeSvg />
          </div>
          <div className="text-[15px] font-[500] mt-4">
            <p className="text-[#757575]">RELATED</p>
            <p className="underline decoration-[#757575] mt-4 ml-6">
              WHAT ARE NIKE'S DELIVERY OPTIONS?
            </p>
            <p className="underline decoration-[#757575] ml-6 mt-3">
              HOW DO I GET FREE DELIVERY ON NIKE ORDERS?
            </p>
          </div>
        </div>
        <div className="sm:mt-0 mt-20  sm:col-span-5 md:col-span-4 md:px-0 px-3 sm:border-l flex flex-col gap-16">
          <div className="flex flex-col items-center gap-5">
            <h3 className="text-[28px] font-[500] text-center">CONTACT US</h3>
            <div>
              <Image src="/Image.jpg" width={64} height={64} alt="mobile" />
            </div>
            <div className="text-[16px]">000 800 919 0566</div>
            <div className="max-w-[295px]  text-center text-[16px] leading-[24px]">
              Products & Orders: 24 hours a day, 7 days a week Company Info &
              Enquiries: 07:30 - 16:30, Monday - Friday
            </div>
          </div>
          <div className="flex flex-col items-center gap-5">
            <div>
              <Image src="/message.jpg" width={64} height={64} alt="mobile" />
            </div>
            <div className=" text-center text-[16px] leading-[24px]">
              24 hours a day
              <br />7 days a week
            </div>
            <div className=" text-center text-[16px] leading-[24px]"></div>
          </div>
          <div className="flex flex-col items-center gap-5">
            <div>
              <Image src="/email-img.jpg" width={64} height={64} alt="mobile" />
            </div>
            <div className=" text-center text-[16px] leading-[24px]">
              We'll reply within
              <br />
              five business days{" "}
            </div>
            <div className=" text-center text-[16px] leading-[24px]"></div>
          </div>
          <div className="flex flex-col items-center gap-5">
            <div>
              <Image src="/location.jpg" width={64} height={64} alt="mobile" />
            </div>
            <div className=" text-center text-[16px] leading-[24px]">
              STORE LOCATOR
              <br />
              Find Nike retail stores near you{" "}
            </div>
            <div className=" text-center text-[16px] leading-[24px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
