import Link from 'next/link';

export default function Homepage() {
  return (
    <div>
      <h1>This is the Homepage</h1>
      <h2>
        <a href="registration">
          registration</a>
      </h2>
      <h2>
        <a href="login">
          login</a>
      </h2>
    </div>
  );
}

  