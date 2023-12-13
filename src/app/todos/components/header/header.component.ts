import { Component, inject } from '@angular/core';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todos-header',
  templateUrl: './header.component.html',
  standalone: true,
})
export class HeaderComponent {
  todosService = inject(TodosService);

  text: string = '';

  changeText(event: Event):void {
    const target = event.target as HTMLInputElement;
    this.text = target.value; // es el [value] del input
  }

  addTodo():void {
    this.todosService.addTodoServ(this.text) //una vez asignado el valor al text, lo mando al service
    this.text = '' //reseteo el text -continúa en service-)
  }



}
