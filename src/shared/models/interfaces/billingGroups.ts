export interface IBillingGroup {
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
