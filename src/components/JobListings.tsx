import { useState } from "react";
import JobListing from "./JobListing"

import icon_remove from "../assets/icon-remove.svg"

interface JobListingsProps {
  jobListings: {
    id: number;
    role: string;
    level: string;
    languages: string[];
    featured: boolean;
    logo: string;
    company: string;
    new: boolean;
    position: string;
    postedAt: string;
    contract: string;
    location: string;
    tools: string[];
  }[];
}


const JobListings: React.FC<JobListingsProps> = ({jobListings}) => {
  
  const [filters, setFilters] = useState({
    role: "",
    level: "",
    languages: [] as string[],
    tools: [] as string[]
  });

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prevFilters) => {
      if (filterType === "languages" || filterType === "tools") {
        // If the filter type is "languages" or "tools", toggle the corresponding filter.
        if (typeof prevFilters[filterType] === "string") {
          prevFilters[filterType] = [];
        }
        if (prevFilters[filterType].includes(value)) {
          return {
            ...prevFilters,
            [filterType]: prevFilters[filterType].filter((item) => item !== value),
          };
        } else {
          return {
            ...prevFilters,
            [filterType]: [...prevFilters[filterType], value],
          };
        }
      } else {
        return {
          ...prevFilters,
          [filterType]: value,
        };
      }
    });
  };

  const clearFilters = () => {
    setFilters({
      role: "",
      level: "",
      languages: [],
      tools: []
    });
  };

  const filteredJobListings = jobListings.filter((job) => {
    const roleMatch = !filters.role || job.role === filters.role;
    const levelMatch = !filters.level || job.level === filters.level;
    const languageMatch =
      filters.languages.length === 0 ||
      filters.languages.every((language) => job.languages.includes(language));
    const toolMatch =
      filters.tools.length === 0 || filters.tools.every((tool) => job.tools.includes(tool));

    return roleMatch && levelMatch && languageMatch && toolMatch;
  });



  return (
    <div className=" flex flex-col gap-10 p-5 pt-10 md:gap-5 md:max-w-[70em] md:mx-auto">
      {Object.values(filters).some((value) => value !== "" && (Array.isArray(value) ? value.length > 0 : true)) && (
        <div className="p-2 px-8 flex justify-between bg-white rounded-lg items-center flex-wrap">
          <div className="flex gap-3 flex-wrap">
            {Object.entries(filters).map(([filterType, value]) => (
              value !== "" && (
                <div key={filterType} className="applied-filter flex gap-3 flex-wrap">
                  {filterType === "languages" || filterType === "tools" ? (
                    Array.isArray(value) ? (
                      value.map((item: string) => (
                        <div key={item} className="bg-[#EDF5F7] rounded-lg overflow-hidden flex items-center">
                          <span className="px-2 font-bold text-[#67A49F]">{item}</span>
                          <button
                            onClick={() => handleFilterChange(filterType, item)}
                            className="bg-[#5AA6A4] hover:bg-[#293737]"
                            aria-label={`Close ${item}`}
                          >
                            <img src={icon_remove} alt="" aria-hidden className="p-2 aspect-square w-[2em]" />
                          </button>
                        </div>
                      ))
                    ) : null
                  ) : (
                    <div className="bg-[#EDF5F7] rounded-lg overflow-hidden flex items-center">
                      <span className="px-2 font-bold text-[#67A49F]">{value}</span>
                      <button
                        onClick={() => handleFilterChange(filterType, "")}
                        className="bg-[#5AA6A4] hover:bg-[#293737]"
                        aria-label={`Close ${value}`}
                      >
                        <img src={icon_remove} alt="" aria-hidden className="p-2 aspect-square w-[2em]" />
                      </button>
                    </div>
                  )}
                </div>
              )
            ))}
          </div>
          <button onClick={clearFilters} className="text-[#67A49F] font-bold hover:underline ml-[auto] p-3">
            Clear
          </button>
        </div>
      )}



      {filteredJobListings.map((jobList) => (
        <JobListing key={jobList.id} job={jobList} handleFilterChange={handleFilterChange} />
      ))}

    </div>
  )
}

export default JobListings