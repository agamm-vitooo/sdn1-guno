"use client";

import { useState } from "react";
import ContactForm from "../../../components/admin/contact.form";
import ContactList from "../../../components/admin/contact.list";

interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at?: string;
}

export default function AdminContactsPage() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refresh = () => setRefreshTrigger((prev) => prev + 1);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manajemen Pesan Kontak</h1>

      <ContactForm
        selectedContact={selectedContact}
        setSelectedContact={setSelectedContact}
        refresh={refresh}
      />

      <ContactList
        setSelectedContact={setSelectedContact}
        refreshTrigger={refreshTrigger}
      />
    </div>
  );
}
