import { useState, useEffect } from "react";
import axios from "../axios";

type Props = {
    title: string;
    fetchUrl: string;
    isLargeRow?: boolean;
};

type Movie = {
  id: string;
  name: string;
  title: string;
  original_name: string;
  poster_path: string;
  backdrop_path: string;
};

export const Row = ({ title, fetchUrl }: Props) => {
    // データが取れ次第更新できるように空配列で初期値を定義する
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        async function fetchData() {
            console.log("start fetch. url:", fetchUrl)
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl])

    console.log(movies)

    return (
        <div className="Row" />
    );
};
