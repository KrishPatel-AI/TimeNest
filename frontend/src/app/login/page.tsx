import { LoginForm } from "@/components/LoginForm";

export default function page() {
  return (
    <div className="flex  flex-col items-center justify-center gap-6 p-4  ">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <LoginForm />
      </div>
    </div>
  );
}
