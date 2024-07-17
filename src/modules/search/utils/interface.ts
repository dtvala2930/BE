export interface IScrappedData {
  linkCount: string;
  total: string;
  adwordsCount: string;
  pageHTML: string;
}

export interface IAddSearchPayload {
  fileName: string;
  fileId: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}

export interface IAddSearchDetailPayload {
  result: string;
  fileId: string;
  userId: number;
}
