import { createClient } from "@supabase/supabase-js";
const bucket = "airbnb-clone";
const url = process.env.SUPABASE_URL as string;
const key = process.env.SUPABASE_KEY as string;

const supabase = createClient(url, key);

export async function uploadImage(image: File) {
  const fileName = `${Date.now()}-${image.name}`;
  const { data } = await supabase.storage.from(bucket).upload(fileName, image);
  if (!data) throw new Error("Image upload failed.");
  return supabase.storage.from(bucket).getPublicUrl(fileName).data.publicUrl;
}

// import { createClient } from "@supabase/supabase-js";

// const bucket = "airbnb-clone";

// const url = process.env.SUPABASE_URL as string;
// const key = process.env.SUPABASE_KEY as string;

// const supabase = createClient(url, key);

// export const uploadImage = async (image: File) => {
//   const timestamp = Date.now();
//   const newName = `${timestamp}-${image.name}`;

//   const { data, error } = await supabase.storage
//     .from(bucket)
//     .upload(newName, image);
//   if (!data) throw new Error("Image upload failed");

//   console.log(
//     supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl
//   );

//   return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
// };
