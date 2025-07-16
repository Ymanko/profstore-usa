'use client';

import Link from 'next/link';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#378410' }} className="text-white pt-5 pb-4 mt-auto">
      <div className="container">
        <div className="row">
          {/* Left block with logo and description */}
          <div className="col-md-4 mb-4">
            <img src="/icons/logo.svg" alt="Profstore" style={{ maxWidth: '160px' }} />
            <div className="d-flex gap-3 mt-3">
              <a href="#"><i className="bi bi-facebook text-white fs-5"></i></a>
              <a href="#"><i className="bi bi-instagram text-white fs-5"></i></a>
              <a href="#"><i className="bi bi-youtube text-white fs-5"></i></a>
              <a href="#"><i className="bi bi-telegram text-white fs-5"></i></a>
            </div>
          </div>

          {/* Services */}
          <div className="col-md-2 mb-3">
            <h6 className="fw-bold">Services</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">Warranty</a></li>
              <li><a href="#" className="text-white text-decoration-none">Shipping</a></li>
              <li><a href="#" className="text-white text-decoration-none">Payment</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-md-2 mb-3">
            <h6 className="fw-bold">Resources</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">Blog</a></li>
              <li><a href="#" className="text-white text-decoration-none">Deals</a></li>
              <li><a href="#" className="text-white text-decoration-none">Video Reviews</a></li>
            </ul>
          </div>

          {/* About */}
          <div className="col-md-2 mb-3">
            <h6 className="fw-bold">About</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">Team</a></li>
              <li><a href="#" className="text-white text-decoration-none">Careers</a></li>
              <li><a href="#" className="text-white text-decoration-none">Contact Us</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-md-2 mb-3">
            <h6 className="fw-bold">Support</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">Live Chat</a></li>
              <li><a href="#" className="text-white text-decoration-none">My Account</a></li>
              <li><a href="#" className="text-white text-decoration-none">Returns</a></li>
            </ul>
          </div>
        </div>

        <hr className="border-top border-white opacity-50" />

        <div className="text-center small">
          &copy; {new Date().getFullYear()} Profstore. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;