import { auth } from '../../auth';
import { SignOutButton } from './SignOutButtonComponent';
import SignInButton from './SignInButtonComponent';

export async function SignInOutButton() {
    const isLoggedIn = await auth() != null;
    if (isLoggedIn) {
        return SignOutButton();
    } else {
        return SignInButton();
    }
}