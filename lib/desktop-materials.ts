import materials from "../content/desktop/materials.json" with { type: "json" };

export const DESKTOP_MATERIALS = materials;
export const getDesktopMaterial = (slug: string) => materials.find((m) => m.slug === slug);
