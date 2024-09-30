export type actionFunction = (
  prevState: any,
  formData: FormData
) => Promise<{ message: string }>;

export type UserType = {
  id: String;
  clerkId: String;
  firstName: String;
  lastName: String;
  username: String;
  email: String;
  profileImage: String;
  createdAt: Date;
  updatedAt?: Date;
};

export type PropertyCardProps = {
  image: string;
  id: string;
  name: string;
  tagline: string;
  country: string;
  price: number;
};
