import { Link } from "react-router";
import { CircleDollarSign, Linkedin, Twitter, Instagram } from "lucide-react";
import type { FooterSection } from "@/types/footer";

const Footer = () => {
  const footerSections: FooterSection[] = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "/features" },
        { label: "Pricing", href: "/pricing" },
        { label: "Templates", href: "/templates" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "Guides", href: "/guides" },
        { label: "Help Center", href: "/help" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
        { label: "Cookie Policy", href: "/cookies" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Linkedin className="h-5 w-5 md:h-6 md:w-6" />, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: <Twitter className="h-5 w-5 md:h-6 md:w-6" />, href: "https://twitter.com", label: "Twitter" },
    { icon: <Instagram className="h-5 w-5 md:h-6 md:w-6" />, href: "https://instagram.com", label: "Instagram" },
  ];

  return (
    <footer className="mt-10 bg-purple-400 border-t-4 border-black shadow-[0px_-8px_0px_0px_rgba(0,0,0,1)]">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 py-6 md:py-8">
        {/* Footer link sections */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          {footerSections.map((section) => (
            <div key={section.title} className="bg-white border-2 border-black p-3 md:p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="font-black text-sm md:text-lg mb-3 md:mb-4 uppercase bg-black text-white px-2 py-1 border-2 border-black">
                {section.title}
              </h3>
              <ul className="space-y-2 md:space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="bg-cyan-300 text-black px-2 py-1 md:px-3 md:py-2 border-2 border-black font-bold uppercase text-xs md:text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-100 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer bottom section */}
        <div className="bg-yellow-400 border-4 border-black p-4 md:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          <div className="flex items-center gap-2 md:gap-3 bg-black text-yellow-400 px-3 py-2 md:px-4 md:py-2 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <CircleDollarSign className="h-5 w-5 md:h-6 md:w-6" />
            <span className="font-black uppercase text-sm md:text-lg">Sale Reports</span>
          </div>

          {/* Copyright */}
          <div className="bg-white text-black px-3 py-2 md:px-4 md:py-2 border-2 border-black font-bold uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs md:text-sm">
              © {new Date().getFullYear()} Sale Reports. All rights reserved.
            </p>
          </div>

          {/* Social links */}
          <div className="flex gap-2 md:gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="bg-pink-400 text-black p-2 md:p-3 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100"
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;