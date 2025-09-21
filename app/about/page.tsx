// src/pages/about.js
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Award, Heart, Leaf, Sparkles, Users, Globe } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Passion for Perfumery",
      description:
        "Every fragrance is crafted with love and dedication to the art of perfumery.",
    },
    {
      icon: Leaf,
      title: "Sustainable Sourcing",
      description:
        "We source our ingredients ethically and sustainably from around the world.",
    },
    {
      icon: Award,
      title: "Premium Quality",
      description:
        "Only the finest ingredients make it into our luxury fragrance collections.",
    },
    {
      icon: Sparkles,
      title: "Unique Creations",
      description:
        "Each scent tells a story and creates unforgettable memories.",
    },
  ];

  const team = [
    {
      name: "Isabella Rodriguez",
      role: "Master Perfumer",
      image:
        "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "With over 15 years of experience, Isabella creates our signature scents.",
    },
    {
      name: "Marcus Chen",
      role: "Creative Director",
      image:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Marcus brings artistic vision to every fragrance collection we create.",
    },
    {
      name: "Sophia Williams",
      role: "Sustainability Officer",
      image:
        "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Sophia ensures our practices are environmentally responsible and ethical.",
    },
  ];

  return (
    // Uses standard Tailwind classes for a dark purple theme
    <div className="min-h-screen bg-purple-950 text-purple-100 font-sans">
      <Header />

      <main>
        {/* Hero Section: Dark overlay and golden text */}
        <section className="relative py-32 md:py-48 text-center overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/179909/pexels-photo-179909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Hero background, a luxurious scene"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-purple-950/70" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl md:text-7xl font-serif text-amber-400 mb-6 font-bold tracking-tight">
              Our Story
            </h1>
            <p className="text-xl md:text-2xl text-purple-200 max-w-3xl mx-auto leading-relaxed font-light">
              Born from a passion for luxury and a love for the art of
              perfumery, EmeraldScentSational has been creating unforgettable
              fragrances since 2015.
            </p>
          </div>
        </section>

        {/* Story Section: Elevated with new layout and image overlay */}
        <section className="py-20 bg-purple-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-amber-400 mb-6 font-serif">
                  Crafting Memories Through Scent
                </h2>
                <div className="space-y-6 text-purple-200 leading-relaxed font-light">
                  <p>
                    What started as a small boutique in the heart of Paris has
                    grown into a globally recognized luxury fragrance brand. Our
                    founder, inspired by the emerald gardens of Versailles, set
                    out to create scents that would transport people to their
                    most cherished memories.
                  </p>
                  <p>
                    Today, EmeraldScentSational continues this tradition of
                    excellence, combining traditional perfumery techniques with
                    modern innovation. Each fragrance in our collection is a
                    masterpiece, carefully crafted to evoke emotion and create
                    lasting impressions.
                  </p>
                  <p>
                    We believe that fragrance is more than just a scent – its a
                    form of self-expression, a way to connect with others, and a
                    bridge to our most precious memories.
                  </p>
                </div>
              </div>
              <div className="relative group">
                <Image
                  src="https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Perfume creation process"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-2xl transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute -bottom-6 -right-6 bg-purple-700 text-amber-400 p-8 rounded-lg shadow-xl border-2 border-amber-400 transform transition-transform duration-500 group-hover:scale-110">
                  <div className="text-4xl font-bold font-serif">10+</div>
                  <div className="text-sm uppercase tracking-wide text-purple-100 mt-1">
                    Years of Excellence
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section: Clean, minimalist layout with subtle icon animation */}
        <section className="py-20 bg-purple-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-amber-400 mb-4 font-serif">
                Our Values
              </h2>
              <p className="text-lg md:text-xl text-purple-200 max-w-2xl mx-auto font-light">
                The principles that guide everything we do, from sourcing
                ingredients to creating the perfect customer experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {values.map((value, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-purple-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 transform transition-transform duration-300 group-hover:scale-110">
                    <value.icon className="h-10 w-10 text-amber-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-purple-100 mb-2 font-serif">
                    {value.title}
                  </h3>
                  <p className="text-purple-200 font-light">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section: Card-based layout with elegant hover effects */}
        <section className="py-20 bg-purple-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-amber-400 mb-4 font-serif">
                Meet Our Team
              </h2>
              <p className="text-lg md:text-xl text-purple-200 max-w-2xl mx-auto font-light">
                The passionate individuals behind every bottle of
                EmeraldScentSational fragrance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="bg-purple-950 rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-shadow duration-500"
                >
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-8 text-center">
                    <h3 className="text-2xl font-semibold text-amber-400 mb-1 font-serif">
                      {member.name}
                    </h3>
                    <p className="text-lg text-purple-200 font-light mb-4">
                      {member.role}
                    </p>
                    <p className="text-purple-300 font-light">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section: Modern, clean layout with subtle animations */}
        <section className="py-20 bg-purple-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="text-amber-400">
                <div className="flex items-center justify-center mb-4 text-amber-400">
                  <Users className="h-10 w-10" />
                </div>
                <div className="text-5xl font-bold mb-2 font-serif">50K+</div>
                <div className="text-purple-300 uppercase tracking-wide text-sm font-light">
                  Happy Customers
                </div>
              </div>
              <div className="text-amber-400">
                <div className="flex items-center justify-center mb-4 text-amber-400">
                  <Sparkles className="h-10 w-10" />
                </div>
                <div className="text-5xl font-bold mb-2 font-serif">200+</div>
                <div className="text-purple-300 uppercase tracking-wide text-sm font-light">
                  Unique Fragrances
                </div>
              </div>
              <div className="text-amber-400">
                <div className="flex items-center justify-center mb-4 text-amber-400">
                  <Globe className="h-10 w-10" />
                </div>
                <div className="text-5xl font-bold mb-2 font-serif">25+</div>
                <div className="text-purple-300 uppercase tracking-wide text-sm font-light">
                  Countries Served
                </div>
              </div>
              <div className="text-amber-400">
                <div className="flex items-center justify-center mb-4 text-amber-400">
                  <Award className="h-10 w-10" />
                </div>
                <div className="text-5xl font-bold mb-2 font-serif">15+</div>
                <div className="text-purple-300 uppercase tracking-wide text-sm font-light">
                  Industry Awards
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section: More prominent and elegant design */}
        <section className="py-20 bg-purple-900">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-400 mb-6 font-serif">
              Ready to Discover Your Signature Scent?
            </h2>
            <p className="text-lg md:text-xl text-purple-200 mb-10 font-light">
              Explore our curated collection of luxury fragrances and find the
              perfect scent that tells your story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/shop"
                className="bg-amber-400 text-purple-950 px-8 py-3 rounded-full font-semibold hover:bg-amber-500 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Shop Now ✨
              </a>
              <a
                href="/contact"
                className="border border-purple-400 text-purple-100 px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
