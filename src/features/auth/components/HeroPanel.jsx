import React from "react";
import { MdRecycling, MdNaturePeople, MdPublic } from "react-icons/md";

const HeroPanel = () => {
  return (
    <div className="relative hidden lg:flex lg:w-[55%] min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

      <div className="relative z-10 flex flex-col justify-between p-10 w-full">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-700">
            <MdRecycling size={20} className="text-white" />
          </div>
          <span className="text-lg font-bold text-white">EcoCycle Hub</span>
        </div>

        <div className="rounded-2xl bg-white/12 backdrop-blur-md border border-white/20 p-7">
          <p className="text-3xl font-extrabold text-white mb-3">
            Turning today's waste into tomorrow's resource.
          </p>

          <div className="flex gap-3 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20">
              <MdNaturePeople
                size={13}
                className="text-white"
                aria-hidden="true"
              />
              <span className="text-xs text-white">Carbon Neutral</span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20">
              <MdPublic size={13} className="text-white" aria-hidden="true" />
              <span className="text-xs text-white">Global Reach</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroPanel;
