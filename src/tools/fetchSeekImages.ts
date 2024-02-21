import endpoints from "@/endpoints.json";

const HARD_CODED_EPISODES: { [key: string]: number } = {
  "a2ab7934-1c6f-44fa-b8ac-2c546409d85a": 600,
  "aa26723f-4e09-42b6-b3c2-e4b2d3469ced": 600,
};

const fetchSeekImageUrls = async (guid: string, abortController?: AbortController) => {
  let imageUrls: string[] = [];

  if (HARD_CODED_EPISODES[guid]) {
    for (let i = 0; i < HARD_CODED_EPISODES[guid]; i++) {
      imageUrls.push(`${endpoints.bunny}/${guid}/seek/_${i.toString()}.jpg`);
    }
  } else {
    const fetchValidUrls = async (num: number) => {
      try {
        const url = `${endpoints.bunny}/${guid}/seek/_${num.toString()}.jpg`;
        const req = await fetch(url, { method: "HEAD", signal: abortController?.signal });
        if (req.status === 200) {
          imageUrls.push(url);
          await fetchValidUrls(num + 1);
        }
      } catch {}
    };

    await fetchValidUrls(0);
  }

  return imageUrls;
};

export default fetchSeekImageUrls;
