import '@fortawesome/fontawesome-free/js/all';
import {Modal, Collapse} from 'bootstrap';
import CalorieTracker from './Tracker';
import { Meal, Workout } from './Item';
import './css/bootstrap.css';
import './css/style.css';

class App{
  constructor(){
    this._tracker = new CalorieTracker();
    document.getElementById('meal-form').addEventListener('submit',this._newItem.bind(this,'meal'));
    document.getElementById('workout-form').addEventListener('submit',this._newItem.bind(this,'workout'));

    document.getElementById('meal-items').addEventListener('click',this._removeItem.bind(this,'meal'));
    document.getElementById('workout-items').addEventListener('click',this._removeItem.bind(this,'workout'));

    document.getElementById('filter-meals').addEventListener('keyup',this._filterItem.bind(this,'meal'));
    document.getElementById('filter-workouts').addEventListener('keyup',this._filterItem.bind(this,'workout'));

    document.getElementById('reset').addEventListener('click',this._reset.bind(this));

    document.getElementById('limit-form').addEventListener('submit',this._dailyLimit.bind(this));

    this._tracker.loadItems();
  }
  _newItem(item, e){
    e.preventDefault();

    const name = document.getElementById(`${item}-name`);
    const calories = document.getElementById(`${item}-calories`);

    //Validate Inputs
    if(name.value===''||calories.value===''){
      alert('Please fill in all fields');
      return;
    }
    if(item==='meal'){
      const meal = new Meal(name.value, +calories.value);
      this._tracker.addMeal(meal);
    }
    else{
      const workout = new Workout(name.value, +calories.value);
      this._tracker.addWorkout(workout);
    }
    
    name.value='';
    calories.value='';
    
    const collapseItem = document.getElementById(`collapse-${item}`);
    const bsCollapse = new Collapse(collapseItem,{
      toggle:true
    });
  }
  _removeItem(item,e){
    e.preventDefault();
    if(e.target.classList.contains('fa-xmark')||e.target.classList.contains('delete')){
      if(confirm('Are U Sure?')){
        const id = e.target.closest('.card').getAttribute('data-id');
        console.log(id);
        item==='meal'? this._tracker.removeMeal(id): this._tracker.removeWorkout(id);
        e.target.closest('.card').remove();
      }
    }
  }
  _filterItem(type,e){
    e.preventDefault();
    const input = e.target.value.toLowerCase();
    document.querySelectorAll(`#${type}-items .card`).forEach(item=>{
      const name = item.firstElementChild.firstElementChild.firstElementChild.textContent;
      
      if(name.toLowerCase().indexOf(input) !== -1){
        item.style.display = 'block';
      }
      else{
        item.style.display = 'none';
      }
    });
  }
  _reset(e){
    e.preventDefault();
    document.querySelectorAll(`#meal-items .card`).forEach(item=>{
      item.remove();
    });
    document.querySelectorAll(`#workout-items .card`).forEach(item=>{
      item.remove();
    });
    this._tracker.reset();

    document.getElementById('filter-workouts').value='';
    document.getElementById('filter-meals').value='';
  }
  _dailyLimit(e){
    e.preventDefault();
    const limit = document.getElementById('limit');
    if(limit.value === ''){
      alert('Please add a limit');
      return;
    }
    this._tracker.dailyLimit(+limit.value);
    limit.value='';

    const modalEl = document.getElementById('limit-modal');
    const modal = Modal.getInstance(modalEl);
    modal.hide();
  }
}
const app = new App();