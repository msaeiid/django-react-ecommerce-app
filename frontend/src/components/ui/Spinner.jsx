import { useState, CSSProperties } from "react";
import { ClipLoader } from "react-spinners";


const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "purple",
};

const Spinner = ({ loading }) => {
    return (
        <ClipLoader
            // color={color}
            loading={loading}
            cssOverride={override}
            size={450}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    )
}

export default Spinner