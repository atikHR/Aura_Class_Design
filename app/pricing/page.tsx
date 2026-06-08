import { PricingCard } from "@/components/Cards";
import { PageTransition } from "@/components/PageTransition";
import { pricingPlans } from "@/data/pricing";

export default function PricingPage() {
  return (
    <PageTransition>
      <div className="mb-7 text-center">
        <p className="text-sm uppercase tracking-[0.18em] text-cyan-100">Pricing</p>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Choose your AuraClass plan</h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-300">
          Frontend-only prototype pricing for learners, parents, and coaching centers.
        </p>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        {pricingPlans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
      </div>
    </PageTransition>
  );
}
