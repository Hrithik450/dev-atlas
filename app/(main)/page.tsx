import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { HowItWorks } from "@/components/how-it-works";
import { Testimonials } from "@/components/testimonials";

export default function Home() {
  return (
    <main className="flex-1 w-full">
      <Hero />
      <HowItWorks />
      <Features />
      <Testimonials />
    </main>
  );
}
