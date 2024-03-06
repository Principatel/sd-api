import Link from "next/link";

export default async function Home() {
  return (
    <main>
      Main page
      <h1 className="text-center">
        <Link className="text-2xl " href="/userdata">
          User Input Form page
        </Link>
      </h1>
      <h1 className="text-center m-5">
        <Link className="text-2xl " href="/fetchuser">
          Fetch User form page
        </Link>
      </h1>
    </main>
  );
}
