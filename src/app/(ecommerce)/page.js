import Carousels from "@/components/Carousels";
import CategoryList from "@/components/CategoryList";
import Enhancement from "@/components/Enhancement";
import Featured from "@/components/Featured";
import Flashsales from "@/components/FlashSales";
import { Separator } from "@/components/ui/separator";
import prisma from "@/utils/connection";

export default async function Home() {
  const query = {
    take: 6,
    skip: 0,
  };
  const [products, popularProducts, categories] = await prisma?.$transaction([
    prisma.Product.findMany(query),
    prisma.Product.findMany({ ...query, orderBy: { views: "desc" } }),
    prisma.Category.findMany(query),
  ]) || ([[], [], []]);
  return (
    <div>
      <Carousels />
      <div className="px-[10%]">
        <Flashsales title="Today's" heading="Flash sales" products={products} />
        <Separator className="my-4" />
        <CategoryList categories={categories} />
        <Enhancement />
        <Separator className="my-4" />
        <Flashsales
          title="Our Products"
          heading="Explore Our Products"
          products={popularProducts}
        />
        <Featured />
      </div>
    </div>
  );
}
