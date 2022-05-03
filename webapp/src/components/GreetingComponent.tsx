import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../redux/store";
import { setWebId } from "../redux/slices/userSlice";
import { useEffect } from "react";

type GreetingComponentProps = {
}

const IndividualProduct = (props: GreetingComponentProps) => {

    const { webId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(dispatch(setWebId(webId || "")));
    },
        // eslint-disable-next-line
        []);


    return <h1>Welcome to our app, {webId} </h1>

}


export default IndividualProduct;