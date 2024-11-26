import styled from "styled-components";
import {Draggable, Droppable} from "react-beautiful-dnd";
import {TaskCard} from "../../Kanban.style.ts";

export const ColumnContainer = styled.div`
  width: 300px;
  padding: 20px;
  background-color: #f4f5f7;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const TasksContainer = styled.div`
  width: 300px;
  padding: 20px;
  background-color: #f4f5f7;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const Column = (props: {
    columnId: string;
    title: string;
    tasks: { id: string, text: string }[]
}) => {
    const {title, tasks, columnId} = props;
    return (
        <ColumnContainer>
            <h1>{title}</h1>

            <Droppable droppableId={columnId} key={columnId}>
                {(provided) => (
                    <TasksContainer
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {tasks.map((task, index) => (
                            <Draggable
                                draggableId={task.id}
                                index={index}
                                key={task.id}
                            >
                                {(provided) => {
                                    return (
                                        <TaskCard
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                        >
                                            {task.text}
                                        </TaskCard>
                                    )
                                }
                                }
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </TasksContainer>
                )}
            </Droppable>
        </ColumnContainer>

    )
}