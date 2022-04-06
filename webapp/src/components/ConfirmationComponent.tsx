import { Button, Container, FormLabel, Grid, Input, InputLabel, InputLabelProps, Radio } from "@material-ui/core";
import { FormControl, FormControlLabel, FormHelperText, RadioGroup } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Address, IOrder } from "../../../restapi/model/Order";
import { addOrder } from "../api/api";
import { ICartItem } from "./ICartItem";

interface ConfirmationComponentProps {
}

export function ConfirmationComponent(props: ConfirmationComponentProps): JSX.Element {

    return <div className="container">
        <h1>
            Your order has been processed. You will receive it soon at your shipping address!
        </h1>
    </div>

}