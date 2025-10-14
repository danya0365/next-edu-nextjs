import { WishlistView } from "@/src/presentation/components/wishlist/WishlistView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wishlist | Next Edu",
  description: "คอร์สที่คุณสนใจและอยากเรียนในภายหลัง",
};

export default async function WishlistPage() {
  return <WishlistView />;
}
