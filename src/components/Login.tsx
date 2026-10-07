import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      alert('Please enter your email and password.');
      return;
    }
    localStorage.setItem('rovexLoggedIn', 'true');
    localStorage.setItem('rovexUserEmail', email.trim());
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950 text-white flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-20" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-5 rounded-full overflow-hidden shadow-lg shadow-purple-500/50">
            <img src="/logo.png" alt="ROVEX RISE" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
            ROVEX RISE
          </h1>
          <p className="text-purple-300/70 text-sm font-semibold tracking-widest mt-2">
            RISE. GRIND. DOMINATE.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 rounded-2xl border border-purple-500/30 bg-slate-950/60 backdrop-blur-xl shadow-2xl shadow-purple-500/20">
          <h2 className="text-2xl font-black text-white mb-6">Welcome Back 👋</h2>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-purple-300 mb-2 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-white/10 border border-purple-400/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-purple-400/70 focus:ring-2 focus:ring-purple-400/20"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-purple-300 mb-2 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white/10 border border-purple-400/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-purple-400/70 focus:ring-2 focus:ring-purple-400/20"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold uppercase tracking-wider hover:shadow-lg hover:shadow-purple-500/50 hover:scale-[1.02] transition"
            >
              Login ⚡
            </button>

            <button
              type="button"
              onClick={() => {
                window.history.pushState({}, '', '/');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="w-full py-2 text-white/60 hover:text-white text-sm transition"
            >
              Continue without login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
