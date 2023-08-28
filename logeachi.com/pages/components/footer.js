import Link from 'next/link';

const Footer = () => {
  return (
    <div className="relative bg-gray-800">
      <div className="relative container mx-auto px-4 py-8 lg:py-16">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/2 lg:w-1/4 mb-8 lg:mb-0">
            <h2 className="text-xl font-semibold text-white mb-4">Contact Us</h2>
            <p className="text-gray-400 leading-6">
              3/9, Tajmohol Road<br />
              support@example.com<br />
              (123) 456-7890
            </p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 mb-8 lg:mb-0">
            <h2 className="text-xl font-semibold text-white mb-4">Useful Links</h2>
            <ul className="list-none">
              <li className="mb-2">
                <Link href="#">
                  <span className="text-gray-400 hover:text-white">About Us</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#">
                  <span className="text-gray-400 hover:text-white">Our Services</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#">
                  <span className="text-gray-400 hover:text-white">Blog</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#">
                  <span className="text-gray-400 hover:text-white">Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 mb-8 lg:mb-0">
            <h2 className="text-xl font-semibold text-white mb-4">Social Media</h2>
            <ul className="list-none">
              <li className="mb-2">
                <span href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-facebook-f mr-2"></i> Facebook
                </span>
              </li>
              <li className="mb-2">
                <span href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-twitter mr-2"></i> Twitter
                </span>
              </li>
              <li className="mb-2">
                <span href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-instagram mr-2"></i> Instagram
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 lg:mt-16">
          <p className="text-gray-400 text-center">
            &copy; 2023 Quick fix. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;