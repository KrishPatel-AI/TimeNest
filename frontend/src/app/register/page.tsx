import { RegisterForm } from "@/components/RegisterForm"

export default function page() {
  return (
    <div className="flex  flex-col items-center justify-center gap-6 bg-background p-4">
      <div className="w-full max-w-sm">
        
        <RegisterForm />
      </div>
    </div>
  )
}
