import Image from 'next/image';

export function GridTileImage({
  active,
  label,
  src,
  alt,
  width,   // Pull width out here...
  height,  // ...and height here so they don't go into {...props}
  ...props
}: {
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: 'bottom' | 'center';
  };
  src: string;
  alt: string;
} & React.ComponentProps<typeof Image>) {
  return (
    <div className="group flex h-full w-full items-center justify-center overflow-hidden bg-[#3a1838]">
      {src ? (
        <div className="relative h-full w-full aspect-[4/5]">
          {/* PRIMARY IMAGE */}
          <Image
            className={`transition duration-700 ease-in-out group-hover:scale-100 ${
              active ? 'scale-100' : 'scale-90'
            } object-contain`}
            src={src}
            alt={alt}
            fill // This requires width/height to be empty
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            {...props} // Now width and height are excluded from this
          />
          
          {/* LUXURY OVERLAY (Labels) */}
          {label ? (
            <div className="absolute bottom-0 left-0 flex w-full flex-col items-center justify-center p-6 text-center opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-t from-black/80 to-transparent">
               <h3 className="text-[10px] text-white tracking-[0.3em] uppercase font-medium">
                {label.title}
              </h3>
              <p className="mt-2 text-[9px] text-white/60 tracking-[0.2em]">
                {label.amount} {label.currencyCode}
              </p>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}