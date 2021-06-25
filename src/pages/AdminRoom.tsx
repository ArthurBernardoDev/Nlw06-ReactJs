
import { useHistory, useParams} from 'react-router-dom'

import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'

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
    const { title, question} = useRoom(roomId)

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


    async function handleCheckQuestionAsAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        })
    }

    async function handleHighLightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHignlighted: true,
        })
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
                    {question.length > 0 && <span>{question.length} perguntas </span>}
                </div>

                

                <div className="question-list">
                {question.map(question => {
                    return(
                        <Question
                         key={question.id}
                        content={question.content}
                        author={question.author}
                        isAnswered={question.isAnswered}
                        isHighlighted={question.isHighlighted}
                        >
                            {!question.isAnswered && (
                                <>
                                <button
                                type="button"
                                onClick={() => handleCheckQuestionAsAnswered(question.id)}>
                                    <img src={checkImg} alt="Marcar pergunta como respondida" /></button>
    
                                <button
                                type="button"
                                onClick={() => handleHighLightQuestion(question.id)}>
                                    <img src={answerImg} alt="dar destaque à pergunta" /></button>
                                    </>
                            )}

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