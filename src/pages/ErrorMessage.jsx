import React, { useState } from "react";
import { Container, Header, Form, Button, Segment, List } from "semantic-ui-react";

const errorCategories = [
  { label: "Синтаксическая ошибка", value: "syntax_error" },
  { label: "Логическая ошибка", value: "logic_error" },
  { label: "Проблемы с сетью", value: "network_issue" },
  { label: "Ошибка базы данных", value: "database_error" },
  { label: "Ошибка сборки/деплоя", value: "build_deploy_error" },
  { label: "Другое", value: "other" },
];

function ErrorMessage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const [errorText, setErrorText] = useState("");

  const handleChange = (e, { value }) => {
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
      const response = await fetch(
        "https://pushandpray.pythonanywhere.com/error_message/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ error_type: selectedCategory }),
        }
      );
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
          Выберите категорию ошибки
        </Header>
        <Form>
          {/* Обёртка радиокнопок с maxWidth и центрированием */}
          <div style={{ maxWidth: 400, margin: "0 auto" }}>
            {errorCategories.map((cat) => (
              <Form.Radio
                key={cat.value}
                label={cat.label}
                value={cat.value}
                checked={selectedCategory === cat.value}
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
            onClick={handleClick}
            style={{
              marginTop: "2em",
              borderRadius: "8px",
              backgroundColor: "#4b3832",
              fontSize: "clamp(1rem, 4vw, 1.1rem)",
              padding: "1em 2.5em",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              cursor: "pointer",
            }}
            content="Получить сообщение"
          />
        </Form>

        {errorText && (
          <Segment color="red" style={{ marginTop: "1.5em", fontSize: "1rem" }}>
            {errorText}
          </Segment>
        )}

        {errorMessages.length > 0 && (
          <Segment
            style={{
              marginTop: "1.5em",
              backgroundColor: "#fff8e1",
              fontSize: "clamp(0.9rem, 3.5vw, 1rem)",
              maxWidth: 400,
              marginLeft: "auto",
              marginRight: "auto",
              boxSizing: "border-box",
              padding: "1em",
              boxShadow: "0 0 10px rgba(75,56,50,0.15)",
              borderRadius: 8,
            }}
          >
            <Header as="h3" style={{ color: "#4b3832" }}>
              Сообщения об ошибке:
            </Header>
            <List bulleted relaxed>
              {errorMessages.map((msg, idx) => (
                <List.Item key={idx} style={{ color: "#4b3832" }}>
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
