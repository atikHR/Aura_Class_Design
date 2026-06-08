import type { PricingPlan } from "./types";

export const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free Plan",
    price: "৳0",
    description: "Try AuraClass AI with a daily learning boost.",
    features: ["10 mins/day", "1 subject", "Basic notes", "Low-data preview"]
  },
  {
    id: "premium",
    name: "Premium Plan",
    price: "৳499/month",
    description: "Unlimited AI classes for serious SSC/HSC preparation.",
    features: ["Unlimited classes", "Instant Solve", "All STEM subjects", "Downloadable notes", "Priority AI teachers"],
    highlighted: true
  },
  {
    id: "school",
    name: "School Edition",
    price: "Custom",
    description: "For coaching centers and schools running hybrid classes.",
    features: ["Teacher dashboard", "Batch progress", "Custom curriculum", "Center onboarding"]
  }
];
