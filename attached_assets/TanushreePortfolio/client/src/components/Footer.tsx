import { Mail, Linkedin, Github } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t bg-card/50 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Tanushree Bharti</h3>
            <p className="text-sm text-muted-foreground">
              Full Stack Developer & Research Fellow specializing in AI, IoT, and
              Web Development.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/">
                <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                  Home
                </span>
              </Link>
              <Link href="/achievements">
                <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                  Achievements
                </span>
              </Link>
              <Link href="/projects">
                <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                  Projects
                </span>
              </Link>
              <Link href="/blog">
                <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                  Blog
                </span>
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href="mailto:ajmertanu@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-footer-email"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/tanushree-bharti-23b1b11a0/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-footer-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2025 Tanushree Bharti. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
