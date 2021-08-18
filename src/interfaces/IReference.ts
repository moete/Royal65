export interface IReference {
    _id: string;
    ReferenceFrom: string;
    ReferenceTo: string;
    
    Bonus: string;
  }
  
  export interface IReferenceDTO {
    ReferenceFrom: string;
    ReferenceTo: string;
    Code: string;
    Bonus: string;
  }