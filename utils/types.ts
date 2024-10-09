export type actionFunction = (
  prevState: any,
  formData: FormData
) => Promise<{ message: string }>;

export type UserType = {
  id: string;
  clerkId: String;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profileImage: string;
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

export type Booking = {
  checkIn: Date;
  checkOut: Date;
};
