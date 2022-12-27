const redux = require('redux')
const createStore = redux.createStore
const combinedReducers = redux.combineReducers

const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()
const applyMiddleWare = redux.applyMiddleware

const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'

const buyCake = () =>{
    return{
            type: BUY_CAKE,
            info: 'first redux action'
    }
}

const buyIceCream = () =>{
    return{
            type: BUY_ICECREAM,
            info: 'second redux action'
    }
}

// const initialState = {
//     numOfCakes: 10,
//     numOFIceCreams: 20
// }
const initialCakeState = {
    numOfCakes: 10
}

const initialIceCreamState = {
    numOFIceCreams: 20
}

// const reducer = (state = initialState, action) =>{
//     switch(action.type){
//         case BUY_CAKE: return{
//             ...state,
//             numOfCakes: state.numOfCakes - 1
//         }

//         case BUY_ICECREAM: return{
//             ...state,
//             numOFIceCreams: state.numOFIceCreams - 1
//         }

//         default: return state
//     }
// }

const cakeReducer = (state = initialCakeState, action) =>{
    switch(action.type){
        case BUY_CAKE: return{
            ...state,
            numOfCakes: state.numOfCakes - 1
        }

        default: return state
    }
}

const iceCreamReducer = (state = initialIceCreamState, action) =>{
    switch(action.type){
        case BUY_ICECREAM: return{
            ...state,
            numOFIceCreams: state.numOFIceCreams - 1
        }

        default: return state
    }
}

const rootReducer = combinedReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})
const store = createStore(rootReducer,applyMiddleWare(logger))
console.log('initial state', store.getState())
// const unsubscribe = store.subscribe(()=> console.log('updated state', store.getState()))
const unsubscribe = store.subscribe(()=> {})
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
unsubscribe()