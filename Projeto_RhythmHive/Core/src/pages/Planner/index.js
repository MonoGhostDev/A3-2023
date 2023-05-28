import React, { useState, useEffect } from "react";
import BackgroundImage from "./BackgroundBee.JPG";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url(${BackgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const columnStyle = {
  width: "300px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "10px",
  padding: "20px",
  border: "1px solid white",
  borderRadius: "5px",
  backgroundColor: "white",
  maxHeight: "400px",
};

const cardsContainerStyle = {
  maxHeight: "320px",
  overflowY: "auto",
};

const cardStyle = {
  width: "100%",
  marginBottom: "10px",
  padding: "10px",
  borderRadius: "5px",
  color: "white",
  textAlign: "center",
};

const colorOptions = ["green", "red", "yellow"];

const Planner = () => {
  const [todoCards, setTodoCards] = useState([]);
  const [doingCards, setDoingCards] = useState([]);
  const [doneCards, setDoneCards] = useState([]);

  useEffect(() => {
    const storedTodoCards = localStorage.getItem("todoCards");
    const storedDoingCards = localStorage.getItem("doingCards");
    const storedDoneCards = localStorage.getItem("doneCards");

    if (storedTodoCards) {
      setTodoCards(JSON.parse(storedTodoCards));
    }
    if (storedDoingCards) {
      setDoingCards(JSON.parse(storedDoingCards));
    }
    if (storedDoneCards) {
      setDoneCards(JSON.parse(storedDoneCards));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoCards", JSON.stringify(todoCards));
  }, [todoCards]);

  useEffect(() => {
    localStorage.setItem("doingCards", JSON.stringify(doingCards));
  }, [doingCards]);

  useEffect(() => {
    localStorage.setItem("doneCards", JSON.stringify(doneCards));
  }, [doneCards]);

  const handleAddCard = (column) => {
    const cardText = prompt("Digite o conteúdo do card:");
    if (cardText) {
      // Verificar se o texto já existe em qualquer uma das colunas
      const isDuplicate =
        todoCards.some((card) => card.text === cardText) ||
        doingCards.some((card) => card.text === cardText) ||
        doneCards.some((card) => card.text === cardText);
      if (isDuplicate) {
        alert("Esse card já existe em uma das colunas.");
        return;
      }

      const newCard = {
        id: Date.now(),
        text: cardText,
        color: getColumnColor(column),
      };
      if (column === "todo") {
        setTodoCards([...todoCards, newCard]);
      } else if (column === "doing") {
        setDoingCards([...doingCards, newCard]);
      } else if (column === "done") {
        setDoneCards([...doneCards, newCard]);
      }
    }
  };

  const handleMoveCard = (cardId, sourceColumn, destinationColumn) => {
    const sourceCards = getColumnCards(sourceColumn);
    const destinationCards = getColumnCards(destinationColumn);
    const cardToMove = sourceCards.find((card) => card.id === cardId);

    if (cardToMove) {
      // Verificar se o texto já existe nos cards da coluna de destino
      const isDuplicate = destinationCards.some(
        (card) => card.text === cardToMove.text
      );
      if (isDuplicate) {
        alert("Esse card já existe na coluna de destino.");
        return;
      }

      const updatedSourceCards = sourceCards.filter(
        (card) => card.id !== cardId
      );
      const updatedDestinationCards = [
        ...destinationCards,
        { ...cardToMove, color: getColumnColor(destinationColumn) },
      ];

      if (sourceColumn === "todo") {
        setTodoCards(updatedSourceCards);
      } else if (sourceColumn === "doing") {
        setDoingCards(updatedSourceCards);
      } else if (sourceColumn === "done") {
        setDoneCards(updatedSourceCards);
      }

      if (destinationColumn === "todo") {
        setTodoCards(updatedDestinationCards);
      } else if (destinationColumn === "doing") {
        setDoingCards(updatedDestinationCards);
      } else if (destinationColumn === "done") {
        setDoneCards(updatedDestinationCards);
      }
    }
  };

  const handleDeleteCard = (cardId, column) => {
    const updatedCards = getColumnCards(column).filter(
      (card) => card.id !== cardId
    );
    if (column === "todo") {
      setTodoCards(updatedCards);
    } else if (column === "doing") {
      setDoingCards(updatedCards);
    } else if (column === "done") {
      setDoneCards(updatedCards);
    }
  };

  const handleTextChange = (cardId, column) => {
    const updatedCards = getColumnCards(column).map((card) => {
      if (card.id === cardId) {
        const newText = prompt("Digite o novo texto do card:");
        return {
          ...card,
          text: newText,
        };
      }
      return card;
    });

    if (column === "todo") {
      setTodoCards(updatedCards);
    } else if (column === "doing") {
      setDoingCards(updatedCards);
    } else if (column === "done") {
      setDoneCards(updatedCards);
    }
  };

  const getColumnCards = (column) => {
    if (column === "todo") {
      return todoCards;
    } else if (column === "doing") {
      return doingCards;
    } else if (column === "done") {
      return doneCards;
    }
    return [];
  };

  const getColumnColor = (column) => {
    if (column === "todo") {
      return "red";
    } else if (column === "doing") {
      return "yellow";
    } else if (column === "done") {
      return "green";
    }
    return "";
  };

  const renderCards = (column) => {
    return getColumnCards(column).map((card) => (
      <div
        key={card.id}
        className="card"
        style={{
          ...cardStyle,
          backgroundColor: card.color || "white",
        }}
      >
        <p style={{ color: "black", fontWeight: "bold" }}>{card.text}</p>
        <div className="card-actions">
          {column !== "todo" && (
            <button
              onClick={() => handleMoveCard(card.id, column, "todo")}
              className="action-button"
            >
              Mover para Ensaiar
            </button>
          )}
          {column !== "doing" && (
            <button
              onClick={() => handleMoveCard(card.id, column, "doing")}
              className="action-button"
            >
              Mover para Ensaiando
            </button>
          )}
          {column !== "done" && (
            <button
              onClick={() => handleMoveCard(card.id, column, "done")}
              className="action-button"
            >
              Mover para Ensaiado
            </button>
          )}
          <button
            onClick={() => handleDeleteCard(card.id, column)}
            className="action-button"
          >
            Excluir
          </button>
          <button
            onClick={() => handleTextChange(card.id, column)}
            className="action-button"
          >
            Alterar Texto
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: "center", color: "white", marginTop: "-20px" }}>
        Planner
      </h1>
      <div style={{ display: "flex" }}>
        <div style={columnStyle}>
          <h2>Ensaiar</h2>
          <div style={cardsContainerStyle}>{renderCards("todo")}</div>
          <button onClick={() => handleAddCard("todo")} className="add-button">
            Adicionar Card
          </button>
        </div>
        <div style={columnStyle}>
          <h2>Ensaiando</h2>
          <div style={cardsContainerStyle}>{renderCards("doing")}</div>
          <button onClick={() => handleAddCard("doing")} className="add-button">
            Adicionar Card
          </button>
        </div>
        <div style={columnStyle}>
          <h2>Ensaiado</h2>
          <div style={cardsContainerStyle}>{renderCards("done")}</div>
          <button onClick={() => handleAddCard("done")} className="add-button">
            Adicionar Card
          </button>
        </div>
      </div>
    </div>
  );
};

export default Planner;
