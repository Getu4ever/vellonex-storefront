// components/cart/CartProviderWrapper.tsx
import { getCart } from "lib/shopify";
import { cookies } from "next/headers";
import { CartProvider } from "./cart-context";

export default async function CartProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;

  const cartPromise = getCart(cartId);

  return (
    <CartProvider cartPromise={cartPromise}>
      {children}
    </CartProvider>
  );
}
