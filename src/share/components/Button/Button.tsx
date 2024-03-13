import './Button.scss';

export const Button: React.FC<{
    text: string,
    onClick: (id:string)=>void,
    id: string
}> = ({
    text,
    id,
    onClick
})=>{
    return <button className="button" onClick={()=>onClick(id)}>{text}</button>
}