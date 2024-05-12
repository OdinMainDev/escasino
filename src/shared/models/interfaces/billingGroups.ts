export interface IBillingGroup {
  id: number;
  data: {
    image: string;
    texts: IBillingGroupText[];
  };
}

export interface IBillingGroupText {
  language: string;
  key: string;
  value: string;
}
