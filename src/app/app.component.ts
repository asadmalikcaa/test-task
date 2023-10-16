import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'coding-challenge-v2';
  tasks = [
    {
      title: 'task 1',
      completed: false,
    },
    {
      title: 'task 2',
      completed: false,
    },
    {
      title: 'task 3',
      completed: false,
    },
    {
      title: 'task 4',
      completed: false,
    },
  ];

  completedTasks = [
    {
      title: 'task 5',
      completed: false,
    },
    {
      title: 'task 6',
      completed: false,
    },
    {
      title: 'task 7',
      completed: false,
    },
    {
      title: 'task 8',
      completed: false,
    },
  ];

  selectLoopEnabled = false; 
  selectedTasks: any[] = [];
  selectedTaskStatus: boolean[] = [];
  predictedElements: number = 0;
  saveTasks = false;
  showSaveButton = true;
  selectedAction: string | null = null;
  showActionButton: boolean = false;
  textToSet: string = '';
  isButtonSelected: boolean = false;
  
  toggleSelectLoop() {
    this.selectLoopEnabled = true;
    if (!this.selectLoopEnabled) {
      this.selectedTasks = [];
    }
  } 
  
  selectInput(inputElement: any) {
    if (this.selectLoopEnabled) {
      const element = inputElement;
      if (element.classList.contains('selected')) {
        element.classList.remove('selected');
        this.selectedTasks = this.selectedTasks.filter((input) => input !== element);
      } else {
        element.classList.add('selected');
        this.selectedTasks.push(element);
      }
      const selectedInputs = document.querySelectorAll('input.selected');
      if (selectedInputs.length === 2) {
        const allInputs = document.querySelectorAll('input');
        allInputs.forEach((input: HTMLInputElement) => {
          if (!Array.from(selectedInputs).includes(input)) {
            input.classList.add('predicted');
            this.predictedElements = 1;
          }
        });
      }
    }
  }
  

  selectTask(index: number) {
    if (this.selectLoopEnabled) {
      if (this.selectedTasks.includes(index)) {
        this.selectedTasks = this.selectedTasks.filter((i) => i !== index);
        this.selectedTaskStatus[index] = false; 
      } else {
        this.selectedTasks.push(index);
        this.selectedTaskStatus[index] = true;
        
        if (this.selectedTasks.length === 2) {
          const remainingTasks = this.tasks
            .map((task, taskIndex) => taskIndex)
            .filter((i) => !this.selectedTasks.includes(i));
          remainingTasks.forEach((i) => {
            this.selectedTasks.push(i);
            this.selectedTaskStatus[i] = true;
          });
        this.predictedElements = remainingTasks.length;
        }
      }
    }
  }
  
  addTask(taskName: string, buttonElement: any) {
    if (!this.isButtonSelected && !this.selectLoopEnabled) {
      this.tasks.push({
        title: taskName,
        completed: false,
      });
    }
  }
  
  selectButton(buttonElement: any) {
    if (this.selectLoopEnabled) {
      const element = buttonElement;
      if (element.classList.contains('selected')) {
        element.classList.remove('selected');
        this.isButtonSelected = false;
      } else {
        element.classList.add('selected');
        this.isButtonSelected = true;
      }
  
      const selectedButtons = Array.from(document.querySelectorAll('.btn.selected'));
      if (selectedButtons.length === 2) {
        const allButtons = Array.from(document.querySelectorAll('.btn'));
        allButtons.forEach((button: any) => {
          if (!selectedButtons.includes(button)) {
            this.predictedElements = button;
            button.classList.add('predicted');
          }
        });
      }
    }
  }
  
  

  deleteTask(task: any) {
    let index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }

  saveSelectedTasks(){
    this.saveTasks = true;
    this.showSaveButton = false;
    this.showActionButton =true
  }

  selectAction(action: string) {
    this.selectedAction = action;
  }

  performAction() {
    if (this.selectedAction === 'mark') {
      this.tasks.forEach((task, index) => {
        if (this.selectedTasks.includes(index)) {
          task.completed = true;
        }
      });
    } else if (this.selectedAction === 'delete') {
      const indicesToDelete = this.selectedTasks.slice().sort((a, b) => b - a);
  
      indicesToDelete.forEach((index) => {
        this.tasks.splice(index, 1);
      });
    } else if (this.selectedAction === 'input') {
      const inputFields = document.querySelectorAll('input[type="text"]');
      inputFields.forEach((input: any) => {
        input.value = this.textToSet;
      });
    }
  
    this.selectedTasks = [];
    this.selectedTaskStatus = Array(this.tasks.length).fill(false);
    this.selectedAction = null;
  }
  
  
}
