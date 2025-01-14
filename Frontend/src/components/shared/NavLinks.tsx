import {Link} from 'react-router-dom'

type Props = {
    to: string;
    bg: string;
    text: string;
    textColor: string;
    onClick?:()=>Promise<void>
}

export default function NavLinks(props: Props) {
  return (
    <Link className='nav-links' to={props.to} style={{background:props.bg, color:props.textColor}}> {props.text}</Link>


  )
}
