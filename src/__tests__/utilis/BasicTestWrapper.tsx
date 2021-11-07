import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import { createStore } from "redux"

export const BasicTestWrapper = (props: {children?:any, store?: any})=>{
    const store = props.store || createStore(()=>({}));
    return <MemoryRouter><Provider store={store}></Provider></MemoryRouter>
}