const API_KEY = "245dec6c49f41748979a3056ae379ed8"; // TMDBのAPIKeyを入れる

// リクエストのURLを定義している
// export defaultを使用すると、import時に命名を変更できてしまうのでネームドでexportする
// 参考：https://engineering.linecorp.com/ja/blog/you-dont-need-default-export/
export const requests = {
    feachTrending: `/trending/all/week?api_key=${API_KEY}&language=en-us`,
    feachNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    feactTopRated: `/discover/tv?api_key=${API_KEY}&languager=en-us`,
    feactActionMovies: `/discover/tv?api_key=${API_KEY}&with_genres=28`,
    feactComedyMovies: `/discover/tv?api_key=${API_KEY}&with_genres=35`,
    feactHorrorMovies: `/discover/tv?api_key=${API_KEY}&with_genres=27`,
    feactRomanceMovies: `/discover/tv?api_key=${API_KEY}&with_genres=10749`,
    feactDocumentMovies: `/discover/tv?api_key=${API_KEY}&with_genres=99`,
}
