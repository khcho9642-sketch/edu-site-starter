import materials from "../content/chatgpt/materials.json" with { type: "json" };

export const CHATGPT_MATERIALS = materials;
export const getChatgptMaterial = (slug: string) => materials.find((m) => m.slug === slug);
