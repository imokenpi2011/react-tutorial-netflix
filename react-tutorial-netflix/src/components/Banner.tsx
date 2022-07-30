import { useEffect, useState } from "react";
import axios from "../axios";
import { requests } from "../request";
import "./Banner.scss";

type movieProps = {
    title?: string;
    name?: string;
    original_name?: string;
    backdrop_path?: string;
    overview?: string;
};

export const Banner = () => {
    // データが取れ次第更新できるように空配列で初期値を定義する
    const [movie, setMovie] = useState<movieProps>({});
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.feachNetflixOriginals);
            console.log(request.data.result);

            setMovie(
                // ランダムで結果を取り出す
                request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
            return request;
        }
        fetchData();
    }, []);

    console.log(movie);

    // discriptionの切り捨てを行う
    function truncate(str: any, n: number) {
        //undifinedを弾く
        if (str !== undefined) {
            // 文字数が規定値を超えていた場合は省略する
            return str.length > n ? str?.substr(0, n - 1) + "..." : str;
        }
    }

    return (
        <header
            className="Banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
                backgroundPosition: "center center",
            }}
        >
            <div className="Banner-contents">
                <h1 className="Banner-title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="Banner-buttons">
                    <button className="Banner-button">Play</button>
                    <button className="Banner-button">My List</button>
                </div>

                <h1 className="Banner-description">
                    {truncate(movie?.overview, 150)}
                </h1>
            </div>

            <div className="Banner-fadeBottom" />
        </header>
    );
};

