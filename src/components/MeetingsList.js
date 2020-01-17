import React, { Component } from "react";
import firebase from "./Firebase";
import { navigate } from "@reach/router";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// fake data generator
const getItems = [
  { id: "item-1", content: "item-1" },
  { id: "item-2", content: "item-2" }
];

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class MeetingsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: getItems
    };
    this.deleteMeeting = this.deleteMeeting.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  deleteMeeting = (e, whichMeeting) => {
    e.preventDefault();
    const ref = firebase
      .database()
      .ref(`meetings/${this.props.userID}/${whichMeeting}`);
    ref.remove();
  };

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    });
  }

  render() {
    const { meetings } = this.props;
    const myMeetings = meetings.map(item => {
      return (
        <>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <Draggable key={item.meetingID} draggableId={item.meetingID}>
                    {(provided, snapshot) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <button
                          onClick={e => this.deleteMeeting(e, item.meetingID)}
                        >
                          x
                        </button>
                        <button
                          onClick={() =>
                            navigate(
                              `/checkin/${this.props.userID}/${item.meetingID}`
                            )
                          }
                        >
                          @
                        </button>
                        {item.meetingName}
                      </li>
                    )}
                  </Draggable>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </>
      );
    });

    return <div>{myMeetings}</div>;
  }
}

export default MeetingsList;
