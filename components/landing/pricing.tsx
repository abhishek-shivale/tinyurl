import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for personal use and testing',
    features: [
      'Up to 50 links/month',
      'Basic Analytics',
      'Standard Support',
      'API Access (100 requests/day)',
      'Community Support',
    ],
    recommended: false,
    gradient: 'from-blue-500/20 to-purple-500/20',
  },
  {
    name: 'Pro',
    price: '$12',
    period: 'per month',
    description: 'Ideal for professionals and small teams',
    features: [
      'Unlimited links',
      'Advanced Analytics',
      'Custom Domains',
      'Priority Support',
      'Team Collaboration',
      'API Access (10K requests/day)',
      'Custom Link Expiration',
      'Password Protected Links',
    ],
    recommended: true,
    gradient: 'from-primary/20 to-accent/20',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'per month',
    description: 'For large organizations with custom needs',
    features: [
      'Everything in Pro',
      'SLA Guarantee',
      'Dedicated Support',
      'Unlimited API Access',
      'Custom Integration',
      'SSO Authentication',
      'Advanced Security Features',
      'Custom Contracts',
    ],
    recommended: false,
    gradient: 'from-orange-500/20 to-red-500/20',
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-primary/5" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-primary">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-primary/60">
            Choose the perfect plan for your link management needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div key={plan.name} className="relative group">
              <Card className={`relative p-8 transition-all duration-500 backdrop-blur-sm border-primary/10
                ${plan.recommended ? 'shadow-lg scale-105 border-primary' : 'hover:shadow-xl hover:-translate-y-1'}`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />

                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Sparkles className="h-4 w-4" />
                    Most Popular
                  </div>
                )}

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-primary mb-2">{plan.name}</h3>
                  <p className="text-primary/60 mb-4">{plan.description}</p>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-primary">{plan.price}</span>
                      <span className="text-primary/60">{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-primary/80">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      plan.recommended
                        ? 'bg-primary hover:bg-primary/90'
                        : 'bg-primary/10 hover:bg-primary/20 text-primary'
                    }`}
                  >
                    Get Started
                  </Button>
                </div>
              </Card>

              {plan.recommended && (
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent opacity-10 blur rounded-2xl" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}