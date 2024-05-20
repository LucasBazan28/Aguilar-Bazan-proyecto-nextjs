//import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import "daisyui/dist/full.css";

export default function Home() {
  return (
    <>
    <div>

    </div>
    <div className="container">
    <h1>Home</h1>
    <Link href="/login" passHref>
    <button className="btn btn-outline btn-xs sm:btn-sm">Log In</button>
    </Link> {/* This is a link to the login page*/}
      </div>
    </>
  );
}
