import {
    CREATE_PLAN_REQUEST,
    CREATE_PLAN_SUCCESS,
    CREATE_PLAN_FAILED
} from "./Plans.state";

import axios from "axios";

export const create = (data,resetForm) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: CREATE_PLAN_REQUEST,
            })
                const response=await axios({
                    method:"post",
                    url:"/api/plan",
                    data
                })
                dispatch({
                    type: CREATE_PLAN_SUCCESS,
                    payload: response.data.data
                });
                resetForm();
        }
        catch (error) {
            dispatch({
                type: CREATE_PLAN_FAILED,
                payload: error.response.data
            })
        }
    }
}