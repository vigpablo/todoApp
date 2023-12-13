import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoInterface } from 'src/app/todos/types/todo.interface';
import { TodosService } from 'src/app/todos/services/todos.service';

@Component({
  selector: 'app-todos-todo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit, OnChanges {


  @Input({required: true}) todo!: TodoInterface; // 1-recibe el todo del main
  @Input({required: true}) isEditing!: boolean; // 3-recibe el valor true/false del main y habilita el html
  @Output() setEditingId: EventEmitter<string|null> = new EventEmitter; // output al main

  @ViewChild('txtInput') txtInput?: ElementRef

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isEditing'].currentValue) {
      setTimeout(() => {
        this.txtInput?.nativeElement.focus();
      }, 0);
    }
  } //permite que se habilite la edición directamente sin tener que volver a clickear. El setTimeOut espera a que el isEditing cambie para que funcione el focus.

  todosService = inject(TodosService);

  editingText: string = '';

  ngOnInit(): void {
    this.editingText = this.todo.text; //conserva el valor original al hacer dbclick
  }

  changeText(event: Event):void {
    const value = (event.target as HTMLInputElement).value
    this.editingText = value // nuevo valor del texto va al changeTodo() cuando keyupEnter. Lo mismo que lo del header.
  }

  changeTodo():void {
    this.todosService.changeTodoServ(this.todo.id, this.editingText) //envío el id para identificar el todo al que le hago el cambio, y el text para actualizar
    this.setEditingId.emit(null) // emite null para anular el isEditing y ocultar el html input de edición
  }

  setTodoInEditMode():void {
    this.setEditingId.emit(this.todo.id)
  }//2-emite el id del todo al main, y vuelve isEditing true -> habilita el html

  removeTodo():void {
    this.todosService.removeTodoServ(this.todo.id)
  } // toma el todo id y lo envía al service

  toggleTodo():void {
    this.todosService.toggleTodoServ(this.todo.id)
  }
}
