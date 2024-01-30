import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page() {
  // Fetch home page type data
  const client = createClient();
  const page = await client.getSingle("home");


  return <SliceZone slices={page.data.slices} components={components} />;
}

// Dynamic metadata from home page type
export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("home");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}
