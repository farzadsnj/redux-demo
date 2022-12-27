const redux = require('redux')
const createStore = redux.createStore
const applyMiddleWare = redux.applyMiddleware
const thunkMiddelWare = require('redux-thunk').default
const axios = require('axios')

const initialState = {          //state
    loading: false,
    user: [],
    error: ''
}

//action
const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST'
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE'

const fetchUserRequest = () =>{
    return{
        type: FETCH_USER_REQUEST
    }
}

const fetchUserSuccess = (users) =>{
    return{
        type: FETCH_USER_SUCCESS,
        payload: users
    }
}

const fetchUsersFailure = error =>{
    return{
        type:FETCH_USER_FAILURE,
        payload:error
    }
}

//reducer
const reducer = (state= initialState, action) =>{
    switch(action.type) {
        case FETCH_USER_REQUEST:
            return{
                ...state, loading:true
            }
        
        case FETCH_USER_SUCCESS:
            return{
                loading:false,
                users: action.payload,
                error: ''
            }
        
        case FETCH_USER_FAILURE:
            return{
                loading: false,
                users: [],
                error: action.payload
            }
    }
}

const fetchUsers = () =>{
    return dispatch =>{
        dispatch(fetchUserRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res =>{
            const users = res.data.map(user => user.id)
            dispatch(fetchUserSuccess(users))
        })
        .catch(err =>{
            dispatch(fetchUsersFailure(err.message))
        })
    }
}

const store = createStore(reducer, applyMiddleWare(thunkMiddelWare))
store.subscribe(()=>{
    console.log(store.getState())
})

store.dispatch(fetchUsers())