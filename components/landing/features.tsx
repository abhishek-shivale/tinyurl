import { BarChart3, Globe, Shield, Zap, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Create short links in seconds with our optimized shortening algorithm',
    color: 'bg-yellow-500/10 text-yellow-600',
  },
  {
    icon: BarChart3,
    title: 'Detailed Analytics',
    description: 'Track clicks, geographic data, and referral sources in real-time',
    color: 'bg-blue-500/10 text-blue-600',
  },
  {
    icon: Globe,
    title: 'Custom Domains',
    description: 'Use your own domain to maintain brand consistency',
    color: 'bg-green-500/10 text-green-600',
  },
  {
    icon: Shield,
    title: 'Secure Links',
    description: 'Enterprise-grade security with SSL encryption and malware protection',
    color: 'bg-purple-500/10 text-purple-600',
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-primary">
            Powerful Features for Modern Link Management
          </h2>
          <p className="text-xl text-primary/60">
            Everything you need to manage, track, and optimize your links in one place.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative p-8 rounded-2xl border bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-6`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary group-hover:text-black transition-colors">
                {feature.title}
              </h3>
              <p className="text-primary/70 mb-6">{feature.description}</p>
              <Button variant="ghost" className="group/btn">
                Learn more
                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}