import { useState, useEffect } from "react";
import axios from "../axios";
import "./Row.scss";
import YouTube from "react-youtube";
import { API_KEY } from "../request";



// 画像表示用
const base_url = "https://image.tmdb.org/t/p/original";

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

// trailerのオプション
type Options = {
    height: string;
    width: string;
    playerVars: {
        autoplay: 0 | 1 | undefined;
    };
}

export const Row = ({ title, fetchUrl, isLargeRow }: Props) => {
    // データが取れ次第更新できるように空配列で初期値を定義する
    const [movies, setMovies] = useState<Movie[]>([]);
    const [trailerUrl, setTrailerUrl] = useState<string | null>("");

    // useEffect()はレンダリン後に実行される
    // 引数は(実行させたい関数, 実行タイミングを制御する関数を配列で記載)
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            console.log(movies);
            return request;
        }

        // 関数の実行
        fetchData();
    }, [fetchUrl]);

    const opts: Options = {
        height: "390",
        width: "640",
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
    };

    const handleClick = async (movie: Movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            let trailerUrl = await axios.get(
              `/movie/${movie.id}/videos?api_key=${API_KEY}`
            );
            setTrailerUrl(trailerUrl.data.results[0]?.key)
        }
    };

    return (
        <div className="Row">
            <h2>{title}</h2>
            <div className="Row-posters">
                {/** ポスターコンテンツ */}
                {movies.map((movie, i) => (
                    <img
                        key={movie.id}
                        className={`Row-poster ${isLargeRow && "Row-poster-large"}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path
                            }`}
                        alt={movie.name}
                        onClick={() => handleClick(movie)}
                    />
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={ opts} />}
        </div>
    )
};
