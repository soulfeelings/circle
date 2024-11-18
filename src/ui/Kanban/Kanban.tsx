import React, { useState } from 'react';
import styled from 'styled-components';

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
            { id: '1', title: 'Task 1' },
            { id: '2', title: 'Task 2' },
        ],
    },
    {
        id: 'done',
        title: 'Done',
        tasks: [{ id: '3', title: 'Task 3' }],
    },
];

const Board = styled.div`
  display: flex;
  gap: 20px;
`;

const ColumnContainer = styled.div`
  width: 300px;
  padding: 20px;
  background-color: #f4f5f7;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const TaskCard = styled.div<{ isHovered?: boolean }>`
  padding: 10px;
  margin-bottom: ${(props) => (props.isHovered ? '40px' : '10px')};
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: grab;
  transition: margin 0.2s ease;
`;

const Spacer = styled.div`
  height: 20px;
  background-color: rgba(0, 0, 0, 0.1);
`;

const KanbanBoard: React.FC = () => {
    const [columns, setColumns] = useState(initialColumns);
    const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const onDragStart = (taskId: string) => {
        setDraggedTaskId(taskId);
    };

    const onDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        e.preventDefault(); // Позволяет сбросить задачу
        setHoveredIndex(index); // Сохраняем индекс для визуального эффекта
    };

    const onDragLeave = () => {
        setHoveredIndex(null); // Убираем эффект, если мышь покинула зону
    };

    const onDrop = (e: React.DragEvent<HTMLDivElement>, columnId: string) => {
        e.preventDefault();

        const sourceColumn = columns.find((col) =>
            col.tasks.some((task) => task.id === draggedTaskId)
        );

        const task = sourceColumn?.tasks.find((t) => t.id === draggedTaskId);
        if (!task) return;

        setColumns((prevColumns) => {
            // Удаляем задачу из исходной колонки
            const updatedSourceColumn = {
                ...sourceColumn!,
                tasks: sourceColumn!.tasks.filter((t) => t.id !== draggedTaskId),
            };

            // Добавляем задачу в новую колонку на позицию hoveredIndex
            const targetColumn = prevColumns.find((col) => col.id === columnId)!;
            const updatedTargetTasks = [...targetColumn.tasks];
            if (hoveredIndex !== null) {
                updatedTargetTasks.splice(hoveredIndex, 0, task);
            } else {
                updatedTargetTasks.push(task);
            }

            const updatedTargetColumn = {
                ...targetColumn,
                tasks: updatedTargetTasks,
            };

            return prevColumns.map((col) =>
                col.id === sourceColumn?.id
                    ? updatedSourceColumn
                    : col.id === columnId
                        ? updatedTargetColumn
                        : col
            );
        });

        setDraggedTaskId(null);
        setHoveredIndex(null);
    };

    return (
        <Board>
            {columns.map((column) => (
                <ColumnContainer
                    key={column.id}
                    onDragOver={(e) => onDragOver(e, column.tasks.length)}
                    onDrop={(e) => onDrop(e, column.id)}
                >
                    <h3>{column.title}</h3>
                    {column.tasks.map((task, index) => (
                        <React.Fragment key={task.id}>
                            {hoveredIndex === index && <Spacer />}
                            <TaskCard
                                draggable
                                onDragStart={() => onDragStart(task.id)}
                                onDragOver={(e) => onDragOver(e, index)}
                                onDragLeave={onDragLeave}
                                isHovered={hoveredIndex === index}
                            >
                                {task.title}
                            </TaskCard>
                        </React.Fragment>
                    ))}
                    {hoveredIndex === column.tasks.length && <Spacer />}
                </ColumnContainer>
            ))}
        </Board>
    );
};

export default KanbanBoard;
