import { useEffect, useState } from "react";
import { url } from "../../util/urls";

const Jobcomponent = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [expandedJob, setExpandedJob] = useState(null);
  const [visibleJobs, setVisibleJobs] = useState(15);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setJobs(data);
        setFilteredJobs(data);
      } catch (error) {
        console.error("Error fetching job options:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let updatedJobs = jobs.filter((job) =>
      job.title.toLowerCase().includes(search.toLowerCase())
    );
    if (category) {
      updatedJobs = updatedJobs.filter((job) =>
        job.employment_type.includes(category)
      );
    }
    setFilteredJobs(updatedJobs);
  }, [search, category, jobs]);

  return (
    <div className="p-3 max-w-6xl mx-auto bg-gray-200 min-h-screen">
      <div className="pt-20 flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by job title..."
          className="border p-2 w-full rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border p-2 rounded-md"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Remote">Remote</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.slice(0, visibleJobs).map((job) => (
          <div
            key={job.id}
            className="border p-4 rounded-lg shadow-md bg-white"
          >
            <h2 className="text-lg font-semibold">{job.title}</h2>
            <p className="text-gray-600">
              {job.company} - {job.location} [{job.employment_type}]
            </p>
            <p className="text-gray-700">{job.description.slice(0, 100)}...</p>
            <button
              className="mt-2 text-blue-500 hover:underline"
              onClick={() =>
                setExpandedJob(expandedJob === job.id ? null : job.id)
              }
            >
              {expandedJob === job.id ? "Hide Details" : "View Details"}
            </button>
            {expandedJob === job.id && (
              <div className="mt-2 text-gray-800">{job.description}</div>
            )}
          </div>
        ))}
      </div>
      {visibleJobs < filteredJobs.length && (
        <div className="text-center mt-6">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={() => setVisibleJobs((prev) => prev + 15)}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Jobcomponent;
