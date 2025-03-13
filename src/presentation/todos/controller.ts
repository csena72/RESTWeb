import { Request, Response } from "express";

const todos = [
    { id: 1, title: 'Todo 1', completed: false },
    { id: 2, title: 'Todo 2', completed: false },
    { id: 3, title: 'Todo 3', completed: false },
]

export class TodosController {

    //* DI
    constructor() { };

    public getTodos = (req: Request, res: Response) => {

        res.json(todos);
    }

    public getTodoById = (req: Request, res: Response) => {

        const id = +req.params.id;
        if (isNaN(id)) res.status(400).json({ error: 'ID argument is not a number' });

        const todo = todos.find((todo) => todo.id === id);

        (todo)
            ? res.json(todo)
            : res.status(404).json({ error: `Todo ${id} not found` });
    }

    public createTodo = (req: Request, res: Response) => {
        console.log(req.body);

        const { title } = req.body;
        
        if ( !title ) res.status(400).json({ error: 'Title is required' });

        const newTodo = {
            id: todos.length + 1,
            title: title,
            completed: false
        }

        todos.push( newTodo );

       res.json(newTodo);
    }

    public updateTodo = (req: Request, res: Response) => {

        const id = +req.params.id;
        
        if (isNaN(id)) res.status(400).json({ error: 'ID argument is not a number' });

        const todo = todos.find((todo) => todo.id === id);
        if (!todo){
            res.status(404).json({ error: `Todo ${id} not found` });
            return;
        }

        const { title, completed } = req.body;

        todo.title = title || todo.title;
        (completed === null)
            ? todo.completed = false
            : todo.completed = true;

        (todo)
            ? res.json(todo)
            : res.status(404).json({ error: `Todo ${id} not found` });
    }

    public deleteTodo = (req: Request, res: Response) => {

        const id = +req.params.id;
        if (isNaN(id)) res.status(400).json({ error: 'ID argument is not a number' });

        const todo = todos.find((todo) => todo.id === id);
        if (!todo){
            res.status(404).json({ error: `Todo ${id} not found` });
            return;
        }

        todos.splice(todos.indexOf(todo), 1);

        res.json(todo);
    }
}
