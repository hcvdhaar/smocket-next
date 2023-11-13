export type Tag = {
  id: number;
  label: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Bookmark = {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
};
