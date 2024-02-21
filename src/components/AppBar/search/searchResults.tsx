"use client"

import { IMetadata } from "@/zodTypes";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import getSearchResults from "./getSearchResults";
import EpisodesList from "@/components/EpisodesList";
import { T } from "@tolgee/react";
import { useRecoilState } from "recoil";

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
          const results = await getSearchResults(query);

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
      {results.length === 0 && !loadingResults ? (
        <Typography variant="h4" component="h2">
          <T keyName="header.searchGetStarted" />
        </Typography>
      ) : (
        <EpisodesList episodes={results} loadingEpisodes={loadingResults} elevation={2} showSeason />
      )}
    </div>
  );
};

export default SearchResults;
