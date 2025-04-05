import { Request, Response } from "express";
import { prisma } from "../../data/postgres";


export class TodosController {

    //* DI
    constructor() { };

    public getTodos = async (req: Request, res: Response) => {
        const todos = await prisma.todo.findMany();
        res.json(todos);
    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) res.status(400).json({ error: 'ID argument is not a number' });

        const todo = await prisma.todo.findFirst({
            where: {
                id: id
            }
        });

        (todo)
            ? res.json(todo)
            : res.status(404).json({ error: `Todo ${id} not found` });
    }

    public createTodo = async(req: Request, res: Response) => {
        const { text } = req.body;        
        if ( !text ) res.status(400).json({ error: 'Text is required' });

        const todo = await prisma.todo.create({
            data: {
                text: text,
                completedAt: new Date()
            }
        });
        res.json(todo);
    }

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;        
        if (isNaN(id)) res.status(400).json({ error: 'ID argument is not a number' });

        const todo = await prisma.todo.findFirst({
            where: {
                id: id
            }
        });

        if (!todo){
            res.status(404).json({ error: `Todo ${id} not found` });
            return;
        }

        const { text, completedAt } = req.body;

        const updatedTodo = await prisma.todo.update({
            where: {id},
            data: { text, completedAt }
        });

        res.json( updatedTodo );
    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) res.status(400).json({ error: 'ID argument is not a number' });

        const todo = await prisma.todo.findFirst({
            where: {
                id: id
            }
        });

        if (!todo){
            res.status(404).json({ error: `Todo ${id} not found` });
            return;
        }
        await prisma.todo.delete({ where: { id: id } });
        res.json(todo);
    }
}
