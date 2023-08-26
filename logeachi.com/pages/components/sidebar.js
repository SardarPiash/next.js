import Link from 'next/link';

const Sidebar = () => {
  return (
    <nav className="bg-gray-800 text-white w-48 px-2 py-6 fixed inset-y-0">
      <ul className="text-white">
      <li className="mb-4">
          <Link href="/admin/profile">
            <span className="block hover:text-gray-200">User Dashboard</span>
          </Link>
        </li>
      <li className="mb-4">
          <Link href="/admin/updateUserProfile">
            <span className="block hover:text-gray-200">Update Profile</span>
          </Link>
        </li>
      <li className="mb-4">
          <Link href="/admin/unapprovedList">
            <span className="block hover:text-gray-200">Unapproved List</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/customerList">
            <span className="block hover:text-gray-200">Customer List</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/showOrderList">
            <span className="block hover:text-gray-200">Show Order List</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/sellerList">
            <span className="block hover:text-gray-200">Seller List</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/productList">
            <span className="block hover:text-gray-200">Product List</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/searchUser">
            <span className="block hover:text-gray-200">Search User</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/deleteUser">
            <span className="block hover:text-gray-200">Delete User</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/blockedUser">
            <span className="block hover:text-gray-200">Blocked User</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/logout">
            <span className="block hover:text-gray-200">Logout</span>
          </Link>
        </li>

      </ul>
    </nav>
  );
};

export default Sidebar;