import { Slider } from "../../../Tailwind";
const LatestMovies=()=>{
    const data=[
        {
            thumbnail: "sanddust2.jpg",
            title: "Movie1",
            duration: "02:05:30"
        },
        {
            thumbnail: "movie-abc.png",
            title: "Movie2",
            duration: "02:05:30"
        },
        {
            thumbnail: "movie-xyz.png",
            title: "Movie3",
            duration: "02:05:30"
        },
        {
            thumbnail: "sanddust2.jpg",
            title: "Movie4",
            duration: "02:05:30"
        },
        {
            thumbnail: "movie-abc.png",
            title: "Movie5",
            duration: "02:05:30"
        },
        {
            thumbnail: "movie-xyz.png",
            title: "Movie6",
            duration: "02:05:30"
        },
        {
            thumbnail: "sanddust2.jpg",
            title: "Movie7",
            duration: "02:05:30"
        },
        {
            thumbnail: "movie-abc.png",
            title: "Movie8",
            duration: "02:05:30"
        },
        {
            thumbnail: "movie-xyz.png",
            title: "Movie9",
            duration: "02:05:30"
        }
    ]
    const design=(
        <>
       <div>
       <h1 className="text-white mb-4 text-3xl">
            Latest Movies
        </h1>
        <Slider data={data} />
       </div>
        </>
    )
    return design;
}
export default LatestMovies;