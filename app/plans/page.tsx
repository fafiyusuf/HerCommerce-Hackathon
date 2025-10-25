"use client"

import { Navigation } from "@/components/navigation"
import { Check, Star, Zap, Crown, BadgeCheck } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function PlansPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect non-vendors to home page
    if (!isLoading && (!user || user.userType !== "vendor")) {
      router.push("/")
    }
  }, [user, isLoading, router])

  // Show loading or nothing while checking auth
  if (isLoading || !user || user.userType !== "vendor") {
    return null
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-linear-to-b from-secondary/20 to-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground">
              Choose Your Plan
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get more visibility, attract more couples, and grow your wedding business with SergHub
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Free Trial */}
            <div className="relative bg-background border-2 border-border rounded-2xl p-8 space-y-6 hover:shadow-lg transition-shadow">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="bg-secondary text-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Free Trial
                </div>
              </div>
              
              <div className="pt-4">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                  Starter
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-foreground">Free</span>
                  <span className="text-muted-foreground">/ 30 days</span>
                </div>
              </div>

              <p className="text-muted-foreground">
                Perfect for vendors just getting started on SergHub. Try our platform risk-free!
              </p>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground">Basic vendor profile listing</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground">Up to 5 portfolio images</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground">Contact form access</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground">Appear in search results</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground">Customer reviews & ratings</span>
                </li>
              </ul>

              <Link
                href="/signup?type=vendor&plan=free"
                className="block w-full px-6 py-3 border-2 border-primary text-primary text-center rounded-lg font-semibold hover:bg-secondary transition-colors"
              >
                Start Free Trial
              </Link>
            </div>

            {/* Premium Plan */}
            <div className="relative bg-primary text-primary-foreground rounded-2xl p-8 space-y-6 shadow-xl scale-105 md:scale-110">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <Crown className="w-4 h-4" />
                  Most Popular
                </div>
              </div>
              
              <div className="pt-4">
                <div className="w-12 h-12 bg-primary-foreground/20 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-2">
                  Premium
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">$49</span>
                  <span className="opacity-80">/ month</span>
                </div>
              </div>

              <p className="opacity-90">
                Boost your visibility and get featured placement to attract more couples.
              </p>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>Everything in Free Trial</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 shrink-0 mt-0.5" />
                  <span><strong>Featured vendor badge</strong> on profile</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 shrink-0 mt-0.5" />
                  <span><strong>Priority placement</strong> in search results</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>Unlimited portfolio images & videos</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>Featured on homepage carousel</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>Social media links & website</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>Analytics dashboard</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>Priority customer support</span>
                </li>
              </ul>

              <Link
                href="/signup?type=vendor&plan=premium"
                className="block w-full px-6 py-3 bg-primary-foreground text-primary text-center rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
              >
                Get Premium
              </Link>
            </div>

            {/* Business Plan */}
            <div className="relative bg-background border-2 border-border rounded-2xl p-8 space-y-6 hover:shadow-lg transition-shadow">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <BadgeCheck className="w-4 h-4" />
                  Best Value
                </div>
              </div>
              
              <div className="pt-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Crown className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                  Business
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-foreground">$99</span>
                  <span className="text-muted-foreground">/ month</span>
                </div>
              </div>

              <p className="text-muted-foreground">
                For established vendors who want maximum exposure and premium features.
              </p>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground">Everything in Premium</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground"><strong>"Verified Business" badge</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground"><strong>Top placement</strong> in category pages</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground">Featured in email newsletters</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground">Custom booking options</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground">Advanced analytics & insights</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground">Promotional campaigns</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground">Dedicated account manager</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground">24/7 priority support</span>
                </li>
              </ul>

              <Link
                href="/signup?type=vendor&plan=business"
                className="block w-full px-6 py-3 bg-primary text-primary-foreground text-center rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
              >
                Get Business
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-16 md:py-20 bg-secondary/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              What Makes Premium Plans Worth It?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stand out from the competition with features designed to help you grow
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-xl border border-border space-y-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <BadgeCheck className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Featured Badge</h3>
              <p className="text-sm text-muted-foreground">
                Display a prominent "Featured" or "Verified" badge on your profile that builds trust 
                and credibility with couples.
              </p>
            </div>

            <div className="bg-background p-6 rounded-xl border border-border space-y-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Priority Placement</h3>
              <p className="text-sm text-muted-foreground">
                Appear at the top of search results and category pages, ensuring couples see your 
                business first.
              </p>
            </div>

            <div className="bg-background p-6 rounded-xl border border-border space-y-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Homepage Featured</h3>
              <p className="text-sm text-muted-foreground">
                Get showcased on the SergHub homepage carousel, reaching thousands of engaged couples 
                actively planning their weddings.
              </p>
            </div>

            <div className="bg-background p-6 rounded-xl border border-border space-y-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Crown className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Unlimited Portfolio</h3>
              <p className="text-sm text-muted-foreground">
                Showcase your best work with unlimited high-quality photos and videos to impress 
                potential clients.
              </p>
            </div>

            <div className="bg-background p-6 rounded-xl border border-border space-y-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Analytics Dashboard</h3>
              <p className="text-sm text-muted-foreground">
                Track profile views, contact requests, and booking inquiries with detailed analytics 
                to optimize your business.
              </p>
            </div>

            <div className="bg-background p-6 rounded-xl border border-border space-y-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <BadgeCheck className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Priority Support</h3>
              <p className="text-sm text-muted-foreground">
                Get fast, dedicated support from our team to help you make the most of your SergHub 
                presence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            <div className="bg-secondary/20 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Can I switch plans later?
              </h3>
              <p className="text-muted-foreground">
                Yes! You can upgrade or downgrade your plan at any time. Changes will take effect 
                at the start of your next billing cycle.
              </p>
            </div>

            <div className="bg-secondary/20 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                What happens after my free trial ends?
              </h3>
              <p className="text-muted-foreground">
                Your profile will remain active but without premium features. You can continue with 
                basic listing or upgrade to a paid plan anytime to unlock featured placement and badges.
              </p>
            </div>

            <div className="bg-secondary/20 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                How does the Featured badge help my business?
              </h3>
              <p className="text-muted-foreground">
                Featured vendors get 3-5x more profile views and inquiries. The badge signals quality 
                and trustworthiness to couples, making them more likely to reach out.
              </p>
            </div>

            <div className="bg-secondary/20 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Is there a setup fee?
              </h3>
              <p className="text-muted-foreground">
                No setup fees! All plans include free onboarding and profile setup assistance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-linear-to-b from-background to-secondary/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Ready to Grow Your Business?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join SergHub today and connect with couples planning their dream weddings
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/signup?type=vendor&plan=free"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
            >
              Start Free Trial
            </Link>
            <Link
              href="/signup?type=vendor&plan=premium"
              className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-secondary transition-colors"
            >
              Go Premium
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
