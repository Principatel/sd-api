import Link from "next/link";

export default async function Home() {
  return (
    <main>
      Main page
      <h1 className="text-center">
        <Link className="text-2xl " href="/userdata">
          Go to User Input Form page
        </Link>
      </h1>
    </main>
  );
}
