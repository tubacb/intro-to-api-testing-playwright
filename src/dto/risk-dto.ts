export class RiskDTO {
  riskScore: number;
  riskLevel: 'Very High Risk'| 'High'| 'Medium'| 'Low';
  riskPeriods: [3,6]|[6,9,12]|[12,18,24,30,36];
  applicationId: string ;
  riskDecision: 'positive' | 'negative';

  constructor(data: {riskScore: number, riskLevel: "Very High Risk" | "High" | "Medium" | "Low", riskPeriods: [3, 6] | [6, 9, 12] | [12, 18, 24, 30, 36], applicationId: string, riskDecision: "positive" | "negative"}) {
    this.riskScore = data.riskScore
    this.riskLevel = data.riskLevel
    this.riskPeriods = data.riskPeriods
    this.applicationId = data.applicationId
    this.riskDecision = data.riskDecision
  }
}