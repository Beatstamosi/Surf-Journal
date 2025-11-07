import { supabase } from "./supabaseClient";

export default async function deleteProfilePictureFromStorage(
  profilePictureUrl: string
) {
  // Don't delete default avatar
  if (profilePictureUrl.includes("default_avatar.jpg")) {
    return;
  }

  try {
    // Extract filename from old URL
    const urlParts = profilePictureUrl.split("/");
    const oldFileName = urlParts[urlParts.length - 1].split("?")[0]; // Remove query params
    await supabase.storage.from("Profile Pictures").remove([oldFileName]);
  } catch (deleteErr) {
    console.warn("Could not delete old profile picture:", deleteErr);
    // No throw - proceed with update even if deletion fails
  }
}
