import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Sparkles } from 'lucide-react';

interface HeroProps {
  onStartTrial: () => void;
  onSignIn: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartTrial, onSignIn }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 to-sage-50">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `url('https://d64gsuwffb70l.cloudfront.net/68abf9aaa5f8797a860d9dc4_1756101077927_5d00ec28.webp')`
        }}
      />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center mb-6">
          <Sparkles className="w-8 h-8 text-sage-600 mr-3" />
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-navy-900">
            Truth Within
          </h1>
        </div>
        
        <p className="text-xl sm:text-2xl text-navy-700 mb-8 max-w-2xl mx-auto leading-relaxed">
          Discover your authentic self through guided meditation and mindfulness practices rooted in ancient wisdom
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            size="lg" 
            className="bg-sage-600 hover:bg-sage-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={onStartTrial}
          >
            <Play className="w-5 h-5 mr-2" />
            Start Free Trial
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-sage-600 text-sage-700 hover:bg-sage-50 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
            onClick={onSignIn}
          >
            Sign In
          </Button>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto shadow-lg">
          <p className="text-navy-600 text-sm mb-3">Sample Session Preview</p>
          <h3 className="text-lg font-semibold text-navy-900 mb-2">Discovering Your Inner Truth</h3>
          <p className="text-navy-600 text-sm">15-minute guided meditation • Beginner friendly</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;