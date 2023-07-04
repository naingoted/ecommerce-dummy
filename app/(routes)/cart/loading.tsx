import Container from "@/components/ui/container";
import Skeleton from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <Skeleton className="h-10 w-1/4 bg-gray-300 rounded" />{" "}
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              <ul>
                {Array.from({ length: 3 }).map((_, i) => (
                  <li key={i}>
                    <Skeleton className="h-20 w-full bg-gray-300 rounded" />{" "}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5">
              <Skeleton className="h-32 w-full bg-gray-300 rounded" />{" "}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Loading;
