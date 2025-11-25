// src/pages/Service.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Service() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg p-10 md:p-16">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold">Our Services</h1>
          <p className="mt-4 text-indigo-100 max-w-3xl mx-auto">
            Raynott Decmart makes shopping simple — from browsing to delivery. We focus on secure payments,
            timely delivery, and helpful support so you get what you need without hassle.
          </p>
          <div className="mt-6">
            <Link to="/products" className="inline-block px-6 py-3 bg-white text-indigo-600 rounded-2xl font-semibold shadow">
              Start Shopping
            </Link>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-800">What we offer</h2>
        <p className="mt-3 text-gray-600">
          We provide a streamlined shopping experience built around three priorities: reliability, security,
          and convenience. Below is a short summary of our core services.
        </p>

        <div className="mt-6 space-y-4 text-gray-700">
          <div>
            <h3 className="font-medium">Fast & Reliable Delivery</h3>
            <p className="text-sm text-gray-600 mt-1">
              Local dispatch and trusted courier partners — typical delivery in 2–5 business days (varies by location).
            </p>
          </div>

          <div>
            <h3 className="font-medium">Secure Payments</h3>
            <p className="text-sm text-gray-600 mt-1">
              Payments are processed through tokenized gateways. We never store sensitive card data on our servers.
            </p>
          </div>

          <div>
            <h3 className="font-medium">Simple Returns</h3>
            <p className="text-sm text-gray-600 mt-1">
              Easy return process from your Orders page. Return windows vary by product — full instructions provided per order.
            </p>
          </div>

          <div>
            <h3 className="font-medium">Customer Support</h3>
            <p className="text-sm text-gray-600 mt-1">
              Reach us by email or phone — our support team helps with order issues, returns, and product questions.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ (simple) */}
      <section className="max-w-5xl mx-auto">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Frequently asked questions</h3>
        <div className="space-y-2 text-gray-600">
          <details className="p-3 border rounded">
            <summary className="cursor-pointer">How long does delivery take?</summary>
            <p className="mt-2 text-sm">Delivery times usually range from 2–5 business days depending on your location.</p>
          </details>

          <details className="p-3 border rounded">
            <summary className="cursor-pointer">What payment methods are accepted?</summary>
            <p className="mt-2 text-sm">We accept major cards, UPI and popular digital wallets via secure gateways.</p>
          </details>

          <details className="p-3 border rounded">
            <summary className="cursor-pointer">How do I request a return?</summary>
            <p className="mt-2 text-sm">Open the Orders page, select the order, and tap "Request Return". Follow on-screen steps.</p>
          </details>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto bg-indigo-50 p-6 rounded-lg text-center">
        <h4 className="font-semibold text-indigo-800">Need more help?</h4>
        <p className="text-sm text-indigo-700 mt-2">Contact our support or sales team and we’ll assist you promptly.</p>
        <div className="mt-4">
          <a href="mailto:support@raynottdecmart.com" className="inline-block px-5 py-2 bg-indigo-600 text-white rounded-2xl">
            Contact Support
          </a>
        </div>
      </section>
    </div>
  );
}
