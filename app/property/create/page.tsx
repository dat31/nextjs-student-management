import CreateForm from "@/app/ui/property/create";

export default async function PropertyPage() {
  return (
    <div className="bg-gradient-to-b to-primary-light-2">
      <div className="container mx-auto py-22">
        <CreateForm />
      </div>
    </div>
  );
}
