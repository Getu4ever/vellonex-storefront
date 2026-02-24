import Image from 'next/image';

export default function EditorialHero() {
  // This is a tiny 10px Base64 version of your Unsplash image
  const blurData = "data:image/webp;base64,UklGRmYAAABXRUJQVlA4IEIAAABQAwCdASoKAAoAAUAmJaQAA3AA/v89WAAAAA6Uf79X/f///8AA/u6f//+3//9H//8AAAD//wAA";

  return (
    <section className="relative w-full h-[70vh] my-24 overflow-hidden bg-[#1a0b19]">
      {/* Optimized Background Image Container */}
      <div className="absolute inset-0 w-full h-full transition-transform duration-[2000ms] hover:scale-105">
        <Image
          src="https://images.unsplash.com/photo-1531995811006-35cb42e1a022?q=80&w=2070&auto=format&fit=crop"
          alt="Vellonex Signature Series Jewelry"
          fill
          priority
          placeholder="blur" // 1. Enable blur
          blurDataURL={blurData} // 2. Pass the tiny string
          className="object-cover"
          style={{ filter: 'brightness(0.7)' }}
          sizes="100vw"
          quality={85}
        />
      </div>
      
      {/* Text Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <span className="text-white/80 text-[10px] tracking-[0.5em] uppercase mb-6 animate-fadeIn">
          The Signature Series
        </span>
        <h2 className="text-white text-4xl md:text-5xl font-extralight tracking-tight mb-10 max-w-3xl leading-tight">
          Crafted in the shadows, <br /> designed for the light.
        </h2>
        <button className="group relative overflow-hidden border border-white/30 text-white px-12 py-4 text-[11px] tracking-[0.3em] uppercase transition-all duration-500 hover:border-white">
          <span className="relative z-10">Discover the Edit</span>
          <div className="absolute inset-0 z-0 bg-white translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
          <span className="absolute inset-0 z-20 flex items-center justify-center text-black opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            Discover the Edit
          </span>
        </button>
      </div>
    </section>
  );
}