import Table from 'react-bootstrap/Table';
import './styles/ExerciseTable.css'
import { FcCheckmark, FcCancel } from "react-icons/fc";

const ExerciseTable = () => {
  const exercises = ["Упр1", "Упр2", "Упр3"]
  const colVo = ["3x10", "4x8", "5x6"]
  const current = ["3", "1", "0"]
  const completed = [true, false, false]

  return (
    <div  className='ExerciseTable'>
      <Table striped bordered hover>      
        <thead>
          <tr>
            <th>Упражнение</th>
            <th>Под</th>
            <th>Подх</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
          {
            exercises.map((e, i) => 
              <tr>
                <td>{e + "фывфывфывы"}</td>
                <td>{colVo[i]}</td>
                <td>{current[i]}</td>
                <td>{completed[i]? <FcCheckmark/> : <FcCancel/>}</td>
              </tr>
            )
          }
        </tbody>
      </Table>
    </div>
  )
}

export default ExerciseTable