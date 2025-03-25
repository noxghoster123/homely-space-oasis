
import { useState, useEffect } from "react";
import { Calculator, DollarSign, Percent, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface MortgageCalculatorProps {
  propertyPrice: number;
}

export function MortgageCalculator({ propertyPrice }: MortgageCalculatorProps) {
  const [price, setPrice] = useState(propertyPrice);
  const [downPayment, setDownPayment] = useState(20); // 20% down payment
  const [interestRate, setInterestRate] = useState(4.5); // 4.5% interest rate
  const [loanTerm, setLoanTerm] = useState(30); // 30 year term
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  // Calculate down payment amount
  const downPaymentAmount = (price * downPayment) / 100;
  
  // Calculate loan amount
  const loanAmount = price - downPaymentAmount;
  
  useEffect(() => {
    calculateMortgage();
  }, [price, downPayment, interestRate, loanTerm]);

  const calculateMortgage = () => {
    // Convert interest from percentage to decimal and then to monthly rate
    const monthlyInterest = interestRate / 100 / 12;
    
    // Convert years to months
    const numberOfPayments = loanTerm * 12;
    
    // Calculate monthly payment using the mortgage formula
    if (monthlyInterest === 0) {
      setMonthlyPayment(loanAmount / numberOfPayments);
    } else {
      const payment = 
        (loanAmount * monthlyInterest * Math.pow(1 + monthlyInterest, numberOfPayments)) / 
        (Math.pow(1 + monthlyInterest, numberOfPayments) - 1);
      setMonthlyPayment(payment);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-display">
          <Calculator className="mr-2 h-5 w-5" />
          Mortgage Calculator
        </CardTitle>
        <CardDescription>
          Estimate your monthly mortgage payments for this property
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Property Price */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="price">Property Price</Label>
              <span className="text-sm text-estate-700">${price.toLocaleString()}</span>
            </div>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-estate-500" />
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="pl-10"
              />
            </div>
          </div>

          {/* Down Payment Percentage */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="downPayment">Down Payment</Label>
              <span className="text-sm text-estate-700">
                {downPayment}% (${downPaymentAmount.toLocaleString()})
              </span>
            </div>
            <Slider
              id="downPayment"
              min={0}
              max={50}
              step={1}
              value={[downPayment]}
              onValueChange={(value) => setDownPayment(value[0])}
              className="py-4"
            />
          </div>

          {/* Interest Rate */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="interestRate">Interest Rate</Label>
              <span className="text-sm text-estate-700">{interestRate}%</span>
            </div>
            <div className="relative">
              <Percent className="absolute left-3 top-3 h-4 w-4 text-estate-500" />
              <Input
                id="interestRate"
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="pl-10"
              />
            </div>
          </div>

          {/* Loan Term */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="loanTerm">Loan Term</Label>
              <span className="text-sm text-estate-700">{loanTerm} years</span>
            </div>
            <div className="relative">
              <Clock className="absolute left-3 top-3 h-4 w-4 text-estate-500" />
              <Input
                id="loanTerm"
                type="number"
                min={1}
                max={40}
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="pl-10"
              />
            </div>
          </div>

          {/* Results */}
          <div className="mt-6 rounded-lg bg-estate-50 p-4 border border-estate-100">
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-estate-600">Loan Amount:</span>
                <span className="font-medium">${loanAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-estate-600">Down Payment:</span>
                <span className="font-medium">${downPaymentAmount.toLocaleString()}</span>
              </div>
              <div className="border-t border-estate-200 my-2"></div>
              <div className="flex justify-between">
                <span className="font-medium text-estate-800">Monthly Payment:</span>
                <span className="font-bold text-estate-900 text-lg">
                  ${monthlyPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </span>
              </div>
            </div>
          </div>

          <Button className="w-full bg-estate-800 hover:bg-estate-700">
            Get Pre-Approved Today
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
