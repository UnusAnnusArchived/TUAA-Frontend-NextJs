import getAllMetadata from "@/tools/getAllMetadata";
import { IMetadata } from "@/zodTypes";
import { Paper } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import getResults from "./getSearchResults";
import { IError } from "@/types";
import { z } from "zod";
import EpisodeLink from "@/components/EpisodeLink";
import EpisodeLinkLoading from "@/components/EpisodeLink/loading";
import EpisodesList from "@/components/EpisodesList";

interface IProps {
  query: string;
}

const SearchResults: React.FC<IProps> = ({ query }) => {
  const [results, setResults] = useState<IMetadata[]>([]);
  const [loadingResults, setLoadingResults] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    if (query === "") {
      setResults([]);
    } else {
      setLoadingResults(true);
      setResults([]);
      setTimeout(async () => {
        if (!abortController.signal.aborted) {
          const results = await getResults(query);

          setResults(results);
          setLoadingResults(false);
        }
      }, 1000);
    }

    return () => {
      abortController.abort();
    };
  }, [query]);

  return (
    <div style={{ marginTop: "1rem" }}>
      <EpisodesList episodes={results} loadingEpisodes={loadingResults} />
    </div>
  );
};

export default SearchResults;
