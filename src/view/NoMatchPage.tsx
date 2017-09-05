import React from "react";
import Card from "@/components/Card";
import ICTCube from "@/components/LoadingSpinner/ICTCube";
import Spinner from "@/components/LoadingSpinner/Loading/Spinner";

export default function NoMatchPage() {
    return (
        <div style={{
            textAlign: "center",
            height: "100%",
            padding: "20px",
            paddingTop: "6rem",
            backgroundColor: "#FAEBD7"
        }}>
            <Spinner animationOut={false}/>
        </div>
    );
}