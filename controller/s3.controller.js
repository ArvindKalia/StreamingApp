import AWS from "../module/aws.module"

const s3 = new AWS.S3();
const options = {
    Bucket: "stream-storage-app1",
}

export const fetch = async (request) => {
    try {
        // options.Delimiter="/";
        // options.Prefix= "demo";
        const query = {};
        const { searchParams } = new URL(request.url);
        for (const [key, value] of searchParams) {
            query[key] = value
        }
        options.MaxKeys = query.limit ? query.limit : null;
        options.Prefix = query.folder ? query.folder : null
        const objects = await s3.listObjects(options).promise();
        return {
            data: {
                message: "Get Request success",
                data: objects.Contents
            },
            status: 200
        }
    }
    catch (error) {
        return {
            data: {
                message: "Get Request failed",
                error: error
            },
            status: 424
        }
    }
    // return{
    //     data: "Get Requested",
    //     status: 200
    // }
}

export const fetchByID = async (request, params) => {
    const { keys } = params;
    const path = keys.join("/");
    options.Key = path
    try {
        await s3.headObject(options).promise();
        options.Expires = 60
        const url = s3.getSignedUrl('getObject', options)
        return {
            data: {
                message: "Success",
                data: url
            },
            status: 200
        }
    } catch (error) {
        return {
            data: {
                message: "failed",
                error: error
            },
            status: 404
        }
    }
    // return{
    //     data: path,
    //     status: 200
    // }
}

export const create = async (request) => {
    return {
        data: "Post Requested",
        status: 200
    }
}

export const trash = async (request, params) => {
    const { keys } = params;
    const path = keys.join("/");
    options.Key = path
    try {
        await s3.headObject(options).promise();
        await s3.deleteObject(options).promise();
        return {
            data: {
                message: "Success"
            },
            status: 200
        }
    } catch (error) {
        return {
            data: {
                message: "failed",
                error: error
            },
            status: 404
        }
    }
}

export const update = async (request, params) => {
    const data = await request.json();
    return {
        data: {
            data,
            params
        },
        status: 200
    }
}
