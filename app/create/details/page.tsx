import { Suspense } from "react";
import CreateDetailsForm from "./CreateDetailsForm";

export default function CreateDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white text-slate-900">
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-12 lg:px-10 lg:py-16">
            <div className="h-6 w-32 animate-pulse rounded bg-slate-100" />
            <div className="h-10 w-72 animate-pulse rounded bg-slate-100" />
            <div className="h-4 w-80 animate-pulse rounded bg-slate-100" />
          </div>
        </div>
      }
    >
      <CreateDetailsForm />
    </Suspense>
  );
}
