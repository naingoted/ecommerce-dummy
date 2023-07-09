import Link from "next/link";

export default function NotFound() {
  return (
    <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div className="relative">
          <div className="relative">
            <div className="">
              <h1 className="my-2 text-gray-800 font-bold text-2xl">
                {`Looks like you've found the doorway to the great nothing`}
              </h1>
              <p className="my-2 text-gray-800">
                Sorry about that! Please visit our hompage to get where you need
                to go.
              </p>
              <Link
                href="/"
                className="sm:w-full inline-block lg:w-auto my-2 border font-bold rounded md py-4 px-8 text-center bg-black text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
              >
                Take me there!
              </Link>
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
