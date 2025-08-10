import React, {useState} from "react";
import {Container, Header, Form, Button, Segment, List} from "semantic-ui-react";

const errorCategories = [
    {label: "Синтаксическая ошибка", value: "syntax_error"},
    {label: "Логическая ошибка", value: "logic_error"},
    {label: "Проблемы с сетью", value: "network_issue"},
    {label: "Ошибка базы данных", value: "database_error"},
    {label: "Ошибка сборки/деплоя", value: "build_deploy_error"},
    {label: "Другое", value: "other"},
];

function ErrorMessage() {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);
    const [errorText, setErrorText] = useState("");

    const handleChange = (e, {value}) => {
        setSelectedCategory(value);
        setErrorMessages([]);
        setErrorText("");
    };

    const handleClick = async () => {
        if (!selectedCategory) {
            setErrorText("Пожалуйста, выберите тип изменения");
            setErrorMessages([]);
            return;
        }
        setErrorText("");
        try {
            const response = await fetch("http://localhost:8000/error_message/", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({error_type: selectedCategory}),
            });
            if (!response.ok) {
                throw new Error(`Ошибка сервера: ${response.statusText} ${response.status}`);
            }
            const data = await response.json();

            if (Array.isArray(data.messages)) {
                setErrorMessages(data.messages);
            } else if (typeof data.messages === "string") {
                setErrorMessages(data.messages.split("\n").filter(Boolean));
            } else {
                setErrorMessages([String(data.messages)]);
            }
        } catch (error) {
            setErrorText(`Ошибка при отправке: ${error.message}`);
            setErrorMessages([]);
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#f8f4e3",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                paddingTop: "10vh",
                paddingBottom: "15vh",
                boxSizing: "border-box",
            }}
        >
            <Container text style={{maxWidth: 600, width: "100%"}}>
                <Header as="h2" textAlign="center" style={{marginBottom: "1.5em", color: "#4b3832"}}>
                    Выберите категорию ошибки
                </Header>
                <Form>
                    {errorCategories.map((cat) => (
                        <Form.Radio
                            key={cat.value}
                            label={cat.label}
                            value={cat.value}
                            checked={selectedCategory === cat.value}
                            onChange={handleChange}
                            style={{padding: "0.5em 0"}}
                        />
                    ))}
                    <Button
                        primary
                        fluid
                        onClick={handleClick}
                        style={{marginTop: "2em", borderRadius: "8px", backgroundColor: "#4b3832"}}
                        content="Получить сообщение"
                    />
                </Form>

                {errorText && (
                    <Segment color="red" style={{marginTop: "1.5em"}}>
                        {errorText}
                    </Segment>
                )}

                {errorMessages.length > 0 && (
                    <Segment style={{marginTop: "1.5em", backgroundColor: "#fff8e1"}}>
                        <Header as="h3" style={{color: "#4b3832"}}>Шуточные сообщения:</Header>
                        <List bulleted relaxed>
                            {errorMessages.map((msg, idx) => (
                                <List.Item key={idx} style={{color: "#4b3832"}}>
                                    {msg}
                                </List.Item>
                            ))}
                        </List>
                    </Segment>
                )}
            </Container>
        </div>
    );
}

export default ErrorMessage;
