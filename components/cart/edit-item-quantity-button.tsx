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
        "flex h-full min-w-[36px] max-w-[36px] items-center justify-center rounded-full p-2 transition-all duration-200 hover:opacity-80",
        {
          "ml-auto": type === "minus",
        }
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
  optimisticUpdateAction: (
    merchandiseId: string,
    updateType: "plus" | "minus" | "delete"
  ) => void;
}) {
  const [, formAction] = useActionState(updateItemQuantity, null);

  return (
    <form
      action={async () => {
        const isRemovingLastItem =
          type === "minus" && item.quantity === 1;

        // 1️⃣ Optimistic UI update
        optimisticUpdateAction(
          item.merchandise.id,
          isRemovingLastItem ? "delete" : type
        );

        // 2️⃣ Server mutation
        await formAction({
          merchandiseId: item.merchandise.id,
          quantity: isRemovingLastItem
            ? 0 // handled as delete in action
            : type === "plus"
            ? item.quantity + 1
            : item.quantity - 1,
        });
      }}
    >
      <SubmitButton type={type} />
    </form>
  );
}