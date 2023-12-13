import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosService } from '../../services/todos.service';
import { FilterEnum } from '../../types/filter.enum';

@Component({
  selector: 'app-todos-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: []
})
export class FooterComponent {
  todosService = inject(TodosService);
  filterSig = this.todosService.filterSig; //sin parentesis, es directamente la señal. Explicado en minuto 25
  filterEnum = FilterEnum;
  activeCount = computed(() => {
    return this.todosService.todosSig().filter((todo)=> !todo.isCompleted).length
  })// contador de items

  noTodoClass = computed(() => this.todosService.todosSig().length === 0 ); //para el class hidden
  itemsLeftText = computed(() => `item${this.activeCount() !== 1 ? 's' : ''} left`); //texto items

  changeFilter(event: Event, filterName: FilterEnum){
    event.preventDefault();
    this.todosService.changeFilterServ(filterName)
  } //según qué etiqueta clickeo, envío la etiqueta al service para setear la señal filter con dicho valor y afectar al visibleTodo del main.
}
