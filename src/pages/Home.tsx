import { useHistory } from "react-router-dom";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

import { Button } from "../components/Button";

import '../styles/auth.scss';

import { useAuth } from "../hooks/useAuth";



export function Home() {
    const history = useHistory();
    const { user, singInWithGoogle} = useAuth()


    async function HandleCreateRoom() {
        if(!user) {
            await singInWithGoogle()
        }
        history.push('/rooms/new')

      
    }

    return (
        <div id="page-auth">
            <aside>    
                <img src={illustrationImg} alt="ilustração" />
                <strong>Crie salas de Q&amp;A ao vivo</strong>
                <p>Tire as dúvidas da sua audiencia em tempo real</p>
            </aside>
            <main>
                
                <div className="main-content">
                    <img src={logoImg} alt="letmeask" />
                    <button onClick={HandleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Icon do google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form>
                        <input 
                        type="text" 
                        placeholder="Digite o código da sala"
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}