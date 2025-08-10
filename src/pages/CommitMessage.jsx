import React, {useState} from "react";
import {Container, Header, Form, Button, Segment, List} from "semantic-ui-react";

const commitTypes = [
    {label: "Добавлен новый функционал", value: "feature_added"},
    {label: "Исправлен баг", value: "bug_fixed"},
    {label: "Обновлена документация", value: "docs_updated"},
    {label: "Рефакторинг кода", value: "code_refactored"},
    {label: "Оптимизация производительности", value: "performance_optimized"},
    {label: "Обновлены зависимости", value: "dependencies_updated"},
    {label: "Другие изменения", value: "other"},
];

function CommitMessage() {
    const [selectedType, setSelectedType] = useState("");
    const [commitMessages, setCommitMessages] = useState([]);
    const [errorText, setErrorText] = useState("");

    const handleChange = (e, {value}) => {
        setSelectedType(value);
        setCommitMessages([]);
        setErrorText("");
    };

    const handleClick = async () => {
        if (!selectedType) {
            setErrorText("Пожалуйста, выберите тип изменения");
            setCommitMessages([]);
            return;
        }
        setErrorText("");
        try {
            const response = await fetch("https://pushandpray.pythonanywhere.com/commit_message/", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({commit_type: selectedType}),
            });
            if (!response.ok) {
                throw new Error(`Ошибка сервера: ${response.statusText} ${response.status}`);
            }
            const data = await response.json();

            if (Array.isArray(data.messages)) {
                setCommitMessages(data.messages);
            } else if (typeof data.messages === "string") {
                setCommitMessages(data.messages.split("\n").filter(Boolean));
            } else {
                setCommitMessages([String(data.messages)]);
            }
        } catch (error) {
            setErrorText(`Ошибка при отправке: ${error.message}`);
            setCommitMessages([]);
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#f8f4e3",
                display: "flex",
                justifyContent: "flex-start",
                padding: "5vh 1em",
                boxSizing: "border-box",
            }}
        >
            <Container style={{maxWidth: "600px", width: "100%"}}>
                <Header
                    as="h2"
                    textAlign="center"
                    style={{
                        marginBottom: "1em",
                        color: "#4b3832",
                        fontSize: "clamp(1.4em, 4vw, 2em)",
                    }}
                >
                    Выберите тип коммита
                </Header>

                <Form>
                    {commitTypes.map((type) => (
                        <Form.Radio
                            key={type.value}
                            label={type.label}
                            value={type.value}
                            checked={selectedType === type.value}
                            onChange={handleChange}
                            style={{padding: "0.5em 0", fontSize: "clamp(0.9em, 2.5vw, 1em)"}}
                        />
                    ))}
                    <Button
                        primary
                        fluid
                        onClick={handleClick}
                        style={{
                            marginTop: "1.5em",
                            borderRadius: "8px",
                            backgroundColor: "#4b3832",
                            fontSize: "clamp(0.9em, 2.5vw, 1em)",
                            padding: "0.8em",
                        }}
                        content="Получить сообщение коммита"
                    />
                </Form>

                {errorText && (
                    <Segment
                        color="red"
                        inverted
                        style={{
                            marginTop: "1.5em",
                            borderRadius: "8px",
                            padding: "1em",
                            fontWeight: "bold",
                            fontSize: "clamp(0.9em, 2.5vw, 1em)",
                        }}
                    >
                        {errorText}
                    </Segment>
                )}

                {commitMessages.length > 0 && (
                    <Segment
                        color="brown"
                        style={{
                            marginTop: "1.5em",
                            borderRadius: "8px",
                            backgroundColor: "#fff8f0",
                            fontStyle: "italic",
                            fontSize: "clamp(0.9em, 2.5vw, 1.1em)",
                            boxShadow: "0 0 10px rgba(75,56,50,0.15)",
                            overflowWrap: "break-word",
                        }}
                    >
                        <List bulleted>
                            {commitMessages.map((msg, idx) => (
                                <List.Item key={idx}>{msg}</List.Item>
                            ))}
                        </List>
                    </Segment>
                )}
            </Container>
        </div>
    );
}

export default CommitMessage;
