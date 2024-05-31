import { Itodo } from '@/models/todo-interface';
import React, { useEffect } from 'react';
import { useForm, SubmitHandler, FieldErrors, FieldError } from 'react-hook-form';
import "./add-todo-form.scss";
import { uniqueId } from '@/utils/generate';

interface IFormProps {
    onSubmitCallback: (data: Itodo) => void;
    edit: boolean,
    todo?: Itodo
}

const TodoForm = ({ onSubmitCallback, edit = false, todo }: IFormProps) => {
    console.log("xx todo ", todo, edit, {
        no: todo?.no,
        title: todo?.title
    });

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<Itodo>({
        defaultValues: {
            no: todo?.no,
            title: todo?.title
        }
    });

    useEffect(() => {
        if (todo) {
            reset(todo);
        }
    }, [todo, reset]);



    const onSubmit: SubmitHandler<Itodo> = (data) => {
        onSubmitCallback({ ...data, ...(!edit && { no: uniqueId() }) });
        if (!edit) {
            reset();
        }
    };

    const validations = {
        title: {
            required: { value: true, message: "title is required" },
        }
    }

    const errorView = (error: FieldError) => {
        if (!error) return null;

        return (
            <div className="field-error-msg">
                <p>{error.message}</p>
            </div>
        );
    };

    return (

        <form onSubmit={handleSubmit(onSubmit)}>

            <input disabled type="hidden" id="no" className="input-field" {...register('no')} />


            <div className="px-2">
                <div className="flex flex-col">
                    <div className="flex flex-row field-row">
                        <div className="field-label">
                            <label htmlFor="firstName" className="input-label">Title</label>
                        </div>
                        <div className={`field-value ${errors.title && 'field-value-error'}`}>
                            <input type="text" id="title" className="input-field" {...register('title', validations.title)} />
                        </div>
                    </div>
                    {errors.title && errorView(errors.title)}
                </div>
            </div>


            <div className="px-2">
                <div className="flex flex-col">
                    <div className="flex flex-row field-row">
                        <div className="field-label">
                            <label htmlFor="Status" className="input-label">Status</label>
                        </div>
                        <div className={`field-value-box ${errors.status && 'field-value-error'}`}>
                            <input type="checkbox" id="status" className="input-field" {...register('status')} />
                        </div>
                    </div>
                    {errors.status && errorView(errors.status)}
                </div>
            </div>

            <div className="px-2">
                <div className="flex flex-col">
                    <div className="flex flex-row field-row">
                        <div className="field-label"></div>
                        <div className="field-value">
                            <button className="btn-outline bg-teal-500 text-white px-4 py-2 rounded" type="submit">{(edit) ? "SAVE" : "ADD"}</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>

    );
}

export default TodoForm;