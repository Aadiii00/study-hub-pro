import { Link } from "react-router-dom";
import { BookOpen, Github, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-gradient-to-b from-card/50 to-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.02] to-transparent" />
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">StudyHub</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              Your premium destination for VTU engineering notes. Access curated study materials, solved papers, and AI-powered study assistance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/notes" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Browse Notes
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Connect</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 text-center space-y-3">
          <p className="text-sm text-muted-foreground">
            Developed by <span className="font-semibold text-foreground">Team Code-Blooded</span>
          </p>
          <p className="text-sm text-muted-foreground">Connect with us for more updates</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm">
            <a href="https://linkedin.com/in/aditya-b-p" target="_blank" rel="noopener noreferrer" className="font-bold underline text-blue-500 hover:text-blue-400 transition-colors">Aditya</a>
            <span className="text-muted-foreground">•</span>
            <a href="https://linkedin.com/in/aditya-b-p" target="_blank" rel="noopener noreferrer" className="font-bold underline text-blue-500 hover:text-blue-400 transition-colors">Hemadri</a>
            <span className="text-muted-foreground">•</span>
            <a href="https://linkedin.com/in/shashank-bhavihalli" target="_blank" rel="noopener noreferrer" className="font-bold underline text-blue-500 hover:text-blue-400 transition-colors">Shashank</a>
            <span className="text-muted-foreground">•</span>
            <a href="https://linkedin.com/in/mallikarjun-patil-bb5634340" target="_blank" rel="noopener noreferrer" className="font-bold underline text-blue-500 hover:text-blue-400 transition-colors">Mallikarjun</a>
          </div>
          <p className="text-sm text-muted-foreground">
            <a href="mailto:ccodebloodedd@gmail.com" className="hover:text-foreground transition-colors">
              ccodebloodedd@gmail.com
            </a>
          </p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} StudyHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
