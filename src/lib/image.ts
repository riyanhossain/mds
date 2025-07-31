import imageUrlBuilder from "@sanity/image-url";
import type { SanityAsset } from "@sanity/image-url/lib/types/types";
import { client } from "@/lib/client.sanity";

export default function useSanityImage(source: SanityAsset) {
  return imageUrlBuilder(client).image(source);
}
