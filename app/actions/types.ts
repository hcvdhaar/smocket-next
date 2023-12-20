export type ActionResponse<DataType> = {
  data: DataType | null;
  error: { message: string } | null;
};
