interface Job {
  id: number;
  featured: boolean;
  logo: string;
  company: string;
  new: boolean;
  position: string;
  postedAt: string;
  contract: string;
  location: string;
  role: string;
  level: string;
  languages: string[];
  tools: string[];
}

interface JobListingProps {
  job: Job;
  handleFilterChange: (filterType: string, value: string) => void;
}

const JobListing: React.FC<JobListingProps> = ({job, handleFilterChange}) => {
  return (
    <div
      className={` md:bg-white ${
        job.featured ? "md:featured" : ""
      } md:relative md:overflow-hidden md:rounded-md md:flex md:p-5 md:shadow-md`}>
      <div className="relative ">
        <img
          src={job.logo}
          alt={job.company}
          className=" aspect-square max-w-[3em] absolute top-[-1.5em] left-[1em] z-10 md:relative md:top-0 md:left-0 md:max-w-[5em]"
        />
      </div>
      <div
        className={` p-5 bg-white pt-8 rounded-md overflow-hidden ${
          job.featured ? "featured md:featured_hide" : ""
        } relative md:bg-transparent md:pt-0 md:flex md:justify-between w-full shadow-md md:shadow-transparent`}>
        <div>
          <div className="flex gap-5 items-center flex-wrap">
            <h2 className=" text-sm font-bold text-[#659E9B]">{job.company}</h2>
            {job.new && (
              <div className=" flex gap-2 items-center flex-wrap">
                {job.new && (
                  <span className=" px-[0.7em] py-[0.25em] bg-[#56A29E] rounded-full text-white font-bold text-xs">
                    NEW!
                  </span>
                )}
                {job.featured && (
                  <span className=" px-[0.7em] py-[0.25em] bg-[#2B3A37] rounded-full text-white font-bold text-xs">
                    FEATURED
                  </span>
                )}
              </div>
            )}
          </div>
          <button className=" hover:text-[#6B9A94]">
            <strong>{job.position}</strong>
          </button>
          <div className="flex gap-2 text-[#838B8D] flex-wrap">
            <p>{job.postedAt}</p>
            <span>•</span>
            <p>{job.contract}</p>
            <span>•</span>
            <p>{job.location}</p>
          </div>
        </div>
        <hr className=" my-4 md:hidden " />
        <div className=" flex flex-wrap gap-4 items-center text-sm font-semibold text-[#7DA6A5]">
          <button
            className=" p-1 bg-[#F0F6F6] rounded hover:bg-[#7DA6A5] hover:text-[#F0F6F6] cursor-pointer"
            onClick={() => handleFilterChange("role", job.role)}>
            {job.role}
          </button>
          <button
            className=" p-1 bg-[#F0F6F6] rounded hover:bg-[#7DA6A5] hover:text-[#F0F6F6] cursor-pointer"
            onClick={() => handleFilterChange("level", job.level)}>
            {job.level}
          </button>
          {job.languages.map((language: string, index: number) => (
            <button
              className=" p-1 bg-[#F0F6F6] rounded hover:bg-[#7DA6A5] hover:text-[#F0F6F6] cursor-pointer"
              key={index}
              onClick={() => handleFilterChange("languages", language)}>
              {language}
            </button>
          ))}
          {job.tools?.map((tool: string, index: number) => (
            <button
              className=" p-1 bg-[#F0F6F6] rounded hover:bg-[#7DA6A5] hover:text-[#F0F6F6] cursor-pointer"
              key={index}
              onClick={() => handleFilterChange("tools", tool)}>
              {tool}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobListing;
