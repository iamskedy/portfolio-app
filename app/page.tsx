import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-[family-name:var(--font-geist-sans)]">
      
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          Shubham Dubey
        </h1>
        <h2 className="text-2xl md:text-3xl text-gray-600 dark:text-gray-400">
          Backend Software Developer
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400 mt-4">
          Specializing in scalable architecture, APIs, and modern backend technologies including Node.js, TypeScript, PostgreSQL, and AWS.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-16">
        <div className="p-6 bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xl font-bold mb-2">Projects</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Explore my production-ready applications built with NestJS, Fastify, and microservices architecture.
          </p>
        </div>
        
        <div className="p-6 bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xl font-bold mb-2">Skills</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            AWS Certified Cloud Practitioner & Developer. Expertise in database design, API security, and performance optimization.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xl font-bold mb-2">Experience</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Professional background in delivering robust backend solutions and driving technical excellence.
          </p>
        </div>
      </div>

      {/* Admin Link */}
      <div className="mt-16">
        <Link 
          href="/admin" 
          className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
        >
          Admin Dashboard
        </Link>
      </div>
      
    </main>
  );
}