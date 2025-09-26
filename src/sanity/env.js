export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-09-25";

// 🔍 Log to diagnose the build environment
console.log("Sanity env vars at build time:", {
  projectId,
  dataset,
  apiVersion,
});

if (!projectId || !dataset) {
  throw new Error(
    "Missing Sanity environment variables: NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET"
  );
}
