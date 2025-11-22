import { supabase } from "./supabaseClient";

export default async function deleteSessionImageFromStorage(
  sessionImageUrl: string | null
) {
  try {
    // Check if there's actually an image to delete
    if (!sessionImageUrl) {
      console.log("No session image to delete");
      return;
    }

    // Extract filename from URL safely
    const url = new URL(sessionImageUrl);
    const pathname = url.pathname;
    const fileName = pathname.split("/").pop()?.split("?")[0]; // Get last part of path before query params

    if (!fileName) {
      console.warn("Could not extract filename from URL:", sessionImageUrl);
      return;
    }

    // Delete from Supabase storage
    const { error } = await supabase.storage
      .from("Session Images")
      .remove([fileName]);

    if (error) {
      console.warn("Error deleting session image from storage:", error);
    } else {
      console.log("Successfully deleted session image:", fileName);
    }
  } catch (err) {
    console.warn("Unexpected error deleting session image:", err);
    // Don't throw - proceed with session deletion even if image deletion fails
  }
}
