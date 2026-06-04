export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#30363d] bg-[#0d1117]/80 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
        <span className="text-[#58a6ff] text-sm font-bold tracking-wide">
          ~/portfolio
        </span>
        <div className="flex items-center gap-4 md:gap-6 text-xs md:text-sm text-[#8b949e]">
          <a href="#about" className="hover:text-[#e6edf3] transition-colors duration-150">
            [about]
          </a>
          <a href="#projects" className="hover:text-[#e6edf3] transition-colors duration-150">
            [projects]
          </a>
          <a href="#skills" className="hover:text-[#e6edf3] transition-colors duration-150">
            [skills]
          </a>
          <a href="#contact" className="hover:text-[#e6edf3] transition-colors duration-150">
            [contact]
          </a>
        </div>
      </div>
    </nav>
  );
}
