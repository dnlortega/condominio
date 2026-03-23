import { getMessages } from "@/app/actions/messages";
import MessagesClient from "./client-page";

export default async function AdminMessagesPage() {
  const messages = await getMessages();

  return (
    <div className="container mx-auto px-4 py-8">
      <MessagesClient initialMessages={messages} />
    </div>
  );
}
