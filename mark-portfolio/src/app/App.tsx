import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

import headshot from "../assets/headshot.jpg";
import ecommerceApi from "../assets/projects/1_project.svg";
import courseBookingApi from "../assets/projects/2_project.svg";
import venueBookingApp from "../assets/projects/3_project.svg";
import ecommerceStorefront from "../assets/projects/4_project.svg";
import airlineBooking from "../assets/projects/5_project.svg";
import airlineAdmin from "../assets/projects/6_project.svg";

const projects = [
  {
    id: "01",
    title: "E-Commerce API",
    category: "Backend / REST API",
    year: "2026",
    tags: ["Node.js", "Express", "MongoDB"],
    image: ecommerceApi,
    alt: "Illustration representing an e-commerce checkout REST API",
  },
  {
    id: "02",
    title: "Course Booking API",
    category: "Backend / REST API",
    year: "2026",
    tags: ["Node.js", "Express", "MongoDB"],
    image: courseBookingApi,
    alt: "Illustration representing a course enrollment REST API",
  },
  {
    id: "03",
    title: "Venue Booking App",
    category: "Full-Stack / MERN",
    year: "2026",
    tags: ["React", "Express", "MongoDB"],
    image: venueBookingApp,
    alt: "Illustration representing a venue reservation web app",
  },
  {
    id: "04",
    title: "E-Commerce Storefront",
    category: "Full-Stack / MERN",
    year: "2026",
    tags: ["React", "Node.js", "MongoDB"],
    image: ecommerceStorefront,
    alt: "Illustration representing an e-commerce storefront web app",
  },
  {
    id: "05",
    title: "Airline Booking Prototype",
    category: "Frontend Prototype",
    year: "2025",
    tags: ["Vue.js", "Bootstrap"],
    image: airlineBooking,
    alt: "Illustration representing a flight booking flow prototype",
  },
  {
    id: "06",
    title: "Airline Booking — Admin Console",
    category: "Frontend Prototype",
    year: "2025",
    tags: ["React", "Charts"],
    image: airlineAdmin,
    alt: "Illustration representing a flight admin dashboard prototype",
  },
];

const skills = [
  { label: "Languages", items: ["JavaScript", "Java", "Python", "C#"] },
  { label: "Front End", items: ["HTML5", "CSS3", "Bootstrap", "Vue.js", "React.js"] },
  { label: "Back End", items: ["Node.js", "Express.js", "Django", "MongoDB", "MS SQL", "REST API", "Postman"] },
  { label: "Tools", items: ["Git & GitHub", "Vercel", "Trello", "AWS Lambda"] },
];

