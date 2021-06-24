import './styles.scss';

type QuestionsProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    }

}


export function Question({
    content,
    author,
}:QuestionsProps) {
    return (
        <div className="questions">
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div></div>
            </footer>
        </div>
    );
}