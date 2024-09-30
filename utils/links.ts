type NavLink = {
  href: string;
  label: string;
};
export const links: NavLink[] = [
  { href: "/", label: "home" },
  { href: "/bookings", label: "bookings" },
  { href: "/favorites", label: "favorites" },
  { href: "/reviews", label: "reviews" },
  { href: "/rentals/create", label: "create rentals" },
  { href: "/rentals", label: "rentals" },
  { href: "/profile", label: "profile" },
];