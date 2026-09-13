interface HeaderProps {
  streakCount: number;
  totalPoints: number;
  currentLevel: number;
  completionRate: number;
}

export default function Header({
  streakCount,
  totalPoints,
  currentLevel,
  completionRate
}: HeaderProps) {
  return (
    <div className="relative z-20 border-b border-purple-500/30 backdrop-blur-md bg-gradient-to-r from-slate-950/80 via-purple-900/80 to-slate-950/80">

      <div className="container mx-auto px-4 py-6">

        {/* Header Top */}
        <div className="flex items-center justify-between mb-6">

          {/* Logo + Title */}
          <div className="flex items-center gap-5">

            {/* Logo */}
            <div className="relative flex items-center justify-center">

              {/* Glow */}
              <div className="absolute w-28 h-28 bg-purple-600 rounded-full blur-2xl opacity-40 animate-pulse"></div>

              {/* Circular Logo */}
              <div className="relative w-28 h-28 rounded-full overflow-hidden flex items-center justify-center shadow-lg shadow-purple-500/50">
                <img
                  src="/logo.png"
                  alt="ROVEX RISE"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

            </div>

            {/* Title */}
            <div>
              <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
                ROVEX RISE
              </h1>

              <p className="text-purple-300/70 text-sm font-semibold tracking-widest">
                RISE. GRIND. DOMINATE.
              </p>
            </div>

          </div>

          {/* Stats Display */}
          <div className="hidden md:flex gap-6">

            {/* Level */}
            <div className="text-center p-4 bg-purple-500/10 rounded-xl border border-purple-500/30 backdrop-blur-sm hover:border-purple-400/50 transition">
              <p className="text-purple-300/60 text-xs font-semibold uppercase tracking-wider mb-1">
                LEVEL
              </p>

              <p className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                {currentLevel}
              </p>
            </div>

            {/* Streak */}
            <div className="text-center p-4 bg-blue-500/10 rounded-xl border border-blue-500/30 backdrop-blur-sm hover:border-blue-400/50 transition">
              <p className="text-blue-300/60 text-xs font-semibold uppercase tracking-wider mb-1">
                🔥 STREAK
              </p>

              <p className="text-4xl font-black text-blue-400">
                {streakCount}
              </p>
            </div>

            {/* Points */}
            <div className="text-center p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/30 backdrop-blur-sm hover:border-yellow-400/50 transition">
              <p className="text-yellow-300/60 text-xs font-semibold uppercase tracking-wider mb-1">
                ⭐ POINTS
              </p>

              <p className="text-4xl font-black text-yellow-400">
                {totalPoints}
              </p>
            </div>

            {/* Complete */}
            <div className="text-center p-4 bg-green-500/10 rounded-xl border border-green-500/30 backdrop-blur-sm hover:border-green-400/50 transition">
              <p className="text-green-300/60 text-xs font-semibold uppercase tracking-wider mb-1">
                COMPLETE
              </p>

              <p className="text-4xl font-black text-green-400">
                {completionRate}%
              </p>
            </div>

          </div>
        </div>

        {/* Mobile Stats */}
        <div className="md:hidden grid grid-cols-4 gap-3">

          <div className="text-center p-2 bg-purple-500/10 rounded-lg border border-purple-500/30 backdrop-blur-sm">
            <p className="text-purple-300/60 text-xs font-bold mb-1">
              LVL
            </p>

            <p className="text-2xl font-black text-purple-400">
              {currentLevel}
            </p>
          </div>

          <div className="text-center p-2 bg-blue-500/10 rounded-lg border border-blue-500/30 backdrop-blur-sm">
            <p className="text-blue-300/60 text-xs font-bold mb-1">
              🔥
            </p>

            <p className="text-2xl font-black text-blue-400">
              {streakCount}
            </p>
          </div>

          <div className="text-center p-2 bg-yellow-500/10 rounded-lg border border-yellow-500/30 backdrop-blur-sm">
            <p className="text-yellow-300/60 text-xs font-bold mb-1">
              ⭐
            </p>

            <p className="text-2xl font-black text-yellow-400">
              {totalPoints}
            </p>
          </div>

          <div className="text-center p-2 bg-green-500/10 rounded-lg border border-green-500/30 backdrop-blur-sm">
            <p className="text-green-300/60 text-xs font-bold mb-1">
              %
            </p>

            <p className="text-2xl font-black text-green-400">
              {completionRate}%
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}