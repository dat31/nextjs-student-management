import { auth } from "@/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const { name, email } = session.user;

  return (
    <form className="lg:max-w-2xl space-y-8">
      <div className="space-y-2">
        <Label>Name</Label>
        <Input defaultValue={name as string} />
        <p className="text-muted-foreground text-[0.8rem]">
          This is your public display name. It can be your real name or a
          pseudonym. You can only change this once every 30 days.
        </p>
      </div>
      <div className="space-y-2">
        <Label>Email</Label>
        <Input disabled defaultValue={email as string} />
      </div>
      <div className="space-y-2">
        <Label>Bio</Label>
        <Textarea rows={2} />
      </div>
      <div className="space-y-2">
        <Label>URLs</Label>
        <Textarea rows={2} />
        <p className="text-muted-foreground text-[0.8rem]">
          Add links to your website, blog, or social media profiles.
        </p>
      </div>
      <Button>Update profile</Button>
    </form>
  );
}
