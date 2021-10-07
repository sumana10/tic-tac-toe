import React, { useState } from "react";

//import component
import Icon from "./components/Icon";

//import toastify library
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//import reactstrap library 
import { Card, CardBody, Container, Button, Col, Row } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";

//own style sheet
import "./App.css";

const itemArray = new Array(9).fill("empty");

const App = () => {

  const [isCross, setIsCross] = useState(false);
  const [winMessage, setWinMessage] = useState("");

 //reset everything 
  const reloadGame = () => {
    setIsCross(false);
    setWinMessage("");
    itemArray.fill("empty", 0, 9);
  };

  const checkIsWinner = () => {
    if(
      itemArray[0] === itemArray[1] && 
      itemArray[0] === itemArray[2] && 
      itemArray[0] !== "empty"
      ){
      setWinMessage(`${itemArray[0]} won`)
    }else if(
      itemArray[3] !== "empty" &&
      itemArray[3] === itemArray[4] &&
      itemArray[4] === itemArray[5]
    ){
      setWinMessage(`${itemArray[3]} won`);
    }else if (
      itemArray[6] !== "empty" &&
      itemArray[6] === itemArray[7] &&
      itemArray[7] === itemArray[8]
    ) {
      setWinMessage(`${itemArray[6]} won`);
    } else if (
      itemArray[0] !== "empty" &&
      itemArray[0] === itemArray[3] &&
      itemArray[3] === itemArray[6]
    ) {
      setWinMessage(`${itemArray[0]} won`);
    } else if (
      itemArray[1] !== "empty" &&
      itemArray[1] === itemArray[4] &&
      itemArray[4] === itemArray[7]
    ) {
      setWinMessage(`${itemArray[1]} won`);
    } else if (
      itemArray[2] !== "empty" &&
      itemArray[2] === itemArray[5] &&
      itemArray[5] === itemArray[8]
    ) {
      setWinMessage(`${itemArray[2]} won`);
    } else if (
      itemArray[0] !== "empty" &&
      itemArray[0] === itemArray[4] &&
      itemArray[4] === itemArray[8]
    ) {
      setWinMessage(`${itemArray[0]} won`);
    } else if (
      itemArray[2] !== "empty" &&
      itemArray[2] === itemArray[4] &&
      itemArray[4] === itemArray[6]
    ) {
      setWinMessage(`${itemArray[2]} won`);
    }
  };
 //change icon (set state and array)
  const changeItem = itemNumber => {

    if(winMessage){

      return toast(winMessage, {type:"success"})

    }
    if(itemArray[itemNumber] === "empty"){

      itemArray[itemNumber] = isCross ? "cross" : "circle"
      setIsCross(!isCross)

    }else{

      return toast("already filled", {type: "error"})
    }
    checkIsWinner();
  };

  return (
    <Container className="p-5">
      <ToastContainer position="bottom-center" />
      <Row>
        <Col md={6} className="offset-md-3">
        {winMessage ? (
          <div className="mb-2 mt-2">
              <h1 className="text-white text-uppercase text-center">
                {winMessage}
              </h1>
           <div className="d-grid gap-2">
                <Button
                  color="light"
                  size="lg"  onClick={reloadGame}
                  block>
                Reload the game
                </Button>
           </div>
          </div>
        ) : (
          <h1 className="text-center text-white">
            {isCross ? "Cross": "Circle"} turns
          </h1>
        )}
          <div className="grid">
            {itemArray.map((item, index) => (
              <Card color="info" onClick={() => changeItem(index)}>
                <CardBody className="box">
                  <Icon name={item} />
                </CardBody>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
