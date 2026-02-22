"use client";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { updateItemQuantity } from "components/cart/actions";
import type { CartLine } from "lib/shopify/types";
import { useActionState } from "react";

function SubmitButton({ type }: { type: "plus" | "minus" }) {
  return (
    <button
      type="submit"
      aria-label={
        type === "plus" ? "Increase item quantity" : "Reduce item quantity"
      }
      className={clsx(
        "ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full p-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80",
        {
          "ml-auto": type === "minus",
        },
      )}
    >
      {type === "plus" ? (
        <PlusIcon className="h-4 w-4 dark:text-neutral-500" />
      ) : (
        <MinusIcon className="h-4 w-4 dark:text-neutral-500" />
      )}
    </button>
  );
}

export function EditItemQuantityButton({
  item,
  type,
  optimisticUpdateAction,
}: {
  item: CartLine;
  type: "plus" | "minus";
  optimisticUpdateAction: (merchandiseId: string, updateType: "plus" | "minus" | "delete") => void;
}) {
  // Use useActionState to track the server action status
  const [message, formAction] = useActionState(updateItemQuantity, null);

  return (
    <form
      action={async () => {
        // 1. Run the UI update immediately (Optimistic UI)
        optimisticUpdateAction(item.merchandise.id, type);

        // 2. Pass the payload directly to the action as an object
        // This matches the (prevState, payload) signature in actions.ts
        await formAction({
          merchandiseId: item.merchandise.id,
          quantity: type === "plus" ? item.quantity + 1 : item.quantity - 1,
        });
      }}
    >
      <SubmitButton type={type} />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}