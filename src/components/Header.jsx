import React from "react";
import {Menu, Container} from "semantic-ui-react";
import {Link, useLocation} from "react-router-dom";


function Header() {
    const location = useLocation()

    return (
        <Menu inverted fixed="top" style={{backgroundColor: "#4b3832"}}>
            <Container>
                <Menu.Item
                    as={Link}
                    to="/"
                    active={location.pathname === "/"}
                >
                    Push&Pray
                </Menu.Item>

                <Menu.Item
                    as={Link}
                    to="/about"
                    active={location.pathname === "/about"}
                >
                    О нас
                </Menu.Item>

                <Menu.Item
                    as="a"
                    onClick={() => alert("Заглушка: Сообщение для коммита")}
                >
                    Сообщение для коммита
                </Menu.Item>

                <Menu.Item
                    as="a"
                    onClick={() => alert("Заглушка: Оправдание")}
                >
                    Оправдание
                </Menu.Item>
            </Container>
        </Menu>
    );
}