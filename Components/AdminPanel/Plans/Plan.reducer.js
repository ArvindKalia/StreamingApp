import {
    CREATE_PLAN_REQUEST,
    CREATE_PLAN_SUCCESS,
    CREATE_PLAN_FAILED
} from "./Plans.state";

const Model={
    createLoading:false,
    createSuccess: false,
    createError: false,
    createData:null
}

const PlansReducer=(state=Model,action)=>{
    switch(action.type)
    {
        case CREATE_PLAN_REQUEST:return {
            ...state,
            createLoading:true
        }
        case CREATE_PLAN_SUCCESS:return {
            ...state,
            createLoading:false,
            createSuccess:true,
            createData: action.payload
        }
        case CREATE_PLAN_FAILED:return {
            ...state,
            createLoading:false,
            createSuccess:false,
            createError:true,
            createData:null
        }
        default: return state;
    }
}

export default PlansReducer;