import { Button } from "@/components/Button";

export default function Home() {
  return (
    <div className="flex h-full w-full justify-center items-center bg-dark-content">
      <Button name="Click" size="md" variant="outline" color="error" rounded/>
    </div>
  );
}
