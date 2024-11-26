import {useState} from 'react';
import {Board} from "./Kanban.style.ts";
import {DragDropContext} from "react-beautiful-dnd";
import {Column} from "./components/Column/Column.tsx";
import Scene from "../Tree/Tree.tsx";

interface Task {
    id: string;
    title: string;
}

interface Column {
    id: string;
    title: string;
    tasks: Task[];
}

const initialColumns: Column[] = [
    {
        id: 'todo',
        title: 'To Do',
        tasks: [
            {id: '1', title: 'Task 1'},
            {id: '2', title: 'Task 2'},
        ],
    },
    // {
    //     id: 'in_progress',
    //     title: 'In progress',
    //     tasks: [{id: '4', title: 'Task 4'}],
    // },
    {
        id: 'done',
        title: 'Done',
        tasks: [{id: '3', title: 'Task 3'}],
    },
];

const KanbanBoard = () => {
    const [columns, setColumns] = useState<Column[]>(initialColumns);

    const handleDragEnd = (result: any) => {
        const {source, destination} = result;

        // If dropped outside a droppable area, return early
        if (!destination) return;

        // If dropped in the same position, do nothing
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        // Get the source and destination columns
        const sourceColumn = columns.find((col) => col.id === source.droppableId);
        const destinationColumn = columns.find(
            (col) => col.id === destination.droppableId
        );

        if (!sourceColumn || !destinationColumn) return;

        // Remove the task from the source column
        const [movedTask] = sourceColumn.tasks.splice(source.index, 1);

        // Add the task to the destination column
        destinationColumn.tasks.splice(destination.index, 0, movedTask);

        if (destinationColumn.id === 'done') {
            window.dispatchEvent(new CustomEvent('tree'))
        }

        // Update the state
        setColumns([...columns]);
    };

    return (
        <>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Board>
                    {columns.map((column) => (
                        <Column key={column.id} columnId={column.id} title={column.id}
                                tasks={column.tasks.map((t) => ({text: t.title, id: t.id}))}/>
                    ))}
                </Board>
            </DragDropContext>
            <Scene/>
        </>
    );
};

export default KanbanBoard;
