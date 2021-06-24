
import { useHistory, useParams} from 'react-router-dom'

import deleteImg from '../assets/images/delete.svg'
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';

import { useRoom } from '../hooks/UseRoom';
import { database } from '../services/firebase';

import '../styles/room.scss'

type RoomParams = {
    id: string;
}



export function AdminRoom() {
    
    const history = useHistory()
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const { title, questions} = useRoom(roomId)

    async function handleEndRoom() {
       await database.ref(`rooms/${roomId}`).update({
           endeAt: new Date (),
       })  
       history.push('/')
    }

    async  function handleDeleteQuestion(questionId: string) {
        if(window.confirm('Tem certeza que quer excluir essa pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                    <RoomCode code ={roomId} />
                    <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} perguntas </span>}
                </div>

                

                <div className="question-list">
                {questions.map(question => {
                    return(
                        <Question
                         key={question.id}
                        content={question.content}
                        author={question.author}>
                            
                            <button
                            type="button"
                            onClick={() => handleDeleteQuestion(question.id)}>
                                <img src={deleteImg} alt="remover pergunta" /></button>    
                        </Question>
                    )
                })}
                </div>
            </main>
        </div>
    );
}