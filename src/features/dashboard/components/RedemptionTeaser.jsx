import React from "react";

/**
 * RedemptionTeaser — CTA banner encouraging users to redeem their eco-points.
 * @param {{ onExploreRewards: () => void, onPartnerStores: () => void }} props
 */
const RedemptionTeaser = ({ onExploreRewards, onPartnerStores }) => {
  return (
    <section className="mt-16 bg-surface-container-highest rounded-3xl p-10 flex flex-col md:flex-row items-center gap-10">
      {/* Image */}
      <div className="w-full md:w-1/3 aspect-square rounded-2xl overflow-hidden shadow-xl shrink-0">
        <img
          alt="Fresh organic vegetables ready to redeem"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKZXoCZIPdU7Caqw6gpwEcQKbScXdImMhRvJoOMn-jMIY3aNOuDdn_KZ2Brj2Iw5cK3fI4Vg0-FHZPChVzF2Ytgg2eI8CpRoLsTqVsxd8IEVi493Hel5wox7Oscb59Y6wy_-4sUygqVANFycC6oaZFppy-YTZOEihjfPiQfO1qIpFW1fO9a1sthL9AM9FU1cM_zegyKv_V_Ax8d03O78_tx1GCazLjo3z5KWUg-aK2O_ipvo5cvXYloUx0erP_ai2gfQIii4gO2o7O"
        />
      </div>

      {/* Copy + Actions */}
      <div className="flex-1">
        <h2 className="text-4xl font-black text-primary mb-4">Ready to redeem?</h2>
        <p className="text-xl text-on-surface-variant mb-8 max-w-lg">
          Exchange your Eco-Points for discounts at local partner stores, sustainable products,
          or donate them to global reforestation projects.
        </p>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={onExploreRewards}
            className="px-8 py-4 bg-primary text-on-primary rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 cursor-pointer hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined">redeem</span>
            Explore Rewards
          </button>

          <button
            onClick={onPartnerStores}
            className="px-8 py-4 bg-white text-primary border-2 border-primary rounded-2xl font-bold cursor-pointer hover:bg-surface-container-low transition-colors"
          >
            Partner Stores
          </button>
        </div>
      </div>
    </section>
  );
};

export default RedemptionTeaser;
