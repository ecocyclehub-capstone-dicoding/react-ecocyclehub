import { MdRecycling, MdNaturePeople, MdPublic } from "react-icons/md";

/**
 * HeroPanel - panel kiri split-screen layout
 * @param {string} imageUrl   - URL background foto
 * @param {string} title      - judul besar
 * @param {string} subtitle   - deskripsi
 * @param {string} widthClass - Tailwind width, default 'lg:w-[55%]'
 * @param {node}  children   - konten tambahan di bawah subtitle (opsional)
 */
const HeroPanel = ({
  imageUrl = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=80",
  title = "Turning today's waste into tomorrow's resource.",
  subtitle = "Join our curated ecosystem of sustainable resource management. Track, manage, and optimize your ecological footprint with precision.",
  widthClass = "lg:w-[55%]",
  showBadges = true,
}) => (
  <div
    className={`relative hidden lg:flex ${widthClass} min-h-screen overflow-hidden`}
  >
    {/* Background */}
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url('${imageUrl}')` }}
    />
    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

    {/* Konten */}
    <div className="relative z-10 flex w-full flex-col justify-between p-10">
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-700">
          <MdRecycling size={20} className="text-white" />
        </div>
        <span className="text-lg font-bold tracking-tight text-white">
          EcoCycle Hub
        </span>
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-white/20 bg-white/10 p-7 backdrop-blur-md">
        <p className="mb-3 text-3xl font-extrabold leading-tight text-white">
          {title}
        </p>
        <p className="mb-6 text-sm leading-relaxed text-white/70">{subtitle}</p>

        {showBadges && (
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-full border border-white/22 bg-white/15 px-4 py-2">
              <MdNaturePeople size={13} className="text-green-300" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-white">
                Carbon Neutral
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/22 bg-white/15 px-4 py-2">
              <MdPublic size={13} className="text-green-300" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-white">
                Global Reach
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default HeroPanel;
