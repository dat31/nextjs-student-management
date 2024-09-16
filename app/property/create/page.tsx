import Layout from "@/app/ui/layout/layout";
import CreateForm from "@/app/ui/property/create";

export default async function CreatePropertyPage() {
  return (
    <Layout
      headline="Create property"
      description="Easily sell your property in few steps"
    >
      <CreateForm />
    </Layout>
  );
}
