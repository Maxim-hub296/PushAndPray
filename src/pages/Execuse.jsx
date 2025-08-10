import React, { useState } from "react";
import { Container, Header, Form, Button, Segment, List } from "semantic-ui-react";

const reasons = [
  { label: "Не успел/задержался из-за внешних факторов", value: "external_delay" },
  { label: "Код не работает из-за багов или ошибок в чужом коде", value: "third_party_bug" },
  { label: "Нужно дополнительное время для тестирования и отладки", value: "needs_more_testing" },
  { label: "Изменились требования или задачи в процессе работы", value: "requirements_changed" },
  { label: "Проблемы с оборудованием/сетью/серверами", value: "hardware_network" },
  { label: "Зависимость от коллег или сторонних сервисов", value: "dependencies" },
  { label: "Просто не понял, как это реализовать", value: "did_not_understand" },
  {label: 'Другое', value: 'other'}
];

function Excuse() {
  const [selectedReason, setSelectedReason] = useState("");
  const [excuseList, setExcuseList] = useState([]); // теперь массив
  const [errorText, setErrorText] = useState("");

  const handleChange = (e, { value }) => {
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
      const response = await fetch("http://localhost:8000/excuse/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reason: selectedReason }),
      });
      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.statusText} ${response.status}`);
      }
      const data = await response.json();

      // Предполагаем, что data.excuse — это массив строк
      if (Array.isArray(data.excuse)) {
        setExcuseList(data.excuse);
      } else if (typeof data.excuse === "string") {
        // Если сервер прислал строку с переносами, разбиваем по строкам
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
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: "10vh",
        paddingBottom: "15vh",
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
        <Header as="h2" textAlign="center" style={{ marginBottom: "1.5em", color: "#4b3832" }}>
          Выберите причину оправдания
        </Header>
        <Form>
          {reasons.map((reason) => (
            <Form.Radio
              key={reason.value}
              label={reason.label}
              value={reason.value}
              checked={selectedReason === reason.value}
              onChange={handleChange}
              style={{ padding: "0.5em 0" }}
            />
          ))}
          <Button
            primary
            fluid
            onClick={handleClick}
            style={{ marginTop: "2em", borderRadius: "8px", backgroundColor: "#4b3832" }}
            content="Получить оправдание"
          />
        </Form>

        {errorText && (
          <Segment
            color="red"
            inverted
            style={{ marginTop: "1.5em", borderRadius: "8px", padding: "1em", fontWeight: "bold" }}
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
              fontSize: "1.1em",
              boxShadow: "0 0 10px rgba(75,56,50,0.15)",
            }}
          >
            <List bulleted>
              {excuseList.map((item, idx) => (
                <List.Item key={idx}>{item}</List.Item>
              ))}
            </List>
          </Segment>
        )}
      </Container>
    </div>
  );
}

export default Excuse;
