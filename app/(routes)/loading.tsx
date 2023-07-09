import Container from "@/components/ui/container";
import Skeleton from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <Container>
      <div className="grid grid-cols-4 gap-4 max-w-3xl h-full pt-4">
        <Skeleton className="rounded-xl h-20" />
        <Skeleton className="rounded-xl h-20" />
        <Skeleton className="rounded-xl h-20" />
        <Skeleton className="rounded-xl h-20" />
      </div>
      <div className="w-full h-full pt-4 pb-8">
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Skeleton className="aspect-rec rounded-xl" />
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-xl" />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Loading;
