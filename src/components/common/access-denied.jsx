import { Link } from "react-router-dom";

const AccessDeniedPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full h-80 sm:h-96 3xl:h-[580px] relative">
      </div>

      <h3 className="mt-5 sm:mt-10 text-sub-heading text-xl md:text-2xl 3xl:text-3xl font-bold text-center">
        Denied Access
      </h3>
      <p className="text-sm 3xl:text-xl text-body mt-2 text-center">
        You have not access
        <Link
          to="/"
          className="ps-1 text-accent transition-colors hover:text-accent-hover"
        >
          Home
        </Link>
      </p>
    </div>
  );
};

export default AccessDeniedPage;
