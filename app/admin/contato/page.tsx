import { getContactSettings } from "@/app/actions/contact";
import ContactConfig from "./client-page";

export default async function AdminContatoPage() {
  const initialData = await getContactSettings();

  return (
    <div className="container mx-auto px-4 py-8">
      <ContactConfig initialData={initialData} />
    </div>
  );
}
