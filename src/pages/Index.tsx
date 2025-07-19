import FlightPredictionForm from '@/components/FlightPredictionForm';
import { Plane, TrendingUp, Shield, Zap } from 'lucide-react';
import heroImage from '@/assets/flight-hero.jpg';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative">
        <div 
          className="h-[60vh] lg:h-[70vh] bg-cover bg-center bg-no-repeat relative"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-hero/80"></div>
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center text-center">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                FlightPredictor AI
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md">
                Predict flight delays with advanced AI technology. Get accurate forecasts based on real flight data.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>95% Accuracy</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  <span>Reliable Data</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  <span>Instant Results</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get Your Flight Delay Prediction
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enter your flight details below and our AI will analyze historical data, weather patterns, 
            and airline performance to predict potential delays.
          </p>
        </div>

        <FlightPredictionForm />

        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-lg bg-gradient-card shadow-card-soft">
            <div className="w-16 h-16 bg-gradient-sky rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">AI-Powered Analysis</h3>
            <p className="text-muted-foreground">
              Our machine learning models analyze millions of flight records to provide accurate predictions.
            </p>
          </div>

          <div className="text-center p-6 rounded-lg bg-gradient-card shadow-card-soft">
            <div className="w-16 h-16 bg-gradient-sky rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Real-Time Data</h3>
            <p className="text-muted-foreground">
              Get predictions based on current weather conditions, airport traffic, and airline performance.
            </p>
          </div>

          <div className="text-center p-6 rounded-lg bg-gradient-card shadow-card-soft">
            <div className="w-16 h-16 bg-gradient-sky rounded-full flex items-center justify-center mx-auto mb-4">
              <Plane className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Multiple Airlines</h3>
            <p className="text-muted-foreground">
              Support for major airlines and airports across the United States with comprehensive coverage.
            </p>
          </div>
        </div>

        {/* Backend Integration Note */}
        <div className="mt-16 p-6 bg-primary/5 border border-primary/20 rounded-lg">
          <h3 className="text-lg font-semibold text-primary mb-2 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Backend Integration Ready
          </h3>
          <p className="text-muted-foreground">
            This frontend is designed to integrate with your Python backend (Flask/FastAPI). 
            The form data is automatically formatted into the required pandas DataFrame structure 
            for seamless machine learning model integration.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
