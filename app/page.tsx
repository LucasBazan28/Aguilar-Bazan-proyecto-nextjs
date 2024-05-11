//import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <h1>Home</h1>
    <Link href="/login">Log in</Link> {/* This is a link to the login page*/}
    </>
  );
}
