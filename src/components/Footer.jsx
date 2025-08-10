import React from "react";
import { Segment, Container, Icon } from "semantic-ui-react";

function Footer() {
    return (
        <Segment
            inverted
            vertical
            style={{
                padding: "2em 0",
                position: "fixed",
                bottom: 0,
                width: "100%",
                backgroundColor: "#4b3832",
                color: "#f8f4e3",
                textAlign: "center",
                fontStyle: "italic",
                fontSize: "1em",
                boxShadow: "0 -2px 5px rgba(0,0,0,0.2)",
                zIndex: 1000,
            }}
        >
            <Container>
                <Icon name="code branch" />
                Push & Pray — место, где нейросети стесняются попросить помощи, а копипаст спасает мир.
            </Container>
        </Segment>
    );
}

export default Footer;
