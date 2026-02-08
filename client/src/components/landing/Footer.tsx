const Footer = () => {
  return (
    <footer className="border-t border-border bg-surface py-10 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 flex flex-col items-center gap-4 md:flex-row md:justify-between">

        {/* Brand */}
        <div className="text-sm text-textSecondary">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-textPrimary">
            Student Productivity Tracker
          </span>
          . All rights reserved.
        </div>

        {/* Footer Links */}
        <div className="flex gap-6 text-sm text-textSecondary">
          <span className="cursor-pointer hover:text-primary transition">
            Privacy
          </span>
          <span className="cursor-pointer hover:text-primary transition">
            Terms
          </span>
          <span className="cursor-pointer hover:text-primary transition">
            Contact
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
