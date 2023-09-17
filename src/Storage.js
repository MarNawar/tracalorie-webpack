class Storage{
  static getCalorieLimit(defaultLimit = 2000){
    let calorieLimit;
    if(localStorage.getItem('calorie-limit')===null){
      calorieLimit = defaultLimit;
    }
    else{
      calorieLimit = +localStorage.getItem('calorie-limit');
    }
    return calorieLimit;
  }
  static setCalorieLimit(limit){
    localStorage.setItem('calorie-limit',JSON.stringify(limit));
  }

  static getTotalCalorie(defaultTotal = 0){
    let totalCalorie;
    if(localStorage.getItem('calorie-total')===null){
      totalCalorie = defaultTotal;
    }
    else{
      totalCalorie = +localStorage.getItem('calorie-total');
    }
    return totalCalorie;
  }
  static setTotalCalorie(total){
    localStorage.setItem('calorie-total',JSON.stringify(total));
  }
  static getMeals(){
    let meals;
    if(localStorage.getItem('meals')===null){
      meals = [];
    }
    else{
      meals = JSON.parse(localStorage.getItem('meals'));
    }
    return meals;
  }
  static setMeal(meal){
    let meals;
    if(localStorage.getItem('meals')===null){
      meals = [];
    }
    else{
      meals = JSON.parse(localStorage.getItem('meals'));
    }
    meals.push(meal);
    localStorage.setItem('meals',JSON.stringify(meals));
  }
  static removeMeal(id){
    let meals = this.getMeals();
    meals.forEach((meal,index)=>{
      if(id===meal.id){
        meals.splice(index,1);
      }
    });
    localStorage.setItem('meals',JSON.stringify(meals));
  }
  static getWorkouts(){
    let workouts;
    if(localStorage.getItem('workouts')===null){
      workouts = [];
    }
    else{
      workouts = JSON.parse(localStorage.getItem('workouts'));
    }
    return workouts;
  }
  static setWorkout(workout){
    let workouts;
    if(localStorage.getItem('workouts')===null){
      workouts = [];
    }
    else{
      workouts = JSON.parse(localStorage.getItem('workouts'));
    }
    workouts.push(workout);
    localStorage.setItem('workouts',JSON.stringify(workouts));
  }
  static removeWorkout(id){
    let workouts = this.getWorkouts();
    workouts.forEach((workout,index)=>{
      if(workout.id===id){
        workouts.splice(index,1);
      }
    });
    localStorage.setItem('workouts',JSON.stringify(workouts));
  }
  static reset(){
    localStorage.setItem('workouts',JSON.stringify([]));
    localStorage.setItem('meals',JSON.stringify([]));
    localStorage.setItem('calorie-total',JSON.stringify(0));
  }
}

export default Storage;