export function createProductSlug(name: string, id: number) {
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  return `${slug}-${id}`;
}

export function getIdFromSlug(slug: string) {
  const id = slug.split("-").pop();
  return Number(id);
}