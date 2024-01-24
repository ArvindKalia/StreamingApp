import { secureAdminMiddleware } from "../middleware/secure-admin-api.middleware";
import "../module/db.module"
import moviesSchema from "../schema/movies.schema"

export const fetch = async (request) => {
    try {
        await secureAdminMiddleware(request);
        try {
            const movies = await moviesSchema.find();
            if (movies.length > 0) {
                return {
                    data: movies,
                    status: 200
                }
            }
            else {
                return {
                    data: "Data not found !",
                    status: 404
                }
            }
        }

        catch (error) {
            return {
                data: error,
                status: 424
            }

        }
    }
    catch (error) {
        return {
            data: {
                message: "Invalid user!"
            },
            status: 401
        }
    }

}
export const activeMovies = async (request) => {
    try {
        const {searchParams} = new URL(request.url)
        const skip= searchParams.get("skip") // get value of skip parameter sent in the address bar
        const movies = await moviesSchema.find({active:true}).skip(skip ? skip : 0).limit(12); // only show movies with active true
        const total = await moviesSchema.countDocuments();
        if (movies.length > 0) {
            return {
                data: {movies,total},
                status: 200
            }
        }
        else {
            return {
                data: "Data not found !",
                status: 404
            }
        }
    }

    catch (error) {
        return {
            data: error,
            status: 424
        }

    }

}
export const fetchbyId = async (request, params) => {
    try {
        await secureAdminMiddleware(request)
        try {
            const { id } = params
            const movie = await moviesSchema.findById(id);
            if (movie) {
                return {
                    data: movie,
                    status: 200
                }
            }
            else {
                return {
                    data: "Data not found !",
                    status: 404
                }
            }
        }

        catch (error) {
            return {
                data: error,
                status: 424
            }

        }
    }
    catch (error) {
        return {
            data: {
                message: "Invalid user!"
            },
            status: 401
        }
    }
}
export const trash = async (request, params) => {
    try {
        await secureAdminMiddleware(request);
        return {
            data: {
                message: "Invalid user!"
            },
            status: 401
        }
    }
    catch (error) {
        return {
            data: {
                message: "Invalid user!"
            },
            status: 401
        }
    }
}
export const update = async (request, params) => {
    try {
        await secureAdminMiddleware(request);
        try {
            const { id } = params
            const data = await request.json();
            const updateRes = await moviesSchema.findByIdAndUpdate(id, data, { new: true })
            return {
                data: updateRes,
                status: 200
            }
        }

        catch (error) {
            return {
                data: error,
                status: 424
            }

        }
    }
    catch (error) {
        return {
            data: {
                message: "Invalid user!"
            },
            status: 401
        }
    }
}
export const makeMovieActive = async (request, params) => {
    try {
        await secureAdminMiddleware(request);
        try {
            const { id } = params
            const updateRes = await moviesSchema.updateOne(
                { job_id: id },
                { active: true },
                { new: true })
            return {
                data: updateRes,
                status: 200
            }
        }

        catch (error) {
            return {
                data: error,
                status: 424
            }

        }
    }
    catch (error) {
        return {
            data: {
                message: "Invalid user!"
            },
            status: 401
        }
    }
}
export const create = async (request) => {
    try {
        await secureAdminMiddleware(request);
        try {
            const data = await request.json();
            const response = await new moviesSchema(data).save()
            return {
                data: response,
                status: 200
            }
        }
        catch (error) {
            return {
                data: error,
                status: 424
            }

        }
    }
    catch (error) {
        return {
            data: {
                message: "Invalid user!"
            },
            status: 401
        }
    }
} 