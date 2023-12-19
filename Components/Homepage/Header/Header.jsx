import { 
    Button, 
    Carousel, 
    Icon
 } from "../../../Tailwind";
const Header=()=>{

    const Caption=({data})=>{
        const cap=(
            <>
            <div className="flex flex-col gap-4 sm:gap-10 px-5">
                <div>
                <h1 className="mb-3 text-white font-bold text-2xl sm:text-8xl">
                    {data.title}
                </h1>
                <div className="flex gap-16 items-center">
                    <div>
                        {
                            Array(data.rating).fill(0).map((item,index)=>{
                                return <Icon key={index} className="text-red-600">star</Icon>
                            })
                        }
                        {
                            Array(5-data.rating).fill(0).map((item,index)=>{
                                return <Icon key={index} className="text-red-600">star_outline</Icon>
                            })
                        }
                    </div>
                    <p className="text-sm sm:text-lg text-white">
                        <span className="font-bold text-red-500">
                            Duration : &nbsp;
                        </span>
                            {data.duration}
                    </p>
                </div>
                </div>
                <div className="text-white flex flex-col gap-0 sm:gap-2">
                    <p className="text-sm sm:text-lg">
                        <span className="font-bold text-red-500">
                            Staring : &nbsp;
                        </span>
                        {data.staring}
                    </p>
                    <p className="text-sm sm:text-lg">
                        <span className="font-bold text-red-500">
                            Category : &nbsp;
                        </span>
                        {data.category}
                    </p>
                    <p className="text-sm sm:text-lg">
                        <span className="font-bold text-red-500">
                            Tags : &nbsp;
                        </span>
                        {data.tags}
                    </p>
                </div>
                <div>
                    <Button 
                    theme="error"
                    className="flex gap-2 py-1 sm:py-3.5 px-2 sm:px-6">
                        <Icon>play_circle</Icon>
                        Play Now
                    </Button>
                </div>
            </div>
            </>
        );
        return cap
    }
    
    const data=[
        {
            image: "sanddust2.jpg",
            caption: <Caption data={{
                title: "EQUILIZER-3",
                rating: 5,
                duration: "1h 49m",
                staring: "Denzel Washington, Robert McCall, Dakota Fanning, Emma Collins",
                category: "Drama, Action",
                tags: "Drama, Action"
            }} />
        },
        {
            image: "movie-abc.png",
            caption: <Caption data={{
                title: "ANIMAL",
                rating: 3,
                duration: "3h 22m",
                staring: "Ranbir Kapoor, Anil Kapoor, Bobby Deol",
                category: "Drama, Action",
                tags: "Drama, Action"
            }} />
        },
        {
            image: "movie-xyz.png",
            caption: <Caption data={{
                title: "21 JUMP STREET",
                rating: 4,
                duration: "1h 49m",
                staring: "Jonah Hill, Channing Tatum, Brie Larson ",
                category: "Comedy, Drama, Action",
                tags: "Comedy, Drama, Action"
            }} />
        }
    ]
    const design=(
        <>
        <div className="hidden sm:block">
        <Carousel
        data={data}
        height={600}
        counting={false}
        />
        </div>
        <div className="sm:hidden block">
        <Carousel
        data={data}
        height={300}
        counting={false}
        />
        </div>
        </>
    )
    return design;
}
export default Header;