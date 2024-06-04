import Link from 'next/link';

export default function SignInButton() {
    return (
        <Link href="/login" passHref>
            <button className="log-in-button text-sm lg:text-md">Log In</button>
        </Link>
    );
}