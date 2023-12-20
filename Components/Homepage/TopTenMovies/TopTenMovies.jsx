import { Slider } from "../../../Tailwind";
const TopTenMovies=()=>{
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
        <div style={{
            height:600,
            background: `url(sanddust2.jpg)`,
            backgroundSize: "cover"
        }}>
            <div className="h-full p-8 overflow-hidden" style={{
                background : "linear-gradient(to right,rgba(0,0,0,0.9),transparent)"
            }}>
                <h1 className="text-white text-3xl mb-4">Top Ten Movies</h1>
                <div 
                className="relative"
                style={{
                    width:330,
                    height:516
                }}>
                    <Slider 
                    data={data}
                    vertical={true}
                    />
                </div>
            </div>
        </div>
        </>
    )
    return design;
}
export default TopTenMovies