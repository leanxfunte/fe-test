import { useEffect } from 'react'
import './App.css'
import WorkoutRenderer from './components/Workout';
import workoutData from './data/workout';

function App() {

  useEffect(() => {
    // console.log(workoutData)
  })

  return (
    <>
      <WorkoutRenderer workout={workoutData} />
    </>
  )
}

export default App
