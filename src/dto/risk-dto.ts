export class RiskDTO {
  riskScore: number;
  riskLevel: 'Very High Risk'| 'High'| 'Medium'| 'Low';
  riskPeriods: [3,6]|[6,9,12]|[12,18,24,30,36];
  applicationId: string ;
  riskDecision: 'positive' | 'negative';

  constructor(riskScore: number, riskLevel: "Very High Risk" | "High" | "Medium" | "Low", riskPeriods: [3, 6] | [6, 9, 12] | [12, 18, 24, 30, 36], applicationId: string, riskDecision: "positive" | "negative") {
    this.riskScore = riskScore
    this.riskLevel = riskLevel
    this.riskPeriods = riskPeriods
    this.applicationId = applicationId
    this.riskDecision = riskDecision
  }
}