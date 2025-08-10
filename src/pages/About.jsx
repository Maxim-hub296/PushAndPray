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
                const response = await fetch('http://localhost:8000/about/');
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
            <Container style={{marginTop: '2em'}}>
                <Header as="h1" color="red">Ошибка</Header>
                <p>{error}</p>
            </Container>
        );
    }

    if (!data) {
        return (
            <Container style={{marginTop: '2em'}}>
                <Header as="h1">Загрузка...</Header>
            </Container>
        );
    }

    return (
        <div style={{
            backgroundColor: "#f8f4e3",
            minHeight: "100vh",
            padding: "2em 0"
        }}>
            <Container>
                <Segment raised style={{backgroundColor: "#fffaf0", padding: "2em"}}>
                    <Header as="h1" dividing>
                        <Icon name="info circle" color="blue" />
                        {data.title}
                    </Header>
                    <p style={{fontStyle: "italic", color: "#444"}}>“{data.intro}”</p>

                    <Segment color="teal">
                        <Header as="h3" dividing>
                            <Icon name="lightbulb" color="yellow" />
                            Наши убеждения
                        </Header>
                        <List bulleted>
                            {data.beliefs.map((item, idx) => (
                                <List.Item key={idx}>{item}</List.Item>
                            ))}
                        </List>
                    </Segment>

                    <Segment color="red">
                        <Header as="h3" dividing>
                            <Icon name="warning sign" color="red" />
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
                            onClick={() => navigate("/")}
                        >
                            <Icon name="home" />
                            На главную
                        </Button>
                    </div>
                </Segment>
            </Container>
        </div>
    );
}

export default About;
