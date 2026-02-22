'use client';

import {
  ArrowPathIcon,
  GiftIcon,
  ShieldCheckIcon,
  TruckIcon
} from '@heroicons/react/24/outline';

export default function ShippingReturnsPage() {
  const policies = [
    {
      title: "Delivery Services",
      description: "We offer complimentary, fully insured shipping on UK orders over £50. Each piece is handled with the utmost care from our hands to yours.",
      icon: TruckIcon,
    },
    {
      title: "Discreet Packaging",
      description: "Your Vellonex piece arrives in a signature gift box, housed within a neutral, unbranded outer package to ensure a secure and private delivery.",
      icon: GiftIcon,
    },
    {
      title: "Our Return Promise",
      description: "If your selection is not perfectly suited, we offer a 14-day return window. Items must be in their original, unworn condition with all security tags intact.",
      icon: ArrowPathIcon,
    },
    {
      title: "Secure Signature",
      description: "For your peace of mind, all deliveries require an adult signature. We ensure your jewelry never leaves our sight until it is safely in yours.",
      icon: ShieldCheckIcon,
    }
  ];

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Hero Header */}
      <section className="py-20 bg-[#F9F6F2] text-center px-4">
        <h1 className="text-5xl font-serif uppercase tracking-widest text-[#3B1438] mb-4">
          Shipping & Returns
        </h1>
        <p className="max-w-2xl mx-auto text-gray-600 font-light italic">
          Ensuring your Vellonex experience is as seamless as it is beautiful.
        </p>
      </section>

      {/* Grid Policies */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {policies.map((policy, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-4">
              <policy.icon className="w-10 h-10 text-[#3B1438] stroke-[1px]" />
              <h2 className="text-sm font-medium uppercase tracking-widest text-[#3B1438]">
                {policy.title}
              </h2>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                {policy.description}
              </p>
            </div>
          ))}
        </div>

        <hr className="my-20 border-gray-100" />

        {/* Detailed Text Section - Side-by-Side on Desktop */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start pb-16">
          <section>
            <h3 className="text-xl font-serif text-[#3B1438] mb-6 border-l-2 border-[#3B1438] pl-4">Shipping Timelines & Rates</h3>
            <div className="space-y-6 text-sm font-light text-gray-600 leading-relaxed">
              <div className="space-y-2">
                <p><strong>United Kingdom:</strong></p>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Standard (2-4 Days): FREE on orders £50+</li>
                  <li>Standard (2-4 Days): £4.99 on orders under £50</li>
                  <li>Express (1-2 Days): £6.99</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <p><strong>European Union:</strong></p>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Standard International (3-5 Days): FREE on orders £100+</li>
                  <li>Standard International (3-5 Days): £14.99 on orders under £100</li>
                </ul>
              </div>

              <div className="space-y-2">
                <p><strong>International:</strong></p>
                <p className="text-xs italic text-gray-500 mb-1">USA, Canada, Australia, UAE, Japan, South Korea, Singapore, Switzerland, Norway & Rest of World</p>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Standard International (5-11 Days): £23.99</li>
                  <li>Express International (3-5 Days): FREE on orders £200+</li>
                </ul>
              </div>

              <p className="italic text-xs mt-4">
                * International orders may be subject to local import duties and taxes. These charges are determined by your local customs office and are the responsibility of the recipient.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-serif text-[#3B1438] mb-6 border-l-2 border-[#3B1438] pl-4">How to Return</h3>
            <div className="space-y-4 text-sm font-light text-gray-600 leading-relaxed">
              <p>
                1. Contact the <span className="font-medium text-[#3B1438]">Vellonex Concierge</span> via our contact page to request a Return Authorization.
              </p>
              <p>
                2. Place the item in its original Vellonex gift box and ensure the security seal is not broken.
              </p>
              <p>
                3. Use the prepaid shipping label provided by our team to schedule a collection or drop-off.
              </p>
              <p>
                All returns must be initiated within 14 days of delivery and remain in their original, unworn condition with all security tags intact.
              </p>
            </div>
          </section>
        </div>

        {/* Call to Action - Centered below */}
        <div className="max-w-3xl mx-auto">
            <div className="bg-[#F9F6F2] p-10 text-center rounded-sm">
                <h4 className="text-[#3B1438] uppercase tracking-widest text-sm mb-4">Questions?</h4>
                <p className="text-sm font-light text-gray-600 mb-6">
                Our team is available to assist with any logistical inquiries.
                </p>
                <a 
                href="/contact" 
                className="inline-block border border-[#3B1438] px-8 py-3 text-[#3B1438] text-xs uppercase tracking-[0.2em] hover:bg-[#3B1438] hover:text-white transition-all"
                >
                Contact Concierge
                </a>
            </div>
        </div>
      </div>
    </div>
  );
}