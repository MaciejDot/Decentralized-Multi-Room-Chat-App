import { Skeleton } from "@material-ui/lab"

export default (props: {isLoading?: boolean, children?: any}) =>{
    return props.isLoading ? <Skeleton /> : <>{props.children}</>
}