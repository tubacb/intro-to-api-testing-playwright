export class RiskDTO {
  riskScore: number;
  riskLevel: string ='Low' | 'Medium' | 'High' | 'Very High Risk';
  riskPeriods: number[] = [3,6] | [6,9,12 ] | [12,18,24,30,36];
  applicationId: string;
  riskDecision: string = 'positive' | 'negative';

}