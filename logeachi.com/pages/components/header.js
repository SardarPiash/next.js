import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex justify-center items-center mx-auto max-w-screen-xl h-16">
        <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"></img>
          <h2 className="text-2xl font-semibold text-white">Logeachi.Com</h2>
      </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
