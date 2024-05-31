import React from 'react';
import { Itodo } from '@/models/todo-interface';
import "./todo-item.scss"

interface TodoItemProps {
    todo: Itodo;
    onEdit: (todo: Itodo) => void;
    onDelete: (todo: Itodo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onEdit, onDelete }) => {
    const { no, title, status } = todo;

    return (
        <div className="todo-item">
            <div className="flex justify-between items-center">
                <div className="content">
                    <span className={`status-view mr-4 ${status ? 'done' : ''}`}>{status?"✔":""}</span>
                    <span className='mr-4'>{title}</span>
                    <span className='mr-4'>No: {no}</span>
                </div>
                <div className="op">
                    <button onClick={() => onEdit(todo)}>
                        <img src="/icons/pen-to-square-regular.svg" className="icon" alt="Edit" />
                    </button>
                    <button onClick={() => onDelete(todo)}>
                        <img src="/icons/trash-can-regular.svg" className="icon" alt="Delete" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TodoItem;