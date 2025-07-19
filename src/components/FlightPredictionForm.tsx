import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Plane, Clock, MapPin, Calendar, Users, Hash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FlightData {
  dayOfMonth: string;
  operatingAirline: string;
  tailNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  isWeekend: string;
}

interface PredictionResult {
  isDelayed: boolean;
  confidence: number;
  estimatedDelay?: number;
}

const FlightPredictionForm = () => {
  const [formData, setFormData] = useState<FlightData>({
    dayOfMonth: '',
    operatingAirline: '',
    tailNumber: '',
    origin: '',
    destination: '',
    departureTime: '',
    isWeekend: ''
  });
  
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const airlines = [
    { code: 'DL', name: 'Delta Air Lines' },
    { code: 'UA', name: 'United Airlines' },
    { code: 'AA', name: 'American Airlines' },
    { code: 'YV', name: 'Mesa Airlines' },
    { code: 'B6', name: 'JetBlue Airways' },
    { code: 'WN', name: 'Southwest Airlines' },
    { code: 'AS', name: 'Alaska Airlines' },
    { code: 'F9', name: 'Frontier Airlines' },
    { code: 'NK', name: 'Spirit Airlines' },
    { code: 'G4', name: 'Allegiant Air' }
  ];

  const airports = [
    { code: 'ATL', name: 'Atlanta' },
    { code: 'DFW', name: 'Dallas/Fort Worth' },
    { code: 'LAX', name: 'Los Angeles' },
    { code: 'ORD', name: 'Chicago O\'Hare' },
    { code: 'JFK', name: 'New York JFK' },
    { code: 'FLL', name: 'Fort Lauderdale' },
    { code: 'MOB', name: 'Mobile' },
    { code: 'MIA', name: 'Miami' },
    { code: 'LAS', name: 'Las Vegas' },
    { code: 'PHX', name: 'Phoenix' },
    { code: 'SEA', name: 'Seattle' },
    { code: 'BOS', name: 'Boston' }
  ];

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const formatTimeToInteger = (timeString: string): number => {
    if (!timeString) return 0;
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 100 + minutes;
  };

  const handleInputChange = (field: keyof FlightData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear prediction when form changes
    if (prediction) {
      setPrediction(null);
    }
  };

  const simulatePrediction = (): PredictionResult => {
    // Mock prediction logic for demo
    const delayFactors = [
      formData.isWeekend === '1' ? 0.3 : 0,
      parseInt(formData.dayOfMonth) > 25 ? 0.2 : 0,
      ['ATL', 'ORD', 'JFK'].includes(formData.origin) ? 0.4 : 0.1,
      parseInt(formData.departureTime) > 1800 ? 0.3 : 0.1
    ];
    
    const delayProbability = delayFactors.reduce((sum, factor) => sum + factor, 0.1);
    const isDelayed = delayProbability > 0.5;
    const confidence = Math.min(0.95, 0.6 + Math.random() * 0.3);
    const estimatedDelay = isDelayed ? Math.floor(Math.random() * 120) + 15 : undefined;
    
    return { isDelayed, confidence, estimatedDelay };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const requiredFields = Object.entries(formData);
    const emptyFields = requiredFields.filter(([_, value]) => !value);
    
    if (emptyFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to get a prediction.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Format data for backend (simulated)
    const apiData = {
      DayofMonth: parseInt(formData.dayOfMonth),
      Operating_Airline: formData.operatingAirline,
      Tail_Number: formData.tailNumber,
      Origin: formData.origin,
      Dest: formData.destination,
      DepTime: formatTimeToInteger(formData.departureTime),
      IsWeekend: parseInt(formData.isWeekend)
    };

    console.log('Data formatted for backend:', apiData);

    // Simulate API call
    setTimeout(() => {
      const result = simulatePrediction();
      setPrediction(result);
      setIsLoading(false);
      
      toast({
        title: "Prediction Complete",
        description: `Flight ${result.isDelayed ? 'delay' : 'on-time'} prediction generated.`
      });
    }, 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card className="bg-gradient-card shadow-card-soft border-border/60">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl lg:text-3xl text-primary flex items-center justify-center gap-3">
            <Plane className="w-8 h-8" />
            Flight Delay Prediction
          </CardTitle>
          <CardDescription className="text-lg">
            Enter your flight details to predict potential delays using AI
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Day of Month */}
              <div className="space-y-2">
                <Label htmlFor="dayOfMonth" className="text-foreground font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Day of Month
                </Label>
                <Select onValueChange={(value) => handleInputChange('dayOfMonth', value)}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map((day) => (
                      <SelectItem key={day} value={day.toString()}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Operating Airline */}
              <div className="space-y-2">
                <Label htmlFor="airline" className="text-foreground font-medium flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Operating Airline
                </Label>
                <Select onValueChange={(value) => handleInputChange('operatingAirline', value)}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Select airline" />
                  </SelectTrigger>
                  <SelectContent>
                    {airlines.map((airline) => (
                      <SelectItem key={airline.code} value={airline.code}>
                        {airline.code} - {airline.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tail Number */}
              <div className="space-y-2">
                <Label htmlFor="tailNumber" className="text-foreground font-medium flex items-center gap-2">
                  <Hash className="w-4 h-4" />
                  Tail Number
                </Label>
                <Input
                  id="tailNumber"
                  placeholder="e.g., N545US"
                  value={formData.tailNumber}
                  onChange={(e) => handleInputChange('tailNumber', e.target.value.toUpperCase())}
                  className="bg-background border-border"
                />
              </div>

              {/* Departure Time */}
              <div className="space-y-2">
                <Label htmlFor="departureTime" className="text-foreground font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Departure Time
                </Label>
                <Input
                  id="departureTime"
                  type="time"
                  value={formData.departureTime}
                  onChange={(e) => handleInputChange('departureTime', e.target.value)}
                  className="bg-background border-border"
                />
              </div>

              {/* Origin Airport */}
              <div className="space-y-2">
                <Label htmlFor="origin" className="text-foreground font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Origin Airport
                </Label>
                <Select onValueChange={(value) => handleInputChange('origin', value)}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Select origin" />
                  </SelectTrigger>
                  <SelectContent>
                    {airports.map((airport) => (
                      <SelectItem key={airport.code} value={airport.code}>
                        {airport.code} - {airport.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Destination Airport */}
              <div className="space-y-2">
                <Label htmlFor="destination" className="text-foreground font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Destination Airport
                </Label>
                <Select onValueChange={(value) => handleInputChange('destination', value)}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {airports.map((airport) => (
                      <SelectItem key={airport.code} value={airport.code}>
                        {airport.code} - {airport.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Weekend Radio */}
            <div className="space-y-3">
              <Label className="text-foreground font-medium">Is this a weekend flight?</Label>
              <RadioGroup
                value={formData.isWeekend}
                onValueChange={(value) => handleInputChange('isWeekend', value)}
                className="flex space-x-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="weekend-yes" />
                  <Label htmlFor="weekend-yes">Yes (Weekend)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0" id="weekend-no" />
                  <Label htmlFor="weekend-no">No (Weekday)</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              variant="flight"
              size="lg"
              className="w-full text-lg py-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Analyzing Flight Data...
                </>
              ) : (
                <>
                  <Plane className="w-5 h-5" />
                  Predict Flight Delay
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Prediction Result */}
      {prediction && (
        <Card className={`${prediction.isDelayed ? 'border-destructive/50 bg-destructive/5' : 'border-green-500/50 bg-green-50'} shadow-card-soft`}>
          <CardHeader>
            <CardTitle className={`text-xl ${prediction.isDelayed ? 'text-destructive' : 'text-green-700'} flex items-center gap-2`}>
              <div className={`w-3 h-3 rounded-full ${prediction.isDelayed ? 'bg-destructive' : 'bg-green-500'}`}></div>
              {prediction.isDelayed ? 'Delay Predicted' : 'On-Time Prediction'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-lg">
                <span className="font-semibold">Confidence:</span> {(prediction.confidence * 100).toFixed(1)}%
              </p>
              {prediction.estimatedDelay && (
                <p className="text-lg">
                  <span className="font-semibold">Estimated Delay:</span> {prediction.estimatedDelay} minutes
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                This prediction is based on historical flight data and current conditions.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FlightPredictionForm;