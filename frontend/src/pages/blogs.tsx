import { useBlogs } from "../shared/hooks/useBlogs";
import { Link } from "react-router-dom";

const Blogs = () => {
  const { loading, blogs } = useBlogs();

  return (
    <section className="">
      <div className="mx-auto grid max-w-screen-xl gap-8 px-4 py-8 lg:grid-cols-2 lg:gap-16 lg:px-6 lg:py-16 ">
        <div className="sticky max-sm:static h-min top-11">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900  dark:text-white">
            Our Blog
          </h2>
          <p className="text-gray-500 dark:text-gray-400 sm:text-xl">
            We use an agile approach to test assumptions and connect with the
            needs of your audience early and often.
          </p>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {/* {!loading && (!blogs ||
            blogs.length === 0 )&& (
              <h3 className="text-4xl font-bold">No Blogs Found.</h3>
            ))} */}
          {!loading &&
            blogs?.map((post) => (
              <article key={post.id} className="pb-6">
                <div className="mb-5 flex items-center justify-between text-gray-500">
                  <span className="text-sm">12 days ago</span>
                </div>
                <h2 className="mb-2 text-2xl capitalize font-bold tracking-tight text-gray-900 dark:text-white">
                  <a href="#">{post.title}</a>
                </h2>
                <p className="mb-5 text-gray-500 dark:text-gray-400">
                  {post.content}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      alt="Michael Gouch portrait"
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"
                      className="h-7 w-7 rounded-full"
                    />
                    <span className="font-medium dark:text-white">
                      {post.author.name}
                    </span>
                  </div>
                  <Link
                    to={`/blog/${post.id}`}
                    className="inline-flex dark:text-white items-center font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Read more
                    <svg
                      className="ml-2 h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}

          <ul className="flex flex-col gap-12">
            {loading &&
              [1, 2, 3, 4, 5, 6].map((_skel) => (
                <div className="w-full animate-pulse">
                  <div className="h-2 w-24 mb-4 bg-zinc-600 rounded-full dark:bg-gray-700 "></div>
                  <div className="h-3 w-3/4 bg-zinc-600 rounded-full dark:bg-gray-700  mb-4"></div>
                  <div className="h-3 w-1/2 mb-8 bg-zinc-600 rounded-full dark:bg-gray-700 "></div>
                  <div className="h-2.5 w-full bg-zinc-600 rounded-full dark:bg-gray-700  mb-4"></div>
                  <div className="h-2.5 w-full bg-zinc-600 rounded-full dark:bg-gray-700  mb-4"></div>
                  <div className="h-2.5 w-full bg-zinc-600 rounded-full dark:bg-gray-700  mb-4"></div>
                  <div className="h-2.5 w-full bg-zinc-600 rounded-full dark:bg-gray-700  mb-4"></div>
                  <div className="h-2.5 w-full bg-zinc-600 rounded-full dark:bg-gray-700  mb-4"></div>
                  <div className="h-2.5 w-full bg-zinc-600 rounded-full dark:bg-gray-700  mb-4"></div>
                </div>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
