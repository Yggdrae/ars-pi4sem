import { Button } from "@/components/Button";
import { HStack } from "@/components/HStack";
import { Navbar } from "@/components/Navbar";
import { VStack } from "@/components/VStack";

export default function Home() {
  return (
    <div className="flex h-full w-full justify-center items-center bg-dark-content">
      <Navbar className="border-b border-error-500">
        <HStack gap={4} className="w-full justify-center">
          <Button name="Click" size="sm" variant="outline" color="error" />
          <Button name="Click" size="sm" variant="outline" color="error" />
          <Button name="Click" size="sm" variant="outline" color="error" />
        </HStack>
      </Navbar>
      <VStack gap={6}>
        <Button
          name="Click"
          size="md"
          variant="outline"
          color="error"
          rounded
        />
        <Button
          name="Click"
          size="md"
          variant="outline"
          color="error"
          rounded
        />
        <Button
          name="Click"
          size="md"
          variant="outline"
          color="error"
          rounded
        />
      </VStack>
    </div>
  );
}
