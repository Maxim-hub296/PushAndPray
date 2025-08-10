import React, {useState} from "react";
import {Container, Header, Form, Button, Segment, List} from "semantic-ui-react";

const reasons = [
    {label: "Не успел/задержался из-за внешних факторов", value: "external_delay"},
    {label: "Код не работает из-за багов или ошибок в чужом коде", value: "third_party_bug"},
    {label: "Нужно дополнительное время для тестирования и отладки", value: "needs_more_testing"},
    {label: "Изменились требования или задачи в процессе работы", value: "requirements_changed"},
    {label: "Проблемы с оборудованием/сетью/серверами", value: "hardware_network"},
    {label: "Зависимость от коллег или сторонних сервисов", value: "dependencies"},
    {label: "Просто не понял, как это реализовать", value: "did_not_understand"},
    {label: "Другое", value: "other"},
];

function Excuse() {
    const [selectedReason, setSelectedReason] = useState("");
    const [excuseList, setExcuseList] = useState([]);
    const [errorText, setErrorText] = useState("");

    const handleChange = (e, {value}) => {
        setSelectedReason(value);
        setExcuseList([]);
        setErrorText("");
    };

    const handleClick = async () => {
        if (!selectedReason) {
            setErrorText("Пожалуйста, выберите причину оправдания");
            setExcuseList([]);
            return;
        }
        setErrorText("");
        try {
            const response = await fetch("https://pushandpray.pythonanywhere.com/excuse/", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({reason: selectedReason}),
            });
            if (!response.ok) {
                throw new Error(`Ошибка сервера: ${response.statusText} ${response.status}`);
            }
            const data = await response.json();

            if (Array.isArray(data.excuse)) {
                setExcuseList(data.excuse);
            } else if (typeof data.excuse === "string") {
                setExcuseList(data.excuse.split("\n").filter(Boolean));
            } else {
                setExcuseList([String(data.excuse)]);
            }
        } catch (error) {
            setErrorText(`Ошибка при отправке: ${error.message}`);
            setExcuseList([]);
        }
    };


    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#f8f4e3",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "5vh 1em",
                boxSizing: "border-box",
            }}
        >
            <Container
                text
                style={{
                    maxWidth: 600,
                    width: "100%",
                }}
            >
                <Header
                    as="h2"
                    textAlign="center"
                    style={{
                        marginBottom: "1.5em",
                        color: "#4b3832",
                        fontSize: "clamp(1.5rem, 5vw, 2rem)",
                    }}
                >
                    Выберите причину оправдания
                </Header>
                <Form>
                    {/* Обернули радиокнопки в контейнер с maxWidth и центрированием */}
                    <div style={{maxWidth: 400, margin: "0 auto"}}>
                        {reasons.map((reason) => (
                            <Form.Radio
                                key={reason.value}
                                label={reason.label}
                                value={reason.value}
                                checked={selectedReason === reason.value}
                                onChange={handleChange}
                                style={{
                                    padding: "0.5em 0",
                                    fontSize: "clamp(1rem, 4vw, 1.1rem)",
                                    width: "auto",
                                    display: "inline-flex",
                                }}
                            />
                        ))}
                    </div>

                    <Button
                        primary
                        fluid={false} // выключаем растягивание
                        onClick={handleClick}
                        style={{
                            marginTop: "2em",
                            borderRadius: "8px",
                            backgroundColor: "#4b3832",
                            fontSize: "clamp(1rem, 4vw, 1.1rem)",
                            padding: "1em 2.5em",
                            cursor: "pointer",
                            display: "block",
                            marginLeft: "auto",
                            marginRight: "auto",
                        }}
                        content="Получить оправдание"
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
                            fontSize: "1rem",
                        }}
                    >
                        {errorText}
                    </Segment>
                )}

                {excuseList.length > 0 && (
                    <Segment
                        color="brown"
                        style={{
                            marginTop: "1.5em",
                            borderRadius: "8px",
                            backgroundColor: "#fff8f0",
                            fontStyle: "italic",
                            fontSize: "clamp(1rem, 4vw, 1.1rem)",
                            boxShadow: "0 0 10px rgba(75,56,50,0.15)",
                            maxWidth: 400,
                            marginLeft: "auto",
                            marginRight: "auto",
                            overflowWrap: "break-word",
                            padding: "1em",
                            boxSizing: "border-box",
                        }}
                    >
                        <List bulleted>
                            {excuseList.map((item, idx) => (
                                <List.Item key={idx} style={{wordBreak: "break-word"}}>
                                    {item}
                                </List.Item>
                            ))}
                        </List>
                    </Segment>
                )}
            </Container>
        </div>
    )
}

export default Excuse;
