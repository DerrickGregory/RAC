import { BiSolidBriefcase, BiSolidPhone, BiLogoGmail, BiSolidTime } from "react-icons/bi";
import { BiLogoFacebook, BiLogoInstagram, BiLogoTwitter, BiLogoWhatsapp } from "react-icons/bi";

function Footer() {
  return (
    <>
  <div className="flex justify-center -mb-8 z-10 relative">
  <img
    src="/images/sticker.png"
    alt="Sticker Logo"
    className="object-contain rounded-full"
  />
</div>

<footer className="bg pt-5 text-gray-700">

  <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
    {/* Customer Service */}
    <div>
      <h3 className="text-lg font-semibold mb-3">Customer Service</h3>
      <ul className="space-y-2 text-sm">
        <li><a href="#">Customer Support</a></li>
        <li><a href="#">Help Center</a></li>
      </ul>
    </div>

    {/* Inquiry */}
    <div>
      <h3 className="text-lg font-semibold mb-3">Inquiry</h3>
      <ul className="space-y-2 text-sm">
        <li><a href="#">Ship</a></li>
        <li><a href="#">Get Quote</a></li>
        <li><a href="#">Track</a></li>
      </ul>
    </div>

    {/* Contact */}
    <div>
      <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
      <ul className="space-y-2 text-sm">
        <li className="flex items-center gap-2">
          <BiSolidPhone size={18} /> +254 000 000 777
        </li>
        <li className="flex items-center gap-2">
          <BiLogoGmail size={18} /> ke.info@rac.com
        </li>
        <li className="flex items-center gap-2">
          <BiSolidTime size={18} /> Mon-Fri 8am–6pm
        </li>
      </ul>
    </div>
  </div>

  {/* Copyright */}
  <div className="mt-10 border-t border-gray-700 py-6 text-center text-sm">
    &copy; 2025 RAC. All rights reserved.
  </div>
</footer>

</>
  );
}

export default Footer;
