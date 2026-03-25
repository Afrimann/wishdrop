import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-white px-6 py-16 text-slate-900">
      <div className="mx-auto flex w-full max-w-4xl justify-center">
        <SignUp />
      </div>
    </div>
  );
}
