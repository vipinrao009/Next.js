"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.replace("/sign-in"); // sirf jab session null ho tabhi redirect
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome {session?.user?.username}</h1>
    </div>
  );
}
