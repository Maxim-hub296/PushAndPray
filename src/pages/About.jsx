import React, {useState, useEffect} from "react";
import {Container, Header, List, Segment, Icon, Button} from "semantic-ui-react";
import {useNavigate} from "react-router-dom";

function About() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://pushandpray.pythonanywhere.com/about/');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (err) {
                setError(err.message);
                console.error("Ошибка загрузки данных:", err);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return (
            <div style={styles.page}>
                <Container textAlign="center">
                    <Header as="h1" color="red">Ошибка</Header>
                    <p>{error}</p>
                </Container>
            </div>
        );
    }

    if (!data) {
        return (
            <div style={styles.page}>
                <Header as="h1">Загрузка...</Header>
            </div>
        );
    }

    return (
        <div style={styles.page}>
            <Container style={styles.container}>
                <Segment raised style={styles.segment}>
                    <Header as="h1" dividing style={styles.header}>
                        <Icon name="info circle" color="blue"/>
                        {data.title}
                    </Header>
                    <p style={styles.intro}>“{data.intro}”</p>

                    <Segment color="teal" style={styles.innerSegment}>
                        <Header as="h3" dividing style={styles.subHeader}>
                            <Icon name="lightbulb" color="yellow"/>
                            Наши убеждения
                        </Header>
                        <List bulleted>
                            {data.beliefs.map((item, idx) => (
                                <List.Item key={idx}>{item}</List.Item>
                            ))}
                        </List>
                    </Segment>

                    <Segment color="red" style={styles.innerSegment}>
                        <Header as="h3" dividing style={styles.subHeader}>
                            <Icon name="warning sign" color="red"/>
                            Дисклеймер
                        </Header>
                        <List bulleted>
                            {data.disclaimer.map((item, idx) => (
                                <List.Item key={idx}>{item}</List.Item>
                            ))}
                        </List>
                    </Segment>

                    <div style={{textAlign: "center", marginTop: "2em"}}>
                        <Button
                            color="blue"
                            size="large"
                            icon
                            labelPosition="left"
                            style={styles.button}
                            onClick={() => navigate("/")}
                        >
                            <Icon name="home"/>
                            На главную
                        </Button>
                    </div>
                </Segment>
            </Container>
        </div>
    );
}

const styles = {
    page: {
        backgroundColor: "#f8f4e3",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2em",
    },
    container: {
        maxWidth: "800px",
        width: "100%",
    },
    segment: {
        backgroundColor: "#fffaf0",
        padding: "2em",
    },
    innerSegment: {
        wordWrap: "break-word",
    },
    header: {
        fontSize: "2em",
    },
    subHeader: {
        fontSize: "1.2em",
    },
    intro: {
        fontStyle: "italic",
        color: "#444",
        marginBottom: "1.5em",
    },
    button: {
        width: "auto",
    },
    // Мобильная адаптация
    "@media screen and (max-width: 768px)": {
        page: {
            padding: "1em",
        },
        segment: {
            padding: "1em",
        },
        header: {
            fontSize: "1.5em",
        },
        subHeader: {
            fontSize: "1em",
        },
        button: {
            width: "100%",
        },
    },
};

export default About;
