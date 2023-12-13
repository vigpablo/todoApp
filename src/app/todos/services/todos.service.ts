import { Injectable, signal } from '@angular/core';
import { TodoInterface } from '../types/todo.interface';
import { FilterEnum } from '../types/filter.enum';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  todosSig = signal<TodoInterface[]>([]);
  filterSig = signal<FilterEnum>(FilterEnum.all);

  changeFilterServ(filterName: FilterEnum):void {
    this.filterSig.set(filterName);
  } //según qué etiqueta clickeo en el footer establezco el valor de la señal filter, que luego se lee en el visibleTodo del main. Al mismo tiempo habilito el "selected" class en el footer html

  addTodoServ(text:string):void {
    const newTodo: TodoInterface = {
      text, // nuevo elemento con el nuevo text introducido en el input
      isCompleted: false,
      id: Math.random().toString(16),
    }
    this.todosSig.update((todos) => [...todos, newTodo]);
  } //recibo el text del header y lo agrego al signal -continúa en main-

  changeTodoServ(id:string, text:string):void {
    this.todosSig.update((todos) => todos.map((todo) => (todo.id === id ? {...todo, text} : todo))
    )//iteramos los todos y actualizamos el texto del todo del mismo id que se recibe de argumento
  }

  removeTodoServ(id:string):void {
    this.todosSig.update((todos) => todos.filter((todo) => todo.id !== id));
  }

  toggleTodoServ(id:string):void {
    this.todosSig.update((todos) =>
      todos.map((todo) =>
       todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo))
  } //toggle tilde

  toggleAll(isCompleted: boolean):void {
    this.todosSig.update((todos) =>
      todos.map((todo) => ({...todo, isCompleted}))
    )
  }

}


