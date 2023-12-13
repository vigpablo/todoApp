import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosService } from '../../services/todos.service';
import { FilterEnum } from '../../types/filter.enum';
import { TodoComponent } from '../todo/todo/todo.component';


@Component({
  selector: 'app-todos-main',
  standalone: true,
  imports: [CommonModule, TodoComponent],
  templateUrl: './main.component.html',
  styleUrls: []
})
export class MainComponent {
  todosService = inject(TodosService);
  editingId: string | null = null;

  visibleTodos = computed(() => {
    const todos = this.todosService.todosSig();
    const filter = this.todosService.filterSig(); //se usan los parentesis porque necesito leer el valor de las señales

    if (filter === FilterEnum.active) {
      return todos.filter ((todo) => !todo.isCompleted)
    }else if (filter === FilterEnum.completed) {
      return todos.filter((todo) => todo.isCompleted);
    }
    return todos;
  })//se combinan dos señales para determinar una que es leida en el main html. 

  setEditingId(id: string|null) {
    this.editingId = id
  }

  isAllTodosSelected = computed(() =>
    this.todosService.todosSig().every((todo) => todo.isCompleted)
  );

  toggleAllTodos(event: Event):void {
    const target = event.target as HTMLInputElement
    this.todosService.toggleAll(target.checked)
  }

  noTodoClass = computed(() => this.todosService.todosSig().length === 0 ); //para ocultar el copito con hidden


}
