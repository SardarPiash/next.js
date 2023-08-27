import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <nav className="bg-gray-800 text-white w-48 px-2 py-6 fixed inset-y-0 h-full">
      <ul className="text-white">
        <li className="mb-4">
          <Link href="/admin/profile">
            <button className="block w-full text-left hover:text-gray-200 focus:outline-none text-sm font-medium">
              User Dashboard
            </button>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/updateUserProfile">
            <button className="block w-full text-left hover:text-gray-200 focus:outline-none text-sm font-medium">
              Update Profile
            </button>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/unapprovedList">
            <button className="block w-full text-left hover:text-gray-200 focus:outline-none text-sm font-medium">
              Unapproved List
            </button>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/customerList">
            <button className="block w-full text-left hover:text-gray-200 focus:outline-none text-sm font-medium">
              Customer List
            </button>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/showOrderList">
            <button className="block w-full text-left hover:text-gray-200 focus:outline-none text-sm font-medium">
              Show Order List
            </button>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/sellerList">
            <button className="block w-full text-left hover:text-gray-200 focus:outline-none text-sm font-medium">
              Seller List
            </button>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/productList">
            <button className="block w-full text-left hover:text-gray-200 focus:outline-none text-sm font-medium">
              Product List
            </button>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/searchUser">
            <button className="block w-full text-left hover:text-gray-200 focus:outline-none text-sm font-medium">
              Search User
            </button>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/deleteUser">
            <button className="block w-full text-left hover:text-gray-200 focus:outline-none text-sm font-medium">
              Delete User
            </button>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/blockedUser">
            <button className="block w-full text-left hover:text-gray-200 focus:outline-none text-sm font-medium">
              Blocked User
            </button>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/logout">
            <button className="block w-full text-left hover:text-gray-200 focus:outline-none text-sm font-medium">
              Logout
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