function useCountUp(target: number, duration: number = 1200, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

const WEB3FORMS_ACCESS_KEY = "1e3de487-966a-4f57-9722-58cdfbc442d0";

type FormStatus = "idle" | "sending" | "success" | "error";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formError, setFormError] = useState("");

  const handleFormChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    setFormError("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "New message from Portfolio Contact Form",
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setFormStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setFormStatus("error");
        setFormError("Failed to send message. Please try again.");
      }
    } catch {
      setFormStatus("error");
      setFormError("Failed to send message. Please try again.");
    }
  };

  const years = useCountUp(9, 1000, statsVisible);
  const projectsShipped = useCountUp(projects.length, 1200, statsVisible);
  const totalSkills = skills.reduce((sum, group) => sum + group.items.length, 0);
  const stackCount = useCountUp(totalSkills, 1400, statsVisible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div
      className="min-h-screen bg-background text-foreground overflow-x-hidden"
      style={{ fontFamily: "'Instrument Sans', sans-serif" }}
    >
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 border-b border-border bg-background/90 backdrop-blur-sm">
        <button
          onClick={() => scrollTo("hero")}
          className="text-sm tracking-[0.2em] uppercase text-foreground hover:text-primary transition-colors duration-200"
          style={{ fontFamily: "'Geist Mono', monospace" }}
        >
          Mark Estrecho
        </button>
        <div className="hidden md:flex items-center gap-8">
          {["Work", "About", "Contact"].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 tracking-wide"
            >
              {item}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="text-sm bg-primary text-primary-foreground px-4 py-2 hover:bg-primary/90 transition-colors duration-200 tracking-wide font-medium"
          >
            Hire Me
          </button>
        </div>
        <button
          className="md:hidden text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-background flex flex-col items-start justify-center px-10 gap-8">
          {["Work", "About", "Contact"].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className="text-4xl font-bold tracking-tight text-foreground hover:text-primary transition-colors"
              style={{ fontFamily: "'Archivo', sans-serif" }}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section
        id="hero"
        className="min-h-screen flex flex-col justify-end pb-16 px-6 md:px-12 pt-32"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex items-start justify-between flex-wrap gap-6 mb-10">
            <span
              className="text-xs tracking-[0.3em] uppercase text-primary"
              style={{ fontFamily: "'Geist Mono', monospace" }}
            >
              Open to work — 2026
            </span>
            <span className="text-xs text-muted-foreground tracking-wide" style={{ fontFamily: "'Geist Mono', monospace" }}>
              Based in Cavite, Philippines
            </span>
          </div>

          <h1
            className="text-[clamp(3.5rem,10vw,9rem)] font-black leading-[0.92] tracking-tight uppercase text-foreground mb-8"
            style={{ fontFamily: "'Archivo', sans-serif", fontStretch: "condensed" }}
          >
            Full-Stack
            <br />
            <span className="text-primary">Developer</span>
            <br />
            &amp; Builder
          </h1>

          <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16 mt-12 border-t border-border pt-8">
            <p className="text-base text-muted-foreground max-w-md leading-relaxed">
              Junior Full-Stack Developer with a strong foundation in the MEVN stack and
              over 9 years of IT technical support experience. Skilled in building
              responsive web applications, developing RESTful APIs, and working with
              MongoDB, Express.js, Vue.js, and Node.js. Passionate about writing clean,
              maintainable code and continuously expanding my software development skills
              while transitioning into full-time application development.
            </p>
            <button
              onClick={() => scrollTo("work")}
              className="group flex items-center gap-3 text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
            >
              <span className="tracking-wide">View selected work</span>
              <ArrowUpRight
                size={16}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
              />
            </button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div
        ref={statsRef}
        className="border-y border-border py-10 px-6 md:px-12"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-3 gap-4">
          {[
            { value: years, suffix: "+", label: "Years IT support" },
            { value: projectsShipped, suffix: "", label: "Projects shipped" },
            { value: stackCount, suffix: "+", label: "Tools & technologies" },
          ].map(({ value, suffix, label }) => (
            <div key={label} className="text-center md:text-left">
              <div
                className="text-[clamp(2.5rem,5vw,4rem)] font-black text-primary leading-none mb-1"
                style={{ fontFamily: "'Archivo', sans-serif" }}
              >
                {value}{suffix}
              </div>
              <div className="text-xs text-muted-foreground tracking-wide uppercase" style={{ fontFamily: "'Geist Mono', monospace" }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WORK */}
      <section id="work" className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-baseline justify-between mb-12">
            <h2
              className="text-xs tracking-[0.3em] uppercase text-muted-foreground"
              style={{ fontFamily: "'Geist Mono', monospace" }}
            >
              Selected Work
            </h2>
            <span className="text-xs text-muted-foreground" style={{ fontFamily: "'Geist Mono', monospace" }}>
              {projects.length} projects
            </span>
          </div>

          <div className="space-y-0">
            {projects.map((project, i) => (
              <div
                key={project.id}
                className="group border-t border-border last:border-b cursor-pointer"
                onMouseEnter={() => setActiveProject(i)}
                onMouseLeave={() => setActiveProject(null)}
              >
                <div className="flex items-center justify-between py-6 md:py-8 gap-6">
                  <div className="flex items-center gap-6 md:gap-10 min-w-0">
                    <span
                      className="text-xs text-muted-foreground shrink-0"
                      style={{ fontFamily: "'Geist Mono', monospace" }}
                    >
                      {project.id}
                    </span>
                    <div className="min-w-0">
                      <h3
                        className="text-xl md:text-3xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200 truncate"
                        style={{ fontFamily: "'Archivo', sans-serif" }}
                      >
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 hidden md:block">{project.category}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 shrink-0">
                    <div className="hidden md:flex gap-2 flex-wrap justify-end">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs border border-border px-2 py-0.5 text-muted-foreground"
                          style={{ fontFamily: "'Geist Mono', monospace" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground" style={{ fontFamily: "'Geist Mono', monospace" }}>
                      {project.year}
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Image reveal on hover */}
                <div
                  className="overflow-hidden transition-all duration-500 ease-in-out bg-muted"
                  style={{ maxHeight: activeProject === i ? "320px" : "0px" }}
                >
                  <img
                    src={project.image}
                    alt={project.alt}
                    className="w-full h-72 object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 md:px-12 border-t border-border">
        <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_1.4fr] gap-16 md:gap-24">
          {/* Left */}
          <div>
            <span
              className="text-xs tracking-[0.3em] uppercase text-muted-foreground block mb-10"
              style={{ fontFamily: "'Geist Mono', monospace" }}
            >
              About
            </span>
            <div className="relative">
              <img
                src={headshot}
                alt="Mark Anthony Estrecho"
                className="w-full aspect-[3/4] object-cover bg-muted"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-background/80 backdrop-blur-sm p-4 border border-border">
                <p className="text-xs text-muted-foreground" style={{ fontFamily: "'Geist Mono', monospace" }}>
                  Mark Anthony Estrecho — Cavite, 2026
                </p>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col justify-center">
            <h2
              className="text-[clamp(2rem,4vw,3.5rem)] font-black leading-tight tracking-tight mb-8 uppercase"
              style={{ fontFamily: "'Archivo', sans-serif" }}
            >
              Support turned
              <br />
              into
              <br />
              <span className="text-primary">software.</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed mb-12">
              <p>
                Since 2017 I've worked IT technical support at DKP MFG Inc., handling system
                support, database maintenance with MS SQL, and file transactions for end
                users. In early 2026 I completed Zuitt's Full-Stack Web Development program,
                focused on the MEVN stack.
              </p>
              <p>
                I'm now building production-style REST APIs and full-stack apps, and looking
                for my first full-stack developer role — bringing years of troubleshooting
                and staying calm under pressure into how I build and debug software.
              </p>
            </div>

            <div className="space-y-8">
              {skills.map(({ label, items }) => (
                <div key={label}>
                  <span
                    className="text-xs tracking-[0.25em] uppercase text-primary block mb-3"
                    style={{ fontFamily: "'Geist Mono', monospace" }}
                  >
                    {label}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span
                        key={item}
                        className="text-sm text-foreground border border-border px-3 py-1 hover:border-primary hover:text-primary transition-colors duration-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6 md:px-12 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <span
            className="text-xs tracking-[0.3em] uppercase text-muted-foreground block mb-12"
            style={{ fontFamily: "'Geist Mono', monospace" }}
          >
            Contact
          </span>

          <div className="grid md:grid-cols-[1.2fr_1fr] gap-16 items-start">
            <div>
              <h2
                className="text-[clamp(2.5rem,5vw,5rem)] font-black leading-tight tracking-tight uppercase mb-8"
                style={{ fontFamily: "'Archivo', sans-serif" }}
              >
                Let's build
                <br />
                something
                <br />
                <span className="text-primary">great.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-sm">
                I'm open to junior full-stack roles, internships, and freelance work.
                Response time is typically within 24 hours.
              </p>
              <a
                href="https://www.linkedin.com/in/mark-anthony-estrecho-ba0731225"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-lg font-medium text-foreground hover:text-primary transition-colors duration-200 group"
              >
                Message me on LinkedIn
                <ArrowUpRight
                  size={20}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                />
              </a>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              {[
                { id: "name", label: "Name", type: "text", placeholder: "Your name" },
                { id: "email", label: "Email", type: "email", placeholder: "your@email.com" },
              ].map(({ id, label, type, placeholder }) => (
                <div key={id}>
                  <label
                    htmlFor={id}
                    className="block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2"
                    style={{ fontFamily: "'Geist Mono', monospace" }}
                  >
                    {label}
                  </label>
                  <input
                    id={id}
                    type={type}
                    required
                    placeholder={placeholder}
                    value={formData[id as "name" | "email"]}
                    onChange={(e) => handleFormChange(id, e.target.value)}
                    className="w-full bg-secondary border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors duration-200"
                  />
                </div>
              ))}
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2"
                  style={{ fontFamily: "'Geist Mono', monospace" }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={(e) => handleFormChange("message", e.target.value)}
                  className="w-full bg-secondary border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors duration-200 resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={formStatus === "sending"}
                className="w-full bg-primary text-primary-foreground py-4 text-sm font-bold tracking-widest uppercase hover:bg-primary/90 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ fontFamily: "'Archivo', sans-serif" }}
              >
                {formStatus === "sending" ? "Sending..." : "Send Message"}
              </button>
              {formStatus === "success" && (
                <p
                  className="text-sm text-primary"
                  style={{ fontFamily: "'Geist Mono', monospace" }}
                >
                  Message sent — thanks for reaching out. I'll get back to you soon.
                </p>
              )}
              {formStatus === "error" && (
                <p className="text-sm text-destructive" style={{ fontFamily: "'Geist Mono', monospace" }}>
                  {formError}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border px-6 md:px-12 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <span
            className="text-xs text-muted-foreground tracking-wide"
            style={{ fontFamily: "'Geist Mono', monospace" }}
          >
            © 2026 Mark Anthony Estrecho. All rights reserved.
          </span>
          <div className="flex gap-6">
            {[
              { label: "GitHub", href: "https://github.com/mark328407" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/mark-anthony-estrecho-ba0731225" },
              { label: "Portfolio", href: "https://mark328407.github.io/WebPortfolio/#landing" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
                style={{ fontFamily: "'Geist Mono', monospace" }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
