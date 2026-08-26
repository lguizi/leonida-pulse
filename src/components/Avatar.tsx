export function Avatar({initials,small=false}:{initials:string;small?:boolean}){return <span className={small?'avatar small':'avatar'}>{initials}</span>}
