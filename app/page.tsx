import {auth} from "@/src/lib/auth";
import {LogoutButton} from "@/components/ui/AuthButton";

export default async function Home() {
  const session = await auth();
  return (
    <div>
    <h1>
        {session?.user ? `Hello, ${session.user.email}` : "Please sign in"}
      <LogoutButton />
    </h1>
    </div>
  );
}
