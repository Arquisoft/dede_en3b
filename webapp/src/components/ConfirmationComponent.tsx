
interface ConfirmationComponentProps {
    orderID : string
}

export function ConfirmationComponent(props: ConfirmationComponentProps): JSX.Element {

    return <div className="container">
        <h1>
            Your order has been process with id: {props.orderID}. You will receive it soon at your shipping addres!
        </h1>
    </div>

}