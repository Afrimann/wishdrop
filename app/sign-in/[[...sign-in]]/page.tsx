import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-white px-6 py-16 text-slate-900">
      <div className="mx-auto flex w-full max-w-4xl justify-center">
        <SignIn />
      </div>
    </div>
  );
}
