"use client";
import { useRouter } from "next/navigation";
import { ErrorStub } from "@/components";
export default function RootError({ error }: { error: Error }) {
  const router = useRouter();
  return <ErrorStub text={error.message} />;
}
