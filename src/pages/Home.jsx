import React from "react";
import {Container, Header, Button} from "semantic-ui-react";
import {Link} from "react-router-dom";

function Home() {
    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#f8f4e3",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Container textAlign="center">
                <Header
                    as="h1"
                    style={{
                        fontSize: "2.5em",
                        marginBottom: "0.5em",
                        color: "#4a3f35"
                    }}
                >
                    Добро пожаловать в Push & Pray
                </Header>
                <p style={{fontSize: "1.2em", color: "#6b5e54"}}>
                    Выберите, что хотите получить:
                </p>

                {/* Ряд из трёх кнопок */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "1em",
                        marginTop: "1.5em",
                        position: "relative"
                    }}
                >
                    <Button
                        as={Link}
                        to={'/commit_message'}
                        primary
                        size="huge"
                        style={{
                            backgroundColor: "#4a90e2",
                            color: "white",
                            width: "250px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center"
                        }}
                    >
                        Сообщение коммита
                    </Button>


                    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <Button
                            as={Link}
                            to={'/excuse'}
                            size="huge"
                            style={{
                                backgroundColor: "#3a7d7d",
                                color: "white",
                                width: "250px"
                            }}
                        >
                            Получить оправдание
                        </Button>
                        <Button
                            as={Link}
                            to={'/about'}
                            size="large"
                            style={{
                                backgroundColor: "#8e735b",
                                color: "white",
                                width: "200px",
                                marginTop: "0.5em"
                            }}
                        >
                            О нас
                        </Button>
                    </div>

                    <Button
                        as={Link}
                        to={'/error_message'}
                        size="huge"
                        style={{
                            backgroundColor: "#c94c4c",
                            color: "white",
                            width: "250px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center"
                        }}
                    >
                        Получить сообщение об ошибке
                    </Button>
                </div>
            </Container>
        </div>
    );
}

export default Home;
