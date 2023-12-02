import repos from '../repositories.json';

export default function Repos() {
  return (
    <div className="mx-auto">
      <div className="flex flex-wrap">
        {repos.map((repo, index) => (
          <div key={repo.id} className="w-full mt-6">
            <div className="bg-gray-700 shadow-md hover:shadow-lg rounded-lg overflow-hidden">
              <div className="p-4">
                <a href={repo.repoUrl} target="_blank">
                  <p className="uppercase tracking-wide text-sm font-bold">
                    {repo.name}
                  </p>
                </a>
                <div className="flex my-1 gap-2">
                  <div className="flex items-center gap-1">
                    <span className="text-md font-bold">#</span>
                    <span className="text-xs font-bold">{index + 1}</span>
                  </div>
                  <div className="flex items-center gap-[2px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      stroke="none"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"
                      />
                    </svg>
                    <span className="text-xs font-bold">{repo.stars}</span>
                  </div>
                </div>

                <p>{repo.summary}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
