import { categories } from "@/utils/categories";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import Link from "next/link";

export default function CategoriesList({
  category,
  search,
}: {
  search?: string;
  category?: string;
}) {
  const searchTerm = search ? `&search=${search}` : "";

  return (
    <section className="pb-4">
      <ScrollArea>
        <div className="flex gap-x-4">
          {categories.map((item) => {
            const isActive = item.label === category;
            return (
              <Link
                key={item.label}
                href={`/?category=${item.label}${searchTerm}`}
              >
                <span
                  className={`flex flex-col items-center p-3 cursor-pointer duration-300 hover:text-primary w-[100px] ${
                    isActive ? "text-primary" : ""
                  }`}
                >
                  <item.icon className="w-8 h-8" />
                  <p className="capitalize">{item.label}</p>
                </span>
              </Link>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}
