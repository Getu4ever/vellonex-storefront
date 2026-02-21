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
      title: "Complimentary Delivery",
      description: "We offer complimentary, fully insured shipping on all UK orders. Each piece is handled with the utmost care from our hands to yours.",
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

        {/* Detailed Text Section */}
        <div className="max-w-3xl mx-auto space-y-16">
          <section>
            <h3 className="text-xl font-serif text-[#3B1438] mb-6 border-l-2 border-[#3B1438] pl-4">Shipping Timelines</h3>
            <div className="space-y-4 text-sm font-light text-gray-600 leading-relaxed">
              <p>
                <strong>UK Mainland:</strong> Orders placed before 1 PM GMT are typically dispatched same-day for next-working-day delivery.
              </p>
              <p>
                <strong>International:</strong> We ship globally via DHL Express. Delivery timelines vary by region but generally arrive within 3-5 business days.
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
            </div>
          </section>

          {/* Call to Action */}
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