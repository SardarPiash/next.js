import Link from 'next/link';

export default function Homepage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <a href="/" className="flex items-center mb-6 text-2xl font-semibold dark:text-white">
        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
        <span className="font-bold">Logeachi.Com</span>
      </a>
      <div className="bg-white rounded-lg p-8 shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Welcome to Logeachi.Com</h1>

        <div className="flex flex-col gap-4">
          <Link href="/User/registration">
            <button className="text-blue-600 hover:underline">Register</button>
          </Link>

          <Link href="/User/login">
            <button className="text-blue-600 hover:underline">
              <span className="flex items-center">
                <span>Login</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 10a1 1 0 011.32-.083l.094.083 3 3a1 1 0 01-1.32 1.497l-.094-.083L6.586 11H14a1 1 0 110 2H6.586l1.293 1.293a1 1 0 01-1.32 1.497l-.094-.083a1 1 0 01-.083-1.32l.083-.094 3-3a1 1 0 011.32-.083l.094.083 3 3a1 1 0 01-1.32 1.497l-.094-.083L14 13.414V6a1 1 0 112 0v7.414l1.293-1.293a1 1 0 011.32 1.497l-.083.094-3 3a1 1 0 01-1.32.083l-.094-.083-3-3a1 1 0 011.32-1.497l.094.083L13.414 14H6a1 1 0 110-2h7.414l-1.293-1.293a1 1 0 111.32-1.497l.094.083 3 3a1 1 0 11-1.32 1.497l-.094-.083L14 10.586V6a2 2 0 00-2-2H8a2 2 0 00-2 2v4.586L4.707 9.293a1 1 0 011.32-1.497l.094.083 3 3a1 1 0 01-1.32 1.497l-.094-.083-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
