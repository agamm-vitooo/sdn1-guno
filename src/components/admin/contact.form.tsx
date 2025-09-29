"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at?: string;
}

interface ContactFormProps {
  selectedContact: Contact | null;
  setSelectedContact: (c: Contact | null) => void;
  refresh: () => void;
}

export default function ContactForm({
  selectedContact,
  setSelectedContact,
  refresh,
}: ContactFormProps) {
  const [formData, setFormData] = useState<Contact>({
    id: 0,
    name: "",
    email: "",
    message: "",
  });

  const isEditing = !!selectedContact;

  useEffect(() => {
    if (selectedContact) {
      setFormData(selectedContact);
    } else {
      setFormData({ id: 0, name: "", email: "", message: "" });
    }
  }, [selectedContact]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing) {
      // UPDATE
      const { error } = await supabase
        .from("contacts")
        .update({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        })
        .eq("id", formData.id);
      if (error) console.error(error);
    } else {
      // INSERT
      const { error } = await supabase.from("contacts").insert([
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
      ]);
      if (error) console.error(error);
    }

    setSelectedContact(null);
    refresh();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 bg-white p-6 rounded-xl shadow space-y-4"
    >
      <h2 className="text-xl font-semibold mb-2">
        {isEditing ? "Edit Pesan" : "Tambah Pesan Baru"}
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Nama"
        value={formData.name}
        onChange={handleChange}
        className="w-full border border-gray-300 p-3 rounded-lg"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border border-gray-300 p-3 rounded-lg"
        required
      />
      <textarea
        name="message"
        placeholder="Pesan"
        value={formData.message}
        onChange={handleChange}
        className="w-full border border-gray-300 p-3 rounded-lg"
        rows={4}
        required
      ></textarea>

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          {isEditing ? "Update" : "Tambah"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={() => setSelectedContact(null)}
            className="bg-gray-400 text-white px-5 py-2 rounded-lg hover:bg-gray-500"
          >
            Batal
          </button>
        )}
      </div>
    </form>
  );
}
