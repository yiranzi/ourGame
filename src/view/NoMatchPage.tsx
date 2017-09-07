import React from "react";
import Card from "@/components/Card";
import ICTCube from "@/components/LoadingSpinner/ICTCube";
export default function NoMatchPage() {
    return (
        <div style={{
            textAlign: "center",
            height: "100%",
            padding: "20px",
            paddingTop: "6rem",
            backgroundColor: "#FAEBD7"
        }}>
            <ICTCube />
        </div>
    );
}