// import { Hero } from "@/components/hero";
// import { Features } from "@/components/features";
// import { HowItWorks } from "@/components/how-it-works";
// import { Testimonials } from "@/components/testimonials";

import { redirect } from "next/navigation";

// export default function Home() {
//   return (
//     <main className="flex-1 w-full">
//       <Hero />
//       <HowItWorks />
//       <Features />
//       <Testimonials />
//     </main>
//   );
// }

export default function Home() {
  redirect("docs/docker");
}
